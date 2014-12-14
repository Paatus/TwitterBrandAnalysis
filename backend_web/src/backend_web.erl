-module(backend_web).

%% To run: erlc *.erl && erl -pa ../../ebin -s backend_web

-export([start/0, start_link/0, ws_loop/3, loop/3]).

-include("backend_config.hrl").

-ifdef(debug).
-define(DEBUG,true).
-endif.

start() ->
    random:seed(now()),
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
    DocRoot = backend_utils:get_directory(),
    mochiweb_http:start_link([
                              {name, client_access},
                              {loop, {?MODULE, loop, [Broadcaster, DocRoot]}},
                              {port, 8080}
                             ]).

ws_loop(Payload, Broadcaster, _ReplyChannel) ->
    %io:format("Received data: ~p~n", [Payload]),
    Received = list_to_binary(Payload),
    Broadcaster ! {broadcast, self(), Received},
    Broadcaster.

loop(Req, Broadcaster, DocRoot) ->
    case Req:get_header_value("host") of
        Host when Host =:= ?WEB_ADDRESS orelse Host =:= ?IP_ADDRESS ->
            "/" ++ _Path = Req:get(path),
            H = mochiweb_request:get_header_value("Upgrade", Req),
            loop(Req,
                 Broadcaster,
                 H =/= undefined andalso string:to_lower(H) =:= "websocket", DocRoot);
        _ ->
            Req:respond({501, [], []})
    end.

loop(Req, _Broadcaster, false, DocRoot) ->
    "/" ++ Path = Req:get(path),
    %backend_utils:print_hostinfo(Req),
    %io:format("~p~n",[Req]),
    try
        case dispatch(Req, backend_views:urls()) of
            none ->
                FixedDocRoot = case backend_login:check_cookie(Req) of
                   {error, _} -> lists:append(DocRoot,"public/");
                    _ -> backend_login:update_session(Req),
                         lists:append(DocRoot,"private/")
                end,
                case filelib:is_file(filename:join([FixedDocRoot, Path])) of
                    true -> 
                        Req:serve_file(Path, FixedDocRoot, [{"Cache-Control", "no-cache"}]);
                    false ->
                        Req:not_found()
                end;
            Response -> Response
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
 
loop(Req, Broadcaster, true, _) ->
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

dispatch(_, []) ->
    none;
dispatch(Req, [{Regex, F}|Xs]) ->
    "/" ++ Path = Req:get(path),
    Method = Req:get(method),
    Match = re:run(Path, Regex, [global, {capture, all_but_first, list}]),
    case Match of
        {match, [MatchList]} ->
           case length(MatchList) of
              0 ->
                  backend_views:F(Method, Req); 
              L when L > 0 ->
                  backend_views:F(Method, Req, MatchList)
           end;
        _ -> dispatch(Req, Xs)
    end.
