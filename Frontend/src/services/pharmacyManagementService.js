const API_BASE_URL = "http://localhost:5000/api";

/* =========================
   Helpers
========================= */

const getToken = () => {
  return localStorage.getItem("token");
};

const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response) => {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
};

/* =========================
   Pharmacy - Public / Existing
========================= */

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
        (item) => item.id === Number(pharmacyId)
      );

      resolve(pharmacy || null);
    }, 700);
  });
};

export const getMedicineAvailability = (pharmacyId, medicineId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pharmacy = pharmacies.find(
        (item) => item.id === Number(pharmacyId)
      );

      if (!pharmacy) {
        resolve(null);
        return;
      }

      const medicine = pharmacy.medicines.find(
        (item) => item.medicineId === Number(medicineId)
      );

      resolve(medicine || null);
    }, 700);
  });
};

/* =========================
   Pharmacy Management
========================= */

/**
 * Get all pharmacies and find the pharmacy
 * owned by the currently logged-in user.
 *
 * There is currently no /pharmacies/me endpoint,
 * so we use /pharmacies and match ownerId.
 */
export const getMyPharmacy = async () => {
  const response = await fetch(`${API_BASE_URL}/pharmacies`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await handleResponse(response);

  const userData = localStorage.getItem("user");

  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch {
    user = null;
  }

  const userId = user?._id || user?.id;

  if (!userId) {
    throw new Error("Logged-in user information is missing.");
  }

  const pharmaciesList = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.pharmacies)
    ? data.pharmacies
    : [];

  const pharmacy = pharmaciesList.find((item) => {
    const ownerId =
      typeof item.ownerId === "object"
        ? item.ownerId?._id
        : item.ownerId;

    return String(ownerId) === String(userId);
  });

  if (!pharmacy) {
    throw new Error("No pharmacy is associated with this account.");
  }

  return pharmacy;
};

/**
 * Get pharmacy by ID.
 */
export const getPharmacyProfile = async (pharmacyId) => {
  if (!pharmacyId) {
    throw new Error("Pharmacy ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL}/pharmacies/${pharmacyId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await handleResponse(response);

  return data?.pharmacy || null;
};

/**
 * Update pharmacy profile.
 */
export const updatePharmacyProfile = async (
  pharmacyId,
  pharmacyData
) => {
  if (!pharmacyId) {
    throw new Error("Pharmacy ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL}/pharmacies/${pharmacyId}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(pharmacyData),
    }
  );

  const data = await handleResponse(response);

  return data?.pharmacy || null;
};

/* =========================
   Inventory Management
========================= */

/**
 * Get pharmacy inventory.
 */
export const getPharmacyInventory = async (pharmacyId) => {
  if (!pharmacyId) {
    throw new Error("Pharmacy ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL}/inventory/pharmacy/${pharmacyId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await handleResponse(response);

  return Array.isArray(data?.inventory)
    ? data.inventory
    : [];
};

/**
 * Get all medicines.
 */
export const getMedicines = async () => {
  const response = await fetch(
    `${API_BASE_URL}/medicines?limit=1000`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await handleResponse(response);

  return Array.isArray(data?.data)
    ? data.data
    : [];
};

/**
 * Add medicine to pharmacy inventory.
 */
export const addInventoryItem = async (inventoryData) => {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(inventoryData),
  });

  return handleResponse(response);
};

/**
 * Update inventory item.
 */
export const updateInventoryItem = async (
  inventoryId,
  inventoryData
) => {
  if (!inventoryId) {
    throw new Error("Inventory ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL}/inventory/${inventoryId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(inventoryData),
    }
  );

  return handleResponse(response);
};

/**
 * Remove inventory item.
 */
export const removeInventoryItem = async (inventoryId) => {
  if (!inventoryId) {
    throw new Error("Inventory ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL}/inventory/${inventoryId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
};

/* =========================
   Dashboard
========================= */

export const getPharmacyDashboard = async () => {
  const pharmacy = await getMyPharmacy();

  const pharmacyId = pharmacy?._id || pharmacy?.id;

  const inventory = await getPharmacyInventory(pharmacyId);

  const availableMedicines = inventory.filter(
    (item) =>
      item.availability === true &&
      Number(item.quantity) > 0
  ).length;

  const totalStock = inventory.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const lowStock = inventory.filter(
    (item) =>
      Number(item.quantity) > 0 &&
      Number(item.quantity) <= 5
  ).length;

  return {
    pharmacy,
    inventory: {
      availableMedicines,
      totalStock,
      lowStock,
      items: inventory,
    },
    reservations: {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    },
  };
};