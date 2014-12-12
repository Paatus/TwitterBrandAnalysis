import nltk
from nltk import *
import pickle
import re
import string
import json

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

#start
def stopwords(tweet):
    tweet = processTweet(tweet)
    tokens = []
    tweet = nltk.word_tokenize(tweet)
    stopwords = pickle.load(open("NLP/stopwords.p", "rb"))
    
    '''Append list y elimaitaing StopWords in tweet - StopWords e.g. [I,am,the,of...]'''
    for word in tweet:
        if word not in stopwords:
            tokens.append(word)
    return tokens
#end

#start
def extract_features(document):
    wordlist = pickle.load(open("NLP/wordlist.p", "rb"))
    document_words = set(document)
    features = {}
    for word in wordlist:
        features['contains(%s)' % word] = (word in document_words)
        
        #print("word features = ", word)
        #e_features = pickle.dump(features, open("e_features.p", "wb"))
    #print("features = ",features)   
    return features
#end

#start
def getWeight(tweet):
    #features = pickle.load(open("features.p", "rb"))
    tweet = tweet.decode('utf-8')
    tweet = processTweet(tweet)
    model = pickle.load(open("NLP/model.p", "rb"))
    '''call processTweet function'''
    tweet = stopwords(tweet)
    document = tweet
    weight = model.classify(extract_features(document))
    return weight
#end    
