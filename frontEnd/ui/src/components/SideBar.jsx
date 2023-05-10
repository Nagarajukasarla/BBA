import React, { Component } from "react";
import SideBarItem from "./SideBarItem";
import "../css/sidebar.css";
import Home from '../Icons/home.png';
import About from '../Icons/about.png';
import Customer from '../Icons/customer.png';
import Invoice from '../Icons/invoice.png';
import Settings from '../Icons/settings.png';
import Stocks from '../Icons/stocks.png';
import Subscription from '../Icons/subscription.png';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebarWrapper">
                <div className="sideBarBody">
                    <ul className="items">
                        <li className="dashboard item" >
                            <SideBarItem icon={Home} text="Dashboard" />
                        </li>
                        <li className="invoice item" >
                            <SideBarItem icon={Invoice} text="Invoice" />
                        </li>
                        <li className="customer item" >
                            <SideBarItem icon={Customer} text="Customers" />
                        </li>
                        <li className="stocks item" >
                            <SideBarItem icon={Stocks} text="Stocks" />
                        </li>
                        <li className="subscription item" >
                            <SideBarItem icon={Subscription} text="Subscriptions" />
                        </li>
                        <li className="about item" >
                            <SideBarItem icon={About} text="About" />
                        </li>
                        <li className="settings item" >
                            <SideBarItem icon={Settings} text="Settings" />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideBar;


// Create root page and assemble SideBar and Header
// Click action for every item in SideBar
// create a Component which consist of a down arrow indicating children exist in the item and each child show inherit same item Component