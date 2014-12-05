-module(backend_utils).

-export([create_login/2, redirect/3, redirect/4, get_ip/1, print_hostinfo/1]).
-export([generate_uuid/0, uuid_to_string/1, hash_input/1]).

-include("backend_config.hrl").

create_login(Username, Password) ->
    backend_db:put("Login", Username, hash_input(Password),[]).

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
