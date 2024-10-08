import React, { useContext, useEffect, useState } from "react";
import {
    Col,
    Row,
    Typography,
    Space,
    Button,
    Table,
    Tooltip,
    Popover,
} from "antd";

import {
    PlusCircleOutlined,
    EditOutlined,
    InfoCircleTwoTone,
} from "@ant-design/icons";
import "./css/customer.css";
import { useNavigate } from "react-router-dom";
import {
    authenticate,
    getAllCustomers,
} from "../../../services/api/get/authorizedGetServices";
import { mapCustomerDetails } from "../../../services/utils/common/helpers/client/customerHelpers";
import TokenManager from "../../../services/cookies/TokenManager";
import { Data } from "../../context/Context";
import CustomerLocalManager from "./CustomerLocalManager";

export const Customers = () => {

    const customers = CustomerLocalManager.getCustomers();

    const [mappedCustomers, setMappedCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const checkAuthentication = async (token) => {
        if (!(await authenticate(token))) {
            console.log("Unauthenticated in Customers!");
            navigate("/login");
            return false;
        }
        return true;
    };

    const mapCustomers = () => {
        const mappedCustomers = customers.map((item) => ({
            key: item.id,
            customerNumber: item.customerNumber,
            customerDetails: mapCustomerDetails({
                name: item.customerName,
                address: item.addressDto,
                include: [
                    "blockNumber",
                    "street",
                    "area",
                    "city",
                    "state",
                ],
                concat: false,
            }),
            phone: item.phone,
            purchasedAmount: item.totalPurchaseAmount,
            paidAmount: item.paidAmount,
            pendingAmount: item.pendingAmount,
        }));
        setMappedCustomers(mappedCustomers);
    }

    useEffect(() => {
        document.title = "Customers";
        setLoading(true);
        checkAuthentication(TokenManager.getToken()).then(() => setLoading(false));
        mapCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const customerColumns = [
        {
            key: "customerNumber",
            title: "Number",
            dataIndex: "customerNumber",
            width: "9%",
        },
        {
            key: "customerDetails",
            title: "Name",
            dataIndex: "customerDetails",
            width: "40%",
            render: (obj) => (
                <>
                    <Space>
                        <Typography.Text>{obj !== null && obj !== undefined ? obj[0] : ""}</Typography.Text>
                        <Popover content={obj !== null && obj !== undefined ? obj[1] : ""}>
                            <InfoCircleTwoTone />
                        </Popover>
                    </Space>
                </>
            ),
        },
        {
            key: "phone",
            title: "Phone",
            dataIndex: "phone",
            width: "13%",
        },
        {
            key: "purchasedAmount",
            title: "Purchased",
            dataIndex: "purchasedAmount",
            width: "10%",
        },
        {
            key: "paid",
            title: "Paid",
            dataIndex: "paidAmount",
            width: "10%",
        },
        {
            key: "balance",
            title: "Balance",
            dataIndex: "pendingAmount",
            width: "10%",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <>
                    <Tooltip title="Edit">
                        <EditOutlined className="editRecord" />
                    </Tooltip>
                </>
            ),
            width: "5%",
        },
    ];

    const onClickNewCustomer = () => {
        navigate("/app/new-customer");
    };

    return (
        <div className="customerWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"large"}>
                    <Row style={{ padding: "0 20px" }}>
                        <Typography.Title level={4}>Customers</Typography.Title>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space direction="horizontal" size={"large"}>
                            <Button
                                onClick={onClickNewCustomer}
                                type="primary"
                                shape="round"
                                size="large"
                            >
                                Add Customer
                                <PlusCircleOutlined />
                            </Button>
                        </Space>
                    </Row>
                    <Row style={{ padding: "0 20px 10px 20px" }}>
                        <Space
                            direction="vertical"
                            size={"large"}
                            style={{
                                textAlign: "start",
                                marginTop: "20px",
                                width: "80vw",
                            }}
                        >
                            <p className="customerHeader">My Customers</p>
                            <Table
                                bordered
                                columns={customerColumns}
                                dataSource={mappedCustomers}
                                loading={loading}
                                pagination={false}
                            ></Table>
                        </Space>
                    </Row>
                </Space>
            </Col>
        </div>
    );
};
