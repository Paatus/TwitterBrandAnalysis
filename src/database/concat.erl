-module(concat).
-export([start/1]).

start(Bucket) ->
	loop(Bucket, 10000).
	%Retroactive concatenation of old data?
	%retroactive(Bucket).

loop(Bucket, WaitTime) ->
	receive
		{Pid, stop} ->
			Pid ! {ok, stopping}
		after WaitTime ->
			{_,{_,Min,_}} = Now = calendar:universal_time(),
			case Min rem 15 of
				0 ->
					do_concat(Bucket, Now),
					loop(Bucket, 14*60000);
				_ ->
					loop(Bucket, 10000)
			end
	end.

do_concat(Bucket, Now) ->
	FifteenAgo = remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(Now) - 15 * 60)),
	ThirtyAgo = remove_seconds(calendar:gregorian_seconds_to_datetime(calendar:datetime_to_gregorian_seconds(Now) - 30 * 60)),
	riakio:concat(Bucket, ThirtyAgo, FifteenAgo). 
	
remove_seconds({Date,{Hour, Min, _}}) ->
	{Date,{Hour, Min, 0}}.

retroactive(Bucket) ->
	{ok, Keys} = riakio:query_date_range(Bucket, "0", "9", [{return_terms, true}]),
	%Sort and mergy by indices
	%For each time period, concat
	ok.%retroconcat(Bucket, TimeList).

retroconcat(Bucket, [Time | Tail]) ->
	ok.%riakio:concat(Bucket, Time1, Time2).
