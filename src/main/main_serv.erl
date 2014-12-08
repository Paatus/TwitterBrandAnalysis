-module(main_serv).
-behaviour(gen_server).
-export([start/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start() ->
	gen_server:start_link({local, main_serv}, ?MODULE, [], []).

init([]) ->
	{ok, running}.

handle_call({start, User, SearchWords}, _From, State) ->
	ChildSpec = {
		User, 
		{user_super, start, [User, SearchWords]},
		permanent,
		infinity,
		supervisor,
		[user_super]
	},
	Result = supervisor:start_child(main_sup, ChildSpec),
	{reply, Result, State};
handle_call({stop, User}, _From, State) ->
	supervisor:terminate_child(main_sup, User),
	Result = supervisor:delete_child(main_sup, User),
	{reply, Result, State};
handle_call(_Message, _From, State) ->
	{reply, {ok, unknown}, State}.

handle_cast(Message, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, _State) ->
	ok.

code_change(_OldVsn, State, _) ->
	{ok, State}.
