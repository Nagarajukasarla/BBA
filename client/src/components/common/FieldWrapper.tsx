import { Space, Typography } from "antd";

interface FieldWrapperProps {
    label?: string;
    width?: string | number;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
    label,
    width,
    children,
    style,
}) => (
    <Space
        direction="vertical"
        style={{
            // textAlign: "start",
            // margin: "0 10px",
            // border: "1px solid red",
            ...style,
        }}
    >
        {label && (
            <Typography.Text className="primary-input-field-header-style">
                {label}
            </Typography.Text>
        )}
        <div style={{ width }}>{children}</div>
    </Space>
);
