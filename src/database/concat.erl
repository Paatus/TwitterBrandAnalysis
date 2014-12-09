-module(concat).
-behavior(gen_server).
-export([start/2, concat/2]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start(User, SearchWords) ->
	gen_server:start_link(?MODULE, [User, SearchWords], []).

init([User, SearchWords]) ->
	%Retroactive concat
	KeyWords = string:tokens(SearchWords, ","),
	P = spawn(fun() -> loop(User, KeyWords, 1000) end),
	{ok, P}.
	%{ok, p}.

handle_call(_Request, _From, State) ->
	{reply, ok, State}.

handle_cast(_Message, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, State) ->
	exit(State, stop),
	ok.

code_change(_OldVsn, State, _) ->
	{ok, State}.

loop(User, KeyWords, WaitTime) ->
	receive
		{Pid, stop} ->
			Pid ! {ok, stopping}
		after WaitTime ->
			{_,{_,Min,_}} = Now = calendar:universal_time(),
			case Min rem 5 of
				0 ->
					[spawn_link(?MODULE, concat, [{User, KW}, Now]) || KW <- KeyWords],
					loop(User, KeyWords, 240000);
				_ ->
					loop(User, KeyWords, 1000)
			end
	end.

concat(Bucket, DateTime) ->
	M0 = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 0 * 60))),
	M5 = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 5 * 60))),
	io:format("Concatenating ~p range ~s - ~s~n", [Bucket, M5, M0]),
	{ok, Keys} = riakio:query_date_range(Bucket, M5, M0),
	{ok, MapResult} = mapred_weight:mapred_weight(Keys),
	{ok, {_, [{_, Words}, {_, Tags}, {_, Users}]}} = mapred_tokens:mapred_tokens(Keys),
%	{ok, Amounts} = mapred_count:mapred_count(Keys),
	{User, Keyword} = Bucket,
	MapBucket = {User, Keyword, worldmap},
	WordBucket = {User, Keyword, words},
	TagBucket = {User, Keyword, hashtags},
	UserBucket = {User, Keyword, users},
%	AmountBucket = {User, Keyword, amount},
	{ok, Pid} = riakio:start_link(),
	[riakio:put(
		Pid, MapBucket, {M0, Location}, Weight,
		[{{binary_index,"datetime"},[riakio:to_binary(M0)]},
		{{binary_index,"location"},[riakio:to_binary(Location)]}])
		|| {Location, Weight} <- MapResult],
	riakio:put(
		Pid, WordBucket, M0, limit_list(100, Words),
		[{{binary_index,"datetime"},[riakio:to_binary(M0)]}]),
	riakio:put(
		Pid, TagBucket, M0, limit_list(50, Tags),
		[{{binary_index,"datetime"},[riakio:to_binary(M0)]}]),
	riakio:put(
		Pid, UserBucket, M0, limit_list(50, Users),
		[{{binary_index,"datetime"},[riakio:to_binary(M0)]}]),
%	riakio:put(
%		Pid, AmountBucket, M0, Amounts,
%		[{{binary_index,"datetime"},[riakio:to_binary(M0)]}]),
	riakio:delete_keys(Pid, Keys),
	riakio:close_link(Pid).
	
remove_seconds({Date,{Hour, Min, _}}) ->
	{Date,{Hour, Min, 0}}.

limit_list(N, List) when N >= length(List) ->
	List;
limit_list(N, List) ->
	{LimitList, _} = lists:split(N, List),
	LimitList.

retroactive(Bucket) ->
	{ok, Keys} = riakio:query_date_range(Bucket, "0", "9", [{return_terms, true}]),
	%Sort and merge by indices
	%For each time period, concat
	ok.%retroconcat(Bucket, TimeList).

%retroconcat(Bucket, [Time | Tail]) ->
%	ok.
