//
//  connection.swift
//  TBA2
//
//  Created by Xiaoqian Xiong on 12/12/14.
//  Copyright (c) 2014 Name Panding. All rights reserved.
//

import SwiftHTTP

class connection{
    var request = HTTPTask()
    func logIn(username: String, password: String) -> Bool{
        var maybe : Bool? = false
        let params: Dictionary<String,AnyObject> = ["username": username, "pwd": password]
        request.POST("http://dev.kento.se:8080/api/login/json", parameters: params, success: {(response: HTTPResponse) in
            println("success \n 🐔")
            maybe = true
            },failure: {(error: NSError, response: HTTPResponse?) in
                println("error: \(error)")

        })
        sleep(30)
        return maybe!
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
    func keywords(){
        
        request.GET("http://dev.kento.se:8080/api/keywords/get", parameters: nil, success: {(response: HTTPResponse) in
        if let data = response.responseObject as? NSData {
        let str = NSString(data: data, encoding: NSUTF8StringEncoding)
        println("response: \(str), 🐻") //prints the HTML of the page
        }
        },failure: {(error: NSError, response: HTTPResponse?) in
        println("error: \(error)")
       })
    
        
    
    }
}


