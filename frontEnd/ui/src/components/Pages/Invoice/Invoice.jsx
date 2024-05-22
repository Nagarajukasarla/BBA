import {
    Col,
    Space,
    Row,
    Typography,
    Button,
    Table,
    Tooltip,
    Popover,
    Input,
    Select,
    notification,
    ConfigProvider,
} from "antd";
import {
    PlusCircleOutlined,
    EditOutlined,
    InfoCircleTwoTone,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import "./utils/css/invoiceStyle.css";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../../services/api/get/authorizedGetServices";
import { getToken } from "../../../services/cookies/tokenUtils";
import {
    customerNameHelper,
    getCustomerAsOptions,
} from "../../../services/utils/common/helpers/client/customerHelpers";
import { fetchCustomers } from "../../../services/utils/common/helpers/server/customerHelpers";
import { Data } from "../../context/Context";
import {
    createFiltersObj,
    fetchFilteredInvoices,
} from "./utils/helpers/invoiceHelpers";

export const Invoice = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [purchaseType, setPurchaseType] = useState("");
    const [invoiceStatus, setInvoiceStatus] = useState("");
    const [customersAsOptions, setCustomersAsOptions] = useState([]);
    const [dayWise, setDayWise] = useState("");
    const [fromDate, setFromDate] = useState(null);

   const navigate = useNavigate();
    const { Search } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { customers, setCustomers } = useContext(Data);

    const checkAuthentication = async (token) => {
        if (!(await authenticate(token))) {
            console.log("Unauthenticated in Invoices!");
            navigate("/login");
            return false;
        }
        return true;
    };

    const setFilteredInvoices = async (filters) => {
        const filteredInvoices = await fetchFilteredInvoices(
            getToken(),
            filters
        );
        setInvoices(filteredInvoices);
    };

    useEffect(() => {
        console.log(JSON.stringify(customer));
        const filters = createFiltersObj({
            customer,
            purchaseType,
            invoiceStatus,
        });
        setFilteredInvoices(filters);
    }, [customer, purchaseType, invoiceStatus]);

    useEffect(() => {
        document.title = "Invoice";
        if (checkAuthentication(getToken())) {
            const filters = createFiltersObj({
                customer,
                purchaseType,
                invoiceStatus,
            });
            setLoading(true);
            setFilteredInvoices(filters).then(() => setLoading(false));
            setLoading(true);
            fetchCustomers(getToken()).then((data) => {
                setLoading(false);
                setCustomers(data);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCustomersAsOptions(
            getCustomerAsOptions({
                customers: customers,
                addAllOption: true,
            })
        );
    }, [customers]);

    const columns = [
        {
            key: "invoiceNumber",
            title: "Invoice Number",
            dataIndex: "invoiceNumber",
            width: "3%",
        },
        {
            key: "customerDetails",
            title: "Customer",
            dataIndex: "customerDetails",
            width: "9%",
            render: (obj) => (
                <>
                    <Space>
                        <Typography.Text>
                            {obj !== null && obj !== undefined ? obj[0] : ""}
                        </Typography.Text>
                        <Popover
                            content={
                                obj !== null && obj !== undefined ? obj[1] : ""
                            }
                        >
                            <InfoCircleTwoTone />
                        </Popover>
                    </Space>
                </>
            ),
        },
        {
            key: "paymentMode",
            title: "Type",
            dataIndex: "paymentMode",
            width: "5%",
            render: (obj) => (
                <Typography.Text>
                    {obj[0].toUpperCase() + obj.substring(1)}
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
        },
        {
            key: "status",
            title: "Status",
            dataIndex: "status",
            width: "3%",
            render: (obj) => (
                <Typography.Text>
                    {obj[0].toUpperCase() + obj.substring(1)}
                </Typography.Text>
            ),
        },
        {
            key: "action",
            title: "Action",
            render: () => (
                <>
                    <Tooltip title="Edit">
                        <EditOutlined />
                    </Tooltip>
                </>
            ),
            width: "2%",
        },
    ];

    const purchaseTypeOptions = [
        {
            value: "--All--",
        },
        {
            value: "Credit",
        },
        {
            value: "Cash",
        },
        {
            value: "Digital",
        },
    ];

    const invoiceStatusOptions = [
        {
            value: "--All--",
        },
        {
            value: "Pending",
        },
        {
            value: "Paid",
        },
    ];

    const dayWiseOptions = [
        {
            value: "--All--",
        },
        {
            value: "Today",
        },
        {
            value: "Yestarday",
        },
        {
            value: "Day Before Yestarday",
        },
        {
            value: "Custom",
        },
    ];

    const newInvoice = () => {
        navigate("/app/new-invoice");
    };

    const capatalizeFirstLetter = (data) => {
        return data !== null && data !== ""
            ? data.charAt(0).toUpperCase() + data.slice(1)
            : "";
    };

    const importantStyles = { marginTop: "-4px", important: true };

    const filterOptionsStyles = {
        paddingRight: "20px",
    };

    const onSelectedCustomer = (value, selectedCustomer) => {
        setCustomer(selectedCustomer.customValue);
    };

    const onSelectPurchaseType = (value) => {
        console.log(value);
        setPurchaseType(value);
    };

    const onSelectedInvoiceStatus = (value) => {
        console.log(value);
        setInvoiceStatus(value);
    };

    return (
        <>
            {/* set dropdown and show notifications */}
            {contextHolder}
            <div className="invoiceWrapper">
                <Col span={24}>
                    <Space direction="vertical" size={"small"}>
                        <Row
                            style={{ padding: "20px 0 0 20px" }}
                            justify={"space-between"}
                            align="middle"
                        >
                            <Typography.Title level={3}>
                                Invoice
                            </Typography.Title>
                            <Space direction="horizontal" size={"large"}>
                                <Button
                                    onClick={newInvoice}
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    className="newInvoiceBtn addOrEditInvoiceBtn"
                                >
                                    <p style={{ ...importantStyles }}>
                                        New Invoice
                                    </p>
                                    <PlusCircleOutlined
                                        style={{
                                            paddingLeft: "5px",
                                            fontSize: "20px",
                                        }}
                                    />
                                </Button>
                            </Space>
                        </Row>
                        <Row style={{ padding: "0 20px" }} align="middle">
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    ...filterOptionsStyles,
                                }}
                            >
                                <Typography.Text className="primary-input-field-header-style">
                                    Customer
                                </Typography.Text>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            Select: {
                                                optionActiveBg:
                                                    "rgba(0, 0, 0, 0.15)",
                                            },
                                        },
                                    }}
                                >
                                    <Select
                                        style={{
                                            width: 380,
                                        }}
                                        value={
                                            customer === null
                                                ? "--All--"
                                                : customerNameHelper(customer)
                                        }
                                        options={customersAsOptions}
                                        onSelect={(value, selectedCustomer) =>
                                            onSelectedCustomer(
                                                value,
                                                selectedCustomer
                                            )
                                        }
                                    />
                                </ConfigProvider>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    ...filterOptionsStyles,
                                }}
                            >
                                <Typography.Text className="primary-input-field-header-style">
                                    Purchase Type
                                </Typography.Text>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            Select: {
                                                optionActiveBg:
                                                    "rgba(0, 0, 0, 0.15)",
                                            },
                                        },
                                    }}
                                >
                                    <Select
                                        style={{
                                            width: 120,
                                        }}
                                        value={
                                            purchaseType === ""
                                                ? "--All--"
                                                : capatalizeFirstLetter(
                                                      purchaseType
                                                  )
                                        }
                                        options={purchaseTypeOptions}
                                        onSelect={onSelectPurchaseType}
                                    />
                                </ConfigProvider>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    ...filterOptionsStyles,
                                }}
                            >
                                <Typography.Text className="primary-input-field-header-style">
                                    Invoice Status
                                </Typography.Text>
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                    value={
                                        invoiceStatus === ""
                                            ? "--All--"
                                            : invoiceStatus
                                    }
                                    options={invoiceStatusOptions}
                                    onSelect={onSelectedInvoiceStatus}
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    ...filterOptionsStyles,
                                }}
                            >
                                <Typography.Text className="primary-input-field-header-style">
                                    Day Wise
                                </Typography.Text>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            Select: {
                                                optionActiveBg:
                                                    "rgba(0, 0, 0, 0.15)",
                                            },
                                        },
                                    }}
                                >
                                    <Select
                                        style={{
                                            width: 180,
                                        }}
                                        value={
                                            dayWise === ""
                                                ? "--All--"
                                                : capatalizeFirstLetter(dayWise)
                                        }
                                        options={dayWiseOptions}
                                        onSelect={(value) => setDayWise(value)}
                                    />
                                </ConfigProvider>
                            </Space>
                        </Row>
                        <Row style={{ padding: "15px 0 0 10px" }}>
                            <Space
                                direction="horizontal"
                                size={"large"}
                                style={{
                                    textAlign: "start",
                                    justifyContent: "space-between",
                                    padding: "0 30px 0 10px",
                                    width: "80vw",
                                }}
                            >
                                <p className="invoiceHeader">Recent Orders</p>
                                <Search
                                    style={{
                                        width: "360px",
                                        height: "30px",
                                    }}
                                    placeholder="Invoice Number, Amount, Customer Name"
                                />
                            </Space>
                        </Row>
                        <Space
                            direction="vertical"
                            size={"large"}
                            style={{
                                textAlign: "justify",
                                margin: "10px 0 0 20px",
                                width: "80vw",
                            }}
                        >
                            <Table
                                bordered
                                loading={loading}
                                columns={columns}
                                dataSource={invoices}
                                pagination={false}
                            ></Table>
                        </Space>
                    </Space>
                </Col>
            </div>
        </>
    );
};
