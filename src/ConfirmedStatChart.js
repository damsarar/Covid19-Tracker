import React from "react";
import Chart from "chart.js";
import moment from "moment";
import { Card } from "react-bootstrap";
import { log } from "./logger";

class ConfirmedStatChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartArray: [],
      chartLabelsArray: [],
      chartDataArray: [],
    };
  }
  chartRef = React.createRef();

  componentDidMount() {
    fetch("https://api.covid19api.com/country/sri-lanka/status/confirmed/live")
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          chartArray: results,
        });

        this.state.chartArray.forEach((data, key) => {
          var date = moment(data.Date).format("MM / DD");
          this.state.chartLabelsArray.push(date);
          this.state.chartDataArray.push(data.Cases);
        });

        this.buildChart();
      })
      .catch((error) => {
        log("Error: ", error);
      });
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    const labels = this.state.chartLabelsArray;
    const data = this.state.chartDataArray;

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            label: "Total number of COVID-19 confirmed cases",
            data: data,
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  };

  render() {
    return (
      <div>
        <div>
          <Card border="secondary">
            <Card.Body>
              <canvas id="myChart" ref={this.chartRef} />
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default ConfirmedStatChart;
