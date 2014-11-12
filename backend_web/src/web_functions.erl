-module(web_functions).

-export([get_directory/0, fix_qs/1, fix_string/1, fix_double_number/1, get_date_from/1]).
-export([fix_single_digit/1,subtract_minutes/2]).
 

get_directory() ->
    {file, Here} = code:is_loaded(?MODULE),
    io:format("~p~n",[Here]),
    filename:dirname(filename:dirname(Here)) ++ "/www".

fix_qs([X|Xs]) ->
    fix_qs(X) ++ fix_qs(Xs);
fix_qs({Key,[X|Xs]}) ->
    [{Key,fix_qs(X) ++ fix_qs(Xs)}];
fix_qs({Key,Value}) ->
    [{Key,fix_string(Value)}];
fix_qs([]) ->
    [].

fix_string(A) when is_list(A) ->
    case re:run(A, "^[0-9]*$") of
        {match, _} -> list_to_integer(A);
        _          -> list_to_binary(A)
    end;
fix_string(A) ->
    A.

fix_double_number({A,B}) ->
    [fix_number(A), fix_number(B)].

fix_number(A) when is_float(A) -> float_to_binary(A);
fix_number(A) when is_integer(A) -> integer_to_binary(A).

get_date_from(Minutes) ->
    {{Year, Months, Days}, {H, M, _S}} = subtract_minutes(calendar:local_time(), Minutes),
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
