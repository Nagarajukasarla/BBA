import { Input, InputRef } from "antd";
import { forwardRef } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { handleFieldNavigation } from "@/utils/newInvoiceKeyboardEvents";
import { newInvoiceStore } from "@/stores/newInvoiceStore";

interface InputFieldProps {
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


export const InputField = forwardRef<InputRef, InputFieldProps>(
    (
        {
            label,
            value,
            onChange,
            onKeyUp,
            width = "50px",
            id,
            className,
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
            <FieldWrapper label={label} style={containerStyle}>
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
            </FieldWrapper>
        );
    }
);
