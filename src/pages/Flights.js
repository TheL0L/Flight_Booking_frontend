import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
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
            locations: [],
            error: '', // For error handling
        };
    }

    componentDidMount() {
        // Fetch locations from the backend
        fetch("http://127.0.0.1:8000/api/flights/locations/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ locations: data.locations });
            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
                this.setState({ error: "Unable to fetch locations. Please try again later." });
            });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", this.state);

        fetch("http://127.0.0.1:8000/api/flights/search/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Search results:", data);
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                this.setState({ error: "Unable to search flights. Please try again later." });
            });
    };

    render() {
        const { locations, error } = this.state;
        return (
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    padding: "100px 0",
                    textAlign: "center",
                }}
            >
                <Row>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <h1>FLIGHTS</h1>
                        <p>Here you can find all the flights available for booking.</p>
                    </Col>
                    <Col md={4} className="p-6 rounded shadow">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="from" className="mb-3">
                                <Form.Label>From</Form.Label>
                                <Form.Select
                                    name="from"
                                    value={this.state.from}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select departure city</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="to" className="mb-3">
                                <Form.Label>To</Form.Label>
                                <Form.Select
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select destination city</option>
                                    {locations
                                        .filter((location) => location !== this.state.from)
                                        .map((location, index) => (
                                            <option key={index} value={location}>
                                                {location}
                                            </option>
                                        ))}
                                </Form.Select>
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
                            {error && (
                                <div className="alert alert-danger mt-3">{error}</div>
                            )}
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
