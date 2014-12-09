-module(mapred_tokens).
-compile(export_all).
%-export([mapred_tokens/1]).

mapred_tokens_user(User, From, To) ->
    {ok, List} = riakio:fetch("AccountInfo", User),
    Keys = prepare_keys([extract_data(riakio:query_date_range({User, L}, From, To)) || L <- List]),
    %io:format("~s", Keys),
    {ok, T} = mapred_tokens(Keys),
    T.  

extract_data(Item) ->
    {ok, Data} = Item,
    Data.

prepare_keys(L) ->
    keyprep(L, []).

keyprep([], Acc) -> Acc;
keyprep([H|T], Acc) ->
    keyprep(T, Acc ++ H).

mapred_tokens(Keys) ->
    {ok, Pid} = riakio:start_link(),
    Ret = case riakc_pb_socket:mapred(
        Pid,
        Keys,
        [{map, {modfun, ?MODULE, map_tokens}, none, false},
         {reduce, {modfun, ?MODULE, red_tokens}, none, false},
         {reduce, {modfun, ?MODULE, red_limit_tokens}, none, false},
         {reduce, {modfun, ?MODULE, red_sort_and_to_struct}, none, true}]
        ) of
    {error, E} -> {error, E};
    {ok,[{_N,[T]}]} ->
        riakio:close_link(Pid),
        {ok, T}
    end,
	Ret.

map_tokens(RiakObject, _, _) ->
    {{text, Text},_,_} = binary_to_term(riak_object:get_value(RiakObject)),
        FinalText = prepare_string_tokenizing(Text),
        [lists:foldl(fun (T, Acc) -> 
		dict:update_counter(T, 1, Acc)
	 end,
	 dict:new(), [ string:to_lower(X) || X <-  string:tokens(FinalText,"\s\t\n!.,\"()[]{}"), length(X) > 3])].

red_tokens(Input, _) ->
    [lists:foldl(fun(T,Acc) -> dict:merge( fun(_Key, Value1, Value2) -> Value1 + Value2 end, T, Acc)  end ,dict:new(),Input)].

red_limit_tokens([Input], _) ->
    [dict:filter(fun(_Key,Value) -> Value >= 5 end,Input)].

get_hashtags([Input], _) ->
	{ok, Pattern} = re:compile("#[a-zA-Z0-9\-_]*"),
	dict:filter(fun(Key, _Val) ->
		case re:run(Key, Pattern, [{capture, all, list}]) of
			{match, _} -> true;
			_ -> false
		end
	end, Input).

get_users([Input], _) ->
	{ok, Pattern} = re:compile("@[a-zA-Z0-9\-_]*"),
	dict:filter(fun(Key, _Val) ->
		case re:run(Key, Pattern, [{capture, all, list}]) of
			{match, _} -> true;
			_ -> false
		end
	end, Input).

get_words([Input], _) ->
	{ok, Pattern} = re:compile("[@#].*"),
	dict:filter(fun(Key, _Val) ->
		case re:run(Key, Pattern, [{capture, all, list}]) of
			{match, _} -> false;
			_ -> true
		end
	end, Input).
	
red_sort_and_to_struct([Input], _) ->
    [{struct,[
	{words, [{list_to_binary(A),B} || {A,B} <- lists:sort(fun({_,A},{_,B}) -> A >= B end, dict:to_list(get_words([Input], none)))]},
	{hashtags, [{list_to_binary(A),B} || {A,B} <- lists:sort(fun({_,A},{_,B}) -> A >= B end, dict:to_list(get_hashtags([Input], none)))]},
	{users, [{list_to_binary(A),B} || {A,B} <- lists:sort(fun({_,A},{_,B}) -> A >= B end, dict:to_list(get_users([Input], none)))]}
     ]}].

prepare_string_tokenizing(Text) ->
    Text1 = binary_to_list(Text),
    Text2 = re:replace(Text1,"((\/\/)?t\.co|(www\.|(https?:\/\/)(www\.)?)([a-zA-Z\.-]+)(\.([a-zA-Z0-9]{2,6}))+)((\/[a-zA-Z0-9\.]*)\/?)*","",[global,{return,list}]),
    re:replace(Text2," \d+ "," ",[global,{return,list}]).
