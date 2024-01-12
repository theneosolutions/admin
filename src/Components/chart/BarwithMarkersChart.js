import React from "react";
import ApexCharts from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Integrated Api's",
          data: [12, 44, 54, 66, 81, 67, 10],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        colors: ["#00E396"],
        dataLabels: {
          formatter: function (val, opt) {
            return val; // Display only y-values
          },
        },
        xaxis: {
          categories: [
            "Abshar",
            "Nafath",
            "Yakeen",
            "Dakhli",
            "Nafith",
            "Seela",
            "AML",
          ],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              // Customize Y-axis labels as needed
              return value;
            },
          },
        },
        // legend: {
        //   show: true,
        //   showForSingleSeries: true,
        //   //   customLegendItems: ["Integrated Api's"],
        //   markers: {
        //     fillColors: ["#00E396"],
        //   },
        // },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ApexCharts
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChart;
