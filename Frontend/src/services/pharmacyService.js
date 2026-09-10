const API_BASE_URL = "http://localhost:5000/api";

const pharmacies = [
  {
    id: 1,
    name: "El Ezaby Pharmacy",
    address: "Benha, Qalyubia",
    phone: "013-1234567",
    email: "contact@elezaby.test",
    description:
      "A trusted pharmacy providing a wide range of medicines and healthcare products.",

    medicines: [
      {
        medicineId: 1,
        price: 50,
        quantity: 20,
        available: true,
      },
      {
        medicineId: 2,
        price: 38,
        quantity: 10,
        available: true,
      },
      {
        medicineId: 3,
        price: 50,
        quantity: 12,
        available: true,
      },
      {
        medicineId: 4,
        price: 60,
        quantity: 0,
        available: false,
      },
      {
        medicineId: 6,
        price: 42,
        quantity: 7,
        available: true,
      },
      {
        medicineId: 7,
        price: 75,
        quantity: 5,
        available: true,
      },
      {
        medicineId: 8,
        price: 27,
        quantity: 20,
        available: true,
      },
    ],
  },

  {
    id: 2,
    name: "Seif Pharmacy",
    address: "Benha, Qalyubia",
    phone: "013-2345678",
    email: "contact@seif.test",
    description:
      "A community pharmacy offering medicines and healthcare services.",

    medicines: [
      {
        medicineId: 1,
        price: 55,
        quantity: 12,
        available: true,
      },
      {
        medicineId: 2,
        price: 35,
        quantity: 15,
        available: true,
      },
      {
        medicineId: 4,
        price: 58,
        quantity: 4,
        available: true,
      },
      {
        medicineId: 5,
        price: 30,
        quantity: 25,
        available: true,
      },
      {
        medicineId: 8,
        price: 25,
        quantity: 30,
        available: true,
      },
    ],
  },

  {
    id: 3,
    name: "El Dawaa Pharmacy",
    address: "Cairo",
    phone: "02-3456789",
    email: "contact@eldawaa.test",
    description:
      "A pharmacy providing medicines and healthcare products to customers.",

    medicines: [
      {
        medicineId: 1,
        price: 48,
        quantity: 5,
        available: true,
      },
      {
        medicineId: 3,
        price: 45,
        quantity: 8,
        available: true,
      },
      {
        medicineId: 5,
        price: 32,
        quantity: 18,
        available: true,
      },
      {
        medicineId: 6,
        price: 40,
        quantity: 10,
        available: true,
      },
      {
        medicineId: 7,
        price: 72,
        quantity: 3,
        available: true,
      },
    ],
  },
];

export const getPharmacyById = (pharmacyId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pharmacy = pharmacies.find(
        (pharmacy) => pharmacy.id === Number(pharmacyId)
      );

      resolve(pharmacy || null);
    }, 700);
  });
};

export const getMedicineAvailability = (pharmacyId, medicineId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pharmacy = pharmacies.find(
        (pharmacy) => pharmacy.id === Number(pharmacyId)
      );

      if (!pharmacy) {
        resolve(null);
        return;
      }

      const medicine = pharmacy.medicines.find(
        (medicine) => medicine.medicineId === Number(medicineId)
      );

      resolve(medicine || null);
    }, 700);
  });
};

export const getPharmacyDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/pharmacy/dashboard`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pharmacy dashboard");
  }

  return response.json();
};