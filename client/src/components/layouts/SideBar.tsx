import {
    AppstoreAddOutlined,
    LayoutOutlined,
    UserOutlined,
    CreditCardOutlined,
    SlackOutlined,
    InfoCircleOutlined,
    SettingOutlined
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import '../../assets/styles/sideBar.css';

const SideBar: React.FC = () => {

    const navigate = useNavigate();

    const navigateTo = (path: string): void => {
        navigate(path);
        console.log(`Navigating from ${window.location.pathname} to ${path}`);
    };

    const items = [
        {
            key: "/app/dashboard",
            label: <Typography.Text className="menu-item-text">Dashboard</Typography.Text>,
            icon: <AppstoreAddOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/dashboard"),
        },
        {
            key: "/app/invoice",
            label: <Typography.Text className="menu-item-text">Invoice</Typography.Text>,
            icon: <LayoutOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/invoice"),
        },
        {
            key: "/app/customers",
            label: <Typography.Text className="menu-item-text">Customers</Typography.Text>,
            icon: <UserOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/customers"),
        },
        {
            key: "/app/stocks",
            label: <Typography.Text className="menu-item-text">Stocks</Typography.Text>,
            icon: <CreditCardOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/stocks"),
        },
        {
            key: "/app/subscriptions",
            label: <Typography.Text className="menu-item-text">Subscriptions</Typography.Text>,
            icon: <SlackOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/subscriptions"),
        },
        {
            key: "/app/about",
            label: <Typography.Text className="menu-item-text">About</Typography.Text>,
            icon: <InfoCircleOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/about"),
        },
        {
            key: "/app/settings",
            label: <Typography.Text className="menu-item-text">Settings</Typography.Text>,
            icon: <SettingOutlined className="menu-item-icon" />,
            onClick: () => navigateTo("/app/settings"),
        },
    ];

    return (
        <Menu
            theme="light"
            mode="inline"
            items={items}
            defaultSelectedKeys={["/app/dashboard"]}
            className="side-menu"
        />
    );
}

export default SideBar;