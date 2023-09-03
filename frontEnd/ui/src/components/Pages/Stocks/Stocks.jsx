import React from "react";
import { Col, Row, Typography, Space, Button } from "antd";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

export const Stocks = () => {
    return (
        <div className="stocksWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"large"}>
                    <Row style={{ padding: "0 20px" }}>
                        <Typography.Title level={4}>Stocks</Typography.Title>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space direction="horizontal" size={"large"}>
                            <Link to="add" style={{ textDecoration: "none" }}>
                                <Button
                                    // onClick={}
                                    type="primary"
                                    shape="round"
                                    size="large"
                                >
                                    Add Stock
                                    <PlusCircleOutlined />
                                </Button>
                            </Link>
                            <Link to="edit" style={{ textDecoration: "none" }}>
                                <Button
                                    // onClick={}
                                    type="primary"
                                    shape="round"
                                    size="large"
                                >
                                    Edit Stock
                                    <EditOutlined />
                                </Button>
                            </Link>
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
                            <Outlet />
                        </Space>
                    </Row>
                </Space>
            </Col>
        </div>
    );
};
