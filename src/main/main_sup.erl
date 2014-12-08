-module(main_sup).
-behaviour(supervisor).
-export([start/0, stop/0]).
-export([init/1]).

start() ->
	application:ensure_all_started(tba),
	supervisor:start_link({local, main_sup}, ?MODULE, []).

stop() ->
	case whereis(main_sup) of
		P when is_pid(P) ->
			exit(P, kill);
		_ -> ok
	end.

init([]) ->
	MaxRestart = 6,
	MaxTime = 3600,
	{ok, {{one_for_one, MaxRestart, MaxTime},
		[
		{
			main_serv,
			{main_serv, start, []},
			permanent,
			5000,
			worker,
			[main_serv]
		}	
		]
	}}.
