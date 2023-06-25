import React from "react";
// import PieChart from "../../PieChart";
import "../../../css/dashboard.css";
import { Col, Row, Space, Typography, Card, Statistic } from "antd";
import { ShoppingCartOutlined, CheckCircleOutlined, RiseOutlined, LineChartOutlined } from "@ant-design/icons";
// import BarChart from "./BarChart";

export const Dashboard = () => {
  // const column1 = {
  //     background: "blue",
  //     width: "350px",
  //     height: "350px",
  // };

  const DashboardCard = ({icon, title, value}) => {
    return (
      <Card style={ {width: "200px"} }>
        <Space direction="horizontal">
          {icon}
          <Statistic
            title={title}
            value={value}
          />
        </Space>
      </Card>
    );
  }

  return (
    <div className="dashboardWrapper">
      <Col span={24}>
        <Row>
          <Typography.Title level={4}>Dashboard</Typography.Title>
        </Row>
        <Row>
          <Space size={"large"}>
            <DashboardCard icon={<ShoppingCartOutlined />} title={"Orders"} value={"1,234"} />
            <DashboardCard icon={<CheckCircleOutlined />} title={"Bills Closed"} value={"1,234"} />
            <DashboardCard icon={<RiseOutlined />} title={"Todays Revenue"} value={"1,234"} />
            <DashboardCard icon={<LineChartOutlined />} title={"This Month"} value={"1,234"} />
          </Space>
        </Row>
      </Col>
    </div>
  );
};
