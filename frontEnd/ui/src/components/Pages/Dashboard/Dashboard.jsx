import React from "react";
// import PieChart from "../../PieChart";

import { Col, Row, Space, Typography, Card, Statistic, Dropdown } from "antd";
import {
    ShoppingCartOutlined,
    CheckCircleOutlined,
    RiseOutlined,
    LineChartOutlined,
    DownOutlined,
} from "@ant-design/icons";
// import BarChart from "./BarChart";
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

export const Dashboard = () => {
    // const column1 = {
    //     background: "blue",
    //     width: "350px",
    //     height: "350px",
    // };

    const DashboardCard = ({ icon, title, value }) => {
        return (
            <Card style={{ width: "200px" }}>
                <Space direction="horizontal">
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
            value: 1398,
        },
        {
            name: "Group D",
            value: 9800,
        },
        {
            name: "Group E",
            value: 3908,
        },
        {
            name: "Group F",
            value: 4800,
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
                    <Tooltip />
                    <Pie
                        onMouseEnter={(data, index) => {
                            const value = data.payload.name;
                            <Card>{value}</Card>;
                        }}
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

    return (
        <div className="dashboardWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"large"}>
                    <Row>
                        <Typography.Title level={4}>Dashboard</Typography.Title>
                    </Row>
                    <Row>
                        <Space size={"large"}>
                            <DashboardCard
                                icon={<ShoppingCartOutlined />}
                                title={"Orders"}
                                value={"1,234"}
                            />
                            <DashboardCard
                                icon={<CheckCircleOutlined />}
                                title={"Bills Closed"}
                                value={"1,234"}
                            />
                            <DashboardCard
                                icon={<RiseOutlined />}
                                title={"Todays Revenue"}
                                value={"1,234"}
                            />
                            <DashboardCard
                                icon={<LineChartOutlined />}
                                title={"This Month"}
                                value={"1,234"}
                            />
                        </Space>
                    </Row>
                    <Row>
                        <Space direction="horizontal" size="large">
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
                    <Row>
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
