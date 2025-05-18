import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Row, Typography } from "antd";
import React from "react";

const Customers: React.FC = () => {
    return (
        <div
            className="customersWrapper"
            style={{
                margin: "8px 5px 8px 5px",
            }}
        >
            <Row justify="space-between" align="middle">
                <Typography.Title level={3}>Customers</Typography.Title>
                <Button type="primary" shape="round" size="large">
                    <PlusCircleOutlined />
                    Add Customer
                </Button>
            </Row>
        </div>
    );
};

export default Customers;
