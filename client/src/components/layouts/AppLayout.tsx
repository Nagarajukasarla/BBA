import AppHeader from "@/components/layouts/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import Sider from "./Sider";
import "@/assets/styles/appLayout.css"

const AppLayout: React.FC = () => {
    return (
        <>
            <div className="main-wrapper">
                <div className="main-sider">
                    <Sider />
                </div>
                <div className="main-content-with-header">
                    <div className="main-header">
                        <AppHeader />
                    </div>
                    <div className="main-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
};

export default AppLayout;