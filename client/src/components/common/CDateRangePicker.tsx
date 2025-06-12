import { DatePicker } from "antd";
import { FieldWrapper } from "./FieldWrapper";
import { Dayjs } from "dayjs";

interface CDateRangePickerProps {
    label?: string;
    width?: string | number;
    value?: [Dayjs | null, Dayjs | null];
    onChange?: (
        value: [Dayjs | null, Dayjs | null] | null,
        dateStrings: [string, string]
    ) => void;
    id?: string;
    containerStyle?: React.CSSProperties;
}

export const CDateRangePicker: React.FC<CDateRangePickerProps> = ({
    label,
    width = "100%",
    value,
    onChange,
    id,
    containerStyle,
    ...restProps
}) => (
    <FieldWrapper label={label} style={containerStyle}>
        <DatePicker.RangePicker
            style={{ width }}
            value={value}
            onChange={onChange}
            format="DD-MM-YYYY"
            allowClear={true}
            placeholder={["Start Date", "End Date"]}
            {...restProps}
        />
    </FieldWrapper>
);