import { Button, ButtonProps } from "antd";

interface CButtonProps extends ButtonProps {
}

// Button component with container
export const CButton: React.FC<CButtonProps> = ({
    children,
    ...buttonProps
}) => <Button {...buttonProps}>{children}</Button>;
