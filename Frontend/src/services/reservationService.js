import { getMedicineById } from "./medicineService";
import { getPharmacyById } from "./pharmacyService";

const mockReservations = [
  {
    id: "RES-1001",
    medicineId: 1,
    pharmacyId: 1,
    quantity: 2,
    price: 50,
    date: "2026-09-05T10:30:00",
    status: "Pending",
  },
  {
    id: "RES-1002",
    medicineId: 2,
    pharmacyId: 2,
    quantity: 3,
    price: 35,
    date: "2026-09-03T14:20:00",
    status: "Accepted",
  },
  {
    id: "RES-1003",
    medicineId: 5,
    pharmacyId: 3,
    quantity: 1,
    price: 32,
    date: "2026-09-01T09:15:00",
    status: "Rejected",
  },
  {
    id: "RES-1004",
    medicineId: 4,
    pharmacyId: 1,
    quantity: 1,
    price: 60,
    date: "2026-08-29T16:45:00",
    status: "Cancelled",
  },
];

export const getReservationDetails = async (
  medicineId,
  pharmacyId
) => {
  const [medicine, pharmacy] =
    await Promise.all([
      getMedicineById(medicineId),
      getPharmacyById(pharmacyId),
    ]);

  if (!medicine) {
    throw new Error("Medicine not found.");
  }

  if (!pharmacy) {
    throw new Error("Pharmacy not found.");
  }

  const medicineData = pharmacy.medicines?.find(
    (item) =>
      item.medicineId === Number(medicineId)
  );

  if (!medicineData) {
    throw new Error(
      "This medicine is not available at this pharmacy."
    );
  }

  return {
    medicine,
    pharmacy,
    availability: medicineData,
  };
};

export const createReservation = async ({
  medicineId,
  pharmacyId,
  quantity,
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { availability } =
          await getReservationDetails(
            medicineId,
            pharmacyId
          );

        if (!availability.available) {
          reject(
            new Error(
              "This medicine is currently unavailable."
            )
          );
          return;
        }

        if (quantity > availability.quantity) {
          reject(
            new Error(
              `Only ${availability.quantity} units are available.`
            )
          );
          return;
        }

        const reservation = {
          id: `RES-${Date.now()}`,
          medicineId: Number(medicineId),
          pharmacyId: Number(pharmacyId),
          quantity,
          price: availability.price,
          date: new Date().toISOString(),
          status: "Pending",
        };

        mockReservations.unshift(reservation);

        resolve({
          success: true,
          reservation,
        });
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

export const getCustomerReservations =
  async () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const reservations =
          await Promise.all(
            mockReservations.map(
              async (reservation) => {
                const medicine =
                  await getMedicineById(
                    reservation.medicineId
                  );

                const pharmacy =
                  await getPharmacyById(
                    reservation.pharmacyId
                  );

                return {
                  ...reservation,
                  medicineName:
                    medicine?.name ||
                    "Unknown Medicine",
                  pharmacyName:
                    pharmacy?.name ||
                    "Unknown Pharmacy",
                };
              }
            )
          );

        resolve(reservations);
      }, 700);
    });
  };

export const cancelReservation = async (
  reservationId
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reservation =
        mockReservations.find(
          (item) =>
            item.id === reservationId
        );

      if (!reservation) {
        reject(
          new Error(
            "Reservation not found."
          )
        );
        return;
      }

      if (
        reservation.status !== "Pending"
      ) {
        reject(
          new Error(
            "Only pending reservations can be cancelled."
          )
        );
        return;
      }

      reservation.status = "Cancelled";

      resolve({
        success: true,
        reservation,
      });
    }, 700);
  });
};