import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import bgImg from "../assets/maldives.jpg";

export default class Bookings extends Component {
  state = {
    error: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const bookingNumber = event.target.elements.bookingData.value.trim();

    if (!bookingNumber) {
      this.setState({ error: "Please enter a booking confirmation number!" });
      return;
    }

    this.setState({ error: "" });
    console.log("Booking Confirmation Number:", bookingNumber);

    // Logic to fetch booking details can be added here
  };

  render() {
    return (
      <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "400px 0",
        textAlign: "center",
    }}
      >
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center" >
            <h1>CHECK</h1>
            <p>Your Booking Details</p>
          </Col>
          <Col md={4} className="p-6 rounded shadow">
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Group controlId="bookingData">
                <Form.Control
                  type="text"
                  placeholder="Booking confirmation number"
                />
              </Form.Group>
              {this.state.error && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {this.state.error}
                </p>
              )}
              <Button variant="dark" type="submit" className="mt-3">
                GO
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
