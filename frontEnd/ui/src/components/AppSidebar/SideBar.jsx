import React from "react";
import { Menu } from "antd";
import {
    AppstoreAddOutlined,
    LayoutOutlined,
    UserOutlined,
    CreditCardOutlined,
    InfoCircleOutlined,
    SlackOutlined,
    SettingOutlined
} from "@ant-design/icons";

import "../../css/sidebar.css";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebarWrapper">
            <Menu className="sidebarMenu"
                onClick={(item) => {
                    navigate(item.key);
                }}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreAddOutlined />,
                        key: "/dashboard",
                    },
                    {
                        label: "Invoice",
                        icon: <LayoutOutlined />,
                        key: "/invoice",
                    },
                    {
                        label: "Customers",
                        icon: <UserOutlined />,
                        key: "/customer",
                    },
                    {
                        label: "Stocks",
                        icon: <CreditCardOutlined />,
                        key: "/stocks",
                    },
                    {
                        label: "Subscriptions",
                        icon: <SlackOutlined />,
                        key: "/subscriptions",
                    },
                    {
                        label: "About",
                        icon: <InfoCircleOutlined />,
                        key: "/about",
                    },
                    {
                        label: "Settings",
                        icon: <SettingOutlined />,
                        key: "/settings",
                    },
                ]}
            >
            </Menu>
        </div>
    );
}

// Create root page and assemble SideBar and Header
// Click action for every item in SideBar
// create a Component which consist of a down arrow indicating children exist in the item and each child show inherit same item Component