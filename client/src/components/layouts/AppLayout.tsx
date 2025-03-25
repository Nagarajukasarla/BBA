// import { Layout } from "antd";
// import React from "react";
// import { Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
// import AppHeader from "./Header";

// const { Header, Sider, Content } = Layout;

// const AppLayout: React.FC = () => {
//     return (
//         <Layout className="layout">
//             <Header className="header" style={{ backgroundColor: "#f2f2f2" }}>
//                 <AppHeader />
//             </Header>
//             <Layout>
//                 <Sider className="sider">
//                     <SideBar />
//                 </Sider>
//                 <Content className="content">
//                     <Outlet />
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// };

// export default AppLayout;

// import { Layout } from "antd";
// import React from "react";
// import { Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
// import AppHeader from "./Header";

// const { Header, Sider, Content } = Layout;

// const AppLayout: React.FC = () => {
//     return (
//         <Layout style={{ minHeight: "100vh" }}>
//             <Sider width={240}>
//                 <SideBar />
//             </Sider>
//             <Layout>
//                 <Header style={{ backgroundColor: "red", padding: 0 }}>
//                     <AppHeader />
//                 </Header>
//                 <Content
//                     style={{
//                         margin: "16px",
//                         padding: "24px",
//                         background: "#fff",
//                         overflowX: "auto", // prevents clipping
//                         width: "100%",
//                         boxSizing: "border-box",
//                         border: "1px solid green",
//                     }}
//                 >
//                     <Outlet />
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// };

// export default AppLayout;

import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import AppHeader from "./Header";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
    return (
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
            <Header
                style={{
                    backgroundColor: "red",
                    padding: 0,
                    height: 64,
                    lineHeight: "64px",
                }}
            >
                <AppHeader />
            </Header>
            <Layout hasSider style={{ height: "calc(100vh - 64px)" }}>
                <Sider
                    width={240}
                    style={{
                        background: "#001529",
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
