import React from 'react'
import Chart from 'chart.js'
import moment from 'moment'
import { Card } from 'react-bootstrap'
let myLineChart

class StatChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chartArray: [],
            chartLablesArray: [],
            chartDataArray: []
        }
    }
    chartRef = React.createRef()

    componentDidMount() {
        fetch('https://api.covid19api.com/country/sri-lanka/status/confirmed/live')
            .then(res => res.json())
            .then(results => {
                this.setState({
                    chartArray: results
                })

                this.state.chartArray.map((data, key) => {
                    var date = moment(data.Date).format("MM / DD")
                    this.state.chartLablesArray.push(date)
                    this.state.chartDataArray.push(data.Cases)
                })

                this.buildChart();

                console.log(this.state.chartLablesArray)

            }).catch(error => {
                console.log(error)
            })

    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext('2d')
        const lables = this.state.chartLablesArray
        const data = this.state.chartDataArray;

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: lables,
                datasets: [
                    {
                        label: "Total number of COVID-19 confirmed cases",
                        data: data,
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',

                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }


    render() {

        // console.log(this.props.lables)
        // console.log(this.props.data)


        return (
            <div>
                <div>
                    <Card border="secondary">
                        <Card.Body>
                            <canvas
                                id="myChart"
                                ref={this.chartRef}
                            />
                        </Card.Body>

                    </Card>

                </div>

            </div>
        )
    }
}

export default StatChart