import { newInvoiceStore } from "@/stores/newInvoiceStore";
import { handleFieldNavigation } from "@/utils/newInvoiceKeyboardEvents";
import type { InputRef } from "antd";
import {
    Button,
    ConfigProvider,
    Input,
    Select,
    Space,
    Typography
} from "antd";
import { ButtonProps } from "antd/lib/button";
import { SelectProps } from "antd/lib/select";
import React, { forwardRef } from "react";

interface InvoiceFieldContainerProps {
    label?: string;
    width?: string | number;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

interface InvoiceInputProps {
    label?: string;
    value?: string | number | null;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    width?: string | number;
    id?: string;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    containerStyle?: React.CSSProperties;
    isError?: boolean;
}
interface InvoiceSelectProps extends Omit<SelectProps, "onChange"> {
    label?: string;
    width?: string | number;
    onSelect?: (value: string, option: any) => void;
    onChange?: (value: string) => void;
    id?: string;
    containerStyle?: React.CSSProperties;
    loading?: boolean;
}

interface InvoiceButtonProps extends ButtonProps {
    label?: string;
    containerStyle?: React.CSSProperties;
}

// Field Container Component
export const InvoiceFieldContainer: React.FC<InvoiceFieldContainerProps> = ({
    label,
    width,
    children,
    style,
}) => (
    <Space
        direction="vertical"
        style={{
            textAlign: "start",
            marginLeft: "20px",
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

// Using forwardRef to properly handle ref forwarding
export const InvoiceInput = forwardRef<InputRef, InvoiceInputProps>(
    (
        {
            label,
            value,
            onChange,
            onKeyUp,
            width = "50px",
            id,
            className = "invoiceInputFields",
            disabled,
            placeholder,
            containerStyle,
            isError,
        },
        ref
    ) => {
        // Only show error if there's a product selected and the field has an error
        const showError = isError && newInvoiceStore.productData !== null;
        
        return (
            <InvoiceFieldContainer label={label} style={containerStyle}>
                <Input
                    style={{
                        width,
                        padding: "4px",
                        ...(showError && { borderColor: "red" }),
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                    value={value ?? ""}
                    onChange={onChange}
                    onKeyUp={e => {
                        handleFieldNavigation(e, id || "");
                        onKeyUp?.(e);
                    }}
                    id={id}
                    className={className}
                    ref={ref}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            </InvoiceFieldContainer>
        );
    }
);

export const InvoiceSelect: React.FC<InvoiceSelectProps> = ({
    label,
    width = "100%",
    value,
    options,
    onSelect,
    onChange,
    placeholder,
    showSearch,
    allowClear,
    disabled,
    id,
    containerStyle,
    loading,
    ...restProps
}) => (
    <InvoiceFieldContainer label={label} style={containerStyle}>
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        optionActiveBg: "rgba(0, 0, 0, 0.15)",
                    },
                },
            }}
        >
            <Select
                style={{ width }}
                value={value}
                options={options}
                onSelect={onSelect}
                onChange={onChange}
                placeholder={placeholder}
                showSearch={showSearch}
                dropdownStyle={{
                    margin: 0,
                    textAlign: "start" as const,
                }}
                allowClear={allowClear}
                disabled={disabled}
                id={id}
                loading={loading}
                {...restProps}
            />
        </ConfigProvider>
    </InvoiceFieldContainer>
);

// Button component with container
export const InvoiceButton: React.FC<InvoiceButtonProps> = ({
    label,
    containerStyle,
    children,
    ...buttonProps
}) => (
    <InvoiceFieldContainer label={label} style={containerStyle}>
        <Button {...buttonProps}>{children}</Button>
    </InvoiceFieldContainer>
);
