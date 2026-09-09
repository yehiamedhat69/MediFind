const mockNotifications = [
  {
    id: "NOT-1001",
    title: "Reservation Pending",
    message:
      "Your reservation for Panadol Extra at El Ezaby Pharmacy is pending.",
    type: "reservation",
    read: false,
    date: "2026-09-05T10:35:00",
  },
  {
    id: "NOT-1002",
    title: "Reservation Accepted",
    message:
      "Your reservation for Panadol Children at Seif Pharmacy has been accepted.",
    type: "reservation",
    read: true,
    date: "2026-09-03T15:00:00",
  },
  {
    id: "NOT-1003",
    title: "Reservation Rejected",
    message:
      "Your reservation for Brufen 400 at El Dawaa Pharmacy was rejected.",
    type: "reservation",
    read: false,
    date: "2026-09-01T10:00:00",
  },
  {
    id: "NOT-1004",
    title: "Reservation Cancelled",
    message:
      "Your reservation for Panadol Cold & Flu has been cancelled.",
    type: "reservation",
    read: true,
    date: "2026-08-29T17:00:00",
  },
];

export const getCustomerNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockNotifications]);
    }, 700);
  });
};

export const markNotificationAsRead = async (
  notificationId
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const notification = mockNotifications.find(
        (item) => item.id === notificationId
      );

      if (!notification) {
        reject(new Error("Notification not found."));
        return;
      }

      notification.read = true;

      resolve({
        success: true,
        notification,
      });
    }, 500);
  });
};