import React, { useEffect, useState } from "react";
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
import { getToken } from "../../../services/cookies/tokenUtils";

export const Customers = () => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([{}]);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const checkAuthentication = async (token) => {
        if (!(await authenticate(token))) {
            console.log("Unauthenticated!");
            navigate("/login");
            return false;
        }
        return true;
    };

    const mapCustomerDetails = (name, addressDto) => {
        let address = `${addressDto.blockNumber}, \n ${addressDto.street}, \n${addressDto.city}, \n ${addressDto.state}`;
        return [name, address];
    };

    const fetchCustomers = async () => {
        try {
            const response = await getAllCustomers(getToken());
            if (response && response.length > 0) {
                const mappedCustomers = response.map((item) => ({
                    key: item.id,
                    customerNumber: item.customerNumber,
                    customerDetails: mapCustomerDetails(
                        item.name,
                        item.addressDto
                    ),
                    phone: item.phone,
                    purchasedAmount: item.totalPurchaseAmount,
                    paidAmount: item.totalPurchaseAmount - item.pendingAmount,
                    pendingAmount: item.pendingAmount,
                }));

                setCustomers(mappedCustomers);
                console.log("Mapped Products: \n" + mappedCustomers);
            } else {
                throw new Error("Data Not Found!");
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        document.title = "Customers";
        if (checkAuthentication(getToken())) {
            setLoading(true);
            fetchCustomers().then(() => setLoading(false));
        }
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
                                dataSource={customers}
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
