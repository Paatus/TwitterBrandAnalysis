-module(backend_user).

-export([get_user_keywords/1, add_user_keywords/2, del_user_keywords/2]).
-export([create_account/2, change_user_password/2]).
-export([user_has_keyword/2]).

-include("backend_config.hrl").

user_has_keyword(Req, Key) when is_tuple(Req) ->
    case backend_login:get_username(Req) of
        undefined -> {error, "User is not logged in!"};
        Username -> user_has_keyword(Username, Key)
    end;
user_has_keyword(Username, Key) when is_list(Username) ->
    TempKeys = get_user_keywords(Username),
    {lists:member(Key,TempKeys), Username}.

get_user_keywords(Req) when is_tuple(Req) ->
    case backend_login:get_username(Req) of
        undefined -> {error, "User is not logged in!"};
        Username -> get_user_keywords(Username)
    end;
get_user_keywords(Username) when is_list(Username) ->
    case backend_db:fetch(?ACCOUNT_BUCKET, Username) of
        {ok, Result} -> Result;
        _ -> []
    end.

add_user_keywords(Req, Key) when is_tuple(Req) ->
    case backend_login:get_username(Req) of
        undefined -> {error, "User is not logged in!"};
        Username -> add_user_keywords(Username, Key)
    end;
add_user_keywords(Username, Key) when is_list(Username) ->
    case user_has_keyword(Username, Key) of
       true ->
            {error, "Keyword is already in the keywords list!"};
       _ ->
            send_user_add_keywords(Username, Key)
    end.

del_user_keywords(Req, Key) when is_tuple(Req) ->
    case backend_login:get_username(Req) of
        undefined -> {error, "User is not logged in!"};
        Username -> del_user_keywords(Username, Key)
    end;
del_user_keywords(Username, Key) when is_list(Username) ->
    case user_has_keyword(Username, Key) of
        true ->
            send_user_del_keywords(Username, Key);
        _ ->
            {error, "Keyword not in the keywords list!"}
    end.

create_account(Username, Password) ->
    case backend_db:fetch(?LOGIN_BUCKET, Username) of
        {ok, _} ->
            {error, "Account already exists!"};
        _ ->
            backend_db:put(?LOGIN_BUCKET, Username, backend_utils:hash_input(Password),[]),
            send_create_user(Username),
            {true, "Account created!"}
    end.

change_user_password(Req, Password) when is_tuple(Req) ->
    case backend_login:get_username(Req) of
        undefined -> {error, "User is not logged in!"};
        Username -> change_user_password(Username,Password)
    end;
change_user_password(Username, Password) when is_list(Username) ->
    case backend_db:fetch(?LOGIN_BUCKET, Username) of
        {ok, _} ->
            backend_db:put(?LOGIN_BUCKET, Username, backend_utils:hash_input(Password),[]),
            {true, "User password changed!"};
        _ -> {error, "Could not populate database with the password!"}
    end.

send_user_add_keywords(Username, Keywords) ->
    gen_server:cast({?SERVER_MODULE, ?SERVER_NODE}, {add_kw, Username, Keywords}).

send_user_del_keywords(Username, Keywords) ->
    gen_server:cast({?SERVER_MODULE, ?SERVER_NODE}, {remove_kw, Username, Keywords}).

send_create_user(Username) ->
    gen_server:cast({?SERVER_MODULE, ?SERVER_NODE}, {create_user, Username}).
