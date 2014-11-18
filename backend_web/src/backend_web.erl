-module(backend_web).

%% To run: erlc *.erl && erl -pa ../../ebin -s backend_web

-export([start/0, start_link/0, ws_loop/3, loop/2]).
%-export([broadcast_server/1]).
-export([send_json/1]).

-ifdef(debug).
-define(DEBUG,true).
-endif.

start() ->
    spawn(
      fun () ->
              application:start(sasl),
              start_link(),
              receive
                  stop -> ok
              end
      end).


start_link() ->
    io:format("Listening at http://127.0.0.1:8080/~n"),
    Broadcaster = spawn_link(web_broadcaster, start, [dict:new()]),
    %spawn_link(?MODULE, send_json, [Broadcaster]),
    mochiweb_http:start_link([
                              {name, client_access},
                              {loop, {?MODULE, loop, [Broadcaster]}},
                              {port, 8080}
                             ]).

ws_loop(Payload, Broadcaster, _ReplyChannel) ->
    %io:format("Received data: ~p~n", [Payload]),
    Received = list_to_binary(Payload),
    Broadcaster ! {broadcast, self(), Received},
    Broadcaster.

loop(Req, Broadcaster) ->
    H = mochiweb_request:get_header_value("Upgrade", Req),
    %io:format("~p~n",[Req:parse_qs()]),
    "/" ++ _Path = Req:get(path),
    loop(Req,
         Broadcaster,
         H =/= undefined andalso string:to_lower(H) =:= "websocket").

loop(Req, _Broadcaster, false) ->
    "/" ++ Path = Req:get(path),
    {ok, {hostent, Hostname,_,_,_,[Ip]}} = inet:gethostbyaddr(Req:get(peer)),
    io:format("Connection from: ~s (~s)~n",[Hostname,inet:ntoa(Ip)]),
    io:format("~p~n",[Req]),
    try
        case Req:get(method) of
            Method when Method =:= 'GET'; Method =:= 'HEAD' ->
                case Path of
                    "top_words" ->
                        {ok, Keys} = tba_riakdb:query_date_range("gigabucket", web_functions:get_date_from(15),"9"),
                        {ok, Info} = mapred_tokenizer:mapred_tokens(Keys),
                        Req:ok({"application/json",[{"Cache-Control", "no-cache"}],
                                [mochijson2:encode(Info)]});

                    "world" ->
                        {ok, Keys} = tba_riakdb:query_date_range("gigabucket", web_functions:get_date_from(15),"9"),
                        {ok, Info} = tba_riakdb:mapred_weight(Keys),
                        Req:ok({"application/json",[],
                                [mochijson2:encode({struct,[{A,web_functions:fix_double_number(B)} || {A,B} <- Info]})]});
                    _ ->
                        mochiweb_request:serve_file(Path, web_functions:get_directory(), Req)
                end;
            Method when Method =:= 'POST' ->
                case Path of
                    _ -> Req:not_found()
                end;
            _ ->
                Req:respond({501, [], []})
        end
    catch
        Type:What ->
            Report = ["web request failed",
                      {path, Path},
                      {type, Type}, {what, What},
                      {trace, erlang:get_stacktrace()}],
            error_logger:error_report(Report),
            Req:respond({500, [{"Content-Type", "text/plain"}],
                         "request failed, sorry\n"})
    end;
 
loop(Req, Broadcaster, true) ->
    "/" ++ Path = Req:get(path),
    try
        case Req:get(method) of
            Method when Method =:= 'GET'; Method =:= 'HEAD' ->
                case Path of
                    _ ->
                        {ReentryWs, ReplyChannel} = mochiweb_websocket:upgrade_connection(
                                                      Req, fun ?MODULE:ws_loop/3),
                        Ref = make_ref(),
                        Broadcaster ! {find, Path, self(), Ref},
                        Bpid = receive {broadcaster, NewPid, Ref} -> NewPid end,
                        Bpid ! {register, self(), ReplyChannel},
                        ReentryWs(Bpid)
                end;
            Method when Method =:= 'POST' ->
                case Path of
                    _ -> Req:not_found()
                end;
            _ ->
                Req:respond({501, [], []})
        end
    catch
        Type:What ->
            Report = ["web request failed",
                      {path, Path},
                      {type, Type}, {what, What},
                      {trace, erlang:get_stacktrace()}],
            error_logger:error_report(Report),
            Req:respond({500, [{"Content-Type", "text/plain"}],
                         "request failed, sorry\n"})
    end.


%% This server keeps track of connected pids
%%broadcast_server(Pids) ->
%%    Pids1 = receive
%%                {register, Pid, Channel} ->
%%                    io:format("~p~n",[Channel]),
%%                    broadcast_register(Pid, Channel, Pids);
%%                {broadcast, Pid, Message} ->
%%                    broadcast_sendall(Pid, Message, Pids);
%%                {'DOWN', MRef, process, Pid, _Reason} ->
%%                    broadcast_down(Pid, MRef, Pids);
%%                Msg ->
%%                    io:format("Unknown message: ~p~n", [Msg]),
%%                    Pids
%%            end,
%%    erlang:hibernate(?MODULE, broadcast_server, [Pids1]).
%%
%%broadcast_register(Pid, Channel, Pids) ->
%%    MRef = erlang:monitor(process, Pid),
%%    broadcast_sendall(
%%      Pid, "connected", dict:store(Pid, {Channel, MRef}, Pids)).
%%
%%broadcast_down(Pid, MRef, Pids) ->
%%    Pids1 = case dict:find(Pid, Pids) of
%%                {ok, {_, MRef}} ->
%%                    dict:erase(Pid, Pids);
%%                _ ->
%%                    Pids
%%            end,
%%    broadcast_sendall(Pid, "disconnected", Pids1).
%%
%%broadcast_sendall(Pid, Msg, Pids) ->
%%    M = iolist_to_binary([pid_to_list(Pid), ": ", Msg]),
%%    dict:fold(
%%      fun (K, {Reply, MRef}, Acc) ->
%%              try
%%                  begin
%%                      Reply(M),
%%                      dict:store(K, {Reply, MRef}, Acc)
%%                  end
%%              catch
%%                  _:_ ->
%%                      Acc
%%              end
%%      end,
%%      dict:new(),
%%      Pids).

%
% Test functions!
%

send_json(Broadcaster) ->
    Broadcaster ! {broadcast, self(), mochijson2:encode({struct, [{test,<<"1">>}]})},
    timer:sleep(30000),
    send_json(Broadcaster).
