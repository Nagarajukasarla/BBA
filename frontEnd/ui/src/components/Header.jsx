import React, { Component } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import '../css/header.css';
import pic from '../Img/pic.jpg'

class Header extends Component {
    render () {
        return (
            <div className='header'>
                <div className="titleContinaer">
                    <p className="appTitle">Billing App</p>
                </div>
                <div className='profileContainer'>
                    <img className='userImage' src={pic} alt=''/>
                    <div className='username'>
                        <p>Nagaraju Kasarla</p>
                    </div>
                </div>
                <div className='helpContainer'>
                    <FaQuestionCircle className='helpIcon' />
                </div>
            </div>
        );
    };
}

export default Header;