-module(mapred_count).
-export([mapred_count/1, map_count/3, red_count/2]).

mapred_count(Keys) ->
	{ok, Pid} = riakio:start_link(),
	{ok, [{_, [R]}]} = riakc_pb_socket:mapred(
                Pid,
		Keys,
		[{map, {modfun, ?MODULE, map_count}, none, false},
		{reduce, {modfun, ?MODULE, red_count}, none, true}]
        ),
        riakio:close_link(Pid),
        {ok, R}.
	%Output of this should be {ok, [{positive, X}, {neutral, Y}, {negative, Z}]}

map_count(RiakObject, _, _) ->
	{{text,T},{weight,W},{timezone,TZ}} = binary_to_term(riak_object:get_value(RiakObject)),
	[result_of_map].

red_count(Input, _) ->
	[result_of_reduce].

