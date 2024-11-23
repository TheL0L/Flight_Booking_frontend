import React, { Component } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import bgImg from "../assets/maldives.jpg";


export default class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            departureDate: '',
            returnDate: '',
            passengers: 1,
            travelClass: 'economy',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', this.state);
    };

    render() {
        return (
            <div
            style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            padding: "100px 0",
            textAlign: "center",
            }}>
                <Row >
                    {/* Left Column: Image */}
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <h1>FLIGHTS</h1>
                        <p>Here you can find all the flights available for booking.</p>
                    </Col>

                    {/* Right Column: Form */}
                    <Col md={4} >
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="from" className="mb-3">
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Departure city"
                                    name="from"
                                    value={this.state.from}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="to" className="mb-3">
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Destination city"
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="departureDate" className="mb-3">
                                <Form.Label>Departure Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="departureDate"
                                    value={this.state.departureDate}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="returnDate" className="mb-3">
                                <Form.Label>Return Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="returnDate"
                                    value={this.state.returnDate}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="passengers" className="mb-3">
                                <Form.Label>Passengers</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    name="passengers"
                                    value={this.state.passengers}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="travelClass" className="mb-3">
                                <Form.Label>Class</Form.Label>
                                <Form.Select
                                    name="travelClass"
                                    value={this.state.travelClass}
                                    onChange={this.handleChange}
                                >
                                    <option value="economy">Economy</option>
                                    <option value="business">Business</option>
                                    <option value="first">First Class</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="dark" type="submit" className="w-100">
                                Search Flights
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}