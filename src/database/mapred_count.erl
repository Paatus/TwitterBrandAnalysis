-module(mapred_count).
-export([mapred_count/1, mapred_amount/1, map_count/3, map_amount/3, red_count/2, red_sort/2]).

mapred_count(Keys) ->
	mapred(
		Keys,
		[{map, {modfun, ?MODULE, map_count}, none, false},
		{reduce, {modfun, ?MODULE, red_count}, none, false}],
		{reduce, {modfun, ?MODULE, red_sort}, none, true}]
	).

mapred_amount(Keys) ->
	mapred(
		Keys,
		[{map, {modfun, ?MODULE, map_amount}, none, false},
		{reduce, {modfun, ?MODULE, red_count}, none, false}],
		{reduce, {modfun, ?MODULE, red_sort}, none, true}]
	).

mapred(Keys, Phases) ->
	{ok, Pid} = riakio:start_link(),
	{ok, [{_, R}]} = riakc_pb_socket:mapred(
		Pid,
		Keys,
		Phases
        ),
        riakio:close_link(Pid),
        {ok, R}.

map_count(RiakObject, _, _) ->
	[dict:from_list([I || I <- binary_to_term(riak_object:get_value(RiakObject))])].

map_amount(RiakObject, _, _) ->
	{_, {weight,W}, _} = binary_to_term(riak_object:get_value(RiakObject)),
	[dict:from_list([{
		case W of
			1 ->
				positive;
			0.5 ->
				neutral;
			0 ->
				negative
		end, 1}])].

red_count(Input, _) ->
	[lists:foldl(fun(W, Acc) ->
		dict:merge(fun(_, X, Y) -> X + Y end,
			W, Acc)
		end,
		dict:new(),
		Input)].

red_sort([Input], _) ->
	L = dict:to_list(Input),
	lists:sort(fun({_,V1},{_,V2}) -> V1 < V2 end, L). 
