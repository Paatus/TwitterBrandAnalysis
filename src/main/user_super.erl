-module(user_super).
-behaviour(supervisor).
-export([start/2]).
-export([init/1]).

start(User, SearchWords) ->
	{ok, Pid} = supervisor:start_link(?MODULE, [User, SearchWords]),
	{ok, Relay} = supervisor:start_child(Pid, {
		relay,
		{message_relay, start, [User, SearchWords]},
		permanent,
		5000,
		worker,
		[message_relay]
	}),
	supervisor:start_child(Pid, {
		miner,
		{twitterminer_source, start, [SearchWords, Relay]},
		permanent,
		5000,
		worker,
		[twitterminer_source]
	}),
	{ok, Pid}.

init([User, SearchWords]) ->
	MaxRestart = 2,
	MaxTime = 3600,
	{ok, {{one_for_all, MaxRestart, MaxTime},
		[
		{
			concat,
			{concat, start, [User, SearchWords]},
			permanent,
			5000,
			worker,
			[concat]
		}
		]
	}}.
