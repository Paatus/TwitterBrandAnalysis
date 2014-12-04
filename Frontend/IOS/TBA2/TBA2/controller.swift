//
//  ViewController.swift
//  sideMenuTest
//
//  Created by Xiaoqian Xiong on 03/12/14.
//  Copyright (c) 2014 Xiaoqian Xiong. All rights reserved.
//

import UIKit

class controller: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func searchKey(sender: AnyObject) {
        toggleSideMenuView()

    }
    
}

