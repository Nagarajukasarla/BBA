import { ConfigProvider, Space, Typography } from "antd";

interface FilterSectionProps {
    label: string;
    width: number;
    children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    label,
    width,
    children,
}) => (
    <Space
        direction="vertical"
        style={{
            textAlign: "start",
            paddingRight: "10px",
            marginBottom: "16px",
            minHeight: "80px",
            display: "inline-flex",
            verticalAlign: "top",
        }}
    >
        <Typography.Text
            className="primary-input-field-header-style"
            style={{
                display: "block",
            }}
        >
            {label}
        </Typography.Text>
        <ConfigProvider
            theme={{
                token: {
                    colorBgTextActive: "rgba(0, 0, 0, 0.15)",
                },
            }}
        >
            <div style={{ width }}>{children}</div>
        </ConfigProvider>
    </Space>
);
