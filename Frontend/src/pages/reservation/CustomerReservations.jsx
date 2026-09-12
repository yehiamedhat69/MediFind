import React, { useEffect, useState } from "react";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";

import "./CustomerReservations.css";

function CustomerReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError("");

      // Temporary mock data
      // Replace this later with the backend API call
      const data = [
        {
          id: 1,
          medicineName: "Panadol 500mg",
          pharmacyName: "MediFind Pharmacy",
          status: "Confirmed",
          date: "Today, 10:30 AM",
        },
        {
          id: 2,
          medicineName: "Augmentin 625mg",
          pharmacyName: "Care Pharmacy",
          status: "Pending",
          date: "Tomorrow, 2:00 PM",
        },
        {
          id: 3,
          medicineName: "Brufen 400mg",
          pharmacyName: "El Nour Pharmacy",
          status: "Completed",
          date: "Sep 4, 2026",
        },
      ];

      setReservations(data);
    } catch (err) {
      setError("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = (reservationId) => {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: "Cancelled" }
          : reservation
      )
    );
  };

  const getStatusClass = (status) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "confirmed") {
      return "accepted";
    }

    if (normalizedStatus === "completed") {
      return "completed";
    }

    return normalizedStatus;
  };

  const canCancel = (status) => {
    return status === "Pending" || status === "Confirmed";
  };

  return (
    <main className="reservations-page">
      <div className="reservations-container">
        <header className="reservations-header">
          <div>
            <h1>My Reservations</h1>
            <p>
              View and manage your medicine reservations.
            </p>
          </div>

          {!loading && !error && reservations.length > 0 && (
            <span className="reservation-count">
              {reservations.length} Reservations
            </span>
          )}
        </header>

        {loading && (
          <div className="reservations-state">
            <Loading />
            <p>Loading your reservations...</p>
          </div>
        )}

        {!loading && error && (
          <div className="reservations-state error-state">
            <ErrorMessage
              message={error}
              onRetry={fetchReservations}
            />
          </div>
        )}

        {!loading && !error && reservations.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>

            <h2>No Reservations Yet</h2>

            <p>
              You don't have any medicine reservations yet.
            </p>
          </div>
        )}

        {!loading && !error && reservations.length > 0 && (
          <div className="reservations-list">
            {reservations.map((reservation) => (
              <article
                key={reservation.id}
                className="reservation-card"
              >
                <div className="reservation-card-header">
                  <div>
                    <h2>{reservation.medicineName}</h2>

                    <span className="reservation-id">
                      Reservation #{reservation.id}
                    </span>
                  </div>

                  <span
                    className={`status-badge ${getStatusClass(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className="reservation-info">
                  <div className="info-item">
                    <span>Pharmacy</span>
                    <strong>
                      {reservation.pharmacyName}
                    </strong>
                  </div>

                  <div className="info-item">
                    <span>Date</span>
                    <strong>{reservation.date}</strong>
                  </div>
                </div>

                {canCancel(reservation.status) && (
                  <div className="reservation-actions">
                    <button
                      type="button"
                      className="cancel-reservation-button"
                      onClick={() =>
                        handleCancel(reservation.id)
                      }
                    >
                      Cancel Reservation
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default CustomerReservations;