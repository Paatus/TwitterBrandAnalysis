-module(backend_user).

-export([get_user_keywords/1, add_user_keywords/2, del_user_keywords/2]).
-export([create_account/2, change_password/1]).

-include("backend_config.hrl").

get_user_keywords(Req) ->
    Username = backend_login:get_username(Req),
    case backend_db:fetch(?ACCOUNT_BUCKET, Username) of
        {ok, Result} -> Result;
        _ -> []
    end.

add_user_keywords(Req, Key) ->
    Username = backend_login:get_username(Req),
    TempKeys = get_user_keywords(Req),
    case lists:member(Key,TempKeys) of
       true -> error;
       _ -> Keywords = lists:append(TempKeys, [Key]),
            backend_db:put(?ACCOUNT_BUCKET, Username, Keywords, []),
            update_user_keywords(Username, Keywords)
    end.

del_user_keywords(Req, Key) ->
    Username = backend_login:get_username(Req),
    TempKeys = get_user_keywords(Req),
    case lists:member(Key,TempKeys) of
        true -> Keywords = lists:delete(Key, TempKeys),
                backend_db:put(?ACCOUNT_BUCKET, Username, Keywords, []);
        _ -> error
    end.

create_account(Username, Password) ->
    case backend_db:fetch(?LOGIN_BUCKET, Username) of
        {ok, _} -> {error, "Account already exists!"};
        _ ->
            backend_db:put(?LOGIN_BUCKET, Username, backend_utils:hash_input(Password),[]),
            backend_db:put(?ACCOUNT_BUCKET, Username, [], [])
    end.

change_password(_Username) ->
    ok.

update_user_keywords(Username, Keywords) ->
    gen_server:cast({?SERVER_MODULE, ?SERVER_NODE}, {start, Username, Keywords}).
