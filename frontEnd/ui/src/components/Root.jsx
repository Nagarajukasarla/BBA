import { Space } from "antd";
import { Header } from "./AppHeader/Header";
import { SideBar } from "./AppSidebar/SideBar";
import { AppFooter } from "./AppFooter/AppFooter";
import "../utils/css/root.css";
import { Outlet } from "react-router-dom";

export const Root = () => {
    return (
        <div className="main">
            <Header />
            <Space className="sideMenuWithDashborad">
                <SideBar />
                <div className="appContentContainer">
                    <Outlet />
                </div>
            </Space>
            <AppFooter />
        </div>
    );
};
