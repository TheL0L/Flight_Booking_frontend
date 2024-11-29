import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const formatDate = (dateString) => dayjs(dateString).format("MMMM D, YYYY h:mm A");

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] }; // Extract searchResults

  const [modalOpen, setModalOpen] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({
      ...prev,
      [name]: name === "seats" ? parseInt(value, 10) : value,
    }));
  };

  const handleBook = (flight) => {
    const { firstName, lastName, seats } = bookingInfo;

    if (!firstName || !lastName || !seats || seats < 1) {
      setMessage("All fields are required and seats must be at least 1.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/flights/book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flight_number: flight.flight_number,
        passenger_first_name: firstName,
        passenger_last_name: lastName,
        seats,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to book the flight.");
        }
        return response.json();
      })
      .then((data) => {
        setConfirmationNumber(data.booking_id); // Set booking ID
        setModalOpen(null); // Close the booking modal
        setConfirmationModalOpen(true); // Open the confirmation modal
        setBookingInfo({});
      })
      .catch((error) => {
        console.error("Booking error:", error);
        setMessage("Failed to book the flight. Please try again.");
      });
  };

  const handleOpenModal = (flight) => {
    setModalOpen(flight.flight_number);
    setBookingInfo({ seats: 1 }); // Default seats
    setMessage(""); // Clear any previous messages
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Results:</h1>
      {searchResults?.length > 0 ? (
        <ul className="list-group">
          {searchResults.map((flight) => (
            <li
              key={flight.flight_number}
              className="list-group-item d-flex flex-column align-items-start mb-3"
            >
              <h5 className="mb-1">
                <strong>{flight.flight_number}</strong>: {flight.departure} to{" "}
                {flight.destination}
              </h5>
             
              <p className="mb-1">
                <strong>Outbound:</strong> {formatDate(flight.departure_time)} <br />
                <strong>Landing:</strong> {formatDate(flight.arrival_time)} <br />
                ({flight.available_seats} seats available)
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleOpenModal(flight)}
              >
                I Want This
              </button>

              {modalOpen === flight.flight_number && (
                <div className="modal show d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Book Flight</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setModalOpen(null)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <input
                          type="text"
                          name="firstName"
                          className="form-control mb-2"
                          placeholder="First Name"
                          value={bookingInfo.firstName || ""}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="lastName"
                          className="form-control mb-2"
                          placeholder="Last Name"
                          value={bookingInfo.lastName || ""}
                          onChange={handleChange}
                        />
                        <input
                          type="number"
                          name="seats"
                          className="form-control mb-2"
                          placeholder="Seats"
                          min="1"
                          max={flight.available_seats}
                          value={bookingInfo.seats || ""}
                          onChange={handleChange}
                        />
                        {message && <div className="text-danger">{message}</div>}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setModalOpen(null)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleBook(flight)}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-warning" role="alert">
          No flights found.
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseConfirmationModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Your booking is confirmed!</p>
                <p>
                  <strong>Booking ID:</strong> {confirmationNumber}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCloseConfirmationModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
