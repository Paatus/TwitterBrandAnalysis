-module(backend_utils).

-export([redirect/3, redirect/4, illegal_access/2, illegal_access/3, error_response/2, api_error_response/2,api_error_response/3]).
-export([json_error/1]).
-export([get_directory/0, get_ip/1, print_hostinfo/1, get_date_from/1, fix_double_number/1]).
-export([generate_uuid/0, uuid_to_string/1, hash_input/1]).

-include("backend_config.hrl").

redirect(Req, Location, Message) ->
    Req:respond({302,
                 [{"Location", Location},
                  {"Content-Type", "text/html; charset=UTF-8"}],
                 Message}).
redirect(Req, Location, Message, Cookie) ->
    Req:respond({302,
                 [{"Location", Location},
                  {"Content-Type", "text/html; charset=UTF-8"},
                  Cookie],
                 Message}).

illegal_access(Req,Message) ->
    illegal_access(Req,Message,[]).
illegal_access(Req,Message,ExtraHeader) ->
    Req:respond({403,
                 [
                  {"Content-Type", "text/html; charset=UTF-8"},ExtraHeader
                 ],
                 Message}).

error_response(Req,Message) ->
    Req:respond({400,
                 [
                  {"Content-Type", "text/html; charset=UTF-8"}
                 ],
                 Message}).

api_error_response(Req,Message) ->
    api_error_response(Req,Message,[]).
api_error_response(Req,Message,ExtraHeader) ->
    Req:respond({400,
                 [
                  {"Content-Type", "application/json; charset=UTF-8"},
                  ExtraHeader
                 ],
                 Message}).

json_error(Text) ->
    [mochijson2:encode({struct,[{error, list_to_binary(Text)}]})].

hash_input(Input) -> crypto:hash(sha512,lists:append(Input,?SALT_VALUE)).

generate_uuid() ->
    generate_uuid(uuid_rand(math:pow(2, 48)) - 1, uuid_rand(math:pow(2, 12)) - 1, uuid_rand(math:pow(2, 32)) - 1, uuid_rand(math:pow(2, 30)) - 1).
generate_uuid(R1, R2, R3, R4) ->
    <<R1:48, 4:4, R2:12, 2:2, R3:32, R4: 30>>.

uuid_rand(F) ->
    crypto:rand_uniform(0, round(F)).
    %random:uniform(round(F)).

uuid_to_string(U) ->
    lists:flatten(io_lib:format("~8.16.0b-~4.16.0b-~4.16.0b-~2.16.0b~2.16.0b-~12.16.0b", get_parts(U))).

get_parts(<<TL:32, TM:16, THV:16, CSR:8, CSL:8, N:48>>) ->
        [TL, TM, THV, CSR, CSL, N].

get_ip(Req) ->
    Req:get(peer).

print_hostinfo(Req) ->
    {ok, {hostent, Hostname,_,_,_,[Ip]}} = inet:gethostbyaddr(Req:get(peer)),
    io:format("Connection from: ~s (~s)~n",[Hostname,inet:ntoa(Ip)]).

get_directory() ->
    case ?HARDCODED_FOLDER of
        "" -> {file, Here} = code:is_loaded(?MODULE),
            io:format("~p~n",[Here]),
                filename:dirname(filename:dirname(Here)) ++ "/www";
        Path -> Path
    end.

get_date_from(Minutes) ->
    {{Year, Months, Days}, {H, M, _S}} = subtract_minutes(calendar:universal_time(), Minutes),
    fix_single_digit(Year) ++ "-" ++ fix_single_digit(Months) ++ "-" ++ fix_single_digit(Days) ++ " " ++ fix_single_digit(H) ++ ":" ++ fix_single_digit(M).

subtract_minutes({{Year, Months, Days}, {Hours, Minutes, _Seconds}},M) when Minutes >= M ->
    {{Year, Months, Days}, {Hours, Minutes - M, _Seconds}};
subtract_minutes({{Year, Months, Days}, {Hours, Minutes, _Seconds}},M) when Hours >= 1 ->
    subtract_minutes({{Year, Months, Days}, {Hours - 1, Minutes, _Seconds}}, M - 60);
subtract_minutes({{Year, Months, Days}, {_Hours, Minutes, _Seconds}},M) when Days > 1   ->
    subtract_minutes({{Year, Months, Days - 1}, {23, Minutes, _Seconds}}, M - 60);
subtract_minutes({{Year, Months, _Days}, {_Hours, Minutes, _Seconds}},M) when Months > 1 ->
    subtract_minutes({{Year, Months - 1, calendar:last_day_of_the_month(Year, Months - 1)}, {23, Minutes, _Seconds}}, M - 60);
subtract_minutes({{Year, _Months, _Days}, {_Hours, Minutes, _Seconds}},M) ->
    subtract_minutes({{Year - 1, 12, calendar:last_day_of_the_month(Year - 1, 12)}, {23, Minutes, _Seconds}}, M - 60).

fix_single_digit(X) when X < 10 -> "0" ++ integer_to_list(X);
fix_single_digit(X) -> integer_to_list(X).

fix_double_number({A,B}) -> [fix_number(A), fix_number(B)].
fix_number(A) when is_float(A) -> float_to_binary(A);
fix_number(A) when is_integer(A) -> integer_to_binary(A).
