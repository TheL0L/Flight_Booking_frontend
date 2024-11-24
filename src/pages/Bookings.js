import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
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
          //height: "100vh",
          padding: "250px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1000px", padding: "20px" }}>
          <h1>Check Your Booking Details</h1>
          <Form
            className="m-4 p-4 rounded shadow"
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="bookingData">
              <Form.Control
                type="text"
                placeholder="Enter your booking number"
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
        </div>
      </div>
    );
  }
}
