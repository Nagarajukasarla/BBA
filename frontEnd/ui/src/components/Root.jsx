import { Space } from 'antd';

import { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import '../css/root.css';

class Root extends Component {
    render () {
        return (
            <div className='main'>
                <Header className="header"/>
                <Space>
                    <SideBar className="sideBar"/>
                    <Dashboard className="sideBar"/>
                </Space>
            </div>
        );
    }
}

export default Root;