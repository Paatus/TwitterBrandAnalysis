-module(concat).
-behavior(gen_server).
-export([start/2, concat/3, retroconcat/2, to_interval/1, datestring_to_datetime/1]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start(User, SearchWords) ->
	gen_server:start_link(?MODULE, [User, SearchWords], []).

init([User, SearchWords]) ->
	Keywords = string:tokens(string:to_lower(SearchWords), ","),
	[spawn_link(?MODULE, retroconcat, [User, KW]) || KW <- Keywords],
	P = spawn_link(fun() -> loop(User, Keywords, 60000) end),
	{ok, P}.
	%{ok, p}.

handle_call(_Request, _From, State) ->
	{reply, ok, State}.

handle_cast(_Message, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, _State) ->
	ok.

code_change(_OldVsn, State, _) ->
	{ok, State}.

loop(User, Keywords, WaitTime) ->
	receive
		{Pid, stop} ->
			Pid ! {ok, stopping}
		after WaitTime ->
			{_,{_,Min,_}} = Now = calendar:universal_time(),
			case Min rem 5 of
				0 ->
					[spawn_link(?MODULE, concat, [User, KW, Now]) || KW <- Keywords],
					loop(User, Keywords, 240000);
				_ ->
					loop(User, Keywords, 5000)
			end
	end.

concat(User, Keyword, DateTime) ->
	M0 = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 0 * 60))),
	M5 = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 5 * 60))),
	io:format("Concatenating ~p range ~s - ~s~n", [{User, Keyword}, M5, M0]),
	{ok, Keys} = riakio:query_date_range({User, Keyword}, M5, M0),
	{ok, MapResult} = mapred_weight:mapred_weight(Keys),
	{ok, {_, [{_, Words}, {_, Tags}, {_, Users}]}} = mapred_tokens:mapred_tokens(Keys),
%	{ok, Amounts} = mapred_count:mapred_count(Keys),
	MapBucket = {User, Keyword, worldmap},
	WordBucket = {User, Keyword, words},
	TagBucket = {User, Keyword, hashtags},
	UserBucket = {User, Keyword, users},
%	AmountBucket = {User, Keyword, amount},
	{ok, Pid} = riakio:start_link(),
	[riakio:put(
		Pid, MapBucket, {M0, Location}, Weight,
		[{{binary_index,"datetime"},[list_to_binary(M0)]},
		{{binary_index,"location"},[riakio:to_binary(Location)]}])
		|| {Location, Weight} <- MapResult],
	riakio:put(
		Pid, WordBucket, M0, limit_list(100, Words),
		[{{binary_index,"datetime"},[list_to_binary(M0)]}]),
	riakio:put(
		Pid, TagBucket, M0, limit_list(50, Tags),
		[{{binary_index,"datetime"},[list_to_binary(M0)]}]),
	riakio:put(
		Pid, UserBucket, M0, limit_list(50, Users),
		[{{binary_index,"datetime"},[list_to_binary(M0)]}]),
%	riakio:put(
%		Pid, AmountBucket, M0, Amounts,
%		[{{binary_index,"datetime"},[list_to_binary(M0)]}]),
	
	%store some sample tweets
	riakio:delete_keys(Pid, Keys),
	riakio:close_link(Pid).

retroconcat(User, Keyword) ->
	{ok, Pid} = riakio:start_link(),
	Bucket = term_to_binary({User, Keyword}),
	{ok, {_, _, Result, _}} = riakc_pb_socket:get_index_range(
		Pid,
		Bucket,
		{binary_index, "datetime"},
		list_to_binary("0"), list_to_binary("9"),
		[{return_terms, true}]
	),
	riakio:close_link(Pid),
	case Result of
		undefined ->
			ok;
		TermList ->
			TimePeriods = lists:delete(to_interval(calendar:universal_time()), lists:usort([to_interval(datestring_to_datetime(binary_to_list(Datestring))) || {Datestring, _} <- TermList])),
			[concat(User, Keyword, P) || P <- TimePeriods]
	end,
	ok.
	
remove_seconds({Date, {Hour, Min, _}}) ->
	{Date,{Hour, Min, 0}}.

limit_list(N, List) when N >= length(List) ->
	List;
limit_list(N, List) ->
	{LimitList, _} = lists:split(N, List),
	LimitList.

datestring_to_datetime(DateString) ->
	[Date, Time] = string:tokens(DateString, " "),
	[Year, Mon, Day] = string:tokens(Date, "-"),
	[Hour, Min, Sec] = string:tokens(Time, ":"),
	{{list_to_integer(Year), list_to_integer(Mon), list_to_integer(Day)}, {list_to_integer(Hour), list_to_integer(Min), list_to_integer(Sec)}}.

to_interval({Date, {Hour, Min, _}}) ->
	calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds({Date, {Hour, (Min div 5) * 5, 0}}) + 300).
