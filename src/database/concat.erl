-module(concat).
-behavior(gen_server).
-export([start/2, concat/4, concat_worldmap/3, retroconcat/2]).
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
					Pid = spawn_link(?MODULE, concat_worldmap, [User, Keywords, Now]),
					[spawn_link(?MODULE, concat, [User, KW, Now, Pid]) || KW <- Keywords],
					
					loop(User, Keywords, 240000);
				_ ->
					loop(User, Keywords, 5000)
			end
	end.

concat(User, Keyword, DateTime, MapconcatPid) ->
	M0 = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 0 * 60))),
	M5 = riakio:format_date(remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(DateTime) - 5 * 60))),
	io:format("Concatenating ~p range ~s - ~s~n", [{User, Keyword}, M5, M0]),
	{ok, Keys} = riakio:query_date_range({User, Keyword}, M5, M0),
	{ok, MapResult} = mapred_weight:mapred_weight(Keys),
	{ok, {_, [{_, Words}, {_, Tags}, {_, Users}]}} = mapred_tokens:mapred_tokens(Keys),
	{ok, Amounts} = mapred_count:mapred_amount(Keys),
	MapBucket = {User, Keyword, worldmap},
	WordBucket = {User, Keyword, words},
	TagBucket = {User, Keyword, hashtags},
	UserBucket = {User, Keyword, users},
	AmountBucket = {User, Keyword, amount},
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
	riakio:put(
		Pid, AmountBucket, M0, Amounts,
		[{{binary_index,"datetime"},[list_to_binary(M0)]}]),
%	store some sample tweets here?
	riakio:delete_keys(Pid, Keys),
	riakio:close_link(Pid),
	case MapconcatPid of
		none -> ok;
		P -> P ! Keyword
	end.

concat_worldmap(User, Keywords, DateTime) ->
	Start = riakio:format_date(remove_seconds(DateTime)),
	End = riakio:format_date(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(remove_seconds(DateTime)) + 1)),
	Results = [receive K ->
		{ok, Mapkeys} = riakio:query_date_range({User, K, worldmap}, Start, End),
		{ok, Wordkeys} = riakio:query_date_range({User, K, words}, Start, End),
		{ok, Hashkeys} = riakio:query_date_range({User, K, hashtags}, Start, End),
		{ok, Userkeys} = riakio:query_date_range({User, K, users}, Start, End),
		{ok, Amountkeys} = riakio:query_date_range({User, K, amount}, Start, End),
		[Mapkeys, Wordkeys, Hashkeys, Userkeys, Amountkeys]
		end || K <- Keywords],
	io:format("Concatenating ~p ~s~n", [{User}, Start]),
	[Mapkeys, Wordkeys, Tagkeys, Userkeys, Amountkeys] = lists:foldl(fun([A1,B1,C1,D1,E1], [A2,B2,C2,D2,E2]) -> [A1++A2, B1++B2, C1++C2, D1++D2, E1++E2] end, [[],[],[],[],[]], Results),
	{ok, MapResult} = mapred_weight:mapred_concat_weight(Mapkeys),
	{ok, Words} = mapred_count:mapred_count(Wordkeys),
	{ok, Tags} = mapred_count:mapred_count(Tagkeys),
	{ok, Users} = mapred_count:mapred_count(Userkeys),
	{ok, Amounts} = mapred_count:mapred_count(Amountkeys),
	{ok, Pid} = riakio:start_link(),
	[riakio:put(
		Pid, {User, worldmap}, {Start, Location}, Weight,
		[{{binary_index,"datetime"},[list_to_binary(Start)]},
		{{binary_index,"location"},[riakio:to_binary(Location)]}])
		|| {Location, Weight} <- MapResult],
	riakio:put(
		Pid, {User, words}, Start, limit_list(100, Words),
		[{{binary_index,"datetime"},[list_to_binary(Start)]}]),
	riakio:put(
		Pid, {User, hashtags}, Start, limit_list(50, Tags),
		[{{binary_index,"datetime"},[list_to_binary(Start)]}]),
	riakio:put(
		Pid, {User, users}, Start, limit_list(50, Users),
		[{{binary_index,"datetime"},[list_to_binary(Start)]}]),
	riakio:put(
		Pid, {User, amount}, Start, Amounts,
		[{{binary_index,"datetime"},[list_to_binary(Start)]}]),
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
			[concat(User, Keyword, P, none) || P <- TimePeriods]
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
