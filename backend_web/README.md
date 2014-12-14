Web Backend API
===============

###URL calls:
* <b>api/world/total/</b><br />
    Gets total world view for the last 24 hours.
* <b>api/world/total/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets total world view for the given timespan.
* <b>api/world/keyword/&#60;String Keyword&#62;/</b><br />
    Gets world view based of the given keyword for the last 24 hours.
* <b>api/world/keyword/&#60;String Keyword&#62;/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets world view based of the given keyword for the given timespan.
* <b>api/world/country/&#60;String Keyword&#62;/</b><br />
    Not currently implemented.
* <b>api/top/keyword/</b><br />
    Gets top keyword for the last 24 hours.
* <b>api/top/keyword/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets top keyword for the given timespan.
* <b>api/top/keyword/&#60;String Keyword&#62;/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets top keyword from keywords for the given timespan.
* <b>api/top/hashtag/</b><br />
    Gets top hashtags for the last 24 hours.
* <b>api/top/hashtag/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets top hashtags for the given timespan.
* <b>api/top/hashtag/&#60;String Keyword&#62;/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets top hashtags from keywords for the given timespan.
* <b>api/top/user/</b><br />
    Gets top usernames for the last 24 hours.
* <b>api/top/user/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets top usernames for the given timespan.
* <b>api/top/user/&#60;String Keyword&#62;/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets top usernames from keywords for the given timespan.
* <b>api/amount/&#60;String Keyword&#62;/</b><br />
    Gets the amount from keyword in the last 24 hours.
* <b>api/amount/&#60;String Keyword&#62;/&#60;Number StartTime&#62;/&#60;Number StopTime&#62;/</b><br />
    Gets the amount from keyword in the given timespan.
* <b>api/login/</b><br />
    A post call that handles login. Uses <b>username</b> and <b>pwd</b> as input.
* <b>api/logout/</b><br />
    A logout call.
* <b>api/account/change_password/</b><br />
    A post call that changes the current users password. Uses <b>pwd</b> as input.
* <b>api/keywords/add/&#60;String Keyword&#62;</b><br />
    Adds a new keyword to the current user.
* <b>api/keywords/get</b><br />
    Gets all the registered keywords.


###Usage:
All calls are gets if not stated otherwise.<br />
Keywords are ascii strings 3-64 characters long.<br />
The time fields are integers 1-6 characters long and states a range defined in minutes..<br />
