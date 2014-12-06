-module(main).
-behaviour(supervisor).
-export([start/0, stop/0, start_user/0, start_user/2, stop_user/1]).
-export([init/1]).

start() ->
	application:ensure_all_started(tba),
	supervisor:start_link({local, main}, ?MODULE, []).

stop() ->
	case whereis(main) of
		P when is_pid(P) ->
			exit(P, kill);
		_ -> ok
	end.

init([]) ->
	MaxRestart = 6,
	MaxTime = 3600,
	{ok, {{one_for_one, MaxRestart, MaxTime}, []}}.

start_user() -> start_user("Derp","iPhone,apple,iwatch,ipad,iMac,macbook,ios").
start_user(Name, SearchWords) ->
	ChildSpec = {
		Name, 
		{user, start, [Name, SearchWords]},
		permanent, infinity, supervisor, [user]
	},
	supervisor:start_child(main, ChildSpec).

stop_user(Name) ->
	supervisor:terminate_child(main, Name),
	supervisor:delete_child(main, Name).
