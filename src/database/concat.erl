-module(concat).
-behavior(gen_server).
-export([start/2]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start(User, SearchWords) ->
	gen_server:start_link(?MODULE, [User, SearchWords], []).

init([User, SearchWords]) ->
	%Retroactive concat
	KeyWords = string:tokens(SearchWords, ","),
	P = spawn(fun() -> loop(User, KeyWords, 10000) end),
	{ok, P}.
	%{ok, p}.

handle_call(_Request, _From, State) ->
	{reply, ok, State}.

handle_cast(_Message, State) ->
	concat({"a","follow"}, calendar:universal_time()),
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
			case Min rem 1 of
				0 ->
					[concat({User, KW}, Now) || KW <- KeyWords],
					loop(User, KeyWords, 14*60000);
				_ ->
					loop(User, KeyWords, 10000)
			end
	end.

concat(Bucket, DateTime) ->
	FifteenAgo = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 15 * 60))),
	ThirtyAgo = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 30 * 60))),
	{ok, Keys} = riakio:query_date_range(Bucket, ThirtyAgo, FifteenAgo),
	{ok, Result} = mapred_weight:mapred_weight(Keys),
	{User, Keyword} = Bucket,
	ConcatBucket = {User, Keyword, concat},
	{ok, Pid} = riakio:start_link(),
	riakio:put_concat(Pid, ConcatBucket, FifteenAgo, Result),
	riakio:delete_keys(Pid, Keys),
	riakio:close_link(Pid).
	
remove_seconds({Date,{Hour, Min, _}}) ->
	{Date,{Hour, Min, 0}}.

retroactive(Bucket) ->
	{ok, Keys} = riakio:query_date_range(Bucket, "0", "9", [{return_terms, true}]),
	%Sort and merge by indices
	%For each time period, concat
	ok.%retroconcat(Bucket, TimeList).

retroconcat(Bucket, [Time | Tail]) ->
	ok.
