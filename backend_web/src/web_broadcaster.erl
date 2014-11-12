-module(web_broadcaster).

-export([start/1,loop/1]).
-export([broadcast_server/2]).

-define(SERVER, ?MODULE).

start(BroadcastDict) ->
    loop(BroadcastDict).

loop(BroadcastDict) ->
    receive
        {find, Endpoint, Pid, Ref} ->
            case dict:find(Endpoint, BroadcastDict) of
                {ok, {Bpid, _}} ->
                    Pid ! {broadcaster, Bpid, Ref},
                    loop(BroadcastDict);
                _ ->
                    {Bpid, Mref} = spawn_broadcaster(Endpoint),
                    Pid ! {broadcaster, Bpid, Ref},
                    loop(dict:store(Endpoint,{Bpid, Mref},BroadcastDict))
            end;
        {'DOWN', Mref, process, Pid, Reason} ->
            case dict:find(Reason, BroadcastDict) of
                {ok, {Pid,  Mref}} ->
                    loop(dict:erase(Reason, BroadcastDict));
                _ ->
                    loop(BroadcastDict)
            end
    end.

spawn_broadcaster(Endpoint) ->
    Broadcaster = spawn_link(?MODULE, broadcast_server, [dict:new(), Endpoint]),
    Mref = erlang:monitor(process,Broadcaster),
    {Broadcaster, Mref}.

broadcast_server(Pids, Endpoint) ->
    Pids1 = receive
                {register, Pid, Channel} ->
                    io:format("~p~n",[Channel]),
                    broadcast_register(Pid, Channel, Pids);
                {broadcast, Pid, Message} ->
                    broadcast_sendall(Pid, Message, Pids);
                {'DOWN', MRef, process, Pid, _Reason} ->
                    broadcast_down(Pid, MRef, Pids, Endpoint);
                Msg ->
                    io:format("Unknown message: ~p~n", [Msg]),
                    Pids
            end,
    erlang:hibernate(?MODULE, broadcast_server, [Pids1,Endpoint]).

broadcast_register(Pid, Channel, Pids) ->
    MRef = erlang:monitor(process, Pid),
    dict:store(Pid, {Channel, MRef}, Pids).
    %broadcast_sendall(
    %  Pid, "connected", dict:store(Pid, {Channel, MRef}, Pids)).

broadcast_down(Pid, MRef, Pids, Endpoint) ->
    Pids1 = case dict:find(Pid, Pids) of
                {ok, {_, MRef}} ->
                    dict:erase(Pid, Pids);
                _ ->
                    Pids
            end,
    case dict:is_empty(Pids1) of
        %true -> exit(Endpoint);
        %_    -> broadcast_sendall(Pid, "disconnected", Pids1)
        _    -> Pids1
    end.

broadcast_sendall(Pid, Msg, Pids) ->
    M = iolist_to_binary([pid_to_list(Pid), ": ", Msg]),
    dict:fold(
      fun (K, {Reply, MRef}, Acc) ->
              try
                  begin
                      Reply(M),
                      dict:store(K, {Reply, MRef}, Acc)
                  end
              catch
                  _:_ ->
                      Acc
              end
      end,
      dict:new(),
      Pids).
