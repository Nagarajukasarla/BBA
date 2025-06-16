import { Form, Input, InputNumber, Table } from "antd";
import React, { PropsWithChildren } from "react";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: number;
    title: any;
    inputType: "number" | "text";
    record: any;
    index: number;
    min?: number;
}

interface TableProps {
    style: React.CSSProperties;
    columns: any[];
    dataSource: any[];
    page?: boolean;
    isEditing: (record: any) => boolean;
}

const EditableCell: React.FC<PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    min,
    children,
    ...restProps
}) => {
    const inputNode =
        inputType === "number" ? <InputNumber type="number" min={min} style={{ width: "60px" }} /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Required!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable: React.FC<TableProps> = ({
    style,
    columns,
    dataSource,
    page = false,
    isEditing,
}) => {

    const isNumericField = (dataIndex: string) : boolean => {
        return dataIndex === "quantity" ||
            dataIndex === "rate" ||
            dataIndex === "mrp" ||
            dataIndex === "discount"
            ? true
            : false;
    }

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: isNumericField(col.dataIndex) ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                min: col.dataIndex === "discount" ? 0 : 1,
            }),
        };
    });

    return (
        <Table
            style={style}
            components={{
                body: {
                    cell: EditableCell,
                },
            }}
            bordered
            columns={mergedColumns}
            dataSource={dataSource}
            pagination={{ simple: page }}
        />
    );
};

export default EditableTable;
