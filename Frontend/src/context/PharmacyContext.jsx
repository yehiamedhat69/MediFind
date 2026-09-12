import { createContext, useContext, useState } from "react";

const PharmacyContext = createContext(null);

const initialInventory = [
  {
    id: 1,
    medicineId: 1,
    medicineName: "Panadol Extra",
    quantity: 10,
    price: 50,
    availability: true,
  },
  {
    id: 2,
    medicineId: 5,
    medicineName: "Brufen 400",
    quantity: 3,
    price: 30,
    availability: true,
  },
  {
    id: 3,
    medicineId: 8,
    medicineName: "Vitamin C",
    quantity: 0,
    price: 27,
    availability: false,
  },
];

const initialPharmacy = {
  name: "El Nour Pharmacy",
  phone: "01012345678",
  address: "Benha, Qalyubia",
};

export function PharmacyProvider({ children }) {
  const [inventory, setInventory] = useState(initialInventory);
  const [pharmacy] = useState(initialPharmacy);

  const addMedicine = (medicine) => {
    setInventory((currentInventory) => [
      ...currentInventory,
      {
        id: Date.now(),
        ...medicine,
      },
    ]);
  };

  const updateMedicine = (id, updatedMedicine) => {
    setInventory((currentInventory) =>
      currentInventory.map((item) =>
        item.id === id
          ? { ...item, ...updatedMedicine }
          : item
      )
    );
  };

  const removeMedicine = (id) => {
    setInventory((currentInventory) =>
      currentInventory.filter((item) => item.id !== id)
    );
  };

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

  return (
    <PharmacyContext.Provider
      value={{
        pharmacy,
        inventory,
        addMedicine,
        updateMedicine,
        removeMedicine,
        availableMedicines,
        totalStock,
        lowStock,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
}

export function usePharmacy() {
  const context = useContext(PharmacyContext);

  if (!context) {
    throw new Error(
      "usePharmacy must be used inside PharmacyProvider"
    );
  }

  return context;
}