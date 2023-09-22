import React from "react";
import { Col, Row, Typography, Space, Button, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

export const Stocks = () => {

    const columns = [
        {
            key: "1",
            title: "Product",
            dataIndex: "product",
            width: "8%",
        },
        {
            key: "2",
            title: "Company",
            dataIndex: "company",
            width: "5%",
        },
        {
            key: "3",
            title: "Quantity",
            dataIndex: "quantity",
            width: "4%",
        },
        {
            key: "4",
            title: "Mf Date",
            dataIndex: "manufacturingDate",
            width: "4%"
        },
        {
            key: "5",
            title: "Exp Date",
            dataIndex: "expiryDate",
            width: "4%"
        },
        {
            key: "6",
            title: "SGST",
            dataIndex: "sGst",
            width: "4%"
        },
        {
            key: "7",
            title: "CGST",
            dataIndex: "cGst",
            width: "4%"
        },
        {
            key: "8",
            title: "IGST",
            dataIndex: "iGst",
            width: "4%"
        },
        {
            key: "9",
            title: "Rate",
            dataIndex: "rate",
            width: "4%"
        }
    ];

    const data = [
        {
            key: "1",
            product: "Apple",
        }
    ]

    return (
        <div className="stocksWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"small"}>
                    <Row style={{padding: "10px 0 0 28px" }} justify={'space-between'}>
                        <Typography.Title level={3}>Stocks</Typography.Title>
                        <Space direction="horizontal" size={"large"} align="end">
                            <Link
                                to={{
                                    pathname: "add",
                                    state: { obj: null, isEditable: false }
                                }}
                                style={{ textDecoration: "none" }}>
                                <Button
                                    style={{
                                        marginRight: "45px",
                                    }}
                                    // onClick={}
                                    type="primary"
                                    shape="round"
                                    size="large"
                                >
                                    Add Stock
                                    <PlusCircleOutlined />
                                </Button>
                            </Link>
                        </Space>
                    </Row>
                    <Row style={{ padding: "10px 20px 10px 8px" }}>
                        <Space
                            direction="vertical"
                            size={"large"}
                            style={{
                                textAlign: "start",
                                width: "84vw",
                            }}
                        >
                            <Outlet />
                        </Space>
                    </Row>
                    <Row style={{ padding: "0 10px", width: "85vw" }}>
                        <Table
                            bordered
                            columns={columns}
                            dataSource={data}
                            scroll={{
                                y: 470,
                            }}
                        >

                        </Table>
                    </Row>
                </Space>
            </Col>
        </div>
    );
};
