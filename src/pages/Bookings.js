import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import bgImg from "../assets/maldives.jpg";

export default class Bookings extends Component {
  state = {
    error: "",
    bookingData: null,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const booking_id = event.target.elements.bookingData.value.trim();

    if (!booking_id) {
      this.setState({ error: "Please enter a booking confirmation number!" });
      return;
    }

    this.setState({ error: "" });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/bookings/search/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ booking_id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        this.setState({ error: errorData.message || "Something went wrong." });
        return;
      }

      const bookingData = await response.json();
      console.log("Booking Details:", bookingData);

      // Update state to display booking details
      this.setState({ bookingData, error: "" });
    } catch (error) {
      console.error("Error fetching booking details:", error);
      this.setState({ error: "An error occurred. Please try again." });
    }
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
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <h1>CHECK</h1>
            <p>Your Booking Details</p>
          </Col>
          <Col md={4} className="p-6 rounded shadow">
            <Form onSubmit={this.handleSubmit}>
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
            {/* Render Booking Data if available */}
            {this.state.bookingData && (
              <div style={{ marginTop: "20px", color: "#fff" }}>
                <h3>Booking Details</h3>
                <ul>
                  {this.state.bookingData.map((booking, index) => (
                    <li
                      key={index}
                      style={{ textAlign: "left", marginBottom: "20px" }}
                    >
                      <strong>Booking ID:</strong> {booking.booking_id} <br />
                      <strong>Flight Number:</strong>{" "}
                      {booking.flight.flight_number} <br />
                      <strong>Departure:</strong> {booking.flight.departure}{" "}
                      <br />
                      <strong>Destination:</strong> {booking.flight.destination}{" "}
                      <br />
                      <strong>Departure Time:</strong>{" "}
                      {new Date(booking.flight.departure_time).toLocaleString()}{" "}
                      <br />
                      <strong>Arrival Time:</strong>{" "}
                      {new Date(booking.flight.arrival_time).toLocaleString()}{" "}
                      <br />
                      <strong>Passenger:</strong> {booking.passenger_first_name}{" "}
                      {booking.passenger_last_name} <br />
                      <strong>Seats:</strong> {booking.seats}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
