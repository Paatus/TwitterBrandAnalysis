-module(twitterminer_source).

-behaviour(gen_server).
-export([start/2]).

-export([init/1,
         handle_call/3, 
         handle_cast/2,
         handle_info/2, 
         terminate/2, 
         code_change/3]).

-record(account_keys, {api_key, api_secret,
                       access_token, access_token_secret}).

start(SearchWords, RelayPid) ->
	gen_server:start_link(?MODULE, [SearchWords, RelayPid], []).

init([SearchWords, RelayPid]) ->
	PipelineP = run(SearchWords, RelayPid),
	{ok, PipelineP}.

handle_call(_Request, _From, State) ->
	{reply, ok, State}.

handle_cast(_Message, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, PipelineP) ->
	twitterminer_pipeline:terminate(PipelineP),
	ok.

code_change(_OldVsn, State, _) ->
	{ok, State}.


keyfind(Key, L) ->
  {Key, V} = lists:keyfind(Key, 1, L),
  V.

%% @doc Get Twitter account keys from a configuration file.
get_account_keys(Name) ->
  {ok, Accounts} = application:get_env(tba, twitter_accounts),
  {Name, Keys} = lists:keyfind(Name, 1, Accounts),
  #account_keys{api_key=keyfind(api_key, Keys),
                api_secret=keyfind(api_secret, Keys),
                access_token=keyfind(access_token, Keys),
                access_token_secret=keyfind(access_token_secret, Keys)}.

run(SearchWords, RelayPid) ->
  %URL = "https://stream.twitter.com/1.1/statuses/sample.json",
  URL = "https://stream.twitter.com/1.1/statuses/filter.json",
  % We get our keys from the tba.config configuration file.
  Keys = get_account_keys(account1),

  % Run our pipeline
  twitterminer_pipeline:build_link(twitter_print_pipeline(URL, Keys, SearchWords, RelayPid)).

%% @doc Create a pipeline that connects to twitter and
%% prints tweets.
twitter_print_pipeline(URL, Keys, SearchWords, RelayPid) ->

  Prod = twitter_producer(URL, Keys, SearchWords),

  % Pipelines are constructed 'backwards' - consumer is first, producer is last.
  [
    twitterminer_pipeline:consumer(
      fun(Msg, N) -> get_stuff(Msg, RelayPid), N+1 end, 0),
      %fun(Msg, N) -> my_print(Msg), N+1 end, 0),
    twitterminer_pipeline:map(
      fun decorate_with_id/1),
    twitterminer_pipeline:raw_transformer(
      fun(Sink, Sender) -> split_loop(Sink, Sender, <<>>) end),
    Prod].

%% @doc Create a pipeline producer that opens a connection
%% to a Twitter streaming API endpoint.
twitter_producer(URL, Keys, SearchWords) ->
  twitterminer_pipeline:producer(
    fun receive_tweets/1, {init, URL, Keys, SearchWords}).

% receive_tweets is used as the producer stage of the pipeline.
% Return values match those expected by twitterminer_pipeline:producer_loop/3.
% It also has to handle the 'terminate' message.
receive_tweets({init, URL, Keys, SearchWords}) ->

  % Twitter streaming API requires a persistent HTTP connection with an infinite stream. 
  % HTTP has not really been made for that, and the only way of cancelling your request
  % is to drop the whole TCP connection, which is why we spawn a separate ibrowse worker
  % for our connection. We use the ibrowse HTTP client.
  {ok, Pid} = ibrowse:spawn_link_worker_process(URL),

  % We use Single-user authentication for Twitter based on oauth 1.0a using
  % the erlang-oauth library. For more information, see the following links:
  % https://dev.twitter.com/oauth/overview/single-user
  % https://dev.twitter.com/oauth/overview/application-owner-access-tokens
  % http://stackoverflow.com/questions/19657582/using-the-twitter-api-with-an-app-using-app-oauth-keys-or-user-logging-in
  Consumer = {Keys#account_keys.api_key, Keys#account_keys.api_secret, hmac_sha1},
  AccessToken = Keys#account_keys.access_token,
  AccessTokenSecret = Keys#account_keys.access_token_secret,

  % Here we construct a set of signed params using OAuth.
  % Parameters 'delimited' and 'stall_warnings' are described here:
  % https://dev.twitter.com/streaming/overview/request-parameters
  % Our parsing of the stream later on depends on delimited=length.
  % I have never managed to receive a stall warning, but it would
  % be a good idea to handle them somehow (or at least log).
  SignedParams = oauth:sign("GET", URL, [{delimited, length}, {stall_warnings, true}, {track, SearchWords}, {language, "en"}], Consumer, AccessToken, AccessTokenSecret),
  % SignedParams = oauth:sign("GET", URL, [{delimited, length}, {stall_warnings, true}], Consumer, AccessToken, AccessTokenSecret),

  % We use stream_to self() to get the HTTP stream delivered to our process as individual messages.
  % We send the authentication parameters encoded in URI. I tried putting them in HTTP
  % headers (which seems to be the preferred method), but that didn't work.
  {ibrowse_req_id, RId} = ibrowse:send_req_direct(Pid, oauth:uri(URL,SignedParams),
    [], get, [], [{stream_to, {self(), once}}, {response_format, binary}], infinity),

  io:format("receive_tweets called~n"),
  receive
    terminate ->
      ibrowse:stream_close(RId),
      ibrowse:stop_worker_process(Pid),
      terminate;
    {ibrowse_async_headers, RId, "200", Headers} ->
      io:format("Got response with headers ~s.~n", [print_headers(Headers)]),
      {continue, {loop, Pid, RId}};
    {ibrowse_async_headers, RId, HCode, Headers} ->
      io:format("Got non-200 response (~s) with headers ~s.~n", [HCode, print_headers(Headers)]),
      % We could download the HTTP stream here as well.
      {error, {http_non_200, HCode, Headers}};
    {ibrowse_async_response, RId, {error, Reason}} ->
      {error, {http_error, Reason}};
    {ibrowse_async_response, RId, X} ->
      {error, {http_something_strange_happened, X}}
  end;
receive_tweets({loop, Pid, RId}) ->
  ibrowse:stream_next(RId),
  receive
    terminate ->
      ibrowse:stream_close(RId),
      ibrowse:stop_worker_process(Pid),
      terminate;
    {ibrowse_async_response, RId, {error, Reason}} ->
      {error, Reason};
    {ibrowse_async_response, RId, BodyPart} ->
      %io:format("Got chunk of ~w.~n", [length(binary_to_list(BodyPart))]),
      {message, {loop, Pid, RId}, BodyPart};
    {ibrowse_async_response_end, RId} ->
      io:format("Response end~n"),
      finished
  end.

% Extract the value of a key from a parsed JSON message.
extract(K, L) ->
  case lists:keyfind(K, 1, L) of
    {_, M} -> {found, M};
    false  -> not_found
  end.

% Parse the tweet JSON and extract the id, if present.
% https://dev.twitter.com/streaming/overview/messages-types
% We use jiffy for parsing JSON, which is an Erlang
% library with parsing implemented in C. A disadvantage
% of jiffy is that bugs in its C code can potentially
% bring down the whole Erlang VM. mochijson2 is
% a JSON parser written in Erlang, which is slower than jiffy,
% but does not have this safety issue.
decorate_with_id(B) ->
  case jiffy:decode(B) of
    {L} ->
      case lists:keyfind(<<"id">>, 1, L) of
        {_, I} -> {parsed_tweet, L, B, {id, I}};
        false  -> {parsed_tweet, L, B, no_id}
      end;
    _ -> {invalid_tweet, B}
  end.


get_stuff(Tweet, RelayPid) ->
	case Tweet of
		{invalid_tweet, B} -> io:format("failed to parse: ~s~n", [B]);
		{parsed_tweet, L, _B, _} ->
			gen_server:cast(RelayPid, {tweet, {{id,get_id(L)},{text, get_text(L)}, {timezone, get_timezone(L)}}})
	end.

get_id(Tweet) ->
	case extract(<<"id">>, Tweet) of
		{found, null} -> null;
		{found, Id} -> Id;
		not_found -> null
	end.

get_text(Tweet) ->
	case extract(<<"text">>, Tweet) of
		{found, null} -> null;
		{found, Text} -> Text;
		not_found -> null
	end.

get_timezone(Tweet) ->
	case extract(<<"user">>, Tweet) of
		{found, {U}} ->
			case extract(<<"time_zone">>, U) of
				{found, null} -> null;
				{found, TZ} -> TZ;
				not_found -> null
			end;
		not_found -> false
	end.

print_headers(C) ->
  lists:append(lists:map(fun ({X, Y}) -> lists:append([X, ":", Y, ", "]) end, C)).

% Get HTTP chunks and reassemble them into chunks that we get
% as a result of specifying delimited=length.
% https://dev.twitter.com/streaming/overview/processing
split_loop(Sink, Sender, Buffer) ->
%io:format("~p~n", [Buffer]),
  case pop_size(Buffer) of
    {size, N, Rest} ->
      case buffer_pop_n(Rest, N, Sender) of
        {pop, Chunk, NewBuf}   ->
          Sink ! {message, Chunk},
          receive next -> ok end,
          split_loop(Sink, Sender, NewBuf);
        {incomplete, Chunk}    -> Sink ! {error, {incomplete, Chunk}};
        {terminate, _Chunk}    -> Sink ! terminate;
        {error, Reason, Chunk} -> Sink ! {error, {Reason, Chunk}}
      end;
    {more, L} ->
      case buffer_pop_n(Buffer, L, Sender) of
        {pop, Chunk, NewBuf}   ->
          split_loop(Sink, Sender, <<Chunk/binary, NewBuf/binary>>);
        {incomplete, <<>>}     -> Sink ! finished;
        {incomplete, Chunk}    -> Sink ! {error, {incomplete, Chunk}};
        {terminate, _Chunk}    -> Sink ! terminate;
        {error, Reason, Chunk} -> Sink ! {error, {Reason, Chunk}}
      end;
    {newline} -> split_loop(Sink, Sender, <<>>)
  end.

% Get a chunk of N bytes from the buffer. If there is not enough data
% in the buffer, get more messages from the pipeline.
buffer_pop_n(B, N, Sender) ->
  if
    byte_size(B) < N -> 
      Sender ! next,
      receive
        {message, Part} ->
          Part2 = Part,
          buffer_pop_n(<<B/binary, Part2/binary>>, N, Sender);
        finished -> {incomplete, B};
        terminate -> {terminate, B};
        {error, Reason} -> {error, Reason, B}
      end;
    true -> {pop, binary:part(B, {0, N}), binary:part(B, {N, byte_size(B)-N})}
  end.

% We should also support discarding \r\n here
% (see 'blank lines' in https://dev.twitter.com/streaming/overview/messages-types)
pop_size(<<>>) -> {more, 1};
pop_size(<<"\r\n">>) -> {newline};
pop_size(<<A,Rest/binary>>) when A >= $0, A =< $9 ->
  pop_size((A - $0), 1, Rest).

pop_size(_N, L, <<>>) -> {more, L+1};
pop_size(_N, L, <<"\r">>) -> {more, L+2};
pop_size(N, L, <<A,Rest/binary>>) when A >= $0, A =< $9 ->
  pop_size(N * 10 + (A - $0), L+1, Rest);
pop_size(N, _L, <<"\r\n",Rest/binary>>) -> {size, N, Rest}.
