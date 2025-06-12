import { CSelect } from "@/components/common/CSelect";
import { InputField } from "@/components/common/InputField";
import useCustomerFilters from "@/hooks/useCustomerFilters";
import { CustomersWithBasicSales } from "@/types/model";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Row, Space, Table, Typography } from "antd";
import React, { useState } from "react";

export const options = [
    "--All--",
    "Bills",
    "Pending Bills",
    "Outstanding Amount"
];

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<CustomersWithBasicSales[]>([]);
    const [cityTownMap, setCityTownMap] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState<boolean>(false);

    const 

    const {
        filters,
        getApiFilters,
        hasActiveFilters,
        setCity,
        setTown,
        setViewType,
        setSearchQuery,
        resetFilters,
    } = useCustomerFilters();

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
            <Row style={{ marginTop: "20px", justifyContent: "space-between" }}>
                <Space>
                    <CSelect
                        containerStyle={{
                            marginRight: "10px",
                        }}
                        label="City"
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
                    <CSelect
                        containerStyle={{
                            marginRight: "10px",
                        }}
                        label="Village/Town"
                        width={200}
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
                </Space>
                <Space>
                    <InputField
                        containerStyle={{
                            marginRight: "10px",
                            width: "350px",
                        }}
                        label="Customer Name"
                        style={{ padding: "4px 8px" }}
                        value={""}
                        onChange={value => {
                            console.log(value);
                        }}
                        placeholder="Enter Customer Name"
                        suffix={
                            <SearchOutlined style={{ cursor: "pointer" }} />
                        }
                    />
                    <CSelect
                        containerStyle={{
                            marginRight: "10px",
                        }}
                        label="View Type"
                        width={200}
                        value={""}
                        options={options.map(option => ({
                            value: option,
                            label: option,
                        }))}
                        onSelect={value => {
                            console.log(value);
                        }}
                    />
                </Space>
            </Row>
            <Table
                style={{ width: "100%", marginTop: "20px" }}
                columns={[]}
                dataSource={[]}
                bordered
                loading={false}
                pagination={false}
            />
        </div>
    );
};

export default Customers;
