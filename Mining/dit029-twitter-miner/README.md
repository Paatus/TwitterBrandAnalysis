# DIT029 Twitter Miner

    $ rebar get-deps
    $ rebar compile

    $ erl -pa deps/*/ebin -pa ebin -config twitterminer
    
	1> application:ensure_all_started(twitterminer).
    2> twitterminer_source:twitter_example().

