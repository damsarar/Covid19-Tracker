import React from "react";
import Chart from "chart.js";
import moment from "moment";
import { Card } from "react-bootstrap";
import { log } from "./logger";
let myLineChart;

class DayByDayChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartArray: [],
      chartLablesArray: [],
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

        this.state.chartArray.map((data, key) => {
          var date = moment(data.Date).format("MM / DD");
          this.state.chartLablesArray.push(date);

          if (key - 1 === -1) {
            this.state.chartDataArray.push(this.state.chartArray[key].Cases);
          } else {
            const diffetence =
              this.state.chartArray[key].Cases -
              this.state.chartArray[key - 1].Cases;
            this.state.chartDataArray.push(diffetence);
            log(diffetence);
          }
        });

        this.buildChart();

        log(this.state.chartCasesTotal);
      })
      .catch((error) => {
        log("Error: ", error);
      });
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    const lables = this.state.chartLablesArray;
    const data = this.state.chartDataArray;

    myLineChart = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: lables,
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
          {
            label: "Total number of COVID-19 confirmed cases on a day",
            data: data,
            type: "line",
            borderColor: "rgba(54, 162, 235, 1)",
            lineTension: "0.2",
            order: 1,
          },
        ],
      },
      options: {},
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

export default DayByDayChart;
