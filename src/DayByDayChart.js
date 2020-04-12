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
            chartDataArray: [],
            chartCasesTotal: []
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

                    if ((key - 1) === -1) {
                        this.state.chartDataArray.push(this.state.chartArray[key].Cases)
                        // this.state.chartCasesTotal.push(this.state.chartArray[key].Cases)
                    } else {
                        const diffetence = this.state.chartArray[key].Cases - this.state.chartArray[key - 1].Cases
                        // this.state.chartCasesTotal.push(diffetence)
                        this.state.chartDataArray.push(diffetence)
                        console.log(diffetence)
                    }

                    // console.log(key - 1)
                })

                this.buildChart();

                console.log(this.state.chartCasesTotal)

            }).catch(error => {
                console.log(error)
            })

    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext('2d')
        const lables = this.state.chartLablesArray
        const data = this.state.chartDataArray;

        myLineChart = new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: lables,
                datasets: [
                    {
                        label: "Total number of COVID-19 confirmed cases on a day",
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',


                    }, {
                        label: 'Total number of COVID-19 confirmed cases on a day',
                        data: data,
                        type: 'line',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        lineTension: '0.2',
                        order: 1
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