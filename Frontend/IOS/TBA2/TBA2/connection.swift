//
//  connection.swift
//  TBA2
//
//  Created by Xiaoqian Xiong on 12/12/14.
//  Copyright (c) 2014 Name Panding. All rights reserved.
//

import SwiftHTTP
import SwiftyJSON

class connection{
    init(){}
    var output = [String]()
    var loggedIn : Bool = false

    var request = HTTPTask()
    
    func logIn(username: String, password: String){
        let params: Dictionary<String,AnyObject> = ["username": username, "pwd": password]
        request.POST("http://dev.kento.se:8080/api/login", parameters: params, success: {(response: HTTPResponse) in
            println("success \n 🐔")
            self.loggedIn = true
            },failure: {(error: NSError, response: HTTPResponse?) in
                println("error: \(error)")

        })
        sleep(3)
    }
    
    func logOut(){
        
        request.POST("http://dev.kento.se:8080/api/logout", parameters: nil, success: {(response: HTTPResponse) in
            if let data = response.responseObject as? NSData {
                let str = NSString(data: data, encoding: NSUTF8StringEncoding)
                println("response: \(str), logged out 🐶") //prints the HTML of the page
            }
            },failure: {(error: NSError, response: HTTPResponse?) in
                println("error: \(error)")
        })
        
    }
    
    func keywords() {
        
        request.GET("http://dev.kento.se:8080/api/keywords/get", parameters: nil, success: {(response: HTTPResponse) in
        if let data = response.responseObject as? NSData {
            let wordsList  = JSON(data: data)
            let words = wordsList["keywords"].arrayValue
            println("wordsList are \(wordsList) 🐑")
            println("words are \(words) 🐸")
            if (self.output.count==0){
                for word in words {
                    self.output.append(word.string!)
                    println("output is \(self.output)🐮" )
    
                }
            }
            
            }
        
            },failure: {(error: NSError, response: HTTPResponse?) in
        println("error: \(error)")
       })
        sleep(2)


    }
    
    func getWords() -> [(String)]{
        keywords()
        return self.output
//        println("output is \(output) 😠")
    }
}


