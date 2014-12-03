TwitterBrandAnalysis
====================

###Description
Project for analysing brand health according to tweets

###Folder Structure
* <b>backend\_web/</b><br />
    Files related to the websocket server.
* <b>NLP/</b><br />
    Files related to Natural Language Processing.
* <b>Frontend/</b><br />
    Files related to displaying data. Different frontends go into subfolders, e.g. web/ ios/ and so on.
* <b>src/mining/</b><br />
    Files related to mining data from twitter.
* <b>src/database/</b><br />
    Files related to Riak input and output.
* <b>src/main/</b><br />
    Files connecting other parts together.
* <b>src/pyerl/</b><br />
    Files related to connecting Erlang and Python.

###Git Instructions
* <b> Fetching latest version </b><br />

` $ git fetch `

` $ git rebase `

If rebase gives an error, it's likely since some files are changed after the github, to resolve:

` $ git stash `

` $ git rebase `

` $ git stash pop `

* <b> Commiting files </b>

` $ git add [your file] `

` $ git commit -m "your message" `

` $ git push `

Depending on your git settings, you might be prompted for github username & password

###Riak\_pb fix
Until the bug with riak\_pb and rebar 2.5.1 is fixed, run `./rebar clean compile deps\_dir=..` in the riak\_pb folder.
