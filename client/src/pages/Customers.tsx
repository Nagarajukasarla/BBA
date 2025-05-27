import { CSelect } from "@/components/common/CSelect";
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
            <Row style={{ marginTop: "20px" }}>
                <CSelect
                    label="Region"
                    width={250}
                    value={""}
                    options={[]}
                    onSelect={(_value, option) => {
                        console.log(option);
                    }}
                    placeholder="Select Region"
                    showSearch
                    allowClear
                    loading={false}
                />
            </Row>
        </div>
    );
};

export default Customers;
