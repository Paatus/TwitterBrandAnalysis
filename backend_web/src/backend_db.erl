-module(backend_db).

-export([start_link/0, close_link/1, fetch/2, put/4, format_date/1]).

start_link() ->
    start_link("127.0.0.1", 8087).
start_link(Ip, Port) ->
    riakc_pb_socket:start_link(Ip, Port).

close_link(Pid) ->
    riakc_pb_socket:stop(Pid).

fetch(Bucket, Key) ->
    {ok, Pid} = start_link(),
	B = to_binary(Bucket),
	K = to_binary(Key),
    case riakc_pb_socket:get(Pid, B, K) of
	    {ok, Fetch} -> Value = riakc_obj:get_value(Fetch),
                       close_link(Pid),
                       {ok, binary_to_term(Value)};
        _ ->
                       close_link(Pid),
                       error
    end.        

put(Bucket, Key, Value, Indices) ->
	{ok, Pid} = start_link(),
	put(Pid, Bucket, Key, Value, Indices),
	close_link(Pid).

put(Pid, Bucket, Key, Value, []) ->
	B = to_binary(Bucket),
	K = to_binary(Key),
	V = term_to_binary(Value),
	O = riakc_obj:new(B, K, V),
	riakc_pb_socket:put(Pid, O);
put(Pid, Bucket, Key, Value, Indices) ->
	B = to_binary(Bucket),
	K = to_binary(Key),
	V = term_to_binary(Value),
	O = riakc_obj:new(B, K, V),
	M1 = riakc_obj:get_update_metadata(O),
	M2 = riakc_obj:set_secondary_index(M1, Indices),
	OI = riakc_obj:update_metadata(O, M2),
	riakc_pb_socket:put(Pid, OI).

to_binary(Input) when is_binary(Input) -> Input;
to_binary(Input) when is_list(Input) -> list_to_binary(Input);
to_binary(Input) -> term_to_binary(Input).

format_date({{Year,Month,Day},{Hour,Minute,Second}}) -> 
        io_lib:format("~4.10.0B-~2.10.0B-~2.10.0B ~2.10.0B:~2.10.0B:~2.10.0B", [Year,Month,Day,Hour,Minute,Second]).
