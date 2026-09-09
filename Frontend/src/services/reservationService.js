import { getMedicineById } from "./medicineService";
import {
  getPharmacyById,
  getMedicineAvailability,
} from "./pharmacyService";

// Get all information needed for the reservation page
export const getReservationDetails = async (
  medicineId,
  pharmacyId
) => {
  const [medicine, pharmacy, availability] =
    await Promise.all([
      getMedicineById(medicineId),
      getPharmacyById(pharmacyId),
      getMedicineAvailability(
        pharmacyId,
        medicineId
      ),
    ]);

  if (!medicine) {
    throw new Error("Medicine not found.");
  }

  if (!pharmacy) {
    throw new Error("Pharmacy not found.");
  }

  if (!availability) {
    throw new Error(
      "This medicine is not available at this pharmacy."
    );
  }

  return {
    medicine,
    pharmacy,
    availability,
  };
};

// Mock reservation creation
export const createReservation = async ({
  medicineId,
  pharmacyId,
  quantity,
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const availability =
          await getMedicineAvailability(
            pharmacyId,
            medicineId
          );

        if (!availability) {
          reject(
            new Error(
              "Medicine availability could not be found."
            )
          );
          return;
        }

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

        resolve({
          success: true,
          reservation: {
            id: `RES-${Date.now()}`,
            medicineId: Number(medicineId),
            pharmacyId: Number(pharmacyId),
            quantity,
            status: "Reserved",
            createdAt: new Date().toISOString(),
          },
        });
      } catch {
        reject(
          new Error(
            "Something went wrong while creating the reservation."
          )
        );
      }
    }, 1000);
  });
};