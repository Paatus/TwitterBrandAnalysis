-module(message_relay).
-behaviour(gen_server).
-export([start/2, testTweet/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start(User, SearchWords) ->
	gen_server:start_link(?MODULE, [User, SearchWords], []).

init(Params) ->
	{ok, Params}.

handle_call(_Request, _From, State) ->
	{reply, ok, State}.

handle_cast({tweet, Tweet}, State) ->
	%io:format("Received tweet ~p~n", [State]),
	[User, SearchWords] = State,
        processTweet(User, SearchWords, Tweet),
	{noreply, State};
handle_cast(_Message, State) ->
	%io:format("Received '~p' with state '~p'~n", [Message, State]),
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, _State) ->
	ok.

code_change(_OldVsn, State, _) ->
	{ok, State}.

%Test function to quickly check if things are working
testTweet() ->
  processTweet("Faget","Iphone,phone,apple,uphone",{
    {id, "666"},
    {text, <<"I bought me a new mobile apple Phone but it was bad, I am now sadness. (´•ω•̥`)">>},
    {timezone, "Irkutsk"}
  }).

processTweet(User, SearchWords, {{_, Tid},{_, TweetBody},{_, Timezone}}) ->
	%io:fwrite("~p~n", [TweetBody]),

	Keywords = string:tokens(SearchWords, ","),
	%io:fwrite("keywords: ~p~n", [Keywords]),
  
	UsedKeywords = findTweetBrand(Keywords, binary_to_list(TweetBody)),  %
	%io:fwrite("Used keywords: ~p~n", [UsedKeywords]),

	NlpWeight = pyerlTest:pyProcess(TweetBody),
	%NlpWeight = 1,			%test without NLP
	
	Wtweet = {tweet, {{text, TweetBody},{weight, NlpWeight},{timezone, Timezone}}},
	
	%File = SearchWords ++ ".txt",
	%exptweet:print_to_file(exptweet:format(TweetBody), File).
	
	[riakio:put_tweet({User, X}, Tid, Wtweet) || X <- UsedKeywords].
 	%[io:format("Sent to Riak: ~p, ~p, ~p~n",[{User, X}, Tid, Wtweet]) || X <- UsedKeywords].

%---------Todo---------
%Also send the tweet to the frontend


%Which of the search words exist in the tweet?
findTweetBrand(Brands, TweetText) ->
  [X || X <- Brands, 0 < string:str(string:to_lower(TweetText), string:to_lower(X))].

