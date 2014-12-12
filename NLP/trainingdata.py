import nltk
from nltk import *
import pickle
import tweets_to_lists
import json
import string
'''Stopswords are words that have no sentiment meaning'''
#start
def stopwords(tweets):
    tokens = []
    
    tweets = nltk.word_tokenize(tweets)
    stopwords = pickle.load(open("stopwords.p", "rb"))
    
    '''Append list y elimaitaing StopWords in tweet - StopWords e.g. [I,am,the,of...]'''
    for word in tweets:
        if word not in stopwords:
            tokens.append(word)
    return tokens
#end

#start 
'''.............................Load tweets.....................................................'''
pos_tweets = tweets_to_lists.pos_tweets
neg_tweets = tweets_to_lists.neg_tweets
net_tweets = tweets_to_lists.net_tweets

tweets = []
# Append tweet 
for (words, sentiment) in pos_tweets + neg_tweets+net_tweets:
    words_filtered = [e.lower() for e in words.split() if len(e) >= 3]
    for words in words_filtered:
        words_filtered = stopwords(words)
        tweets.append((words_filtered, sentiment))

#-test_tweets start
testpos_tweets = tweets_to_lists.testpos_tweets
testneg_tweets = tweets_to_lists.testneg_tweets
testnet_tweets = tweets_to_lists.testnet_tweets
test_tweet=[]
for (words, sentiment) in testpos_tweets + testneg_tweets + testnet_tweets:
    words_filtered = [e.lower() for e in words.split() if len(e) >= 3]
    for words in words_filtered:
        words_filtered = stopwords(words)
        test_tweet.append((words_filtered, sentiment))

#end
'''
Function Name: get_words_in_tweets
Arguments: A list of tweets
Output: The words in tweets excluding sentiment'''
def get_words_in_tweets(tweets):
    all_words = []
    for (words, sentiment) in tweets:
      all_words.extend(words)
    return all_words

'''
Function name: get_word_features
Arguments: The return of get_words_in_tweets(x)
Output: The indiviual words of all tweets'''
def get_word_features(wordlist):
    wordlist = nltk.FreqDist(wordlist)

    word_features = wordlist.keys()
    #print(word_features) '''Use to update wordlist'''
    return word_features


'''
Function name: extract_features
Arguments: A list of tweets / test tweets
Output: A feature set for each tweet i.e. true/false for each word in word_features '''
def extract_features(document):
    word_features = get_word_features(get_words_in_tweets(tweets))
    document_words = set(document)
    
    features = {}
    for word in word_features:
        features['contains(%s)' % word] = (word in document_words)
    #print(features)
    return features
#NLTK probabalibilty of pos neg and netural of each word
training_set = nltk.classify.apply_features(extract_features, tweets)
test_set = nltk.classify.apply_features(extract_features, test_tweet)

#NLTK calculate max probabality of tweet and classify based on traing set.
classifier = nltk.NaiveBayesClassifier.train(training_set)

print(nltk.classify.accuracy(classifier, test_set))

#auto dump model as Pickle file.
model = pickle.dump(classifier, open("model.p", "wb"))

''''TEST FUNTION '''    
def classify(tweet):
 
    model = pickle.load(open("model.p", "rb")) 
    print(model.classify(extract_features(tweet.split())))

