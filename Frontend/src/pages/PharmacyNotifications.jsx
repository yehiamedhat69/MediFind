import React, { useState, useEffect } from "react";

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
<div style={{ padding: "20px" }}> <h1>Pharmacy Notifications</h1> <p>Loading notifications...</p> </div>
);
}

if (error) {
return (
<div style={{ padding: "20px" }}> <h1>Pharmacy Notifications</h1> <p>{error}</p> </div>
);
}

if (notifications.length === 0) {
return (
<div style={{ padding: "20px" }}> <h1>Pharmacy Notifications</h1> <p>No notifications available.</p> </div>
);
}

return (
<div
style={{
maxWidth: "700px",
margin: "0 auto",
padding: "20px",
}}
> <h1>Pharmacy Notifications</h1>


  {notifications.map((notification) => (
    <div
      key={notification.id}
      style={{
        padding: "15px",
        margin: "10px 0",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: notification.isRead ? "#fff" : "#eef6ff",
      }}
    >
      <p style={{ fontWeight: notification.isRead ? "normal" : "bold" }}>
        {notification.message}
      </p>

      <small>{notification.date}</small>

      {!notification.isRead && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => markAsRead(notification.id)}>
            Mark as Read
          </button>
        </div>
      )}
    </div>
  ))}
</div>

);
}

export default PharmacyNotifications;
