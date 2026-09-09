import React, { useEffect, useState } from "react";
import {
  cancelReservation,
  getCustomerReservations,
} from "../../services/reservationService";

import "./CustomerReservations.css";

function CustomerReservations() {
  const [reservations, setReservations] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] =
    useState(null);

  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] =
    useState("");

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getCustomerReservations();

      setReservations(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load reservations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (
    reservationId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(reservationId);
      setError("");
      setActionMessage("");

      await cancelReservation(reservationId);

      setActionMessage(
        "Reservation cancelled successfully."
      );

      await fetchReservations();
    } catch (err) {
      setError(
        err.message ||
          "Failed to cancel reservation."
      );
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  if (loading) {
    return (
      <div className="reservations-page">
        <div className="reservations-state">
          <div className="reservations-spinner"></div>
          <p>Loading your reservations...</p>
        </div>
      </div>
    );
  }

  if (error && reservations.length === 0) {
    return (
      <div className="reservations-page">
        <div className="reservations-state error-state">
          <h2>Unable to Load Reservations</h2>
          <p>{error}</p>

          <button
            className="retry-button"
            onClick={fetchReservations}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservations-page">
      <div className="reservations-container">
        <div className="reservations-header">
          <div>
            <h1>My Reservations</h1>
            <p>
              Track and manage your medicine
              reservations.
            </p>
          </div>

          <div className="reservation-count">
            {reservations.length}{" "}
            {reservations.length === 1
              ? "Reservation"
              : "Reservations"}
          </div>
        </div>

        {actionMessage && (
          <div className="success-message">
            {actionMessage}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>

            <h2>No Reservations Yet</h2>

            <p>
              You haven't made any medicine
              reservations yet.
            </p>
          </div>
        ) : (
          <div className="reservations-list">
            {reservations.map(
              (reservation) => (
                <div
                  className="reservation-card"
                  key={reservation.id}
                >
                  <div className="reservation-card-header">
                    <div>
                      <h2>
                        {reservation.medicineName}
                      </h2>

                      <span className="reservation-id">
                        {reservation.id}
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
                      <span>
                        Pharmacy
                      </span>

                      <strong>
                        {reservation.pharmacyName}
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>
                        Quantity
                      </span>

                      <strong>
                        {reservation.quantity}
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>
                        Price per unit
                      </span>

                      <strong>
                        {reservation.price} EGP
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>
                        Total price
                      </span>

                      <strong>
                        {reservation.price *
                          reservation.quantity}{" "}
                        EGP
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>
                        Reservation date
                      </span>

                      <strong>
                        {new Date(
                          reservation.date
                        ).toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  {reservation.status ===
                    "Pending" && (
                    <div className="reservation-actions">
                      <button
                        className="cancel-reservation-button"
                        onClick={() =>
                          handleCancel(
                            reservation.id
                          )
                        }
                        disabled={
                          cancellingId ===
                          reservation.id
                        }
                      >
                        {cancellingId ===
                        reservation.id
                          ? "Cancelling..."
                          : "Cancel Reservation"}
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerReservations;