//
//  connection.swift
//  TBA2
//
//  Created by Xiaoqian Xiong on 12/12/14.
//  Copyright (c) 2014 Name Panding. All rights reserved.
//

import SwiftHTTP
var request = HTTPTask()
request.GET("http://vluxe.io", parameters: nil, success: {(response: HTTPResponse) in
    if let data = response.responseObject as? NSData {
        let str = NSString(data: data, encoding: NSUTF8StringEncoding)
        println("response: \(str)") //prints the HTML of the page
    }
    },failure: {(error: NSError, response: HTTPResponse?) in
        println("error: \(error)")
})