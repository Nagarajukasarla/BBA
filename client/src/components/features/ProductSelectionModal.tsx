import React, { useEffect, useState, useRef } from "react";
import { Modal, Table, Button, Typography, ConfigProvider } from "antd";
import { Product } from "@/types/model";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { calc } from "antd/es/theme/internal";

interface ProductSelectionModalProps {
    visible: boolean;
    onCancel: () => void;
    onSelect: (product: Product) => void;
    products: Product[];
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
    visible,
    onCancel,
    onSelect,
    products,
}) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
    const tableRef = useRef<HTMLDivElement>(null);

    // Format date for display
    const formatDate = (date: Date | null | undefined) => {
        if (!date) return "-";
        return dayjs(date).format("MM/YYYY");
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!visible) return;

            // Prevent default behavior for these keys to avoid browser scrolling
            if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }

            switch (e.key) {
                case "ArrowUp":
                    setSelectedRowIndex(prev => (prev > 0 ? prev - 1 : prev));
                    break;
                case "ArrowDown":
                    setSelectedRowIndex(prev =>
                        prev < products.length - 1 ? prev + 1 : prev
                    );
                    break;
                case "Enter":
                    if (products[selectedRowIndex]) {
                        // Delay the selection slightly to prevent focus issues
                        // This is crucial for proper focus management
                        setTimeout(() => {
                            onSelect(products[selectedRowIndex]);
                        }, 100);
                    }
                    break;
                case "Escape":
                    onCancel();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown, { capture: true });
        return () => {
            window.removeEventListener("keydown", handleKeyDown, {
                capture: true,
            });
        };
    }, [visible, products, selectedRowIndex, onSelect, onCancel]);

    // Auto-select first row when modal opens
    useEffect(() => {
        if (visible && products.length > 0) {
            setSelectedRowIndex(0);
        }
    }, [visible, products]);

    const columns: ColumnsType<Product> = [
        {
            title: "Batch",
            dataIndex: "batchNumber",
            key: "batchNumber",
            width: "10%",
        },
        {
            title: "Invoice",
            dataIndex: "invoiceNumber",
            key: "invoiceNumber",
            width: "12%",
            render: (text: string) => text || "-",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "20%",
        },
        {
            title: "Company",
            dataIndex: "company",
            key: "company",
            width: "18%",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            width: "10%",
        },
        {
            title: "Packing",
            dataIndex: "packingType",
            key: "packingType",
            width: "10%",
        },
        {
            title: "Mfg Date",
            dataIndex: "manufacturingDate",
            key: "manufacturingDate",
            width: "10%",
            render: (date: Date) => formatDate(date),
        },
        {
            title: "Exp Date",
            dataIndex: "expiryDate",
            key: "expiryDate",
            width: "10%",
            render: (date: Date) => formatDate(date),
        },
        {
            title: "Rate",
            dataIndex: "rate",
            key: "rate",
            width: "7.5%",
        },
        {
            title: "MRP",
            dataIndex: "mrp",
            key: "mrp",
            width: "7.5%",
        },
    ];

    return (
        <Modal
            title={
                <Typography.Title level={4} style={{ margin: 0 }}>
                    Select Product:{" "}
                    {products.length > 0 ? products[0].name : ""}
                </Typography.Title>
            }
            open={visible}
            onCancel={onCancel}
            width={1200}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    key="select"
                    type="primary"
                    onClick={() => {
                        if (products[selectedRowIndex]) {
                            // Delay selection slightly to prevent focus issues
                            setTimeout(() => {
                                onSelect(products[selectedRowIndex]);
                            }, 100);
                        }
                    }}
                >
                    Select
                </Button>,
            ]}
        >
            <div ref={tableRef}>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowSelectedBg: "#bae0ff",
                            },
                        },
                    }}
                >
                    <Table
                        dataSource={products}
                        columns={columns}
                        pagination={false}
                        rowKey="id"
                        scroll={{ y: 400 }}
                        rowClassName={(_, index) =>
                            index === selectedRowIndex
                                ? "ant-table-row-selected"
                                : ""
                        }
                        onRow={(record, index) => ({
                            onClick: () => {
                                setSelectedRowIndex(index || 0);
                            },
                            onDoubleClick: () => {
                                // Delay selection slightly to prevent focus issues
                                setTimeout(() => {
                                    onSelect(record);
                                }, 100);
                            },
                        })}
                    />
                </ConfigProvider>
            </div>
        </Modal>
    );
};

export default ProductSelectionModal;
