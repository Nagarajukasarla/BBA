import React, { Component } from "react";
import PieChart from "./PieChart";
import "../css/dashboard.css";
import BarChart from "./BarChart";

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboardWrapper">
                <div className="upperChartsWrapper">
                    <div className="chart1 chart">
                        <PieChart />
                    </div>
                    <div className="chart2 chart">
                        <PieChart />
                    </div>
                    <div className="chart3 chart">
                        <PieChart />
                    </div>
                </div>
                <div className="lowerChartsWrapper">
                    <div className="barChart">
                        <BarChart/>
                    </div>
                    <div className="chart4 chart">
                        <PieChart />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
