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
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            padding: "250px 0",
            textAlign: "center",
          }}
        >
          <h1>We are Hello World Bookings</h1>
          <p>Hello World Bookings provides you with the best flight booking services.</p>
          <p>We offer the best prices and exceptional customer service to make your flight booking
            experience as easy as possible.</p>
        </div>


          {/* Contact Us Form */}
          <Row className="justify-content-center mt-5 mb-5">
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
                  <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
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
