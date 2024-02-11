import { Col, Space, Row, Typography, Button, Table, Tooltip } from "antd";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import "./utils/css/invoiceStyle.css";
import { useNavigate } from "react-router-dom";

export const Invoice = () => {
    useEffect(() => {
        document.title = "Invoice";
    });

    const navigate = useNavigate();

    const data = [
        {
            key: "1",
            invoiceNumber: "INV-00511",
            customer:
                "Xanthippus Excalibur MacGillicuddy Vanderblumpington Xanthippus Excalibur MacGillicuddy Vanderblumpington",
            amount: 1000,
            date: "2023-06-01",
        },
        {
            key: "2",
            invoiceNumber: "INV-00142",
            customer: "XYZ Corporation",
            amount: 2500,
            date: "2023-06-05",
        },
        {
            key: "3",
            invoiceNumber: "INV-00683",
            customer: "123 Industries",
            amount: 500,
            date: "2023-06-10",
        },
        {
            key: "4",
            invoiceNumber: "INV-00544",
            customer: "Example Corp",
            amount: 800,
            date: "2023-06-15",
        },
    ];

    const newInvoice = () => {
        navigate("/app/new-invoice");
    };

    return (
        <div className="invoiceWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"large"}>
                    <Row style={{ padding: "0 20px" }}>
                        <Typography.Title level={4}>Invoice</Typography.Title>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space direction="horizontal" size={"large"}>
                            <Button
                                onClick={newInvoice}
                                type="primary"
                                shape="round"
                                size="large"
                            >
                                New Invoice
                                <PlusCircleOutlined />
                            </Button>
                            <Button type="primary" shape="round" size="large">
                                Edit Invoice
                                <EditOutlined />
                            </Button>
                        </Space>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space
                            direction="vertical"
                            size={"large"}
                            style={{ textAlign: "start", marginTop: "20px" }}
                        >
                            <p className="invoiceHeader">Recent Orders</p>
                            <Table
                                columns={[
                                    {
                                        title: "Invoice Number",
                                        dataIndex: "invoiceNumber",
                                        key: "invoiceNumber",
                                    },
                                    {
                                        title: "Customer",
                                        dataIndex: "customer",
                                        key: "customerName",
                                    },
                                    {
                                        title: "Amount",
                                        dataIndex: "amount",
                                        key: "amount",
                                    },
                                    {
                                        title: "Date",
                                        dataIndex: "date",
                                        key: "date",
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
                                    },
                                ]}
                                dataSource={data}
                            ></Table>
                        </Space>
                    </Row>
                </Space>
            </Col>
        </div>
    );
};
