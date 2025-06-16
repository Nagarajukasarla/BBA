import {
    EditOutlined,
    InfoCircleTwoTone,
    PlusCircleOutlined,
    ReloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {
    Button,
    Popover,
    Row,
    Space,
    Table,
    Tooltip,
    Typography,
    notification
} from "antd";
import { ColumnType } from "antd/es/table";
import type { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import APIResponse from "@/classes/APIResponse";
import _Date from "@/classes/core/_Date";
import CustomerHelper from "@/classes/helpers/CustomerHelper";
import { CButton } from "@/components/common/CButton";
import { CDatePicker } from "@/components/common/CDatePicker";
import { CDateRangePicker } from "@/components/common/CDateRangePicker";
import { CSelect } from "@/components/common/CSelect";
import { InputField } from "@/components/common/InputField";
import useDebounce from "@/hooks/useDebounce";
import useInvoiceFilters from "@/hooks/useInvoiceFilters";
import customerService from "@/services/api/customerService";
import invoiceService from "@/services/api/invoiceService";
import { Invoice, LiteCustomer } from "@/types/model";

export const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Store the selected customer for display purposes
    const [, setSelectedCustomer] = useState<LiteCustomer | null>(null);
    // Store the selected customer number for the dropdown value
    const [selectedCustomerNumber, setSelectedCustomerNumber] =
        useState<string>("--All--");
    const [customersAsOptions, setCustomersAsOptions] = useState<
        Array<{ value: string; label: string; customValue: any }>
    >([]);

    // Use our custom hooks for filter management
    const {
        filters,
        getApiFilters,
        hasActiveFilters,
        setCustomer: setFilterCustomer,
        setPaymentMode,
        setStatus,
        setDayWise,
        setSpecificDate,
        setDateRange,
        setSearchQuery,
        resetFilters,
    } = useInvoiceFilters();

    // Debounce the search query to avoid too many API calls
    const debouncedSearchQuery = useDebounce(filters.searchQuery, 500);

    const navigate = useNavigate();
    const [, contextHolder] = notification.useNotification();

    // Fetch invoices with proper typing
    const fetchInvoices = useCallback(async () => {
        try {
            setLoading(true);
            // Get the current filters in API format
            const apiFilters = getApiFilters();

            // Debug log to see what filters are being applied
            console.log("Applying filters:", apiFilters);

            // Use the InvoiceService which will use MockDataService in development
            // and the real API in production
            const response = await invoiceService.fetchFilteredInvoices(
                apiFilters
            );
            if (response.code === APIResponse.SUCCESS && response.data) {
                console.log("Filtered invoices:", response.data);
                setInvoices(response.data);
            }
        } catch (error) {
            console.error("Error fetching invoices:", error);
        } finally {
            setLoading(false);
        }
    }, [getApiFilters]);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await customerService.fetchLiteCustomers();
            if (response.code === APIResponse.SUCCESS && response.data) {
                setCustomersAsOptions(
                    CustomerHelper.getCustomerAsOptions({
                        customers: response.data,
                        addAllOption: true,
                    })
                );
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch invoices when filters change
    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    // Effect to fetch invoices when debounced search query changes
    useEffect(() => {
        fetchInvoices();
    }, [debouncedSearchQuery, fetchInvoices]);

    // Effect to fetch initial data
    useEffect(() => {
        document.title = "Invoices";
        fetchCustomers();
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
            render: (customer: LiteCustomer) => {
                const customerDetails = CustomerHelper.mapCustomerDetails({
                    name: customer.name,
                    address: customer.address,
                    concat: false,
                });
                console.log("CustomerDetails: ", customerDetails);
                return (
                    <Space>
                        <Typography.Text>{customerDetails[0]}</Typography.Text>
                        <Popover content={customerDetails[1]}>
                            <InfoCircleTwoTone />
                        </Popover>
                    </Space>
                );
            },
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
            render: (date: Date) =>
                _Date.formatToDayMonthYear(date.toISOString()),
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
        navigate("/app/new-invoice");
    };

    const onSelectedCustomer = (
        value: string,
        option: { value: string; label: string; customValue: any }
    ) => {
        if (value === "All") {
            setSelectedCustomer(null);
            setSelectedCustomerNumber("--All--");
            setFilterCustomer(null);
        } else {
            // The customValue already contains the customer object
            setSelectedCustomer(option.customValue);
            setSelectedCustomerNumber(value);
            setFilterCustomer(option.customValue.id);
        }
    };

    const onSelectPurchaseType = (value: string) => {
        setPaymentMode(value === "--All--" ? null : value);
    };

    const onSelectedInvoiceStatus = (value: string) => {
        setStatus(value === "--All--" ? null : value);
    };

    const onSelectedDayWise = (value: string) => {
        setDayWise(value === "--All--" ? null : value);
    };

    const onPickSpecificDate = (value: Dayjs | null) => {
        setSpecificDate(value);
    };

    const onSelectDateRange = (
        dates: [Dayjs | null, Dayjs | null] | null,
        _dateStrings: [string, string]
    ) => {
        setDateRange(dates || [null, null]);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            {contextHolder}
            <div>
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
                <Row style={{ padding: "0 5px" }}>
                    <CSelect
                        containerStyle={{ margin: "0 10px 10px 0" }}
                        label="Customer"
                        width={400}
                        value={selectedCustomerNumber}
                        options={customersAsOptions}
                        onSelect={onSelectedCustomer}
                    />
                    <CSelect
                        containerStyle={{ margin: "0 10px 10px 0" }}
                        label="Purchase Type"
                        width={170}
                        value={filters.paymentMode || "--All--"}
                        options={purchaseTypeOptions}
                        onSelect={onSelectPurchaseType}
                    />
                    <CSelect
                        containerStyle={{ margin: "0 10px 10px 0" }}
                        label="Status"
                        width={170}
                        value={filters.status || "--All--"}
                        options={invoiceStatusOptions}
                        onSelect={onSelectedInvoiceStatus}
                    />
                    <CSelect
                        containerStyle={{ margin: "0 10px 10px 0" }}
                        label="Day Wise"
                        width={170}
                        value={filters.dayWise || "--All--"}
                        options={dayWiseOptions}
                        onSelect={onSelectedDayWise}
                    />
                    <CDatePicker
                        containerStyle={{ margin: "0 10px 10px 0" }}
                        label="Pick a Date"
                        width={200}
                        value={filters.specificDate}
                        onChange={onPickSpecificDate}
                    />
                    <CDateRangePicker
                        containerStyle={{ margin: "0 10px 10px 0" }}
                        label="Date Range"
                        width={300}
                        value={filters.dateRange}
                        onChange={onSelectDateRange}
                    />
                    <InputField
                        containerStyle={{ margin: "10px 0 0 0" }}
                        label="Search"
                        width={450}
                        value={filters.searchQuery}
                        onChange={onSearchChange}
                        placeholder="Invoices number, customer name, amount etc..."
                        suffix={<SearchOutlined style={{ fontSize: "16px", margin:"0 8px 0 0"}}/>}
                    />
                    <CButton
                        style={{ margin: "41px 0 0 20px" }}
                        onClick={() => {
                            resetFilters();
                            setSelectedCustomer(null);
                            setSelectedCustomerNumber("--All--");
                        }}
                        type="primary"
                        icon={<ReloadOutlined />}
                        disabled={!hasActiveFilters()}
                    >
                        Reset Filters
                    </CButton>
                </Row>                
                <Table
                    style={{ width: "100%", marginTop: "20px" }}
                    bordered
                    loading={loading}
                    columns={columns}
                    dataSource={invoices}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: total => `Total ${total} items`,
                    }}
                    locale={{
                        emptyText:
                            "No invoices found. Try adjusting your filters.",
                    }}
                />

                {/* Show a message when filters are applied but no results */}
                {!loading && invoices.length === 0 && hasActiveFilters() && (
                    <div style={{ textAlign: "center", marginTop: 20 }}>
                        <Typography.Text type="secondary">
                            No invoices match your current filters. Try
                            adjusting or
                            <Button
                                type="primary"
                                size="small"
                                icon={<ReloadOutlined />}
                                onClick={() => {
                                    resetFilters();
                                    setSelectedCustomer(null);
                                    setSelectedCustomerNumber("--All--");
                                }}
                                style={{ marginLeft: 5 }}
                            >
                                Reset Filters
                            </Button>
                        </Typography.Text>
                    </div>
                )}
                {/* </Space> */}
            </div>
        </>
    );
};

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
