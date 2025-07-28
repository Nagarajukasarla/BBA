
import CInputField from "@/components/core/CInputField";
import CustomerFilters from "@/components/features/CustomerFilters";
import NewCustomer from "@/components/features/NewCustomer";
import { NewCustomerRef } from "@/types/component";
import { CustomersWithBasicSales } from "@/types/model";
import { FilterOutlined, PlusCircleOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Row, Table, Typography } from "antd";
import React, { useRef, useState } from "react";

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<CustomersWithBasicSales[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<boolean>(false);

    const newCustomerRef = useRef<NewCustomerRef>(null);

    // const {
    //     filters,
    //     getApiFilters,
    //     hasActiveFilters,
    //     setCity,
    //     setTown,
    //     setViewType,
    //     setSearchQuery,
    //     resetFilters,
    // } = useCustomerFilters();

    // const fetchCustomers = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         const apiFilters = getApiFilters();
    //         const response = await customerService.fetchCustomersWithBasicSales(getApiFilters());

    //     }
    // } [getApiFilters])

    return (
        <div
            className="customersWrapper"
            style={{
                margin: "8px 5px 8px 5px",
            }}
        >
            <Row justify="space-between" align="middle">
                <Typography.Title level={3}>Customers</Typography.Title>
                <Button type="primary" shape="round" size="large" onClick={() => setOpen(!open)}>
                    <PlusCircleOutlined />
                    Add Customer
                </Button>
            </Row>
            <Row style={{ marginTop: "20px", alignItems: "end" }}>
                <CInputField
                    containerStyle={{
                        marginRight: "20px",
                        width: "75%"
                    }}
                    label="Search"
                    style={{ padding: "4px 8px" }}
                    value={""}
                    onChange={value => {
                        console.log(value);
                    }}
                    placeholder="Number, Customer Name, Pincode"
                    suffix={
                        <SearchOutlined style={{ cursor: "pointer" }} />
                    }
                />
                <Button type="primary" shape="round" size="middle" onClick={() => setOpenFilter(!openFilter)}>
                    {activeFilters ? (<><ReloadOutlined style={{ marginRight: "8px" }} /> Reset</>) : (<><FilterOutlined style={{ marginRight: "8px" }} /> Filter</>)}
                </Button>
            </Row>
            <Table
                style={{ width: "100%", marginTop: "20px" }}
                columns={[]}
                dataSource={[]}
                bordered
                loading={false}
                pagination={false}
            />
            <Modal
                open={open}
                onCancel={() => { setOpen(false); newCustomerRef.current?.reset() }}
                onOk={() => newCustomerRef.current?.submit()}
                title={<Typography.Text>New Customer</Typography.Text>}
                maskClosable={false}
                keyboard={false}
                width="70%"
            >
                <NewCustomer ref={newCustomerRef} />
            </Modal>
            <Modal
                open={openFilter}
                onCancel={() => { setOpenFilter(false); }}
                onOk={() => { setOpenFilter(false); }}
                title={<Typography.Text>Customer Filter</Typography.Text>}
                maskClosable={false}
                keyboard={false}
                width="70%"
            >
                <CustomerFilters />
            </Modal>
        </div>
    );
};

export default Customers;
