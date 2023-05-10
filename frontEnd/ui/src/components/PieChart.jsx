import React, { Component } from "react";
import Chart from 'react-apexcharts';
import '../css/pieChart.css';

class PieChart extends Component {
    render () {
        const data = {
            values:[23,45,67,89,48],
            labels:['A', 'b', 'c', 'd', 'e'],
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Chart
                        type='pie'
                        width={370}
                        height={360}
                        series={data.values}
                        options={
                            {
                                labels: data.labels,   
                            }
                        }
                    >
                    </Chart>
                </div>
            </React.Fragment>
        );
    }
}

export default PieChart;