-module(pyerlTest).
-export([pyStart/0, pyStop/0, pyCall/1, pyProcess/1]).


 % test()->
 % 	spawn(?MODULE, pyProcess,["I am happy"]),
 % 	spawn(?MODULE, pyProcess,["I am unhappy"]).


pyProcess(Arg)->
	pyStart(),
	PyMsg= pyCall(Arg),
	%pyStop(),
	PyMsg.


%% Create a local Python instance 
pyStart() ->
	%%Start a local python instance, do nothing when 
	%%It's already started.
	case whereis(pyIns) of 
		undefined ->
			{ok, Pid} = python:start(),
			register(pyIns, Pid);
		_->
			ok
		end,
	{ok, whereis(pyIns)}.
	

%% stop it :D
pyStop() ->
	python:stop(pyIns),
	io:format("stopped python instance '~p' \n", [whereis(pyIns)]).

pyCall(Arg) ->
	%% Problem in Erlang is that strings are actually lists, 
	%% So we can't simply pass Args to python functions if 
	%% you use BIF for strings for example 'find' in python.
	ArgS = list_to_bitstring(binary_to_list(Arg)), 

	%%{id, 5},{tweet, "fklsdjflskdjgslkdgnskldjfsjkefdsfn"},{weight, null},{time_zone, "England"},{longlat, "0.0,0.0"}
	%% Call the f function in Ian's nlpmain.py with argument ArgS.
    python:call(pyIns, 'NLP.nlpmain', getWeight, [ArgS]).

	% Can send message from python to Erlang if needed. 
	% python:call(pyIns, 'erlport.erlang', cast, [self(), Pymsg]).









