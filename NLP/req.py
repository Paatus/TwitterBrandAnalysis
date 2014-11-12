import requests
import json


words = json.load(open("words.txt",'r'))
#print(words)
#ref = "happy"

'''find() is an AI to build semantic database. find()
takes an arg (ref) are feature words not in the Word Dict.
E.G. "Happy was not in Word Dict. r calls a request to find synonym and antonym.
Antnonym Unhappy is in Word Dict.
Word Dict is updated and value is oppsite to Happy'''
def find(ref):
    try:
        
        r = requests.get("http://words.bighugelabs.com/api/2/4b2b44982e86f02ddb20392069769107/"+ref+"/json")
        x={}
        x = r.json()
        print("looking for the meaning of"+ref)
        
    except:
        print("no word in theasauras")
    #print(x)
    try:
        ant = x["adjective"]["ant"]
        for i in ant:     
            print(i)
            if i in words.keys():
                w = words.get(i)
                print("w=",w)
                if w <0:
                    wordupdate = {ref:w*w}
                    words.update(wordupdate)
                    print(wordupdate)
                    json.dump(words,open("words.txt",'w'))
                if w > 0:
                    wordupdate = {ref:w*(-w)}
                    words.update(wordupdate)
                    print(wordupdate)
                    json.dump(words,open("words.txt",'w'))
            else:
                print("")
    except:
             print("")
    try:
        ant = x["noun"]["ant"]
        for i in ant:     
            print(i)
        if i in words.keys():
            w = words.get(i)
            print("w=",w)
            if w <0:
                wordupdate = {ref:w*w}
                words.update(wordupdate)
                print(wordupdate)
                json.dump(words,open("words.txt",'w'))
            if w > 0:
                wordupdate = {ref:w*(-w)}
                words.update(wordupdate)
                print(wordupdate)
                json.dump(words,open("words.txt",'w'))
        else:
            print("none")
    except:
            '''print("Oops!  That was no valid number.  Try again...")'''
    try:
        syn = x["adjective"]["syn"]
        for i in syn:     
            print(i)
            if i in words.keys():
                w = words.get(i)
                print("w=",w)
                wordupdate = {ref:w}
                words.update(wordupdate)
                print(wordupdate)
                json.dump(words,open("words.txt",'w'))
            else:
                '''print("no syn found in dict")'''
        
    except:
             '''print("Oops!  That was no valid number.  Try again...")'''

    try:
        syn = x["noun"]["syn"]
        for i in syn:     
            print(i)
            if i in words.keys():
                w = words.get(i)
                print("w=",w)
                wordupdate = {ref:w}
                words.update(wordupdate)
                print(wordupdate)
                json.dump(words,open("words.txt",'w'))
            else:
                '''print("no syn found in dict")'''
        
    except:
             '''print("Oops!  That was no valid number.  Try again...")'''
    
        
            

