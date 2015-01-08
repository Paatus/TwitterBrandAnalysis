from nltk import *
import pickle
import re
import string
import json

stopwords_data = None
wordlist = None
model = None

def processTweet(tweet):
    tweet = tweet.lower()
    tweet = re.sub(r'((www\.[\s]+)|(https?://[^\s]+))','URL',tweet)
    tweet = re.sub(r'[!"#$%&\'()*+,\-_./:;<=>?\\\[\]^`\{\|\}~]', '', tweet)    
    tweet = re.sub(r'@\S+','AT_USER',tweet)
    tweet = re.sub(r'(\S)\1{2,}', r'\1\1', tweet)
    tweet = re.sub(r'\s{2,}', ' ', tweet)
    tweet = re.sub(r'(^\s+|\s+$)', '', tweet)
    return tweet

def stopwords(tweet):
    global stopwords_data
    tweet = processTweet(tweet)
    tokens = []
    tweet = word_tokenize(tweet)
    if not stopwords_data:
        with open("stopwords.p", "rb") as f:
            stopwords_data = pickle.load(f)
    for word in tweet:
        if word not in stopwords_data:
            tokens.append(word)
    return tokens

def extract_features(document):
    global wordlist
    if not wordlist:
        with open("wordlist.p", "rb") as f:
            wordlist = pickle.load(f)
    document_words = set(document)
    features = {}
    for word in wordlist:
        features['contains(%s)' % word] = (word in document_words)
    return features

def getWeight(tweet):
    global model
    tweet = tweet.decode('utf-8')
    tweet = processTweet(tweet)
    print(tweet)
    if not model:
        with open("model.p", "rb") as f:
            model = pickle.load(f)
    tweet = stopwords(tweet)
    document = tweet
    weight = model.classify(extract_features(document))
    return weight
