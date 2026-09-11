import React, { useState } from "react";
import "./PharmacyReservations.css";

const mockReservations = [
  {
    id: 1,
    customerName: "Ahmed Mohamed",
    customerPhone: "01012345678",
    medicineName: "Panadol Extra",
    quantity: 2,
    price: 120,
    date: "2026-09-09",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Mariam Ali",
    customerPhone: "01123456789",
    medicineName: "Augmentin 625mg",
    quantity: 1,
    price: 85,
    date: "2026-09-08",
    status: "Accepted",
  },
  {
    id: 3,
    customerName: "Omar Hassan",
    customerPhone: "01234567890",
    medicineName: "Cataflam 50mg",
    quantity: 3,
    price: 60,
    date: "2026-09-07",
    status: "Rejected",
  },
  {
    id: 4,
    customerName: "Youssef Ahmed",
    customerPhone: "01512345678",
    medicineName: "Vitamin C",
    quantity: 2,
    price: 45,
    date: "2026-09-09",
    status: "Pending",
  },
];

function PharmacyReservations() {
  const [reservations, setReservations] = useState(mockReservations);
  const [filter, setFilter] = useState("All");
  const [loadingId, setLoadingId] = useState(null);

  const filteredReservations =
    filter === "All"
      ? reservations
      : reservations.filter(
          (reservation) => reservation.status === filter
        );

  const handleStatusChange = (id, newStatus) => {
    setLoadingId(id);

    // Temporary delay to simulate backend request
    setTimeout(() => {
      setReservations((currentReservations) =>
        currentReservations.map((reservation) =>
          reservation.id === id
            ? { ...reservation, status: newStatus }
            : reservation
        )
      );

      setLoadingId(null);
    }, 700);
  };

  return (
    <div className="pharmacy-reservations-page">
      <div className="pharmacy-reservations-header">
        <h1>Pharmacy Reservations</h1>
        <p>View and manage customer medicine reservations.</p>
      </div>

      <div className="reservation-filters">
        {["All", "Pending", "Accepted", "Rejected"].map((status) => (
          <button
            key={status}
            className={filter === status ? "active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredReservations.length === 0 ? (
        <div className="empty-reservations">
          <h2>No Reservations Found</h2>
          <p>There are no reservations with this status.</p>
        </div>
      ) : (
        <div className="reservations-list">
          {filteredReservations.map((reservation) => (
            <div
              className="reservation-card"
              key={reservation.id}
            >
              <div className="reservation-card-header">
                <div>
                  <h2>{reservation.medicineName}</h2>
                  <p>Reservation #{reservation.id}</p>
                </div>

                <span
                  className={`reservation-status ${reservation.status.toLowerCase()}`}
                >
                  {reservation.status}
                </span>
              </div>

              <div className="reservation-info">
                <div className="info-item">
                  <span>Customer</span>
                  <strong>{reservation.customerName}</strong>
                </div>

                <div className="info-item">
                  <span>Phone</span>
                  <strong>{reservation.customerPhone}</strong>
                </div>

                <div className="info-item">
                  <span>Quantity</span>
                  <strong>{reservation.quantity}</strong>
                </div>

                <div className="info-item">
                  <span>Price</span>
                  <strong>{reservation.price} EGP</strong>
                </div>

                <div className="info-item">
                  <span>Reservation Date</span>
                  <strong>{reservation.date}</strong>
                </div>
              </div>

              {reservation.status === "Pending" && (
                <div className="reservation-actions">
                  <button
                    className="accept-btn"
                    disabled={loadingId === reservation.id}
                    onClick={() =>
                      handleStatusChange(
                        reservation.id,
                        "Accepted"
                      )
                    }
                  >
                    {loadingId === reservation.id
                      ? "Processing..."
                      : "Accept"}
                  </button>

                  <button
                    className="reject-btn"
                    disabled={loadingId === reservation.id}
                    onClick={() =>
                      handleStatusChange(
                        reservation.id,
                        "Rejected"
                      )
                    }
                  >
                    {loadingId === reservation.id
                      ? "Processing..."
                      : "Reject"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PharmacyReservations;