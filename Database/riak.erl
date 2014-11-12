-module(riak).

-export([put_tweet/3, fetch/2, query_date_range/3, query_location/2, intersect/2, concat/2]).

start_link() -> start_link("127.0.0.1", 8087).
start_link(Ip, Port) -> riakc_pb_socket:start_link(Ip, Port).

close_link(Pid) -> riakc_pb_socket:stop(Pid).

put_tweet(Bucket, Key, {tweet, Value}) ->
	{_,{_, Weight},{_, Location}} = Value,
	BinDate = list_to_binary(format_date(calendar:universal_time())),
	BinLocation = to_binary(Location),
	Weight,%BinWeight = to_binary(Weight),
	put(Bucket, Key, Value, [
		{{binary_index,"datetime"}, [BinDate]},
		{{binary_index,"location"}, [BinLocation]}%,
		%{{binary_index,"weight"}, [BinWeight]}
	]).

put(Bucket, Key, Value, Indices) ->
	B = to_binary(Bucket),
	K = to_binary(Key),
	V = term_to_binary(Value),
	O = riakc_obj:new(B, K, V),
	M1 = riakc_obj:get_update_metadata(O),
	M2 = riakc_obj:set_secondary_index(M1, Indices),
	OI = riakc_obj:update_metadata(O, M2),
	{ok, Pid} = start_link(),
	riakc_pb_socket:put(Pid, OI),
	close_link(Pid).

fetch(Bucket, Key) ->
	{ok, Pid} = start_link(),
	B = to_binary(Bucket),
	K = to_binary(Key),
	{ok, Fetch} = riakc_pb_socket:get(Pid, B, K),
	Value = riakc_obj:get_value(Fetch),
	close_link(Pid),
	{ok, binary_to_term(Value)}.

query_date_range(Bucket, Start, End) ->
	{ok, Pid} = start_link(),
	B = to_binary(Bucket),
	{ok, Result} = riakc_pb_socket:get_index_range(
		Pid,
		B,
		{binary_index, "datetime"},
		to_binary(Start), to_binary(End)
		%,[{return_terms, true}]
	),
	close_link(Pid),
	{_,Keys,_,_} = Result,
	BucketKeys = [{B, K} || K <- Keys],
	{ok, BucketKeys}.

query_location(Bucket, Location) ->
	{ok, Pid} = start_link(),
	B = to_binary(Bucket),
	{ok, Result} = riakc_pb_socket:get_index(
		Pid,
		B,
		{binary_index, "location"},
		to_binary(Location)
	),
	{_,Keys,_,_} = Result,
	BucketKeys = [{B, K} || K <- Keys],
	{ok, BucketKeys}.

to_binary(Input) when is_binary(Input) -> Input;
to_binary(Input) when is_list(Input) -> list_to_binary(Input);
to_binary(Input) -> term_to_binary(Input).

format_date({{Year,Month,Day},{Hour,Minute,Second}}) -> 
	io_lib:format("~4.10.0B-~2.10.0B-~2.10.0B ~2.10.0B:~2.10.0B:~2.10.0B", [Year,Month,Day,Hour,Minute,Second]).

intersect(List1, List2) ->
	sets:to_list(sets:intersection(sets:from_list(List1),sets:from_list(List2))).

concat(StartDate, EndDate) ->
	Start = format_date(StartDate),
	End = format_date(EndDate),
	{ok, Keys} = query_date_range("gigabucket", Start, End),
	{ok, Result} = mapred_weight:mapred_weight(Keys),

	{ok, Pid} = start_link(),
        put_concat(Pid, End, Result),
	delete_list(Pid, Keys),
        close_link(Pid).

put_concat(Pid, _, []) -> ok;
put_concat(Pid, DateTime, [Value|Tail]) ->
	{Location, Weight} = Value,
	put("concat", {DateTime, Location}, Weight, [
		{{binary_index,"datetime"},[to_binary(DateTime)]},
		{{binary_index,"location"},[to_binary(Location)]}
	]),

	put_concat(Pid, DateTime, Tail).

delete_list(Pid, []) -> ok;
delete_list(Pid, [BKPair|Tail]) ->
	{Bucket, Key} = BKPair,
	riakc_pb_socket:delete(Pid, to_binary(Bucket), to_binary(Key)),
	delete_list(Pid, Tail).
