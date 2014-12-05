-module(backend_user).

-export([get_user_keywords/1 add_user_keywords/2, del_user_keywords/2, create_account/2]).

-include("backend_config.hrl").

get_user_keywords(Req) ->
    Username = backend_login:get_username(Req),
    backend_db:fetch(?ACCOUNT_BUCKET, Username).

add_user_keywords(Req, Key) ->
    Username = backend_login:get_username(Req),
    Keywords = lists:append(backend_db:fetch(?ACCOUNT_BUCKET, Username), Key),
    backend_db:put(?ACCOUNT_BUCKET, Username, Keywords).

del_user_keywords(Req, Key) ->
    Username = backend_login:get_username(Req),
    Keywords = lists:delete(Key, backend_db:fetch(?ACCOUNT_BUCKET, Username)),
    backend_db:put(?ACCOUNT_BUCKET, Username, Keywords).

create_account(Username, Password) ->
    backend_db:put(?LOGIN_BUCKET, Username, backend_utils:hash_input(Password),[]),
    backend_db:put(?ACCOUNT_BUCKET, Username, []).

