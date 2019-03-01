import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Chart extends Component {
  render() {
    let chartData = {
      labels: this.props.labels,
      datasets: [
        {
          label: "Photos count",
          data: this.props.data,
          backgroundColor: "green"
        }
      ]
    }
    return (
      <div className="chart">
        <Bar
          data={chartData}
          width={100}
          height={100}
          options={{
            title: {
              display: true,
              text: "Photos count on each group",
              fontSize: 15
            },
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
      </div>
    )
  }
}
export default Chart;