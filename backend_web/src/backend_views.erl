-module(backend_views).

-export([urls/0, get_world_view/2, login/2, add_user_keyword/3, get_user_keywords/2]).

-include("backend_config.hrl").

%
% urls/1 is where the dynamic pages is defined in a 
% tuple containing a regular expression and the name of the function
% that handles the call.
%

urls() -> [
           {"^api/world/?$", get_world_view                 },
           {"^api/login/?$", login                          },
           {"^api/keywords/add/(.{3,64})$", add_user_keyword},
           {"^api/keywords/get$", get_user_keywords         }
          ].

get_world_view('GET', Req) ->
    %{ok, Result} = riakio:fetch({"Fagey","IPhone"}, "test"),
    %{ok, Keys} = tba_riakdb:query_date_range("gigabucket", web_functions:get_date_from(15),"9"),
    %{ok, Info} = tba_riakdb:mapred_weight(Keys),
    %Req:ok({"application/json",[], [mochijson2:encode({struct,[{A,web_functions:fix_double_number(B)} || {A,B} <- Info]})]})
    Req:ok({"application/json",?API_HEADER,
            [mochijson2:encode({struct,[{country,float_to_binary(1.0)}]})]});

get_world_view('POST', Req) ->
    get_world_view('GET', Req).

login('POST', Req) ->
    Post = Req:parse_post(),
    Username = proplists:get_value("username",Post,""),
    Password = proplists:get_value("pwd",Post,""),
    case length(Password) of
        0 -> 
            backend_utils:redirect(Req, "/",
                "Login failed!");
        _ when Username =:= [] -> 
            backend_utils:redirect(Req, "/",
                "Login failed!");
        N when N > 0 ->
            case backend_login:authenticate(Username,Password) of
                true ->
                    Cookie = backend_login:create_cookie(Username, backend_utils:get_ip(Req)),
                    backend_utils:redirect(Req, "/",
                        "Login Successfull!", Cookie);
                _ -> 
                    backend_utils:redirect(Req, "/",
                        "Login failed!", mochiweb_cookies:cookie(?SESSION_COOKIE,""))
            end
    end;
login('GET', Req) ->
    backend_utils:redirect(Req, "/",
        "Error! No login credentials.").

add_user_keyword(_, Req, []) ->
    backend_utils:error_response(Req, ?API_ERROR_MSG);
add_user_keyword('POST', Req, Keywords) ->
    add_user_keyword('GET', Req, Keywords);
add_user_keyword('GET', Req, [Keyword]) ->
    case backend_login:check_cookie(Req) of
        undefined ->
                backend_utils:illegal_access(Req, ?API_NO_LOGIN_MSG);
           _ -> 
                backend_user:add_user_keywords(Req, Keyword),
                Req:ok({"application/json",?API_HEADER,[mochijson2:encode({struct,[{status,<<"ok">>}]})]})
    end.

get_user_keywords('POST', Req) ->
    get_user_keywords('GET', Req);
get_user_keywords('GET', Req) ->
    case backend_login:check_cookie(Req) of
        undefined ->
                backend_utils:illegal_access(Req, ?API_NO_LOGIN_MSG);
            _ ->
                Keys = backend_user:get_user_keywords(Req),
                Keywords = lists:map(fun (X) -> list_to_binary(X) end, Keys),
                Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{"keywords",Keywords}]})]})
    end.

    %Req:respond({302,
    %    [{"Location", "/"},
    %    {"Content-Type", "text/html; charset=UTF-8"}],
    %    "Added keyword"}).

%get_random_number('GET', Req) ->
%            %Req:ok({"application/json",[],[float_to_list(random:uniform())]}).
%    Req:ok({"application/json",[],[web_functions:uuid_to_string(web_functions:generate_uuid())]}).

% SESSION_BUCKET -> {SESSION_ID, Information()}
%
% Information() ->
%
