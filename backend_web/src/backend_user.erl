-module(backend_user).

-export([get_user_keywords/1, add_user_keywords/2, del_user_keywords/2, create_account/2]).

-include("backend_config.hrl").

get_user_keywords(Req) ->
    Username = backend_login:get_username(Req),
    case backend_db:fetch(?ACCOUNT_BUCKET, Username) of
        {ok, Result} -> Result;
        _ -> []
    end.

add_user_keywords(Req, Key) ->
    Username = backend_login:get_username(Req),
    Keywords = lists:append(get_user_keywords(Req), Key),
    backend_db:put(?ACCOUNT_BUCKET, Username, Keywords).

del_user_keywords(Req, Key) ->
    Username = backend_login:get_username(Req),
    Keywords = lists:delete(Key, get_user_keywords(Req)),
    backend_db:put(?ACCOUNT_BUCKET, Username, Keywords).

create_account(Username, Password) ->
    backend_db:put(?LOGIN_BUCKET, Username, backend_utils:hash_input(Password),[]),
    backend_db:put(?ACCOUNT_BUCKET, Username, []).

