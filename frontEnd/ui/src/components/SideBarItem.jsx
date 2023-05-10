import React, { Component } from "react";
import '../css/sidebarItem.css';

class SideBarItem extends Component {
    constructor(props) {
        super(props);
        props = this.props;
    }

    render () {
        const {icon, text} = this.props;
        return (
            <div>
                <div className="container">
                    <img src={icon} alt="img" />
                    <p>{text}</p>
                </div>
            </div>
        );
    }
}

export default SideBarItem;