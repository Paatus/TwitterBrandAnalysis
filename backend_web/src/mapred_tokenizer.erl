-module(mapred_tokenizer).

-export([mapred_tokens/1 ,map_tokens/3, red_tokens/2]).

mapred_tokens(Keys) ->
    {ok, Pid} = tba_riakdb:start_link(),
    {ok,[{1,[T]}]} = riakc_pb_socket:mapred(
        Pid,
        Keys,
        [{map, {modfun, mapred_tokenizer, map_tokens}, none, false},
         {reduce, {modfun, mapred_tokenizer, red_tokens}, none, true}]
        ),
    tba_riakdb:close_link(Pid),
    {ok, dict:to_list(T)}.

map_tokens(RiakObject, _, _) ->
    {tweet,{_,{text, Text},_,_}} = binary_to_term(riak_object:get_value(RiakObject)),
        FinalText = prepare_string_tokenizing(Text),
        [lists:foldl(fun (T, Acc) -> 
		dict:update_counter(T, 1, Acc)
	 end,
	 dict:new(), [ X || X <-  string:tokens(FinalText,"\s\t\n!.,\"()[]{}"), length(X) > 3 andalso not (hd(X) =:= $@)] ) ].

red_tokens(Input, _) ->
    [lists:foldl(fun(T,Acc) -> dict:merge( fun(_Key, Value1, Value2) -> Value1 + Value2 end, T, Acc)  end ,dict:new(),Input)].

prepare_string_tokenizing(Text) ->
    Text1 = binary_to_list(Text),
    Text2 = re:replace(Text1,"((\/\/)?t\.co|(www\.|(https?:\/\/)(www\.)?)([a-zA-Z\.-]+)(\.([a-zA-Z0-9]{2,6}))+)((\/[a-zA-Z0-9\.]*)\/?)*","",[global,{return,list}]),
    re:replace(Text2," \d+ "," ",[global,{return,list}]).
