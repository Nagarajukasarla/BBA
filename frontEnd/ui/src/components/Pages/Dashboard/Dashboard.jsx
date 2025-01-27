import React, { useEffect, useState } from "react";

import {
    Col,
    Row,
    Space,
    Typography,
    Card,
    Statistic,
    Dropdown,
    Flex,
    Spin,
} from "antd";
import {
    ShoppingCartOutlined,
    CheckCircleOutlined,
    RiseOutlined,
    LineChartOutlined,
    DownOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {
    PieChart,
    Pie,
    BarChart,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
    LineChart,
    Line,
    CartesianGrid,
} from "recharts";
import { getAllCustomers } from "../../../services/api/get/authorizedGetServices";
import TokenManager from "../../../services/cookies/TokenManager";
import CustomerLocalManager from "../Customers/CustomerLocalManager";

export const Dashboard = () => {
    const [networkError, setNetworkError] = useState(false);
    const [internalServerError, setInternalServerError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCustomers = async () => {
        try {
            const response = await getAllCustomers(TokenManager.getToken());
            if (response && response.length > 0) {
                CustomerLocalManager.setCustomers(response);
            } else {
                console.log("Empty customers");
            }
        } catch (error) {
            if (error.message.includes("Network Error")) {
                setNetworkError(true);
            } else if (error.message.includes("Internal Server Error")) {
                setInternalServerError(true);
            } else {
                console.log("An error occured: ", error.message);
            }
        }
    };

    useEffect(() => {
        document.title = "Dashboard";
        //fetchCustomers().then(() => setLoading(false));
    }, []);

    const DashboardCard = ({ icon, title, value, margin }) => {
        return (
            <Card style={{ width: "220px", marginLeft: margin }}>
                <Space
                    direction="horizontal"
                    style={{
                        marginLeft: "12px",
                    }}
                >
                    {icon}
                    <Statistic title={title} value={value} />
                </Space>
            </Card>
        );
    };

    const data01 = [
        {
            name: "Group A",
            value: 100,
        },
        {
            name: "Group B",
            value: 200,
        },
        {
            name: "Group C",
            value: 300,
        },
        {
            name: "Group D",
            value: 400,
        },
        {
            name: "Group E",
            value: 500,
        },
        {
            name: "Group F",
            value: 600,
        },
    ];
    const data02 = [
        {
            name: "Group A",
            value: 2400,
        },
        {
            name: "Group B",
            value: 4567,
        },
        {
            name: "Group C",
            value: 0,
        },
        {
            name: "Group D",
            value: 0,
        },
        {
            name: "Group E",
            value: 0,
        },
        {
            name: "Group F",
            value: 0,
        },
        {
            name: "Group G",
            value: 6000,
        },
        {
            name: "Group I",
            value: 8900,
        },
        {
            name: "Group J",
            value: 10000,
        },
        {
            name: "Group K",
            value: 9756,
        },
        {
            name: "Group L",
            value: 5222,
        },
        {
            name: "Group M",
            value: 8521,
        },
        {
            name: "Group N",
            value: 7895,
        },
        {
            name: "Group O",
            value: 8900,
        },
    ];
    const DashboardPieChart = ({ pieData }) => {
        return (
            <>
                <PieChart width={400} height={300}>
                    <Tooltip className="chartTooltip" />
                    <Pie
                        data={pieData}
                        dataKey={"value"}
                        cx="45%"
                        cy="50%"
                        outerRadius={105}
                        color="#8884d8"
                        label
                    ></Pie>
                </PieChart>
            </>
        );
    };

    const DashboardBarChart = ({ barData }) => {
        return (
            <>
                <BarChart width={730} height={300} data={barData}>
                    <Tooltip />
                    <XAxis dataKey={"name"} />
                    <YAxis />
                    <Bar dataKey={"value"} barSize={35} fill="#8884d8" />
                </BarChart>
            </>
        );
    };

    const RangedRevenueLinedChart = ({ range, data }) => {
        return (
            <LineChart
                width={1200}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        );
    };

    const pieChartHeader = {
        marginBottom: "24px",
        width: "100px",
        height: "30px",
        justifyContent: "center",
        textAlign: "center",
        padding: "2px",
        fontSize: "15px",
        border: ".1rem solid rgb(128, 128, 128)",
        borderRadius: "5px",
    };

    const barChartHeader = {
        marginBottom: "24px",
        width: "150px",
        height: "30px",
        justifyContent: "center",
        textAlign: "center",
        padding: "2px",
        fontSize: "15px",
        border: ".1rem solid rgb(128, 128, 128)",
        borderRadius: "5px",
    };

    const annualBarChartDropdown = {
        margin: "0 0 24px 1000px",
        width: "150px",
        height: "30px",
        justifyContent: "center",
        textAlign: "center",
        padding: "2px",
        fontSize: "15px",
        border: ".1rem solid rgb(128, 128, 128)",
        borderRadius: "5px",
    };

    const items = [
        {
            label: <p>Montly Analysis</p>,
            key: "0",
        },
        {
            label: <p>Annual Analysis</p>,
            key: "1",
        },
    ];

    const AnalysisDropDown = ({ items }) => {
        return (
            <>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a href="/" onClick={(e) => e.preventDefault()}>
                        <Space>
                            Analysis
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </>
        );
    };

    if (loading) {
        return (
            <div>
                <Flex style={{width: "85vw", height: "89vh"}} align="center" justify="center">
                    <Spin
                        indicator={
                            <LoadingOutlined style={{ fontSize: 80 }} spin />
                        }
                    />
                </Flex>
            </div>
        );
    }

    if (networkError) {
        return <h1> Network error </h1>;
    }

    if (internalServerError) {
        return <h1>Internal Server Error</h1>;
    }

    return (
        <div className="dashboardWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"large"}>
                    <Row style={{ paddingLeft: "20px" }}>
                        <Typography.Title level={4}>Dashboard</Typography.Title>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space size={"large"}>
                        <DashboardCard
                            icon={
                                <ShoppingCartOutlined
                                    style={{
                                        fontSize: "24px",
                                        color: "rgb(68, 141, 2029)",
                                        backgroundColor:
                                            "rgb(156, 232, 241)",
                                        borderRadius: "50px",
                                        padding: "5px",
                                    }}
                                />
                            }
                            title={"Orders"}
                            value={"1,234"}
                        />
                            <DashboardCard
                                icon={
                                    <CheckCircleOutlined
                                        style={{
                                            fontSize: "24px",
                                            color: "green",
                                            backgroundColor:
                                                "rgba(0, 225, 0, 0.25)",
                                            borderRadius: "50px",
                                            padding: "5px",
                                        }}
                                    />
                                }
                                margin={"40px"}
                                title={"Bills Closed"}
                                value={"1,234"}
                            />
                            <DashboardCard
                                icon={
                                    <RiseOutlined
                                        style={{
                                            fontSize: "24px",
                                            color: "red",
                                            backgroundColor: "#D09C9C",
                                            borderRadius: "50px",
                                            padding: "5px",
                                        }}
                                    />
                                }
                                margin={"40px"}
                                title={"Todays Revenue"}
                                value={"1,234"}
                            />
                            <DashboardCard
                                icon={
                                    <LineChartOutlined
                                        style={{
                                            fontSize: "24px",
                                            color: "#3F4112",
                                            backgroundColor: "#C7CA84",
                                            borderRadius: "50px",
                                            padding: "5px",
                                        }}
                                    />
                                }
                                margin={"40px"}
                                title={"This Month"}
                                value={"1,234"}
                            />
                        </Space>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space direction="horizontal" size={"large"}>
                            <Card>
                                <div style={pieChartHeader}>
                                    <p>Analysis</p>
                                </div>
                                <DashboardPieChart pieData={data01} />
                            </Card>
                            <Card>
                                <div style={barChartHeader}>
                                    <p>Top 10 Products</p>
                                </div>
                                <DashboardBarChart barData={data01} />
                            </Card>
                        </Space>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Card>
                            <div style={annualBarChartDropdown}>
                                <AnalysisDropDown items={items} />
                            </div>
                            <RangedRevenueLinedChart
                                range={null}
                                data={data02}
                                width
                            />
                        </Card>
                    </Row>
                </Space>
            </Col>
        </div>
    );
};
