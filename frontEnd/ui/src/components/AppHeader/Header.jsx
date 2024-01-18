import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import '../../utils/css/header.css';
import pic from '../../utils/Img/pic.jpg';

export const Header = () => {
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
