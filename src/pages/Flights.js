import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import bgImg from "../assets/maldives.jpg";
import { useNavigate } from "react-router-dom";

export default function Flights() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    locations: [],
    error: "",
  });

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/flights/locations/")
      .then((response) => response.json())
      .then((data) =>
        setState((prev) => ({ ...prev, locations: data.locations }))
      )
      .catch(() =>
        setState((prev) => ({
          ...prev,
          error: "Failed to load locations. Try again later.",
        }))
      );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { from, to, departureDate, returnDate, passengers } = state;

    fetch("http://127.0.0.1:8000/api/flights/search/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        departure: from,
        destination: to,
        departure_time: departureDate,
        arrival_time: returnDate || null,
        min_seats: passengers,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/results", { state: { searchResults: data } });
      })
      .catch(() =>
        setState((prev) => ({
          ...prev,
          error: "Unable to search flights. Please try again later.",
        }))
      );
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "200px 0",
        textAlign: "center",
      }}
    >
      <Row>
      <Col md={6} className="d-flex align-items-center justify-content-center">
          <h1>FLIGHTS</h1>
          <p>Find the best flights for your trip.</p>
        </Col>
        <Col md={4} className="p-6 rounded shadow">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="from" className="mb-3">
              <Form.Label>From</Form.Label>
              <Form.Select
                name="from"
                value={state.from}
                onChange={handleChange}
              >
                <option value="">Select departure city</option>
                {state.locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="to" className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Select name="to" value={state.to} onChange={handleChange}>
                <option value="">Select destination city</option>
                {state.locations
                  .filter((location) => location !== state.from)
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
                value={state.departureDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
              />
            </Form.Group>
            <Form.Group controlId="returnDate" className="mb-3">
              <Form.Label>Return Date (Optional)</Form.Label>
              <Form.Control
                type="date"
                name="returnDate"
                value={state.returnDate}
                onChange={handleChange}
                min={
                  state.departureDate || new Date().toISOString().split("T")[0]
                } // Disable dates before departure date or today
              />
            </Form.Group>

            <Form.Group controlId="passengers" className="mb-3">
              <Form.Label>Passengers</Form.Label>
              <Form.Control
                type="number"
                min="1"
                name="passengers"
                value={state.passengers}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Button variant="dark" type="submit" className="w-100">
              Search Flights
            </Button> */}
            <Button variant="dark" type="submit" className="mb-3 mt-5">
                GO
              </Button>
            {state.error && (
              <div className="alert alert-danger mt-3">{state.error}</div>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}
