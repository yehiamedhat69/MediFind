import React, { useState, useEffect } from "react";
import "./PharmacyNotifications.css";

function PharmacyNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Temporary mock data
    // Later, replace this with the backend API call
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError("");

        const data = [
          {
            id: 1,
            message: "New reservation received for Panadol",
            date: "Today, 10:30 AM",
            isRead: false,
          },
          {
            id: 2,
            message: "Your reservation has been accepted",
            date: "Yesterday, 5:20 PM",
            isRead: true,
          },
          {
            id: 3,
            message: "Panadol stock is running low",
            date: "Yesterday, 2:15 PM",
            isRead: false,
          },
        ];

        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  if (loading) {
    return (
      <div className="pharmacy-notifications-page">
        <div className="pharmacy-notifications-header">
          <h1>Pharmacy Notifications</h1>
        </div>

        <div className="notification-state">
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pharmacy-notifications-page">
        <div className="pharmacy-notifications-header">
          <h1>Pharmacy Notifications</h1>
        </div>

        <div className="notification-state error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="pharmacy-notifications-page">
        <div className="pharmacy-notifications-header">
          <h1>Pharmacy Notifications</h1>
        </div>

        <div className="notification-state">
          <p>No notifications available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pharmacy-notifications-page">
      <div className="pharmacy-notifications-header">
        <h1>Pharmacy Notifications</h1>
        <p>Stay updated with reservations, stock alerts, and pharmacy activity.</p>
      </div>

      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-card ${
              notification.isRead ? "read" : "unread"
            }`}
          >
            <div className="notification-content">
              <p className="notification-message">
                {notification.message}
              </p>

              <small className="notification-date">
                {notification.date}
              </small>
            </div>

            {!notification.isRead && (
              <button
                className="mark-read-btn"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharmacyNotifications;