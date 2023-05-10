import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                
            },
            options: {
                chart: {
                    type: 'bar',
                },
                xaxis: {
                    categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                },
            },
            series: [
                {
                    name: 'Values',
                    data: [23, 45, 67, 89, 48, 22, 56, 36, 79, 20],
                },
            ],
        };
    }

    render() {
        return (
            <div>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width={800}
                    height={360}
                />
            </div>
        );
    }
}

export default BarChart;
