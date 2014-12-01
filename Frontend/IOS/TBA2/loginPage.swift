//
//  loginPage.swift
//  TBA2
//
//  Created by Xiaoqian Xiong on 01/12/14.
//  Copyright (c) 2014 Name Panding. All rights reserved.
//
import UIKit
import Foundation
class loginPage: UIViewController{
    
    @IBOutlet var webView: UIWebView!
    var urlpath = "http://www.google.com"
    @IBOutlet var howHappy: UILabel!
    
    func loadAddressURL(){
        let requesturl = NSURL(string: urlpath)
        let request = NSURLRequest(URL: requesturl!)
        //webView.sizeToFit()
       // let recognizer = UISwipeGestureRecognizer()
       // webView.addGestureRecognizer(recognizer)
        webView.loadRequest(request)
    }
    
  //  func place(){
    //    var
      //  howHappy.
   // }
    override func viewDidLoad() {
        
        
        super.viewDidLoad()
        println("first")
     
        self.webView.scalesPageToFit = true
        println("second")

        loadAddressURL()
       
        
        // Do any additional setup after loading the view, typically from a nib.
        
        
    }
    
    //    func stopLoad(){
    //        webView.stopLoading()
    //   }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}