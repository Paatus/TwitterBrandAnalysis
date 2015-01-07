-module(backend_views).

-export([urls/0, get_world_view_country/3, login/2, add_user_keyword/3, del_user_keyword/3, get_user_keywords/2, logout/2, serve_files/2]).
-export([login_json_view/2]).
-export([get_world_view/2, get_world_timespan_view/3]).
-export([get_world_keyword_view/3, get_world_keyword_timespan_view/3]).
-export([get_top_keywords_view/2, get_top_keywords_timespan_view/3]).
-export([get_top_hashtags_view/2, get_top_hashtags_timespan_view/3]).
-export([get_top_users_view/2, get_top_users_timespan_view/3]).
-export([get_amount_view/3, get_amount_timespan_view/3]).
-export([admin_change_password_view/2,admin_add_user_view/2,admin_remove_user_view/2,admin_get_users_view/2]).
-export([get_admin_view/2]).
-export([change_password/2]).

-include("backend_config.hrl").

%
% urls/1 is where the dynamic pages is defined in a
% tuple containing a regular expression and the name of the function
% that handles the call.
%

urls() -> [
           {"^api/world/total/?$", get_world_view                                                     },
           {"^api/world/total/\\d{1,6}/\\d{1,6}/?$", get_world_timespan_view                          },
           {"^api/world/keyword/(\\w{3,64})/?$", get_world_keyword_view                               },
           {"^api/world/keyword/(\\w{3,64})/(\\d{1,6})/(\\d{1,6})/?$", get_world_keyword_timespan_view},
           {"^api/world/country/(\\w{3,64})/?$", get_world_view_country                               },
           {"^api/top/keyword/?$", get_top_keywords_view                                              },
           {"^api/top/keyword/(\\d{1,6})/(\\d{1,6})/?$", get_top_keywords_timespan_view               },
           {"^api/top/keyword/(\\w{3,64})/(\\d{1,6})/(\\d{1,6})/?$", get_top_keywords_timespan_view   },
           {"^api/top/hashtag/?$", get_top_hashtags_view                                              },
           {"^api/top/hashtag/(\\d{1,6})/(\\d{1,6})/?$", get_top_hashtags_timespan_view               },
           {"^api/top/hashtag/(\\w{3,64})/(\\d{1,6})/(\\d{1,6})/?$", get_top_hashtags_timespan_view   },
           {"^api/top/user/?$", get_top_users_view                                                    },
           {"^api/top/user/(\\d{1,6})/(\\d{1,6})/?$", get_top_users_timespan_view                     },
           {"^api/top/user/(\\w{3,64})/(\\d{1,6})/(\\d{1,6})/?$", get_top_users_timespan_view         },
           {"^api/amount/(\\w{3,64})/?$", get_amount_view                                             },
           {"^api/amount/(\\w{3,64})/(\\d{1,6})/(\\d{1,6})/?$", get_amount_timespan_view              },
           {"^api/login/?$", login                                                                    },
           {"^api/login/json/?$", login_json_view                                                                    },
           {"^api/logout/?$", logout                                                                  },
           {"^api/account/change_password/?$", change_password                                        },
           {"^api/keywords/add/(\\w{3,64})/?$", add_user_keyword                                      },
           {"^api/keywords/delete/(\\w{3,64})/?$", del_user_keyword                                   },
           {"^api/keywords/get/?$", get_user_keywords                                                 },
           {"^api/admin/change_password/?$", admin_change_password_view                               },
           {"^api/admin/add_user/?$", admin_add_user_view                                             },
           {"^api/admin/remove_user/?$", admin_remove_user_view                                       },
           {"^api/admin/get_all_usernames/?$", admin_get_users_view                                   },
           {"^admin/.*$", get_admin_view                                                              },
           {"^(?:js|css|font|vendor|imgs)/.*$", serve_files                                           }
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
            {ok, Pid} = backend_db:start_link(),
            {ok, Info} = backend_mapred_weight:mapred(Pid, Keys),
            backend_db:close_link(Pid),
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
            {ok, Pid} = backend_db:start_link(),
            {ok, Info} = backend_mapred_weight:mapred(Pid, Keys),
            backend_db:close_link(Pid),
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
            {ok, Pid} = backend_db:start_link(),
                    {ok, Info} = backend_mapred_weight:mapred(Pid, Keys),
            backend_db:close_link(Pid),
                    Req:ok({"application/json",?API_HEADER, [mochijson2:encode({struct,[{A,backend_utils:fix_double_number(B)} || {A,B} <- Info]})]})
    end.

get_top_keywords_view(_, Req) ->
    get_top_keywords_timespan_view('GET', Req, [1440, 0]).

get_top_keywords_timespan_view('GET', Req, [Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_keywords_timespan_view('GET', Req, [list_to_integer(Start), list_to_integer(End)]);
get_top_keywords_timespan_view('GET', Req, [Start, End]) when Start > End ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            {ok, Keys} = backend_db:query_date_range({Username, words}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Pid} = backend_db:start_link(),
            Info = backend_mapred_count:mapred(Pid, Keys),
            backend_db:close_link(Pid),
            Enc = mochijson2:encoder([{utf8,true}]),
            Req:ok({"application/json",?API_HEADER, [Enc({struct,[{unicode:characters_to_binary(binary_to_list(A)),integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_keywords_timespan_view('GET', Req, [Keyword, Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_keywords_timespan_view('GET', Req, [Keyword, list_to_integer(Start), list_to_integer(End)]);
get_top_keywords_timespan_view('GET', Req, [Keyword, Start, End]) when Start > End andalso length(Keyword) > 0 ->
    case backend_user:user_has_keyword(Req, Keyword) of
        {false, _} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Keyword does not exist in the database."), ?API_HEADER_CACHE);
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {true, Username} ->
            {ok, Keys} = backend_db:query_date_range({Username, Keyword, words}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Pid} = backend_db:start_link(),
            Info = backend_mapred_count:mapred(Pid, Keys),
            backend_db:close_link(Pid),
            Enc = mochijson2:encoder([{utf8,true}]),
            Req:ok({"application/json",?API_HEADER, [Enc({struct,[{unicode:characters_to_binary(binary_to_list(A)),integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_keywords_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

get_top_hashtags_view('GET', Req) ->
    get_top_hashtags_timespan_view('GET', Req, [1440, 0]).

get_top_hashtags_timespan_view('GET', Req, [Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_hashtags_timespan_view('GET', Req, [list_to_integer(Start), list_to_integer(End)]);
get_top_hashtags_timespan_view('GET', Req, [Start, End]) when Start > End ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            {ok, Keys} = backend_db:query_date_range({Username, hashtags}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Pid} = backend_db:start_link(),
            Info = backend_mapred_count:mapred(Pid, Keys),
            backend_db:close_link(Pid),
            Enc = mochijson2:encoder([{utf8,true}]),
            Req:ok({"application/json",?API_HEADER, [Enc({struct,[{unicode:characters_to_binary(binary_to_list(A)),integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_hashtags_timespan_view('GET', Req, [Keyword, Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_hashtags_timespan_view('GET', Req, [Keyword, list_to_integer(Start), list_to_integer(End)]);
get_top_hashtags_timespan_view('GET', Req, [Keyword, Start, End]) when Start > End andalso length(Keyword) > 0 ->
    case backend_user:user_has_keyword(Req, Keyword) of
        {false, _} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Keyword does not exist in the database."), ?API_HEADER_CACHE);
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {true, Username} ->
            {ok, Keys} = backend_db:query_date_range({Username, Keyword, hashtags}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Pid} = backend_db:start_link(),
            Info = backend_mapred_count:mapred(Pid, Keys),
            backend_db:close_link(Pid),
            Enc = mochijson2:encoder([{utf8,true}]),
            Req:ok({"application/json",?API_HEADER, [Enc({struct,[{unicode:characters_to_binary(binary_to_list(A)),integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_hashtags_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

get_top_users_view('GET', Req) ->
    get_top_users_timespan_view('GET', Req, [1440, 0]).

get_top_users_timespan_view('GET', Req, [Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_users_timespan_view('GET', Req, [list_to_integer(Start), list_to_integer(End)]);
get_top_users_timespan_view('GET', Req, [Start, End]) when Start > End ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            {ok, Keys} = backend_db:query_date_range({Username, users}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Pid} = backend_db:start_link(),
            Info = backend_mapred_count:mapred(Pid, Keys),
            backend_db:close_link(Pid),
            Enc = mochijson2:encoder([{utf8,true}]),
            Req:ok({"application/json",?API_HEADER, [Enc({struct,[{unicode:characters_to_binary(binary_to_list(A)),integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_users_timespan_view('GET', Req, [Keyword, Start, End]) when is_list(Start) andalso is_list(End) ->
    get_top_users_timespan_view('GET', Req, [Keyword, list_to_integer(Start), list_to_integer(End)]);
get_top_users_timespan_view('GET', Req, [Keyword, Start, End]) when Start > End andalso length(Keyword) > 0 ->
    case backend_user:user_has_keyword(Req, Keyword) of
        {false, _} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Keyword does not exist in the database."), ?API_HEADER_CACHE);
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {true, Username} ->
            {ok, Keys} = backend_db:query_date_range({Username, Keyword, users}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Pid} = backend_db:start_link(),
            Info = backend_mapred_count:mapred(Pid, Keys),
            backend_db:close_link(Pid),
            Enc = mochijson2:encoder([{utf8,true}]),
            Req:ok({"application/json",?API_HEADER, [Enc({struct,[{unicode:characters_to_binary(binary_to_list(A)),integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_top_users_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

get_amount_view(_, Req, [Keyword]) ->
    get_amount_timespan_view('GET', Req, [Keyword, 1440, 0]).

get_amount_timespan_view('GET', Req, [Keyword, Start, End]) when is_list(Start) andalso is_list(End) ->
    get_amount_timespan_view('GET', Req, [Keyword, list_to_integer(Start), list_to_integer(End)]);
get_amount_timespan_view('GET', Req, [Keyword, Start, End]) when Start > End andalso length(Keyword) > 0 ->
    case backend_user:user_has_keyword(Req, Keyword) of
        {false, _} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Keyword does not exist in the database."), ?API_HEADER_CACHE);
        {error, Reason} ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {true, Username} ->
            {ok, Keys} = backend_db:query_date_range({Username, Keyword, amount}, backend_utils:get_date_from(Start),backend_utils:get_date_from(End)),
            {ok, Pid} = backend_db:start_link(),
            Info = backend_mapred_count:mapred(Pid, Keys),
            backend_db:close_link(Pid),
            Enc = mochijson2:encoder([{utf8,true}]),
            Req:ok({"application/json",?API_HEADER, [Enc({struct,[{unicode:characters_to_binary(atom_to_list(A)),integer_to_binary(B)} || {A,B} <- Info]})]});
        _ ->
            backend_utils:api_error_response(Req,
                                             backend_utils:json_error("Unknown error"), ?API_HEADER_CACHE)
    end;
get_amount_timespan_view('GET', Req, _) ->
    backend_utils:api_error_response(Req,
         backend_utils:json_error("Api error time is incorrect!"), ?API_HEADER_CACHE).

login('POST', Req) ->
    case backend_user:validate_login(Req) of
        {{First,_},{Second,_}} when First == false orelse Second == false ->
            backend_utils:redirect(Req, "/",
                "Login failed!");
        {{true, Username},{true, Password}} ->
            case backend_login:authenticate(Username,Password) of
                true ->
                    Cookie = backend_login:create_cookie(Username, backend_utils:get_ip(Req)),
                    case Username of
                        "admin" ->
                            backend_utils:redirect(Req, "/admin/",
                                "Login Successfull!", Cookie);
                        _ ->
                            backend_utils:redirect(Req, "/",
                                "Login Successfull!", Cookie)
                    end;
                _ ->
                    backend_utils:redirect(Req, "/",
                        "Login failed!", mochiweb_cookies:cookie(?SESSION_COOKIE,"", [{path, "/"},{max_age,0}]))
            end
    end;
login('GET', Req) ->
    backend_utils:redirect(Req, "/",
        "Error! No login credentials.").

login_json_view('POST', Req) ->
    case backend_user:validate_login(Req) of
        {{First,_},{Second,_}} when First == false orelse Second == false ->
                backend_utils:api_error_response(Req, [mochijson2:encode({struct,[{status,list_to_binary("Error account doesn't exist!")}, {code, list_to_binary("error")}]})], ?API_HEADER_CACHE);
        {{true, Username},{true, Password}} ->
            case backend_login:authenticate(Username,Password) of
                true ->
                    Cookie = backend_login:create_cookie(Username, backend_utils:get_ip(Req)),
                    case Username of
                        _ ->
                            Req:ok({"application/json",
                                    [?API_HEADER_CACHE, Cookie]  ,[mochijson2:encode({struct,[{status,list_to_binary("Login Successfull!")}, {code, list_to_binary("success")}]})]})
                    end;
                _ ->
                    backend_utils:api_error_response(Req, [mochijson2:encode({struct,[{status,list_to_binary("Error account doesn't exist!")}, {code, list_to_binary("error")}]})], ?API_HEADER_CACHE)
            end
    end;
login_json_view('GET', Req) ->
    backend_utils:api_error_response(Req, [mochijson2:encode({struct,[{status,list_to_binary("Error account doesn't exist!")}, {code, list_to_binary("error")}]})], ?API_HEADER_CACHE).

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
            backend_user:add_user_keywords(Username, string:to_lower(Keyword)),
            Req:ok({"application/json",
                    ?API_HEADER,[mochijson2:encode({struct,[{status,<<"ok">>}]})]})
    end.

del_user_keyword(_, Req, []) ->
    backend_utils:error_response(Req, ?API_ERROR_MSG);
del_user_keyword('POST', Req, Keywords) ->
    del_user_keyword('GET', Req, Keywords);
del_user_keyword('GET', Req, [Keyword]) ->
    case backend_login:check_cookie(Req) of
        {error, Reason} ->
            backend_utils:api_error_response(Req, backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {Username,_} ->
            backend_user:del_user_keywords(Username, string:to_lower(Keyword)),
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

change_password('POST', Req) ->
    Post = Req:parse_post(),
    Password = proplists:get_value("pwd",Post,""),
    case backend_user:change_user_password(Req, Password) of
        {error, Reason} ->
            backend_utils:api_error_response(Req, backend_utils:json_error(Reason), ?API_HEADER_CACHE);
        {true, Reason} ->
            Req:ok({"application/json",
                    ?API_HEADER,[mochijson2:encode({struct,[{status,list_to_binary(Reason)}]})]})

    end;
change_password('GET', Req) ->
    backend_utils:api_error_response(Req, backend_utils:json_error("API call is invalid."), ?API_HEADER_CACHE).

get_admin_view('POST', Req) ->
    serve_files('GET', Req);
get_admin_view('GET', Req) ->
    "/" ++ Path = Req:get(path),
    case backend_login:check_cookie(Req) of
        {"admin", _} ->
            case filelib:is_file(filename:join([?HARDCODED_FOLDER, Path])) of
                true ->
                    Req:serve_file(Path, ?HARDCODED_FOLDER);
                false ->
                    Req:not_found()
            end;
        _ ->
            Req:not_found()
    end.

admin_change_password_view('GET', Req) ->
        Req:not_found();
admin_change_password_view('POST', Req) ->
    case backend_login:check_cookie(Req) of
        {"admin", _} ->
            Post = Req:parse_post(),
            Username = proplists:get_value("username",Post,""),
            Password = proplists:get_value("pwd",Post,"temp"),
            case backend_db:fetch(?LOGIN_BUCKET, Username) of
                {ok, _} ->
                    backend_user:change_user_password(Username, Password),
                    Req:ok({"application/json",
                            ?API_HEADER,[mochijson2:encode({struct,[{status,list_to_binary("Successfully changed users password!")}, {code, list_to_binary("success")}]})]});
                _ ->
                    Req:ok({"application/json",
                            ?API_HEADER,[mochijson2:encode({struct,[{status,list_to_binary("Error account doesn't exist!")}, {code, list_to_binary("error")}]})]})
            end;
        _ -> Req:not_found()
    end.

admin_add_user_view('GET', Req) ->
        Req:not_found();
admin_add_user_view('POST', Req) ->
    case backend_login:check_cookie(Req) of
        {"admin", _} ->
            Post = Req:parse_post(),
            Username = proplists:get_value("username",Post,""),
            Password = proplists:get_value("pwd",Post,"temp"),
            case backend_db:fetch(?LOGIN_BUCKET, Username) of
                {ok, _} ->
                    Req:ok({"application/json",
                            ?API_HEADER,[mochijson2:encode({struct,[{status,list_to_binary("Error account already exists!")}, {code, list_to_binary("error")}]})]});
                _ ->
                    backend_user:create_account(Username, Password),
                    Req:ok({"application/json",
                            ?API_HEADER,[mochijson2:encode({struct,[{status,list_to_binary("Successfully added user!")}, {code, list_to_binary("success")}]})]})
             end;
        _ -> Req:not_found()
    end.

admin_remove_user_view('GET', Req) ->
        Req:not_found();
admin_remove_user_view('POST', Req) ->
    case backend_login:check_cookie(Req) of
        {"admin", _} ->
            Post = Req:parse_post(),
            Username = proplists:get_value("username",Post,""),
            case backend_db:fetch(?LOGIN_BUCKET, Username) of
                {ok, _} ->
                    backend_user:remove_account(Username),
                    Req:ok({"application/json",
                            ?API_HEADER,[mochijson2:encode({struct,[{status,list_to_binary("Successfully removed user!")}, {code, list_to_binary("success")}]})]});
                _ ->
                    Req:ok({"application/json",
                            ?API_HEADER,[mochijson2:encode({struct,[{status,list_to_binary("Error account doesn't exist!")}, {code, list_to_binary("error")}]})]})
            end;
        _ -> Req:not_found()
    end.

admin_get_users_view('POST', Req) ->
    admin_get_users_view('GET', Req);
admin_get_users_view('GET', Req) ->
    case backend_login:check_cookie(Req) of
        {"admin", _} ->
            {ok, Users} = backend_db:get_all_usernames(),
            Req:ok({"application/json",
                    ?API_HEADER,[mochijson2:encode({struct,[{users,[list_to_binary(V) || V <- Users]}]})]});
        _ -> Req:not_found()
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
