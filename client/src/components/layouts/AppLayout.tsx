import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/layouts/SideBar";
import AppHeader from "@/components/layouts/Header";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
    return (
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
            <Header
                style={{
                    backgroundColor: "#ffffff",
                    padding: 0,
                    height: 64,
                    lineHeight: "64px",
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                <AppHeader />
            </Header>
            <Layout hasSider style={{ height: "calc(100vh - 64px)" }}>
                <Sider
                    width={200}
                    style={{
                        height: "100%",
                    }}
                >
                    <SideBar />
                </Sider>
                <Content
                    style={{
                        background: "#f2f2f2",
                        padding: "16px",
                        overflow: "auto",
                        width: "100%",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
