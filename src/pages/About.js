import React, { Component } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import bgImg from "../assets/maldives.jpg";

export default class About extends Component {
  render() {
    return (
      <>
        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            //height: "100vh",
            color: "#fff",
            //padding: "250px 0",
            textAlign: "center",
          }}
        >
          <Row className="m-5 p-5 shadow">
            <h1>We are Hello World Bookings</h1>
            <p>
              Hello World Bookings provides you with the best flight booking
              services.
            </p>
          </Row>

          <Row className="m-5 p-5 shadow">
            <h2>About Us</h2>
            <p>
              We offer the best prices and exceptional customer service to make
              your flight booking experience as easy as possible. Our mission is
              to connect travelers to their dream destinations with seamless,
              reliable, and affordable flight options. Whether you're planning a
              family vacation, a business trip, or an adventurous getaway, we
              are committed to helping you every step of the way.
            </p>
          </Row>

          <Row className="m-5 p-5 shadow">
            <h2>Why Choose Us</h2>
            <p>
              Our dedicated team works tirelessly to bring you exclusive deals,
              personalized assistance, and up-to-date information so you can
              travel with confidence and ease. At Hello World Bookings, your
              satisfaction is our top priority. Join us and discover a world of
              hassle-free travel planning!
            </p>
          </Row>
        </div>

        {/* Contact Us Form */}
        <Row className="justify-content-center mt-0 mb-5 p-6 rounded shadow bg-black">
          <Col md={8}>
            <h2 className="text-center mb-4">Contact Us</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicMessage" className="mt-3">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your message here..."
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox" className="mt-3">
                <Form.Check
                  variant="dark"
                  type="checkbox"
                  label="I agree to the terms and conditions"
                />
              </Form.Group>
              <Button variant="dark" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
