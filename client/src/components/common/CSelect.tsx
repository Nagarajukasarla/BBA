import { ConfigProvider, Select, SelectProps } from "antd";
import { FieldWrapper } from "./FieldWrapper";

interface CSelectProps extends Omit<SelectProps, "onChange"> {
    label?: string;
    width?: string | number;
    onSelect?: (value: string, option: any) => void;
    onChange?: (value: string) => void;
    id?: string;
    containerStyle?: React.CSSProperties;
    loading?: boolean;
}

export const CSelect: React.FC<CSelectProps> = ({
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
    <FieldWrapper label={label} style={containerStyle}>
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
    </FieldWrapper>
);
