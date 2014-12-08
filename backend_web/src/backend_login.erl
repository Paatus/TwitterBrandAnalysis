-module(backend_login).

-export([authenticate/2, logout/1]).
-export([create_cookie/2,check_cookie/1,check_session/1,get_username/1]).
-export([update_session/1,create_session/2]).


-include("backend_config.hrl").

authenticate(Username, Password) ->
    case backend_db:fetch(?LOGIN_BUCKET,Username) of
        {ok, Result} -> Result == backend_utils:hash_input(Password);
        _ -> false
    end.

logout(Req) ->
    ClientIp = backend_utils:get_ip(Req),
    case Req:get_cookie_value(?SESSION_COOKIE) of
        undefined -> undefined;
        SessionID when length(SessionID) > 0 -> case check_session(SessionID) of
                         {_Username, ClientIp} -> backend_db:remove(?LOGIN_BUCKET, SessionID);
                         _ -> undefined
                     end;
        _ -> undefined
    end,
    mochiweb_cookies:cookie(?SESSION_COOKIE,"expired", [{path, "/"},{max_age,0}]).

% May need to utilize these functions:
% mochiweb_util:quote_plus/1
% mochiweb_util:unquote/1
create_cookie(Username,Ip) ->
    UUID = create_session(Username,Ip),
    mochiweb_cookies:cookie(?SESSION_COOKIE,UUID, [{max_age, 60*60*24*7},{path, "/"}]).

check_cookie(Req) ->
    ClientIp = backend_utils:get_ip(Req),
    case Req:get_cookie_value(?SESSION_COOKIE) of
        undefined -> undefined;
        SessionID when length(SessionID) > 0 -> case check_session(SessionID) of
                                                    {Username, ClientIp} -> {Username, ClientIp};
                                                    _ -> undefined
                     end;
        _ -> undefined
    end.

create_session(Username,Ip) ->
    UUID = backend_utils:uuid_to_string(backend_utils:generate_uuid()),
	BinDate = list_to_binary(backend_db:format_date(calendar:universal_time())),
    backend_db:put(?SESSION_BUCKET, UUID, {Username, Ip}, [{{binary_index,"datetime"}, [BinDate]}]),
    UUID.

update_session(Req) ->
    case Req:get_cookie_value(?SESSION_COOKIE) of
        undefined -> {error, "The session does not exists!"};
        SessionID when length(SessionID) > 0 ->
            ClientIp = backend_utils:get_ip(Req),
            case check_session(SessionID) of
                     {Username, ClientIp} -> 
	BinDate = list_to_binary(backend_db:format_date(calendar:universal_time())),
    backend_db:put(?SESSION_BUCKET, SessionID, {Username, ClientIp}, [{{binary_index,"datetime"}, [BinDate]}]),
    mochiweb_cookies:cookie(?SESSION_COOKIE,SessionID, [{max_age, 60*60*24*7},{path, "/"}]);
                     _ ->
                        undefined
                     end;
        _ -> undefined
    end.

check_session(SessionID) ->
    case backend_db:fetch(?SESSION_BUCKET,SessionID) of
        {ok, Result} -> Result;
        _ -> error
    end.

get_username(Req) ->
    ClientIp = backend_utils:get_ip(Req),
    case Req:get_cookie_value(?SESSION_COOKIE) of
        undefined -> undefined;
        SessionID when length(SessionID) > 0 -> case check_session(SessionID) of
                         {Username, ClientIp} -> Username;
                         _ -> undefined
                     end;
        _ -> undefined
    end.
