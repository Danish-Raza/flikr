import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PaiChart extends Component {
  render() {
    let chartData = {
      labels: this.props.labels,
      datasets: [
        {
          label: this.props.label,
          data: this.props.data,
          backgroundColor: ["green", "brown", "pink", "red", "orange", "purple", "lightgreen", "magenta", "salmon", "coral", "hotpink", "mediumslateblue"]
        }
      ]
    }
    return (
      <div >
        <Pie
          data={chartData}
          options={{
            title: {
              display: true,
              text: this.props.title,
              fontSize: 25
            },
            legend: {
              display: true,
              position: "top"
            },
            responsive: true,
            maintainAspectRatio: true
          }}
        />
      </div>
    )
  }
}
export default PaiChart;