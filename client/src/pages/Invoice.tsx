import {
    EditOutlined,
    InfoCircleTwoTone,
    PlusCircleOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    ConfigProvider,
    DatePicker,
    Popover,
    Row,
    Select,
    Space,
    Table,
    Tooltip,
    Typography,
    notification,
} from "antd";
import { ColumnType } from "antd/es/table";
import type { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyInvoices } from "../data/invoices";
import { Filters } from "../types/component";

import { Invoice, LiteCustomer } from "../types/model";
import _Date from "@/classes/core/_Date";

export const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [customer, setCustomer] = useState<LiteCustomer | null>(null);
    const [purchaseType, setPurchaseType] = useState<string>("");
    const [invoiceStatus, setInvoiceStatus] = useState<string>("");
    const [customersAsOptions, setCustomersAsOptions] = useState<
        Array<{ value: string; label: string; customValue?: LiteCustomer }>
    >([]);
    const [dayWise, setDayWise] = useState<string | null>(null);
    const [specificDate, setSpecificDate] = useState<Dayjs | null>(null);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
        null,
        null,
    ]);

    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    // Fetch invoices with proper typing
    const fetchInvoices = useCallback(
        async (filters: Filters | {}): Promise<Invoice[]> => {
            try {
                setLoading(true);
                // TODO: Replace with actual API call
                setInvoices(dummyInvoices);
                return dummyInvoices;
            } catch (error) {
                console.error("Error fetching invoices:", error);
                return [];
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        document.title = "Invoices";
        fetchInvoices({});
        // TODO: Fetch customers and set options
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns: ColumnType<Invoice>[] = [
        {
            key: "invoiceNumber",
            title: "Number",
            dataIndex: "invoiceNumber",
            width: "3%",
        },
        {
            key: "customerDetails",
            title: "Customer",
            dataIndex: "customerDetails",
            width: "13%",
            render: (customer: LiteCustomer) => (
                <Space>
                    <Typography.Text>{customer?.name || ""}</Typography.Text>
                    <Popover content={customer?.address || ""}>
                        <InfoCircleTwoTone />
                    </Popover>
                </Space>
            ),
        },
        {
            key: "paymentMode",
            title: "Type",
            dataIndex: "paymentMode",
            width: "5%",
            render: (text: string) => (
                <Typography.Text>
                    {text ? text.charAt(0).toUpperCase() + text.slice(1) : ""}
                </Typography.Text>
            ),
        },
        {
            key: "amount",
            title: "Amount",
            dataIndex: "amount",
            width: "5%",
        },
        {
            key: "generationDate",
            title: "Generation Date",
            dataIndex: "generationDate",
            width: "6%",
            render: (date: Date) => _Date.formatToDayMonthYear(date.toISOString()),
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
            width: "3%",
            render: (text: string) => (
                <Typography.Text>
                    {text ? text.charAt(0).toUpperCase() + text.slice(1) : ""}
                </Typography.Text>
            ),
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: Invoice) => (
                <Tooltip title="Edit">
                    <EditOutlined onClick={() => handleEdit(record)} />
                </Tooltip>
            ),
            width: "2%",
        },
    ];

    const handleEdit = (invoice: Invoice) => {
        navigate(`/app/invoice/edit/${invoice.id}`);
    };

    const newInvoice = () => {
        navigate("/app/invoice/new");
    };

    const onSelectedCustomer = (
        _: string,
        option: { value: string; customValue?: LiteCustomer }
    ) => {
        setCustomer(option.customValue || null);
    };

    const onSelectPurchaseType = (value: string) => {
        setPurchaseType(value);
    };

    const onSelectedInvoiceStatus = (value: string) => {
        setInvoiceStatus(value);
    };

    const onSelectedDayWise = (value: string) => {
        setDayWise(value);
        setSpecificDate(null);
        setDateRange([null, null]);
    };

    const onPickSpecificDate = (value: Dayjs | null) => {
        setSpecificDate(value);
        setDayWise(null);
        setDateRange([null, null]);
    };

    const onSelectDateRange = (
        dates: [Dayjs | null, Dayjs | null],
        dateStrings: [string, string]
    ) => {
        setDateRange(dates);
        setDayWise(null);
        setSpecificDate(null);
        // const formattedDates = dates.forEach((date) => date?.toDate());
        // if (formattedDates) {
        //     // Use the formatted dates for API calls
        //     fetchInvoices({
        //         ...filters,
        //         dateRange: formattedDates
        //     });
        // }
    };

    return (
        <>
            {contextHolder}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid red",
                }}
            >
                <Space direction="vertical" size="small">
                    <Row
                        style={{ padding: "20px 0 0 5px" }}
                        justify="space-between"
                        align="middle"
                    >
                        <Typography.Title level={3}>Invoices</Typography.Title>
                        <Button
                            onClick={newInvoice}
                            type="primary"
                            shape="round"
                            size="large"
                            className="newInvoiceBtn addOrEditInvoiceBtn"
                        >
                            <Typography.Text className="newInvoiceBtnText">
                                New Invoice
                            </Typography.Text>
                            <PlusCircleOutlined
                                style={{ paddingLeft: "5px", fontSize: "20px" }}
                            />
                        </Button>
                    </Row>

                    {/* Filters Section */}
                    <Row style={{ padding: "0 5px" }} align="middle">
                        {/* Customer Filter */}
                        <FilterSection label="Customer" width={400}>
                            <Select
                                style={{ width: "100%" }}
                                value={customer?.name || "--All--"}
                                options={customersAsOptions}
                                onSelect={onSelectedCustomer}
                            />
                        </FilterSection>

                        {/* Purchase Type Filter */}
                        <FilterSection label="Purchase Type" width={170}>
                            <Select
                                style={{ width: "100%" }}
                                value={purchaseType || "--All--"}
                                options={purchaseTypeOptions}
                                onSelect={onSelectPurchaseType}
                            />
                        </FilterSection>

                        {/* Status Filter */}
                        <FilterSection label="Status" width={170}>
                            <Select
                                style={{ width: "100%" }}
                                value={invoiceStatus || "--All--"}
                                options={invoiceStatusOptions}
                                onSelect={onSelectedInvoiceStatus}
                            />
                        </FilterSection>

                        {/* Day Wise Filter */}
                        <FilterSection label="Day Wise" width={200}>
                            <Select
                                style={{ width: "100%" }}
                                value={dayWise || "--All--"}
                                options={dayWiseOptions}
                                onSelect={onSelectedDayWise}
                            />
                        </FilterSection>

                        {/* Specific Date Filter */}
                        <FilterSection label="Pick a Date" width={200}>
                            <DatePicker
                                style={{ width: "100%" }}
                                value={specificDate}
                                onChange={onPickSpecificDate}
                            />
                        </FilterSection>

                        {/* Date Range Filter */}
                        <FilterSection
                            label="Date Range"
                            width={300}
                        >
                            <DatePicker.RangePicker
                                style={{ width: "100%" }}
                                value={dateRange}
                                onChange={onSelectDateRange}
                                format="DD-MM-YYYY"
                                allowClear={true}
                                placeholder={['Start Date', 'End Date']}
                            />
                        </FilterSection>
                    </Row>

                    {/* Table Section */}
                    <Row style={{ padding: "15px 0 0 10px" }}>
                        <Typography.Text className="invoiceHeader">
                            Recent Orders
                        </Typography.Text>
                    </Row>
                    <Table
                        style={{ width: "100%" }}
                        bordered
                        loading={loading}
                        columns={columns}
                        dataSource={invoices}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: total => `Total ${total} items`,
                        }}
                    />
                </Space>
            </div>
        </>
    );
};

interface FilterSectionProps {
    label: string;
    width: number;
    children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    label,
    width,
    children,
}) => (
    <Space
        direction="vertical"
        style={{
            textAlign: "start",
            paddingRight: "10px",
        }}
    >
        <Typography.Text className="primary-input-field-header-style">
            {label}
        </Typography.Text>
        <ConfigProvider
            theme={{
                token: {
                    colorBgTextActive: "rgba(0, 0, 0, 0.15)",
                },
            }}
        >
            <div style={{ width }}>{children}</div>
        </ConfigProvider>
    </Space>
);

// Constants
const purchaseTypeOptions = [
    { value: "--All--", label: "--All--" },
    { value: "Credit", label: "Credit" },
    { value: "Cash", label: "Cash" },
    { value: "Digital", label: "Digital" },
];

const invoiceStatusOptions = [
    { value: "--All--", label: "--All--" },
    { value: "Pending", label: "Pending" },
    { value: "Paid", label: "Paid" },
];

const dayWiseOptions = [
    { value: "--All--", label: "--All--" },
    { value: "Today", label: "Today" },
    { value: "Yesterday", label: "Yesterday" },
    { value: "Day Before Yesterday", label: "Day Before Yesterday" },
];

export default Invoices;
