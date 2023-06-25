import { Space } from 'antd';
import { Header } from './AppHeader/Header';
import { SideBar } from './AppSidebar/SideBar';
import { AppFooter } from './AppFooter/AppFooter';
import { AppContent } from './AppContent/AppContent';
import '../css/root.css';


export const Root = () => {
    return (
        <div className='main'>
            <Header />
            <Space className='sideMenuWithDashborad'>
                <SideBar />
                <AppContent />
            </Space>
            <AppFooter/>
        </div>
    );
}