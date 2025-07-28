import { Space, Typography } from "antd";

interface FieldWrapperProps {
    label?: string;
    width?: string | number;
    children: React.ReactNode;
    style?: React.CSSProperties;
    required?: boolean;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
    label,
    width,
    children,
    style,
    required
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
                {label} {required && <span style={{color: "red"}}>*</span>}
            </Typography.Text>
        )}
        <div style={{ width }}>{children}</div>
    </Space>
);
