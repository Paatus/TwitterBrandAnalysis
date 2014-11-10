TwitterBrandAnalysis
====================

###Description
Project for analysing brand health according to tweets

###Folder Structure
* <b>backend\_web/</b><br />
    Files for the websocket server
* <b>Database/</b><br />
    Riak-regarding files
* <b>Frontend/</b><br />
    All the files regarding displaying data, different frontends go into subfolders, e.g.
    web/ ios/ and so on.
* <b>Mining/</b><br />
    Everything regarding mining data from twitter
* <b>NLP/</b><br />
    The files regarding Natural Language Processing go within this folder

###Git Instructions
* <b> Fetching latest version <b><br />

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
