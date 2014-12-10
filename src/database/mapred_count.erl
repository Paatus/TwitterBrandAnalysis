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
        {ok, dict:to_list(R)}.
	%Output of this should be {ok, [{positive, X}, {neutral, Y}, {negative, Z}]}

map_count(RiakObject, _, _) ->
	{_,{weight,W},_} = binary_to_term(riak_object:get_value(RiakObject)),
	[dict:from_list([
		case W of
			1 ->
				positive;
			0.5 ->
				neutral;
			0 ->
				negative
		end, 1])].
	

red_count(Input, _) ->
	[lists:foldl(fun(W, Acc)->
					dict:merge(fun(_,X,Y)-> X+Y end,
						W, Acc)
				end,
				dict:new(),
				Input)].

