//
//  firstPage.swift
//  TBA2
//
//  Created by Xiaoqian Xiong on 07/12/14.
//  Copyright (c) 2014 Name Panding. All rights reserved.
//

import UIKit
import WebKit
class firstPage: UIViewController{
    
    var webView: UIWebView!
   // var con = connection()

    @IBOutlet var container: UIView!
    
    func loadAddressURL(){
        var urlpath = "http://dev.kento.se:8080/map.html"
        //2.bp.blogspot.com/-pBGguf17fSs/U8I7_kVbfCI/AAAAAAAAADo/2l09LoNFVdU/s1600/swift-banner.png
        let requesturl = NSURL(string: urlpath)
        let request = NSURLRequest(URL: requesturl!)
        
        var frame : CGRect!
        
        var width = container.bounds.width
        var height = container.bounds.height
        var xP = container.bounds.minX
        var yP = container.bounds.minY
        
        frame = CGRect(x: xP, y: yP, width: width-220, height: height)



        webView = UIWebView(frame: frame)
       
        webView.loadRequest(request)
      //
        webView.sizeToFit()
        webView.scalesPageToFit = true
        container.addSubview(webView)

    }
 
    override func viewDidLoad() {
        super.viewDidLoad()
       
        loadAddressURL()

        
        
        // Do any additional setup after loading the view, typically from a nib.
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}