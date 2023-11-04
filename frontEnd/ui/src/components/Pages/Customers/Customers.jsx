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
import { getToken } from "../../../services/load/loadBrowserContent";

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
        // it is not properly mapping values bug 
        let address = `${addressDto.blockNumber}, \n ${addressDto.street}, \n${addressDto.city}, \n ${addressDto.state}`;
        return [name, address];
    };

    const fetchCustomers = async () => {
        try {
            const response = await getAllCustomers(getToken());
            if (response && response.length > 0) {
                const mappedCustomers = response.map((item) => ({
                    key: item.id,
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

    // const data = [
    //     {
    //         key: "1",
    //         id: 1,
    //         customerName:
    //             "Sri Venkateshwara Pharma Distributors, Kamareddy",
    //         purchasedAmount: 1000,
    //         pendingAmount: 500,
    //         paidAmount: 500,
    //     },
    //     {
    //         key: "2",
    //         id: 2,
    //         customerName: "Chandra Pharma Distributors, Kamareddy",
    //         purchasedAmount: 1500,
    //         pendingAmount: 200,
    //         paidAmount: 1300,
    //     },
    //     {
    //         key: "3",
    //         id: 3,
    //         customerName: "Vigneshwara Pharma Distributors, Hyderabad",
    //         purchasedAmount: 750,
    //         pendingAmount: 300,
    //         paidAmount: 450,
    //     },
    //     {
    //         key: "4",
    //         id: 4,
    //         customerName: "Raja Rajeshwara Pharma Distributors, Kamareddy",
    //         purchasedAmount: 2000,
    //         pendingAmount: 1000,
    //         paidAmount: 1000,
    //     },
    //     {
    //         key: "5",
    //         id: 5,
    //         customerName: "Seraphina Von Wigglesworth",
    //         purchasedAmount: 1200,
    //         pendingAmount: 600,
    //         paidAmount: 600,
    //     },
    //     {
    //         key: "6",
    //         id: 6,
    //         customerName:
    //             "Xanthippus Excalibur MacGillicuddy Vanderblumpington",
    //         purchasedAmount: 6000,
    //         pendingAmount: 3000,
    //         paidAmount: 3000,
    //     },
    //     {
    //         key: "7",
    //         id: 7,
    //         customerName: "Ferdinando Bartholomew Bartholomew the Third",
    //         purchasedAmount: 7000,
    //         pendingAmount: 3500,
    //         paidAmount: 3500,
    //     },
    //     {
    //         key: "8",
    //         id: 8,
    //         customerName: "Eustace Peregrine Underhill",
    //         purchasedAmount: 8000,
    //         pendingAmount: 4000,
    //         paidAmount: 4000,
    //     },
    //     {
    //         key: "9",
    //         id: 9,
    //         customerName: "Wilhelmina Winifred Worthington-Smythe",
    //         purchasedAmount: 9000,
    //         pendingAmount: 4500,
    //         paidAmount: 4500,
    //     },
    //     {
    //         key: "10",
    //         id: 10,
    //         customerName: "Aloysius Archimedes Bartholomew",
    //         purchasedAmount: 10000,
    //         pendingAmount: 5000,
    //         paidAmount: 5000,
    //     },
    //     {
    //         key: "11",
    //         id: 11,
    //         customerName:
    //             "Xanthippus Excalibur MacGillicuddy Vanderblumpington",
    //         purchasedAmount: 11000,
    //         pendingAmount: 5500,
    //         paidAmount: 5500,
    //     },
    //     {
    //         key: "12",
    //         id: 12,
    //         customerName: "Ferdinando Bartholomew Bartholomew the Third",
    //         purchasedAmount: 12000,
    //         pendingAmount: 6000,
    //         paidAmount: 6000,
    //     },
    //     {
    //         key: "13",
    //         id: 13,
    //         customerName: "Eustace Peregrine Underhill",
    //         purchasedAmount: 13000,
    //         pendingAmount: 6500,
    //         paidAmount: 6500,
    //     },
    //     {
    //         key: "15",
    //         id: 15,
    //         customerName: "Wilhelmina Winifred Worthington-Smythe",
    //         purchasedAmount: 14000,
    //         pendingAmount: 7000,
    //         paidAmount: 7000,
    //     },
    //     {
    //         key: "16",
    //         id: 16,
    //         customerName: "Aloysius Archimedes Bartholomew",
    //         purchasedAmount: 15000,
    //         pendingAmount: 7500,
    //         paidAmount: 7500,
    //     },
    //     {
    //         key: "17",
    //         id: 17,
    //         customerName:
    //             "Xanthippus Excalibur MacGillicuddy Vanderblumpington",
    //         purchasedAmount: 16000,
    //         pendingAmount: 8000,
    //         paidAmount: 8000,
    //     },
    //     {
    //         key: "18",
    //         id: 18,
    //         customerName: "Ferdinando Bartholomew Bartholomew the Third",
    //         purchasedAmount: 17000,
    //         pendingAmount: 8500,
    //         paidAmount: 8500,
    //     },
    //     {
    //         key: "19",
    //         id: 19,
    //         customerName: "Eustace Peregrine Underhill",
    //         purchasedAmount: 18000,
    //         pendingAmount: 9000,
    //         paidAmount: 9000,
    //     },
    //     {
    //         key: "20",
    //         id: 20,
    //         customerName: "Wilhelmina Winifred Worthington-Smythe",
    //         purchasedAmount: 19000,
    //         pendingAmount: 9500,
    //         paidAmount: 9500,
    //     },
    // ];

    // OnClick Handlers
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
