import { ColumnType } from "antd/es/table";
import { InvoiceItem } from "@/types/component";
// Note: JSX rendering functions should be defined in the component file

// Payment modes
export const paymentModes = [
    {
        value: "cash",
        label: "Cash",
        key: "1",
    },
    {
        value: "credit",
        label: "Credit",
        key: "2",
    },
    {
        value: "digital",
        label: "Digital",
        key: "3",
    },
];

// Invoice columns - without JSX render functions
export const invoiceItemsColumns: ColumnType<InvoiceItem>[] = [
    {
        key: "2",
        title: "PRODUCT",
        dataIndex: "name",
        width: "13%",
    },
    {
        key: "3",
        title: "COMPANY",
        dataIndex: "company",
        width: "10%",
    },
    {
        key: "4",
        title: "QUAN",
        dataIndex: "quantity",
        width: "6%",
    },
    {
        key: "5",
        title: "FREE",
        dataIndex: "freeQuantity",
        width: "5%",
    },
    {
        key: "6",
        title: "PACK",
        dataIndex: "packingType",
        width: "5%",
    },
    {
        key: "7",
        title: "MFD",
        dataIndex: "manufacturingDate",
        width: "5%",
    },
    {
        key: "8",
        title: "EXP",
        dataIndex: "expiryDate",
        width: "5%",
    },
    {
        key: "9",
        title: "SGST",
        dataIndex: "sGst",
        width: "5%",
    },
    {
        key: "10",
        title: "CGST",
        dataIndex: "cGst",
        width: "5%",
    },
    {
        key: "11",
        title: "IGST",
        dataIndex: "iGst",
        width: "5%",
    },
    {
        key: "12",
        title: "RATE",
        dataIndex: "rate",
        width: "7%",
    },
    {
        key: "13",
        title: "MRP",
        dataIndex: "mrp",
        width: "6%",
    },
    {
        key: "14",
        title: "DISC",
        dataIndex: "discount",
        width: "5%",
    },
    {
        key: "15",
        title: "PRICE",
        dataIndex: "price",
        width: "7%",
    },
    {
        key: "16",
        title: "ACTION",
        dataIndex: "action",
        width: "6.15%",
        // Render function will be added in the component file
    },
];
