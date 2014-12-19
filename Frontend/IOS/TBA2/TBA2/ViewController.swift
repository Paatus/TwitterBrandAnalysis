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
    
    @IBOutlet var wrongPassword: UILabel!
    
    internal var con = connection()
//public var keywordList = [String]()
    
    func logInButtonAction(){
        //con.logOut()
        println("🐱")
        println("\(usernameInput.text)🐵")
        println("\(pwdInput.text)🐵")
        con.logIn(usernameInput.text, password: pwdInput.text)
        //sleep(5)
        if con.loggedIn == true{
            let mainStoryboard: UIStoryboard = UIStoryboard(name: "Main",bundle: nil)

            sideMenuController()?.setContentViewController(mainStoryboard.instantiateViewControllerWithIdentifier("View 2") as UIViewController)
            //performSegueWithIdentifier("logInSuccess", sender: self)
            println("log in boolean works 🐰")
            println("\(con.getWords()) 🐷" )

        }else {
           //
            self.wrongPassword.text = "OOPS wrong password, please try again"
            self.wrongPassword.textColor = UIColor.redColor()
            println("wrong password")
        }

//        con.keywords()
//        println(strings)
//        con.parseJSON()
        
       // performSegueWithIdentifier("View2", sender: self)
    }
    
    
    override func shouldPerformSegueWithIdentifier(identifier: String!, sender: AnyObject!) -> Bool {
        return false
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        self.wrongPassword.text = ""
        
        //add a login action to the button
        loginButton.addTarget(self, action: "logInButtonAction", forControlEvents: UIControlEvents.TouchUpInside)

    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
   

    
}

