import React from 'react'

import StatCard from './StatCard'
import HospitalCard from './HospitalCard'
import ConfirmedStatChart from './ConfirmedStatChart'
import DayByDayChart from './DayByDayChart'
import { Container, Card } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

import './App.css';

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataArray: [],
            hospitalArray: [],
        }
    }

    componentDidMount() {
        fetch('https://hpb.health.gov.lk/api/get-current-statistical')
            .then(res => res.json())
            .then(results => {
                this.setState({
                    dataArray: results.data,
                    hospitalArray: results.data.hospital_data
                })
            }).catch(error => {
                console.log(error)
            })
    }

    seperator(no) {
        let nfObject = new Intl.NumberFormat('en-US');
        let output = nfObject.format(no);
        return output;
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href=""><h3>COVID-19 Tracker</h3></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href=""><h6>Last updated at - {this.state.dataArray.update_date_time}</h6></Nav.Link>
                    </Nav>

                </Navbar>
                <div>
                    <Container style={{ width: "100%" }} className="pr-0">
                        <Row style={{ width: "100%" }} className="pr-0">
                            <Col xs={12} md={6} className="mt-4 pr-0">
                                <Container style={{ textAlign: "center" }} className="pr-0">
                                    <Row style={{ width: "100%", }} className="pr-0">
                                        <Col>
                                            <h5>Sri Lankan Statistics</h5>
                                        </Col>

                                    </Row>
                                    <Row style={{ width: "100%" }} className="pr-0">
                                        <Col xs={12} md={6} className="mt-2 pr-0" >
                                            <StatCard title="New Cases" value={this.seperator(this.state.dataArray.local_new_cases)} color="#025E97"></StatCard>
                                        </Col>

                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <StatCard title="Total Cases" value={this.seperator(this.state.dataArray.local_total_cases)} color="#FF9700 "></StatCard>
                                        </Col>


                                    </Row>
                                    <Row style={{ width: "100%" }} className="pr-0">
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <StatCard title="Total Deaths" value={this.state.dataArray.local_deaths} color="#D80505"></StatCard>
                                        </Col>
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <StatCard title="Total Recovered" value={this.state.dataArray.local_recovered} color="#5AA001"></StatCard>
                                        </Col>

                                    </Row>
                                </Container>

                            </Col>

                            <Col xs={12} md={6} className="mt-4 pr-0">
                                <Container style={{ width: "100%" }} className="pr-0">
                                    <Row style={{ width: "100%", }} className="pr-0">
                                        <Col>
                                            <h5>Global Statistics</h5>
                                        </Col>

                                    </Row>
                                    <Row style={{ width: "100%" }} className="pr-0">
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <StatCard title="New Cases" value={this.seperator(this.state.dataArray.global_new_cases)} color="#025E97"></StatCard>
                                        </Col>

                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <StatCard title="Total Cases" value={this.seperator(this.state.dataArray.global_total_cases)} color="#FF9700 "></StatCard>
                                        </Col>


                                    </Row>
                                    <Row style={{ width: "100%", }} className="pr-0">
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <StatCard title="Total Deaths" value={this.seperator(this.state.dataArray.global_deaths)} color="#D80505"></StatCard>
                                        </Col>
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <StatCard title="Total Recovered" value={this.seperator(this.state.dataArray.global_recovered)} color="#5AA001"></StatCard>
                                        </Col>

                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Container style={{ width: "100%" }} className="mt-5">
                        <Row style={{ width: "100%", }} className="pr-0 mt-2 ">
                            <Col>
                                <h5>Growth of COVID-19 confirmed cases in Sri Lanka</h5>
                            </Col>

                        </Row>
                        <ConfirmedStatChart ></ConfirmedStatChart>
                    </Container>

                </div>

                <div>
                    <Container style={{ width: "100%" }} className="mt-5">
                        <Row style={{ width: "100%", }} className="pr-0 mt-2 ">
                            <Col>
                                <h5>Daily count of COVID-19 confirmed cases in Sri Lanka</h5>
                            </Col>

                        </Row>
                        <DayByDayChart></DayByDayChart>
                    </Container>

                </div>

                <div>
                    <Container style={{ width: "100%" }} className="pr-0 mt-5">
                        <Row style={{ width: "100%", }} className="pr-0 mt-2 ">
                            <Col>
                                <h5>Sri Lankan Hospital Overview</h5>
                            </Col>

                        </Row>
                        <Row style={{ width: "100%" }} className="pr-0 mt-2">
                            <Col xs={12} md={6} className="pr-0 mt-2">
                                <Card text="white" style={{ minWidth: '15rem', backgroundColor: "#D1A000" }}>
                                    <Card.Body>
                                        <Card.Title>Active COVID-19 cases in Sri Lanka</Card.Title>
                                        <Card.Text style={{ fontSize: "48px" }}>
                                            {this.state.dataArray.local_active_cases}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} md={6} className="pr-0 mt-2">
                                <Card text="white" style={{ minWidth: '15rem', backgroundColor: "#D1A000" }}>
                                    <Card.Body>
                                        <Card.Title>Total number of individuals hospitalized in Sri Lanka</Card.Title>
                                        <Card.Text style={{ fontSize: "48px" }}>
                                            {this.state.dataArray.local_total_number_of_individuals_in_hospitals}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row style={{ width: "100%" }} className="pr-0 mt-2 mb-2">
                            {
                                this.state.hospitalArray.map((hospital, key) =>
                                    <Col xs={12} md={6} className="mt-1 mb-2 pr-0">
                                        <HospitalCard
                                            name={hospital.hospital.name}
                                            namesi={hospital.hospital.name_si}
                                            totalTreatment={hospital.treatment_total}
                                            localTreatment={hospital.treatment_local}
                                            foreignTreatment={hospital.treatment_foreign}
                                        >

                                        </HospitalCard>
                                    </Col>

                                )
                            }

                        </Row>


                    </Container>


                </div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="">Sources -</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link
                            href="https://hpb.health.gov.lk/en/api-documentation?fbclid=IwAR0JWu_XtDsXHk5ZzN0xkYDd2V2Hc5-tQ7XHTO7Oh2FqJberHSNMbD1gzzs">
                            Health Promotion Bureau
                            </Nav.Link>
                        <Nav.Link
                            href="https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#27454960-ea1c-4b91-a0b6-0468bb4e6712">
                            CORONAVIRUS COVID19 API - getpostman.com
                            </Nav.Link>
                    </Nav>

                </Navbar>


            </div >



        )
    }
}

export default Homepage