import React, { forwardRef } from 'react';
import { Input, Select, Space, Typography, ConfigProvider } from 'antd';
import type { InputRef } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { handleFieldNavigation } from '@/utils/newInvoiceKeyboardEvents';

interface InvoiceInputProps {
    label: string;
    value?: string | number | null;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    width?: string | number;
    id?: string;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
}

interface InvoiceSelectProps extends Omit<SelectProps, 'onChange'> {
    label: string;
    width?: string | number;
    onSelect?: (value: string, option: any) => void;
    onChange?: (value: string) => void;
    id?: string;
}

// Using forwardRef to properly handle ref forwarding
export const InvoiceInput = forwardRef<InputRef, InvoiceInputProps>(({
    label,
    value,
    onChange,
    onKeyUp,
    width = "50px",
    id,
    className = "invoiceInputFields",
    disabled,
    placeholder,
}, ref) => (
    <Space
        direction="vertical"
        style={{
            textAlign: "start",
            marginLeft: "20px",
        }}
    >
        <Typography.Text className="primary-input-field-header-style">
            {label}
        </Typography.Text>
        <Input
            style={{
                width,
                padding: "4px",
            }}
            value={value ?? ""}
            onChange={onChange}
            onKeyUp={(e) => {
                handleFieldNavigation(e, id || '');
                onKeyUp?.(e);
            }}
            id={id}
            className={className}
            ref={ref}
            disabled={disabled}
            placeholder={placeholder}
        />
    </Space>
));

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
    ...restProps
}) => (
    <Space
        direction="vertical"
        style={{
            textAlign: "start",
            marginLeft: "20px",
        }}
    >
        <Typography.Text className="primary-input-field-header-style">
            {label}
        </Typography.Text>
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
                {...restProps}
            />
        </ConfigProvider>
    </Space>
);

