-module(main_serv).
-behaviour(gen_server).
-export([start/0, add_kw/3, remove_kw/3, delete_keyword_data/2]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start() ->
	gen_server:start_link({local, main_serv}, ?MODULE, [], []).

init([]) ->
	{ok, running}.

handle_call({start, User}, _From, State) ->
	Result = start_user(User),
	{reply, Result, State};
handle_call(start_all, _From, State) ->
	start_all_users(),
	{reply, {ok, all_started}, State};
handle_call({add_kw, User, Keyword}, From, State) ->
	spawn_link(?MODULE, add_kw, [User, Keyword, From]),
	{noreply, State};
handle_call({remove_kw, User, Keyword}, From, State) ->
	spawn_link(?MODULE, remove_kw, [User, Keyword, From]),
	{noreply, State};
handle_call({stop, User}, _From, State) ->
	Result = stop_user(User),
	{reply, Result, State};
handle_call(_Message, _From, State) ->
	{reply, {ok, unknown_message}, State}.

handle_cast(_Message, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, _State) ->
	ok.

code_change(_OldVsn, State, _) ->
	{ok, State}.

add_kw(User, KeywordRaw, From) ->
	Keyword = string:to_lower(KeywordRaw),
	{ok, KWList} = riakio:fetch("AccountInfo", User),
	case lists:member(Keyword, KWList) of
		true ->
			gen_server:reply(From, {error, already_in_list});
		false ->
			NewList = [Keyword|KWList],
			riakio:put("AccountInfo", User, NewList, [{{binary_index, "user"}, [list_to_binary("user")]}]),
			stop_user(User),
			start_user(User, string:join(NewList, ",")),
			gen_server:reply(From, {ok, added_to_list})
	end.

remove_kw(User, KeywordRaw, From) ->
	Keyword = string:to_lower(KeywordRaw),
	KWList = riakio:fetch("AccountInfo", User),
	case lists:member(Keyword, KWList) of
		true ->
			NewList = lists:delete(Keyword, KWList),
			riakio:put("AccountInfo", User, NewList, [{{binary_index, "user"}, [list_to_binary("user")]}]),
			stop_user(User),
			start_user(User, string:join(NewList, ",")),
			delete_keyword_data(User, Keyword),
			gen_server:reply(From, {ok, removed_from_list});
		false ->
			gen_server:reply(From, {error, not_in_list})
	end.
	
start_user(User) ->
	{ok, SearchWords} = riakio:fetch("AccountInfo", User),
	start_user(User, string:join(SearchWords, ",")).
start_user(User, SearchWords) ->
	case SearchWords of
		[] ->
			ok;
		SearchWords ->
			ChildSpec = {
				User, 
				{user_super, start, [User, SearchWords]},
				permanent,
				infinity,
				supervisor,
				[user_super]
			},
			supervisor:start_child(main_sup, ChildSpec)
	end.

start_all_users() ->
	{ok, Users} = riakio:fetch_all_users(),
	[start_user(U) || U <- Users].

stop_user(User) ->
	supervisor:terminate_child(main_sup, User),
	supervisor:delete_child(main_sup, User).

delete_keyword_data(User, Keyword) ->
	delete_bucket({User, Keyword}),
	delete_bucket({User, Keyword, worldmap}),
	delete_bucket({User, Keyword, words}),
	delete_bucket({User, Keyword, hashtags}),
	delete_bucket({User, Keyword, users}),
	delete_bucket({User, Keyword, amount}).

delete_bucket(Bucket) ->
	{ok, Keys} = riakio:query_date_range(Bucket, "0", "9"),
	{ok, Pid} = riakio:start_link(),
	riakio:delete_keys(Pid, Keys),
	riakio:close_link(Pid).

