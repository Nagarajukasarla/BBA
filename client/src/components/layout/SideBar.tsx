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
import { FontSize, IconSize } from "../../constants/styles";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {

    const navigate = useNavigate();

    const navigateTo = (path: string): void => {
        navigate(path);
        console.log(`Navigating from ${window.location.pathname} to ${path}`);
    };

    const menuStyles: React.CSSProperties = {
        height: "100%",
        backgroundColor: "#F2F2F2",
    };

    const fontStyles: React.CSSProperties = {
        fontSize: FontSize.NORMAL,
    };

    const iconStyles: React.CSSProperties = {
        fontSize: IconSize.SMALL,
        marginTop: -3,
    };

    const items = [
        {
            key: "/app/dashboard",
            label: <Typography.Text style={fontStyles}>Dashboard</Typography.Text>,
            icon: <AppstoreAddOutlined style={iconStyles} />,
            onClick: () => navigateTo("/app/dashboard"),
        },
        {
            key: "/app/invoice",
            label: <Typography.Text style={fontStyles}>Invoice</Typography.Text>,
            icon: <LayoutOutlined style={iconStyles} />,
            onClick: () => navigateTo("/app/invoice"),
        },
        {
            key: "/app/customers",
            label: <Typography.Text style={fontStyles}>Customers</Typography.Text>,
            icon: <UserOutlined style={iconStyles} />,
            onClick: () => navigateTo("/app/customers"),
        },
        {
            key: "/app/stocks",
            label: <Typography.Text style={fontStyles}>Stocks</Typography.Text>,
            icon: <CreditCardOutlined style={iconStyles} />,
            onClick: () => navigateTo("/app/stocks"),
        },
        {
            key: "/app/subscriptions",
            label: <Typography.Text style={fontStyles}>Subscriptions</Typography.Text>,
            icon: <SlackOutlined style={iconStyles} />,
            onClick: () => navigateTo("/app/subscriptions"),
        },
        {
            key: "/app/about",
            label: <Typography.Text style={fontStyles}>About</Typography.Text>,
            icon: <InfoCircleOutlined style={iconStyles} />,
            onClick: () => navigateTo("/app/about"),
        },
        {
            key: "/app/settings",
            label: <Typography.Text style={fontStyles}>Settings</Typography.Text>,
            icon: <SettingOutlined style={iconStyles} />,
            onClick: () => navigateTo("/app/settings"),
        },
    ];

    return (
        <Menu
            theme="light"
            mode="inline"
            items={items}
            defaultSelectedKeys={["/app/dashboard"]}
            style={menuStyles}
        />
    );
}

export default SideBar;