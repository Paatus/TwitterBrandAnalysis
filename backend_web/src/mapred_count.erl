-module(mapred_count).
-export([mapred/2, map_count/3, red_count/2]).

mapred(Pid, Keys) ->
	{ok, [{_, [Result]}]} = riakc_pb_socket:mapred(
		Pid,
		Keys,
		[
			{map, {modfun, ?MODULE, map_count}, none, false},
			{reduce, {modfun, ?MODULE, red_count}, none, true}
		]
	),
	dict:to_list(Result).

map_count(RiakObject, _, _) ->
	[dict:from_list([I || I <- binary_to_term(riak_object:get_value(RiakObject))])].

red_count(Input, _) ->
	[lists:foldl(
		fun(Tag, Acc) ->
			dict:merge(
				fun(_, Amount1, Amount2) ->
					Amount1 + Amount2
				end,
				Tag,
				Acc
			)
		end,
		dict:new(),
		Input
	)].

