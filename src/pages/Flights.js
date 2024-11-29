import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import bgImg from "../assets/maldives.jpg";

export default class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      departureDate: "",
      returnDate: "",
      passengers: 1,
      locations: [], // Locations will be loaded dynamically
      error: "",
      searchResults: [], // To hold the search results
    };
  }

  componentDidMount() {
    // Fetch locations from the API
    fetch("http://127.0.0.1:8000/api/flights/locations/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load locations");
        }
        return response.json();
      })
      .then((data) => {
        // Access the 'locations' property and update the state
        this.setState({ locations: data.locations });
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
        this.setState({ error: "Failed to load locations. Try again later." });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const today = new Date().setHours(0, 0, 0, 0); // Get today's date without time
    let error = "";

    if (name === "departureDate" && value < today) {
      error = "Departure date cannot be in the past.";
    }

    if (name === "returnDate") {
      const { departureDate } = this.state;
      if (value < today) {
        error = "Return date cannot be in the past.";
      } else if (departureDate && value < departureDate) {
        error = "Return date cannot be before the departure date.";
      }
    }

    this.setState({ [name]: value, error });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { from, to, departureDate, returnDate, passengers } = this.state;

    // Basic validation
    if (!from || !to || !departureDate || from === to) {
      this.setState({ error: "Please provide valid search criteria." });
      return;
    }

    const searchPayload = {
      departure: from,
      destination: to,
      departure_time: departureDate,
      arrival_time: returnDate || null, // Optional field
      min_seats: passengers,
    };

    fetch("http://127.0.0.1:8000/api/flights/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchPayload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ searchResults: data, error: "" });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        this.setState({
          error: "Unable to search flights. Please try again later.",
        });
      });
  };

  render() {
    const { locations, error, searchResults } = this.state;
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
          <Col md={6}>
            <h1>FLIGHTS</h1>
            <p>Find the best flights for your trip.</p>
            {searchResults.length > 0 && (
              <div className="mt-4">
                <h4>Search Results</h4>
                <ul>
                  {searchResults.map((flight, index) => (
                    <li key={index}>
                      {flight.flight_number}: {flight.departure} to{" "}
                      {flight.destination} - {flight.departure_time} to{" "}
                      {flight.arrival_time} ({flight.available_seats} seats
                      available)
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                  min={new Date().toISOString().split("T")[0]} // Disable past dates
                />
              </Form.Group>
              <Form.Group controlId="returnDate" className="mb-3">
                <Form.Label>Return Date (Optional)</Form.Label>
                <Form.Control
                  type="date"
                  name="returnDate"
                  value={this.state.returnDate}
                  onChange={this.handleChange}
                  min={
                    this.state.departureDate ||
                    new Date().toISOString().split("T")[0]
                  } // Disable dates before departure date or today
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
              <Button variant="dark" type="submit" className="w-100">
                Search Flights
              </Button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
