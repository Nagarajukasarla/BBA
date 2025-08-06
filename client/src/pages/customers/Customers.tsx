import APIResponse from "@/classes/APIResponse";
import CSelectHelper from "@/classes/helpers/CSelectHelper";
import CustomerHelper from "@/classes/helpers/CustomerHelper";
import CInputField from "@/components/core/CInputField";
import CustomerFilters from "@/components/features/CustomerFilters";
import NewCustomer from "@/components/features/NewCustomer";
import { dummyCityTownMap } from "@/data/customers";
import useCustomerFilters from "@/hooks/useCustomerFilters";
import customerService from "@/services/api/customerService";
import { NewCustomerRef } from "@/types/component";
import { CustomersWithBasicSales } from "@/types/model";
import { FilterOutlined, InfoCircleTwoTone, PlusCircleOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Popover, Row, Space, Table, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSelectOption } from "@/types/core";
import useDebounce from "@/hooks/useDebounce";

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<CustomersWithBasicSales[]>([]);
    const [cityTownMap, setCityTownMap] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [openAddCustomer, setOpenAddCustomer] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<CSelectOption<string> | null>(null);
    const [selectedTown, setSelectedTown] = useState<CSelectOption<string> | null>(null);
    const [selectedBillType, setSelectedBillType] = useState<CSelectOption<string> | null>(null);

    const newCustomerRef = useRef<NewCustomerRef>(null);

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
    
    const debouncedSearchQuery = useDebounce(filters.searchQuery, 500);

    const billTypesList = ["Paid", "Unpaid", "Pending"];

    const handleCityChange = (value: CSelectOption<string>) => {
        setSelectedCity(value);
        setCity(value.value);
    };

    const handleTownChange = (value: CSelectOption<string>) => {
        setSelectedTown(value);
        setTown(value.value);
    };

    const handleBillTypeChange = (value: CSelectOption<string>) => {
        setSelectedBillType(value);
        setViewType(value.value);
    };

    // Using a ref to track reset state
    const resetTriggerRef = useRef(0);

    const handleReset = useCallback(() => {
        resetFilters();
        setSelectedCity(null);
        setSelectedTown(null);
        setSelectedBillType(null);
        // Increment the reset trigger to indicate a reset has occurred
        resetTriggerRef.current += 1;
    }, [resetFilters]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const fetchCustomers = useCallback(async () => {
        try {
            setLoading(true);
            const apiFilters = getApiFilters();
            const response = await customerService.fetchCustomersWithBasicSales(apiFilters);
            if (response.code === APIResponse.SUCCESS && response.data) {
                setCustomers(response.data);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    }, [getApiFilters]);

    const onClickOkFilter = useCallback(() => {
        fetchCustomers();
        setOpenFilter(false);
    }, [fetchCustomers]);

    useEffect(() => {
        const cityTownMap = dummyCityTownMap;
        setCityTownMap(cityTownMap);
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Handle search and filter changes
    useEffect(() => {
        // Skip initial render and only fetch when filters change
        if (debouncedSearchQuery !== '' || resetTriggerRef.current > 0) {
            fetchCustomers();
        }
    }, [debouncedSearchQuery, resetTriggerRef.current]);



    const columns: ColumnType<CustomersWithBasicSales>[] = [
        {
            title: "Number",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "Customer Details",
            key: "customerDetails",
            render: (_: any, record: CustomersWithBasicSales) => {
                const customerDetails = CustomerHelper.mapCustomerDetails({
                    name: record.name,
                    address: record.address,
                    concat: false,
                });

                return (
                    <Space>
                        <Typography.Text>{customerDetails[0]}</Typography.Text>
                        <Popover content={customerDetails[1]}>
                            <InfoCircleTwoTone />
                        </Popover>
                    </Space>
                );
            },
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
            render: (_: any, record: CustomersWithBasicSales) => {
                return record.address.city;
            },
        },
        {
            title: "Town",
            dataIndex: "town",
            key: "town",
            render: (_: any, record: CustomersWithBasicSales) => {
                return record.address.town;
            },
        },
        {
            title: "Purchase Due",
            dataIndex: "purchaseDue",
            key: "purchaseDue",
            render: (_: any, record: CustomersWithBasicSales) => {
                return (record.purchase.totalAmount - record.purchase.paidAmount).toFixed(2);
            },
        },
        {
            title: "Sales Due",
            dataIndex: "salesDue",
            key: "salesDue",
            render: (_: any, record: CustomersWithBasicSales) => {
                return (record.sold.totalAmount - record.sold.paidAmount).toFixed(2);
            },
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_: any, __: CustomersWithBasicSales) => (
                <Space size="middle">
                    <Button type="primary" shape="round" size="small">
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div
            className="customersWrapper"
            style={{
                margin: "8px 5px 8px 5px",
            }}
        >
            <Row justify="space-between" align="middle">
                <Typography.Title level={3}>Customers</Typography.Title>
                <Button type="primary" shape="round" size="large" onClick={() => setOpenAddCustomer(!openAddCustomer)}>
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
                    value={filters.searchQuery}
                    onChange={onSearchChange}
                    placeholder="Number, Customer Name, Pincode"
                    suffix={
                        <SearchOutlined style={{ cursor: "pointer" }} />
                    }
                />
                {hasActiveFilters() ? (
                    <Button type="primary" shape="round" size="middle" onClick={handleReset}>
                        <ReloadOutlined style={{ marginRight: "8px" }} />
                        Reset
                    </Button>
                ) : (
                    <Button type="primary" shape="round" size="middle" onClick={() => setOpenFilter(!openFilter)}>
                        <FilterOutlined />
                        Filter
                    </Button>
                )}

            </Row>
            <Table
                style={{ width: "100%", marginTop: "20px" }}
                columns={columns}
                dataSource={customers}
                bordered
                loading={loading}
                pagination={false}
            />
            <Modal
                open={openAddCustomer}
                onCancel={() => { setOpenAddCustomer(false); newCustomerRef.current?.reset() }}
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
                onOk={onClickOkFilter}
                title={<Typography.Text>Customer Filter</Typography.Text>}
                maskClosable={false}
                keyboard={false}
                width="70%"
            >
                <CustomerFilters
                    selectedCity={selectedCity}
                    selectedTown={selectedTown}
                    selectedBillType={selectedBillType}
                    onSelectedCity={handleCityChange}
                    onSelectedTown={handleTownChange}
                    onSelectedBillType={handleBillTypeChange}
                    cityTownMap={cityTownMap}
                    billTypes={CSelectHelper.getAsCSelectOptions(billTypesList.map(type => type))}
                />
            </Modal>
        </div>
    );
};

export default Customers;
