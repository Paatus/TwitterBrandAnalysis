//
//  ViewController.swift
//  TBA2
//
//  Created by Jessie W on 28/11/14.
//  Copyright (c) 2014 Name Panding. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate {
    @IBOutlet var usernameInput: UITextField!
    @IBOutlet var pwdInput: UITextField!
    @IBOutlet var loginButton: UIButton!
    var con = connection()

    func logInButtonAction(){
        println("🐱")
        con.logOut()
        if (con.logIn(usernameInput.text, password: pwdInput.text) == true){
            println("log in boolean works 🐰")
        }else{
            println("login boolean doesn't works 🐰")
        }
        con.keywords()
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //add a login action to the button
        loginButton.addTarget(self, action: "logInButtonAction", forControlEvents: UIControlEvents.TouchUpInside)

    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
   

    
}

