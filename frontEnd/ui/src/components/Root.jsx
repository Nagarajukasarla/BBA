import { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import '../css/root.css';

class Root extends Component {
    render () {
        return (
            <div className="rootWrapper">
                <div className="header">
                    <Header />
                </div>
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="mainContent">
                    <Dashboard />
                </div>
            </div>
        );
    }
}

export default Root;