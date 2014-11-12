-module(tba_riakdb).

-export([put/3, fetch/2, query_date_range/3, query_location/2, mapred_weight/1, map_weight/3, red_weight/2, quickmr/0]).
-export([start_link/0,close_link/1]).

start_link() -> start_link("127.0.0.1", 8087).
start_link(Ip, Port) -> riakc_pb_socket:start_link(Ip, Port).

close_link(Pid) -> riakc_pb_socket:stop(Pid).

put(Bucket, Key, Value) ->
	{ok, Pid} = start_link(),
	B = to_binary(Bucket),
	K = to_binary(Key),
	V = term_to_binary(Value),
	{{Year,Month,Day},{Hour,Minute,Second}} = calendar:local_time(),
	BinDate = list_to_binary(io_lib:format("~4.10.0B-~2.10.0B-~2.10.0B ~2.10.0B:~2.10.0B:~2.10.0B", [Year,Month,Day,Hour,Minute,Second])),
	{tweet,{_,_,_,{_,Location}}} = Value,
	BinLocation = to_binary(Location),
	O = riakc_obj:new(B, K, V),
	M1 = riakc_obj:get_update_metadata(O),
	M2 = riakc_obj:set_secondary_index(M1,
		[
			{{binary_index,"datetime"}, [BinDate]},
			{{binary_index,"location"}, [BinLocation]}
		]),
	OI = riakc_obj:update_metadata(O, M2),
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

mapred_weight(Keys) ->
	{ok, Pid} = start_link(),
	{ok, [{1, [R]}]} = riakc_pb_socket:mapred(
		Pid,
		Keys,
		[{map, {modfun, tba_riakdb, map_weight}, none, false},
		{reduce, {modfun, tba_riakdb, red_weight}, none, true}]
	),
	close_link(Pid),
	{ok, dict:to_list(R)}.

map_weight(RiakObject, _, _) ->
	{tweet,{_,_,{weight,W},{timezone,TZ}}} = binary_to_term(riak_object:get_value(RiakObject)),
	[dict:from_list([{TZ, {W, 1}}])].

red_weight(Input, _) ->
	[lists:foldl(fun(T, Acc) -> 
		dict:merge(fun(_, {W1, A1}, {W2, A2}) -> {(W1*A1+W2*A2)/(A1+A2),A1+A2} end,
			T, Acc)
		end,
		dict:new(),
		Input)].

to_binary(Input) ->
	if
		is_binary(Input) -> Input;
		is_list(Input) -> list_to_binary(Input);
		true -> term_to_binary(Input)
	end.

quickmr() ->
	{ok, Keys} = query_date_range("gigabucket","0","9"),
	{ok, Result} = mapred_weight(Keys),
	io:format("~p~n",[Result]),
	ok.
	
