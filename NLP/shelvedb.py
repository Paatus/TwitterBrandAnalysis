import shelve

    
with shelve.open('worddict') as words:
    # Record some values
    words['good'] = 1 
    words['get']= 1
    words['positive']= 1
    words['excellent'] = 1
    words['up'] = 1
    words['excited'] = 1
    words['love'] = 1
    words['buying'] = 1
    words['glad'] = 1
    words['store'] = 1
    words['amazing'] = 1
    words['congratulations'] = 1
    words['getting'] = 1
    words['fantastic'] = 1
    words['great'] = 1
    words[':)'] = 1
    words['beautiful'] = 1
    words['clever'] = 1
      
    words['bad'] = -1
    words['down']= -1
    words['terrible'] = -1
    words['negative'] = -1
    words['depressed'] = -1
    words["can't"] = -1
    words[':('] = -1
    words['hate'] = -1
    words['closed'] = -1
    words['dissapointed'] = -1
    words['unhappy'] = -1
    words['closed'] = -1
    words['sad'] = -1
    words['ugly'] = -1
    words['stupid'] = -1
    
    
    
'''
    for  token in tokens:
        if token in db:
            print(db[token])'''

words.close()
