//
//  RootNavigationViewController.swift
//  SwiftSideMenu
//
//  Created by Evgeny Nazarov on 29.09.14.
//  Copyright (c) 2014 Evgeny Nazarov. All rights reserved.
//  Modified and refined by Xiaoqian Xiong on 11.12.14

import UIKit

class ENSideMenuNavigationController: UINavigationController, ENSideMenuProtocol {
    
    internal var sideMenu : ENSideMenu?
    internal var sideMenuRight : ENSideMenu?
    internal var sideMenuAnimationType : ENSideMenuAnimation = .Default
    
    
    // MARK: - Life cycle
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    init( menuTableViewController: UITableViewController, contentViewController: UIViewController?) {
        super.init(nibName: nil, bundle: nil)
        
        if (contentViewController != nil) {
            self.viewControllers = [contentViewController!]
        }

        sideMenu = ENSideMenu(sourceView: self.view, menuTableViewController: menuTableViewController, menuPosition:.Left)
        sideMenuRight = ENSideMenu(sourceView: self.view, menuTableViewController: menuTableViewController, menuPosition:.Right)
        view.bringSubviewToFront(navigationBar)
    }

    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Navigation
    func setContentViewController(contentViewController: UIViewController) {
        self.sideMenu?.toggleMenu()
        self.sideMenuRight?.toggleMenu()
        switch sideMenuAnimationType {
        case .None:
            self.viewControllers = [contentViewController]
            println("no animation switch")

            break
        default:
            let keyButton = UIBarButtonItem(title: "Keywords", style: .Plain, target: self.sideMenu, action: "toggleMenu")
            let viewButton = UIBarButtonItem(title: "Views", style: .Plain, target: self.sideMenuRight, action: "toggleMenu")
            contentViewController.navigationItem.leftBarButtonItem = keyButton
            contentViewController.navigationItem.rightBarButtonItem = viewButton
            self.pushViewController(contentViewController, animated: true)
            break
        }
        
    }
    
    

}
