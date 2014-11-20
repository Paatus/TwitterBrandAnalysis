-module(main).
-export([run/0, run/1]).

init() ->
	application:ensure_all_started(twitterminer),
	message_relay:start().	

run() ->
	init(),
	spawn(concat, start, ["tweetbucket"]),
	twitterminer_source:twitter_example().

run(User, SearchWords) ->
	init(), %Pass User to message_relay
	[spawn(concat, start, [{User, Token}]) || Token <- string:tokens(SearchWords,",")],
	twitterminer_source:twitter_example(SearchWords).
