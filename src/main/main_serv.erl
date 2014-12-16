-module(main_serv).
-behaviour(gen_server).
-export([start/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

start() ->
	gen_server:start_link({local, main_serv}, ?MODULE, [], []).

init([]) ->
	{ok, running}.

handle_call(_Message, _From, State) ->
	{reply, ok, State}.

handle_cast({create_user, User}, State) ->
	create_user(User),
	{noreply, State};
handle_cast({delete_user, User}, State) ->
	delete_user(User),
	{noreply, State};
handle_cast({start, User}, State) ->
	start_user(User),
	{noreply, State};
handle_cast({stop, User}, State) ->
	stop_user(User),
	{noreply, State};
handle_cast(start_all, State) ->
	start_all_users(),
	{noreply, State};
handle_cast(stop_all, State) ->
	stop_all_users(),
	{noreply, State};
handle_cast({add_kw, User, Keyword}, State) ->
	add_kw(User, Keyword),
	{noreply, State};
handle_cast({remove_kw, User, Keyword}, State) ->
	remove_kw(User, Keyword),
	{noreply, State};
handle_cast(_Message, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, _State) ->
	ok.

code_change(_OldVsn, State, _) ->
	{ok, State}.

add_kw(User, KeywordRaw) ->
	Keyword = string:to_lower(KeywordRaw),
	{ok, KWList} = riakio:fetch("AccountInfo", User),
	case lists:member(Keyword, KWList) of
		true ->
			{error, already_in_list};
		false ->
			NewList = [Keyword|KWList],
			riakio:put("AccountInfo", User, NewList, [{{binary_index, "user"}, [list_to_binary("user")]}]),
			stop_user(User),
			start_user(User, string:join(NewList, ",")),
			{ok, added_to_list}
	end.

remove_kw(User, KeywordRaw) ->
	Keyword = string:to_lower(KeywordRaw),
	{ok, KWList} = riakio:fetch("AccountInfo", User),
	case lists:member(Keyword, KWList) of
		true ->
			NewList = lists:delete(Keyword, KWList),
			riakio:put("AccountInfo", User, NewList, [{{binary_index, "user"}, [list_to_binary("user")]}]),
			stop_user(User),
			start_user(User, string:join(NewList, ",")),
			delete_keyword_data(User, Keyword),
			{ok, removed_from_list};
		false ->
			{error, not_in_list}
	end.

create_user(User) ->
	riakio:put("AccountInfo", User, [], [{{binary_index, "user"}, [list_to_binary("user")]}]).

delete_user(User) ->
	stop_user(User),
	{ok, SearchWords} = riakio:fetch("AccountInfo", User),
	[delete_keyword_data(User, SW) || SW <- SearchWords],
	delete_bucket({User, worldmap}),
	delete_bucket({User, words}),
	delete_bucket({User, hashtags}),
	delete_bucket({User, users}),
	delete_bucket({User, amount}),
	riakio:delete("AccountInfo", User),
	ok.

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

stop_user(User) ->
	supervisor:terminate_child(main_sup, User),
	supervisor:delete_child(main_sup, User).

start_all_users() ->
	{ok, Users} = riakio:fetch_all_users(),
	[start_user(U) || U <- Users].

stop_all_users() ->
	{ok, Users} = riakio:fetch_all_users(),
	[stop_user(U) || U <- Users].

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

