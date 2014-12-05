-module(backend_login).

-export([authenticate/2,create_cookie/2,create_session/2,check_cookie/1,check_session/1]).

-include("backend_config.hrl").

authenticate(Username, Password) ->
    case backend_db:fetch("Login",Username) of
        {ok, Result} -> Result == backend_utils:hash_input(Password);
        _ -> false
    end.

% May need to utilize these functions:
% mochiweb_util:quote_plus/1
% mochiweb_util:unquote/1
create_cookie(Username,Ip) ->
    UUID = create_session(Username,Ip),
    mochiweb_cookies:cookie(?SESSION_COOKIE,UUID).

check_cookie(Req) ->
    ClientIp = backend_utils:get_ip(Req),
    case Req:get_cookie_value(?SESSION_COOKIE) of
        undefined -> undefined;
        SessionID when length(SessionID) > 0 -> case check_session(SessionID) of
                         {Username, ClientIp} -> Username;
                         _ -> undefined
                     end;
        _ -> undefined
    end.

create_session(Username,Ip) ->
    UUID = backend_utils:generate_uuid(),
	BinDate = list_to_binary(backend_db:format_date(calendar:universal_time())),
    backend_db:put(?SESSION_BUCKET, UUID, {Username, Ip}, [{{binary_index,"datetime"}, [BinDate]}]),
    UUID.

check_session(SessionID) ->
    case backend_db:fetch(?SESSION_BUCKET,SessionID) of
        {ok, Result} -> Result;
        _ -> error
    end.
