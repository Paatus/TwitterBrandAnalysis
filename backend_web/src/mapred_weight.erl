-module(mapred_weight).

-export([mapred/2, map_weight/3, red_weight/2]).

mapred(Pid, Keys) ->
	{ok, [{_, [R]}]} = riakc_pb_socket:mapred(
                Pid,
                Keys,
                [{map, {modfun, ?MODULE, map_concat}, none, false},
		{reduce, {modfun, ?MODULE, red_weight}, none, true}]
        ),
        {ok, dict:to_list(R)}.

map_weight(RiakObject, _, _) ->
	{_, Location} = binary_to_term(riak_object:key(RiakObject)),
	[dict:from_list([{Location,binary_to_term(riak_object:get_value(RiakObject))}])].

red_weight(Input, _) ->
	[lists:foldl(fun(T, Acc) -> 
		dict:merge(fun(_, {W1, A1}, {W2, A2}) -> {(W1*A1+W2*A2)/(A1+A2),A1+A2} end,
			T, Acc)
		end,
		dict:new(),
		Input)].

