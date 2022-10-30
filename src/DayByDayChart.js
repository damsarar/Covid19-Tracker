import React from "react";
import Chart from "chart.js";
import moment from "moment";
import { Card } from "react-bootstrap";
import { log } from "./logger";

class DayByDayChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartArray: [],
            chartLabelsArray: [],
            chartDataArray: [],
        };
    }
    chartRef = React.createRef();

    async fetchConfirmedCases() {
        const COVID19_API_STATUS_SL_CONFIRMED_URL = "https://api.covid19api.com/country/sri-lanka/status/confirmed/live";
        const response = await fetch(COVID19_API_STATUS_SL_CONFIRMED_URL);
        return response.json();
    }

    setChartData(results) {
        this.setState({
            chartArray: results,
        });

        this.state.chartArray.forEach((data, key) => {
            var date = moment(data.Date).format("MM / DD");
            this.state.chartLabelsArray.push(date);

            if (key - 1 === -1) {
                this.state.chartDataArray.push(this.state.chartArray[key].Cases);
            } else {
                const difference = this.state.chartArray[key].Cases - this.state.chartArray[key - 1].Cases;
                this.state.chartDataArray.push(difference);
                log(difference);
            }
        });

        this.buildChart();
        log(this.state.chartCasesTotal);
    }

    async componentDidMount() {
        try {
            const result = await this.fetchConfirmedCases();
            this.setChartData(result);
        } catch (err) {
            console.error("ERROR:componentDidMount() =>", err);
        }
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const labels = this.state.chartLabelsArray;
        const data = this.state.chartDataArray;

        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: labels,
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
