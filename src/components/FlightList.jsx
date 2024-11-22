import React, { useEffect, useState } from "react";
import axios from "axios";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/flights/")
      .then((response) => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch flight data\n" + err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Available Flights</h1>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.flight_number}: {flight.departure} to {flight.destination} (
            {new Date(flight.departure_time).toLocaleString()} -{" "}
            {new Date(flight.arrival_time).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
