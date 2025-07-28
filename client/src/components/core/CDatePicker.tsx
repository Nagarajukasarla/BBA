import { Dayjs } from "dayjs";
import { FieldWrapper } from "./FieldWrapper";
import { DatePicker, DatePickerProps } from "antd";

interface CDatePickerProps extends Omit<DatePickerProps, "onChange"> {
    label?: string;
    width?: string | number;
    onChange?: (value: Dayjs | null) => void;
    id?: string;
    containerStyle?: React.CSSProperties;
}

export const CDatePicker: React.FC<CDatePickerProps> = ({
    label,
    width = "100%",
    value,
    onChange,
    placeholder,
    disabled,
    id,
    containerStyle,
    ...restProps
}) => {
    return (
        <FieldWrapper label={label} style={containerStyle}>
            <DatePicker
                style={{ width }}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                id={id}
                {...restProps}
            />
        </FieldWrapper>
    );
};