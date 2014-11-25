-module(message_relay).
-import(pyerlTest,[pyProcess/1]).
-import(tba_riakdb,[put/3]).
-export([start/2, testTweet/0, tweetToJson/1]).

%starting mrelay loop, or if it exists returns its ID
start(User, SearchWords) ->
  case whereis(mRelay) of
    undefined ->
      {ok, spawn(fun() ->
        register(mRelay, self()),
        loop(User, SearchWords)
      end)};
    Pid ->
      {ok, Pid}
  end.

%loop waits for messages
loop(User, SearchWords) ->
  receive
    {From,{tweet, Tweet}} ->
      From ! {self(), message_get},                             %message was received, let sender know
      spawn(fun() ->                                            %spawn a process for the tweet
        %mRelay ! {self(), processTweet({tweet, Tweet})} end),  %that processes the tweet and sends it back to mrelay
        processTweet(User, SearchWords, {tweet, Tweet}) end),            %that processes the tweet and sends it back to mrelay
      loop(User, SearchWords);
    {From, stop} ->
      From ! {self(), stopped}
  end.

%Test function to quickly check if things are working
testTweet() ->
  processTweet("Faget","Iphone,phone,apple,uphone",{tweet,{
    {id, "666"},
    {text, "I bought me a new mobile apple Phone but it was bad, I am now sadness. (´•ω•̥`)"},
    {timezone, "Irkutsk"}}
  }).

processTweet(User, SearchWords, {tweet,{{_, Tid},{text, TweetBody},{_, Timezone}}}) ->
  %io:fwrite("~p~n", [TweetBody]),

  Keywords = string:tokens(SearchWords, ","),
  %io:fwrite("keywords: ~p~n", [Keywords]),

  UsedKeywords = findTweetBrand(Keywords, TweetBody),  %
  %io:fwrite("Used keywords: ~p~n", [UsedKeywords]),

  NlpWeight = pyerlTest:pyProcess(TweetBody),                   %test value replace 1 with function
  %NlpWeight = 1,                   %test value replace 1 with function
  Wtweet = {tweet,{{text, TweetBody},{weight, NlpWeight},{timezone, Timezone}}},

  [riakio:put_tweet({User, X}, Tid, Wtweet) || X <- UsedKeywords].
  %[io:format("Sent to Riak: ~p, ~p, ~p~n",[{User, X}, Tid, Wtweet]) || X <- UsedKeywords].

%---------Todo---------
%Also send the tweet to the frontend


%Which of the search words exist in the tweet?
findTweetBrand(Brands, TweetText) ->
  [X || X <- Brands, 0 < string:str(string:to_lower(TweetText), string:to_lower(X))].

%Converting tweets into a Json string format, currently not used
tweetToJson({tweet,{{id, Tid},{text, TweetBody},{weight, Weight},{timezone, Timezone},{coorinates, Coordinates}}}) ->
  string:join(["{\"tweet\":{\"id\":\"", Tid,
    "\",\"text\":\"", TweetBody,
    "\",\"weight\":\"", Weight,
    "\",\"timezone\":\"", Timezone,
    "\",\"coordinates\":\"", Coordinates,
    "}}"],"").