import nltk
from nltk import *
import json
#from pprint import pprint
import re
#import req
import string
import shelve
#import requests
'''
Author: Ian Jenkins
Description: '''

    
#tweet= b"i am good"


#-------------------------------------DO NOT MODIFY FROM HERE-----------------------------------------------------------------------------------------
'''Variables'''

#tokens = []
#count = 0

#start 
def processTweet(tweet):
    #decode bytestring utf-8
    tweet = tweet.decode('utf-8')
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

''''#start
def deleteList(tokens):
    #print(tokens)
    i = 0
    tokens = [ tokens.remove(tokens[i]) for tokens[i] in tokens]
#end'''

#start
def stopwords(tweet):
    tokens = []
    #call function proccessTweet
    tweet = processTweet(tweet)
    #tokennize tweet
    tweet = nltk.word_tokenize(tweet)
    #variable storing stopwords
    #stopwords = []
    #open stopwords text file
    #stopwords = open("stopwords.txt", 'r')
    #read stopwords file
    #stopwords = stopwords.read()
    stopwords = json.load(open("stopwords1.txt",'r'))
    '''Append list y elimaitaing StopWords in tweet - StopWords e.g. [I,am,the,of...]'''
    #create new feature words list
    #featureWords = [] 
    for word in tweet:
        if word not in stopwords:
            tokens.append(word)
            print(tokens)
    return tokens
#end

#start
def nlp(tweet):
    #call function.
    tokens = stopwords(tweet)
    #print(tokens) # Helper--------------------------delete when done----------------------'''    
    #Count no. of tokens found in words dict.
    x = 0
    #print(x)
    #Count the total points of tweets.
    count = 0  
    #Load dict of words
    #words = json.load(open("words.txt",'r'))
    with shelve.open('worddict') as words:
        
    
        '''Note switch to  keys'''
        #Check to see if tokens exist in words weighting dictonary.----------------------
        #print("unhappy",words["happy"])
      
        for token in tokens:
            print(token)
            if token in words:
                x = x + 1
                print("x = ",x)
        if x == 0:
            words.close()
            reference(tokens)
            return tokens
        
                
        #find if tweet contains "not" and then of next word is feature word swap value
        for token in tokens:
            try:
                if token == "not":
                    pos = tokens.index('not') +1
                    key = (tokens[pos])
                    
                    #point = words.get(key)
                    point = words[key]
                    point = point * (-point)
                    count = count + point
                    return count
           #delete the feature word so not to be counted again
                    del tokens[pos]  
            except:
                print("no token in dict after not")
              
            if token in words:
                #print("token",token)
                point = words[token]
                #point = words.get(token)
                count = count + point
                return count
        
def reference(tokens):
         for token in tokens:
            count = 0
            ref = token
            print(ref)
            #req.find(ref)
            
            #return count

def getWeight(tweet):
    count = nlp(tweet)
    '''-------------------------------------------------Give the weight if the tweet-------------------------------------------------------------------'''
    try:
        if(count>0):
            weight = 1
        if(count<0):
            weight = 0
        if(count==0):
            weight = 0.5
    except:
        weight = 0.5
    #deleteList(tokens)
    return print("weight = ",weight)
  #end
