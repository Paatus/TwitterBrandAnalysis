-module(message_relay).
-import(pyerlTest,[pyProcess/1]).
-import(tba_riakdb,[put/3]).
-export([start/0, testTweet/0, tweetToJson/1]).

%starting mrelay loop, or if it exists returns its ID
start() ->
  case whereis(mRelay) of
    undefined ->
      {ok, spawn(fun() ->
        register(mRelay, self()),
        loop()
      end)};
    Pid ->
      {ok, Pid}
  end.

%loop waits for messages
loop() ->
  receive
    {From, {tweet, Tweet}} ->
      From ! {self(), message_get},                             %message was received, let sender know
      spawn(fun() ->                                            %spawn a process for the tweet
        %mRelay ! {self(), processTweet({tweet, Tweet})} end),  %that processes the tweet and sends it back to mrelay
        processTweet({tweet, Tweet}) end),                      %that processes the tweet and sends it back to mrelay
      loop();
    {From, stop} ->
      From ! {self(), stopped}
    %{From, Json} ->                                            %tweets parsed to Json
    %  %From ! json_get,
    %  riak ! {self(), Json},                                   %Are sent to the database
    %  loop()
  end.

%Test function to quickly check if things are working
testTweet() ->
  processTweet({tweet,{
              {id, "666"},
              {text, "I bought me a new mobile phone but it was bad, I am now sadness. (´•ω•̥`)"},
              {timezone, "Irkutsk"}}
  }).

processTweet({tweet,{{_, Tid},{text, TweetBody},{weight, _},{_, Timezone}}}) ->
  %io:fwrite("~p~n", [TweetBody]),
  %Send Tweet body to erl->py->python-NLP, returns the value of the weight

  NlpWeight = pyerlTest:pyProcess(TweetBody),                   %test value replace 1 with function
  Wtweet = {tweet,{{text, TweetBody},{weight, NlpWeight},{timezone, Timezone}}},

  tba_riakdb:put_tweet("gigabucket", Tid, Wtweet),
  io:fwrite("~p was sent to riak~n", [Wtweet]).                 %test print

  %Also send the tweet to the frontend

%Converting tweets into a Json string format, currently not used
tweetToJson({tweet,{{id, Tid},{text, TweetBody},{weight, Weight},{timezone, Timezone},{coorinates, Coordinates}}}) ->
  string:join(["{\"tweet\":{\"id\":\"", Tid,
                           "\",\"text\":\"", TweetBody,
                           "\",\"weight\":\"", Weight,
                           "\",\"timezone\":\"", Timezone,
                           "\",\"coordinates\":\"", Coordinates,
  "}}"],"").
