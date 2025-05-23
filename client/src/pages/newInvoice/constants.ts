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

export const invoiceItemsColumns = [
    {
        key: "2",
        title: "PRODUCT",
        dataIndex: "name",
        width: "13%",
        editable: false,
    },
    {
        key: "3",
        title: "COMPANY",
        dataIndex: "company",
        width: "10%",
        editable: false,
    },
    {
        key: "4",
        title: "QUAN",
        dataIndex: "quantity",
        width: "5%",
        editable: true,
    },
    {
        key: "5",
        title: "FREE",
        dataIndex: "freeQuantity",
        width: "5%",
        editable: false,
    },
    {
        key: "6",
        title: "PACK",
        dataIndex: "packingType",
        width: "5%",
        editable: false,
    },
    {
        key: "7",
        title: "MFD",
        dataIndex: "manufacturingDate",
        width: "5%",
        editable: false,
    },
    {
        key: "8",
        title: "EXP",
        dataIndex: "expiryDate",
        width: "5%",
        editable: false,
    },
    {
        key: "9",
        title: "SGST",
        dataIndex: "sGst",
        width: "5%",
        editable: false,
    },
    {
        key: "10",
        title: "CGST",
        dataIndex: "cGst",
        width: "5%",
        editable: false,
    },
    {
        key: "11",
        title: "IGST",
        dataIndex: "iGst",
        width: "5%",
        editable: false,
    },
    {
        key: "12",
        title: "RATE",
        dataIndex: "rate",
        width: "7%",
        editable: true,
    },
    {
        key: "13",
        title: "MRP",
        dataIndex: "mrp",
        width: "6%",
        editable: true,
    },
    {
        key: "14",
        title: "DISC",
        dataIndex: "discount",
        width: "5%",
        editable: true,
    },
    {
        key: "15",
        title: "PRICE",
        dataIndex: "price",
        width: "7%",
        editable: false,
    },
];
