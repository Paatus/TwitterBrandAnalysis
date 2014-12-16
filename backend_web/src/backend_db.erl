-module(backend_db).

-export([start_link/0, close_link/1, fetch/2, put/4, put/5, format_date/1, remove/2, query_date_range/3, query_usernames_sessions/1, get_all_usernames/0]).

-include("backend_config.hrl").


start_link() ->
    start_link(?RIAK_IP, ?RIAK_PORT).
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

remove(Bucket, Key) ->
	{ok, Pid} = start_link(),
    riakc_pb_socket:delete(Pid, Bucket, Key),
	close_link(Pid).

to_binary(Input) when is_binary(Input) -> Input;
to_binary(Input) when is_list(Input) -> list_to_binary(Input);
to_binary(Input) -> term_to_binary(Input).

format_date({{Year,Month,Day},{Hour,Minute,Second}}) -> 
        io_lib:format("~4.10.0B-~2.10.0B-~2.10.0B ~2.10.0B:~2.10.0B:~2.10.0B", [Year,Month,Day,Hour,Minute,Second]).

query_date_range(Bucket, Start, End) ->
	{ok, Pid} = start_link(),
	B = to_binary(Bucket),
	{ok, {_, Keys, _, _}} = riakc_pb_socket:get_index_range(
		Pid,
		B,
		{binary_index, "datetime"},
		to_binary(Start), to_binary(End)
	),
	close_link(Pid),
	BucketKeys = [{B, K} || K <- Keys],
	{ok, BucketKeys}.

query_usernames_sessions(Username) ->
	{ok, Pid} = start_link(),
	{ok, Result} = riakc_pb_socket:get_index(
		Pid,
		<<?SESSION_BUCKET>>,
		{binary_index, "user"},
		list_to_binary(Username)
	),
	close_link(Pid),
	{_, Keys, _, _} = Result,
	{ok, [binary_to_list(K) || K <- Keys]}.

get_all_usernames() ->
    {ok, Pid} = start_link(),
    {ok, Result} = riakc_pb_socket:get_index(
        Pid,
        <<"AccountInfo">>,
        {binary_index, "user"},
        <<"user">>
    ),
    {_, Keys, _, _} = Result,
    {ok, [binary_to_list(K) || K <- Keys]}.
