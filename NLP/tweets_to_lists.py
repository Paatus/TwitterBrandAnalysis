import re
import string
#Function takes a file and a value as an argument.
#Each line in the file will be added to a list together with the value as a tuple.
def processTweet(tweet):
    #decode bytestring utf-8
    #tweet = tweet.decode('utf-8')
    #Convert to lower case
   
    tweet = tweet.lower()
    #Convert www.* or https?://* to URL
    tweet = re.sub('((www\.[\s]+)|(https?://[^\s]+))','URL',tweet)
    #Convert @username to AT_USER
    tweet = re.sub('@[^\s]+','AT_USER',tweet)
    #Remove additional white spaces
    tweet = re.sub('[\s]+', ' ', tweet)
    #Replace #word with word
    tweet = re.sub(r'#([^\s]+)', r'\1', tweet)
    #look for 3 or more repetitions of character and replace with the character itself "happyyyy" = "happy"
    tweet = re.sub(r'(.)\1\1\1+', r'\1', tweet)
    #trim
    tweet = tweet.strip('\'"')
    #remove punctuation 
    tweet = re.sub('[%s]' % re.escape(string.punctuation), '', tweet)
    
    return tweet
#end
def readtweetfile(file, value):
    tweetlist = []
    for line in file:
        line = processTweet(line)
        tweetlist.append((line, value))
    return tweetlist

#Lines read from the file has a trailing line break.
#This function returns a new list without the line breaks.
def removelinebreaks(inlist):
    outlist = []
    for i in inlist:
        outlist.append((i[0].rstrip(), i[1]))
    return outlist

#Opens files one at a time and sends them through the readtweetfile function.
#Also runs the function to remove trailing line breaks.
fgood = open("good.txt", "r")
goodlist = readtweetfile(fgood, 1)
fgood.close()
pos_tweets = removelinebreaks(goodlist)
#print(pos_tweets)


fbad = open("bad.txt", "r")
badlist = readtweetfile(fbad, 0)
fbad.close()
neg_tweets = removelinebreaks(badlist)
#print(neg_tweets)


fneutral = open("neutral.txt", "r")
neutrallist = readtweetfile(fneutral, 0.5)
fneutral.close()
net_tweets = removelinebreaks(neutrallist)
#print(net_tweets)

tgood = open("testgood.txt", "r")
tgoodlist = readtweetfile(tgood, 1)
tgood.close()
testpos_tweets = removelinebreaks(tgoodlist)
#print(pos_tweets)


tbad = open("testbad.txt", "r")
tbadlist = readtweetfile(tbad, 0)
tbad.close()
testneg_tweets = removelinebreaks(tbadlist)
#print(neg_tweets)


tneutral = open("testneutral.txt", "r")
tneutrallist = readtweetfile(tneutral, 0.5)
tneutral.close()
testnet_tweets = removelinebreaks(tneutrallist)
#print(net_tweets)

