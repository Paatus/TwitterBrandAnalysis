-module(mapred_weight).

-export([mapred_weight/1, mapred_concat_weight/1, map_weight/3, map_concat/3, red_weight/2]).

mapred_weight(Keys) ->
	mapred(
		Keys,
		[{map, {modfun, ?MODULE, map_weight}, none, false},
		{reduce, {modfun, ?MODULE, red_weight}, none, true}]
	).

mapred_concat_weight(Keys) ->
	mapred(
		Keys,
		[{map, {modfun, ?MODULE, map_concat}, none, false},
		{reduce, {modfun, ?MODULE, red_weight}, none, true}]
	).

mapred(Keys, Phases) ->
	{ok, Pid} = riak:start_link(),
	{ok, [{_, [R]}]} = riakc_pb_socket:mapred(
                Pid,
                Keys,
                Phases
        ),
        riak:close_link(Pid),
        {ok, dict:to_list(R)}.

map_weight(RiakObject, _, _) ->
	{_,{weight,W},{timezone,TZ}} = binary_to_term(riak_object:get_value(RiakObject)),
	[dict:from_list([{TZ, {W, 1}}])].

map_concat(RiakObject, _, _) ->
	{_, Location} = binary_to_term(riak_object:key(RiakObject)),
	[dict:from_list([{Location,binary_to_term(riak_object:get_value(RiakObject))}])].

red_weight(Input, _) ->
	[lists:foldl(fun(T, Acc) -> 
		dict:merge(fun(_, {W1, A1}, {W2, A2}) -> {(W1*A1+W2*A2)/(A1+A2),A1+A2} end,
			T, Acc)
		end,
		dict:new(),
		Input)].

