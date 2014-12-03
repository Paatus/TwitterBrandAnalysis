-module(main).
-export([run/0, run/2]).

init(User, SearchWords) ->
	application:ensure_all_started(tba),
	message_relay:start(User, SearchWords).	

run() ->
	run("Faget", "iPhone,apple,iwatch,ipad,iMac,macbook,ios").

run(User, SearchWords) ->
	init(User, SearchWords), %Pass User to message_relay
	[spawn(concat, start, [{User, Token}]) || Token <- string:tokens(SearchWords,",")],
	twitterminer_source:twitter_example(SearchWords).
