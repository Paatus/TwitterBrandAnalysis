-module(user).
-behaviour(supervisor).
-export([start/2, init/1]).

start(Name, SearchWords) ->
	supervisor:start_link(?MODULE, {Name, SearchWords}).

init({User, SearchWords}) ->
	MaxRestart = 1,
	MaxTime = 3600,
	{ok, {{one_for_all, MaxRestart, MaxTime},
		[
		{
			relay,
			{message_relay, start_link, [{User, SearchWords}]},
			permanent,
			5000,
			worker,
			[message_relay]
		},
		{
			miner,
			{twitterminer_source, start, [SearchWords]},
			permanent,
			5000,
			worker,
			[twitterminer_source]
		}
			%Start concat process
		]
	}}.

