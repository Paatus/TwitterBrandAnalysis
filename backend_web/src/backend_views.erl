-module(backend_views).

-export([urls/0, get_world_view/2, login/2, add_user_keyword/3]).

-include("backend_config.hrl").

urls() -> [
           {"^world/?$", get_world_view},
           {"^login/?$", login},
           {"^api/keywords/add/(.{3,64})$", add_user_keyword}
           {"^api/keywords/get$", add_user_keyword}
          ].

get_world_view('GET', Req) ->
    %{ok, Result} = riakio:fetch({"Fagey","IPhone"}, "test"),
    %{ok, Keys} = tba_riakdb:query_date_range("gigabucket", web_functions:get_date_from(15),"9"),
    %{ok, Info} = tba_riakdb:mapred_weight(Keys),
    %Req:ok({"application/json",[], [mochijson2:encode({struct,[{A,web_functions:fix_double_number(B)} || {A,B} <- Info]})]})
    Req:ok({"application/json",[], ["{\"hej\":1}"]}).
    %Req:ok({"application/json",[], ["{\"hej\":1}"]}).

login('POST', Req) ->
    Post = Req:parse_post(),
    Username = proplists:get_value("username",Post,""),
    Password = proplists:get_value("pwd",Post,""),
    case length(Password) of
        0 -> 
            backend_utils:redirect(Req, "/",
                "Something went wrong!");
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
    Req:respond({302,
        [{"Location", "/login.html"},
        {"Content-Type", "text/html; charset=UTF-8"}],
        "BAD USER! U STOOPID!"}).

add_user_keyword('GET', Req, [Keyword]) ->
    backend_user:add_user_keywords(Req, Keyword),
    Req:ok({"application/json",[],[Keyword]}).

get_user_keyword('GET', Req) ->
    Keys = backend_user:get_user_keywords(Req),
    Keywords = lists:foldr(fun (X,Y) -> lists:append(X, lists:append(" ", Y)) end, [], Keys),
    Req:ok({"application/json",[],[Keywords]}).

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
