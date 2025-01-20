import React from 'react';
import '../../utils/css/header.css';
import pic from '../../utils/Img/pic.jpg';
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import TokenManager from '../../services/cookies/TokenManager';

export const Header = () => {

    const navigate = useNavigate();

    const logout = () => {
        TokenManager.removeToken();
        TokenManager.removeShopId();
        navigate("/login");
    };

    const logoutHandler = () => {
        logout();
    }

    return (
        <div className='header'>
            <div className="titleContinaer">
                <p className="appTitle">Billing App</p>
            </div>
            <div className='profileContainer'>
                <img className='userImage' src={pic} alt='' />
                <div className='username'>
                    <p>Sri Venkateshwara Pharma Distributors</p>
                </div>
            </div>
            <div className='helpContainer'>
                <Button
                    style={{
                        background: "rgb(235,238,242)",
                        width: "40px",
                        height: "40px"
                    }}
                    onClick={logoutHandler} icon={<LogoutOutlined className='helpIcon' />} />
            </div>
        </div>
    );
};
