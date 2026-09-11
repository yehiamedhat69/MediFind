
import React, { useEffect, useState } from "react";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";

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
          medicineName: "Panadol",
          pharmacyName: "MediFind Pharmacy",
          status: "Confirmed",
          date: "Today, 10:30 AM",
        },
        {
          id: 2,
          medicineName: "Augmentin",
          pharmacyName: "Care Pharmacy",
          status: "Pending",
          date: "Tomorrow, 2:00 PM",
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

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>My Reservations</h1>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>My Reservations</h1>

        <ErrorMessage
          message={error}
          onRetry={fetchReservations}
        />
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>My Reservations</h1>

        <EmptyState
          message="You don't have any reservations yet."
        />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>My Reservations</h1>

      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h2>{reservation.medicineName}</h2>

          <p>
            <strong>Pharmacy:</strong>{" "}
            {reservation.pharmacyName}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {reservation.status}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {reservation.date}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CustomerReservations;