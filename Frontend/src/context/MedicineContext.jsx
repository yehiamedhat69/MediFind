import { createContext, useContext, useState } from "react";

const MedicineContext = createContext(null);

const initialMedicines = [
  {
    id: 1,
    name: "Panadol Extra",
    category: "Pain Relief",
    description: "Pain relief and fever reducer",
  },
  {
    id: 2,
    name: "Panadol Children",
    category: "Pain Relief",
    description: "Pain and fever relief for children",
  },
  {
    id: 3,
    name: "Panadol Advance",
    category: "Pain Relief",
    description: "Fast acting pain relief",
  },
  {
    id: 4,
    name: "Panadol Cold & Flu",
    category: "Cold & Flu",
    description: "Relief from cold and flu symptoms",
  },
  {
    id: 5,
    name: "Brufen 400",
    category: "Pain Relief",
    description: "Ibuprofen pain reliever",
  },
  {
    id: 6,
    name: "Brufen 600",
    category: "Pain Relief",
    description: "Ibuprofen tablets",
  },
  {
    id: 7,
    name: "Augmentin 625",
    category: "Antibiotic",
    description: "Antibiotic medicine",
  },
  {
    id: 8,
    name: "Vitamin C",
    category: "Vitamins",
    description: "Vitamin C supplement",
  },
];

export function MedicineProvider({ children }) {
  const [medicines, setMedicines] =
    useState(initialMedicines);

  const addMedicine = (medicine) => {
    setMedicines((currentMedicines) => [
      ...currentMedicines,
      {
        id: Date.now(),
        ...medicine,
      },
    ]);
  };

  const updateMedicine = (id, updatedMedicine) => {
    setMedicines((currentMedicines) =>
      currentMedicines.map((medicine) =>
        medicine.id === id
          ? {
              ...medicine,
              ...updatedMedicine,
            }
          : medicine
      )
    );
  };

  const removeMedicine = (id) => {
    setMedicines((currentMedicines) =>
      currentMedicines.filter(
        (medicine) => medicine.id !== id
      )
    );
  };

  return (
    <MedicineContext.Provider
      value={{
        medicines,
        addMedicine,
        updateMedicine,
        removeMedicine,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicine() {
  const context = useContext(MedicineContext);

  if (!context) {
    throw new Error(
      "useMedicine must be used inside MedicineProvider"
    );
  }

  return context;
}