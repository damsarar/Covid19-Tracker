import React from 'react'
import CardTile from './CardTile'
import { Container, Card } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

import './App.css';
// import { Jumbotron } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'


class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataArray: []
        }
    }

    componentDidMount() {
        fetch('https://hpb.health.gov.lk/api/get-current-statistical')
            .then(res => res.json())
            .then(results => {
                this.setState({
                    dataArray: results.data
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
                    <Navbar.Brand href=""><h3>Covid-19 Tracker</h3></Navbar.Brand>
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
                                            <CardTile title="New Cases" value={this.state.dataArray.local_new_cases} color="#025E97"></CardTile>
                                        </Col>

                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <CardTile title="Total Cases" value={this.state.dataArray.local_total_cases} color="#FF9700 "></CardTile>
                                        </Col>


                                    </Row>
                                    <Row style={{ width: "100%" }} className="pr-0">
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <CardTile title="Total Deaths" value={this.state.dataArray.local_deaths} color="#D80505"></CardTile>
                                        </Col>
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <CardTile title="Total Recovered" value={this.state.dataArray.local_recovered} color="#5AA001"></CardTile>
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
                                            <CardTile title="New Cases" value={this.seperator(this.state.dataArray.global_new_cases)} color="#025E97"></CardTile>
                                        </Col>

                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <CardTile title="Total Cases" value={this.seperator(this.state.dataArray.global_total_cases)} color="#FF9700 "></CardTile>
                                        </Col>


                                    </Row>
                                    <Row style={{ width: "100%", }} className="pr-0">
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <CardTile title="Total Deaths" value={this.seperator(this.state.dataArray.global_deaths)} color="#D80505"></CardTile>
                                        </Col>
                                        <Col xs={12} md={6} className="mt-2 pr-0">
                                            <CardTile title="Total Recovered" value={this.seperator(this.state.dataArray.global_recovered)} color="#5AA001"></CardTile>
                                        </Col>

                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >

        )
    }
}

export default Homepage