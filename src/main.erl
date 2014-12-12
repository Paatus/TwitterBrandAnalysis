-module(main).
-behaviour(application).
-export([start/0, start/2, stop/1]).
start() ->
	application:ensure_all_started(tba),
	gen_server:call(main_serv, start_all).

start(_Type, _Args) ->
	main_sup:start().

stop(_State) ->
	ok.
