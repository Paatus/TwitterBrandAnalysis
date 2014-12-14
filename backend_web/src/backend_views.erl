-module(backend_views).

-export([urls/0, get_world_view_country/3, login/2, add_user_keyword/3, get_user_keywords/2, logout/2, serve_files/2]).
-export([get_world_view/2, get_world_timespan_view/3]).
-export([get_world_keyword_view/3, get_world_keyword_timespan_view/3]).
-export([get_top_keyword_view/2, get_top_keyword_timespan_view/3]).
-export([get_top_hashtag_view/2, get_top_hashtag_timespan_view/3]).
-export([get_top_user_view/2, get_top_user_timespan_view/3]).

-include("backend_config.hrl").

%
% urls/1 is where the dynamic pages is defined in a
% tuple containing a regular expression and the name of the function
% that handles the call.
%

urls() -> [
           {"^api/world/total/?$", get_world_view                                },
           {"^api/world/total/\\d{1,6}/\\d{1,6}/?$", get_world_timespan_view                          },
           {"^api/world/keyword/(\\w{3,64})/?$", get_world_keyword_view           },
           {"^api/world/keyword/(\\w{3,64})/(\\d{1,6})/(\\d{1,6})/?$", get_world_keyword_timespan_view},
           {"^api/world/country/(\\w{3,64})/?$", get_world_view_country           },
           {"^api/top/keyword/?$", get_top_keyword_view           },
           {"^api/top/keyword/(\\d{1,6})/(\\d{1,6})/?$", get_top_keyword_timespan_view},
           {"^api/top/hashtag/?$", get_top_hashtag_view           },
           {"^api/top/hashtag/(\\d{1,6})/(\\d{1,6})/?$", get_top_hashtag_timespan_view},
           {"^api/top/user/?$", get_top_user_view           },
           {"^api/top/user/(\\d{1,6})/(\\d{1,6})/?$", get_top_user_timespan_view},
           {"^api/login/?$", login                                               },
           {"^api/logout/?$", logout                                             },
           {"^api/keywords/add/(\\w{3,64})/?$", add_user_keyword                  },
           {"^api/keywords/get$", get_user_keywords                              },
           {"^(?:js|css|font|vendor|imgs)/.*$", serve_files                      }
          ].

get_world_view(_, Req) ->
    get_world_timespan_view('GET', Req, [1440, 0]).

get_world_timespan_view('POST', Req, Args) ->
    get_world_timespan_view('GET', Req, Args);
get_world_timespan_view('GET', Req, [Start, End]) when is_list(Start) andalso is_list(End) ->
    get_world_timespan_view('GET', Req, [list_to_integer(Start), list_to_integer(End)]);
get_world_timespan_view('GET', Req, [Start, End]) when Start > End ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            {ok, Keys} = backend_db:query_date_range({Username, worldmap}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Info} = mapred_weight:mapred(Keys),
            Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{A,backend_utils:fix_double_number(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_world_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

get_world_keyword_view(_, Req, [Keyword]) ->
    get_world_keyword_timespan_view('GET', Req, [Keyword, 1440, 0]).

get_world_keyword_timespan_view('POST', Req, Args) ->
    get_world_keyword_timespan_view('GET', Req, Args);
get_world_keyword_timespan_view('GET', Req, [Keyword,Start,End]) when is_list(Start) andalso is_list(End) ->
    get_world_keyword_timespan_view('GET', Req, [Keyword, list_to_integer(Start), list_to_integer(End)]);
get_world_keyword_timespan_view('GET', Req, [Keyword,Start,End]) when Start > End ->
    case backend_user:user_has_keyword(Req, Keyword) of
        {true, Username} ->
            {ok, Keys} = backend_db:query_date_range({Username, Keyword, worldmap}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Info} = mapred_weight:mapred(Keys),
            Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{A,backend_utils:fix_double_number(B)} || {A,B} <- Info]})]});
        {false, _} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Keyword does not exist in the database."), ?API_HEADER_CACHE);
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_world_keyword_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

%
% TODO: Fix if it gets made. No info in the req. document.
%
get_world_view_country('POST', Req, [Country]) ->
    get_world_view_country('GET', Req, [Country]);
get_world_view_country('GET', Req, [_Country]) ->
    case backend_login:get_username(Req) of
        "" -> ok;
        _Username -> {ok, Keys} = backend_db:query_date_range({}, backend_utils:get_date_from(1440),"9"),
                    {ok, Info} = mapred_weight:mapred(Keys),
                    Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{A,backend_utils:fix_double_number(B)} || {A,B} <- Info]})]})
    end.

get_top_keyword_view(_, Req) ->
    get_top_keyword_timespan_view('GET', Req, [1440, 0]).

get_top_keyword_timespan_view('GET', Req, [Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_keyword_timespan_view('GET', Req, [list_to_integer(Start), list_to_integer(End)]);
get_top_keyword_timespan_view('GET', Req, [Start, End]) when Start > End ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            {ok, Keys} = backend_db:query_date_range({Username, words}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Info} = mapred_count:mapred(Keys),
            Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{A,integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_keyword_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

get_top_hashtag_view('GET', Req) ->
    get_top_hashtag_timespan_view('GET', Req, [1440, 0]).

get_top_hashtag_timespan_view('GET', Req, [Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_hashtag_timespan_view('GET', Req, [list_to_integer(Start), list_to_integer(End)]);
get_top_hashtag_timespan_view('GET', Req, [Start, End]) when Start > End ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            {ok, Keys} = backend_db:query_date_range({Username, hashtags}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Info} = mapred_count:mapred(Keys),
            Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{A,integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_hashtag_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

get_top_user_view('GET', Req) ->
    get_top_user_timespan_view('GET', Req, [1440, 0]).

get_top_user_timespan_view('GET', Req, [Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_user_timespan_view('GET', Req, [list_to_integer(Start), list_to_integer(End)]);
get_top_user_timespan_view('GET', Req, [Start, End]) when Start > End ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            {ok, Keys} = backend_db:query_date_range({Username, users}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Info} = mapred_count:mapred(Keys),
            Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{A,integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_user_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

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
                        "Login failed!", mochiweb_cookies:cookie(?SESSION_COOKIE,"", [{path, "/"},{max_age,0}]))
            end
    end;
login('GET', Req) ->
    backend_utils:redirect(Req, "/",
        "Error! No login credentials.").

logout('GET', Req) ->
    Cookie = backend_login:logout(Req),
    backend_utils:redirect(Req, "/",
        "Login Successfull!", Cookie);
logout('POST', Req) ->
    logout('GET', Req).

%illegal_access_response(Req) ->
%    Cookie = mochiweb_cookies:cookie(?SESSION_COOKIE,"expired", [{path, "/"},{max_age,0}]),
%    backend_utils:illegal_access(Req, ?API_NO_LOGIN_MSG, Cookie).

add_user_keyword(_, Req, []) ->
    backend_utils:error_response(Req, ?API_ERROR_MSG);
add_user_keyword('POST', Req, Keywords) ->
    add_user_keyword('GET', Req, Keywords);
add_user_keyword('GET', Req, [Keyword]) ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req, backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            backend_user:add_user_keywords(Username, Keyword),
            Req:ok({"application/json",
                    ?API_HEADER,[mochijson2:encode({struct,[{status,<<"ok">>}]})]})
    end.

get_user_keywords('POST', Req) ->
    get_user_keywords('GET', Req);
get_user_keywords('GET', Req) ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req, backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
                Keys = backend_user:get_user_keywords(Username),
                Keywords = lists:map(fun (X) -> list_to_binary(X) end, Keys),
                Req:ok({"application/json",
                        ?API_HEADER, [mochijson2:encode({struct,[{"keywords",Keywords}]})]})
    end.

serve_files('POST', Req) ->
    serve_files('GET', Req);
serve_files('GET', Req) ->
    "/" ++ Path = Req:get(path),
    case filelib:is_file(filename:join([?HARDCODED_FOLDER, Path])) of
        true ->
            Req:serve_file(Path, ?HARDCODED_FOLDER);
        false ->
            Req:not_found()
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
