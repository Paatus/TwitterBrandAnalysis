-module(main).
-export([run/0, run/1]).

init() ->
	application:ensure_all_started(twitterminer),
	message_relay:start().	

run() ->
	init(),
	spawn(concat, start, ["tweetbucket"]),
	twitterminer_source:twitter_example().

run(SearchWords) ->
	init(),
	twitterminer_source:twitter_example(SearchWords).
