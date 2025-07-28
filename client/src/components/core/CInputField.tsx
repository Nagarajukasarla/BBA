import { Input, InputRef } from "antd";
import { forwardRef } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { handleFieldNavigation } from "@/utils/newInvoiceKeyboardEvents";
import { newInvoiceStore } from "@/stores/newInvoiceStore";
import { InputProps } from "antd";

interface InputFieldProps extends Omit<InputProps, "value" | "onChange" | "onKeyUp"> {
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
    required?: boolean;
    /**@ignore only applicable for NewInvoice*/
    isError?: boolean;
}

export const CInputField = forwardRef<InputRef, InputFieldProps>(
    (
        {
            label,
            value,
            onChange,
            onKeyUp,
            width = "100%",
            id,
            className,
            disabled,
            placeholder,
            containerStyle,
            isError,
            required,
            ...restProps
        },
        ref
    ) => {

        {/** @DANGEROUS @DEPENDENCY showError is only application for NewInvoice component, convert to resuable */} 
        // Only show error if there's a product selected and the field has an error
        const showError = isError && newInvoiceStore.productData !== null;
        
        return (
            <FieldWrapper label={label} style={containerStyle} required={required}>
                <Input
                    style={{
                        width,
                        padding: "4px",
                        ...(showError && { borderColor: "red" }),
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
                    {...restProps}
                />
            </FieldWrapper>
        );
    }
);


export default CInputField;

