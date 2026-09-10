const medicines = [
  {
    id: 1,
    name: "Panadol Extra",
    description: "Pain relief and fever reducer",
  },
  {
    id: 2,
    name: "Panadol Children",
    description: "Pain and fever relief for children",
  },
  {
    id: 3,
    name: "Panadol Advance",
    description: "Fast acting pain relief",
  },
  {
    id: 4,
    name: "Panadol Cold & Flu",
    description: "Relief from cold and flu symptoms",
  },
  {
    id: 5,
    name: "Brufen 400",
    description: "Ibuprofen pain reliever",
  },
  {
    id: 6,
    name: "Brufen 600",
    description: "Ibuprofen tablets",
  },
  {
    id: 7,
    name: "Augmentin 625",
    description: "Antibiotic medicine",
  },
  {
    id: 8,
    name: "Vitamin C",
    description: "Vitamin C supplement",
  },
];

export const searchMedicines = (searchTerm) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();

      const results = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(term)
      );

      resolve(results);
    }, 700);
  });
};

export const getMedicineById = (medicineId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const medicine = medicines.find(
        (medicine) =>
          medicine.id === Number(medicineId)
      );

      resolve(medicine || null);
    }, 700);
  });
};

export const getPharmaciesByMedicineId = (medicineId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pharmacyMap = {
        1: [
          {
            id: 1,
            name: "El Ezaby Pharmacy",
            location: "Benha",
            price: 50,
            quantity: 20,
            available: true,
          },
          {
            id: 2,
            name: "Seif Pharmacy",
            location: "Benha",
            price: 55,
            quantity: 12,
            available: true,
          },
          {
            id: 3,
            name: "El Dawaa Pharmacy",
            location: "Cairo",
            price: 48,
            quantity: 5,
            available: true,
          },
        ],

        2: [
          {
            id: 2,
            name: "Seif Pharmacy",
            location: "Benha",
            price: 35,
            quantity: 15,
            available: true,
          },
          {
            id: 1,
            name: "El Ezaby Pharmacy",
            location: "Benha",
            price: 38,
            quantity: 10,
            available: true,
          },
        ],

        3: [
          {
            id: 3,
            name: "El Dawaa Pharmacy",
            location: "Cairo",
            price: 45,
            quantity: 8,
            available: true,
          },
          {
            id: 1,
            name: "El Ezaby Pharmacy",
            location: "Cairo",
            price: 50,
            quantity: 12,
            available: true,
          },
        ],

        4: [
          {
            id: 1,
            name: "El Ezaby Pharmacy",
            location: "Cairo",
            price: 60,
            quantity: 0,
            available: false,
          },
          {
            id: 2,
            name: "Seif Pharmacy",
            location: "Cairo",
            price: 58,
            quantity: 4,
            available: true,
          },
        ],

        5: [
          {
            id: 2,
            name: "Seif Pharmacy",
            location: "Giza",
            price: 30,
            quantity: 25,
            available: true,
          },
          {
            id: 3,
            name: "El Dawaa Pharmacy",
            location: "Giza",
            price: 32,
            quantity: 18,
            available: true,
          },
        ],

        6: [
          {
            id: 3,
            name: "El Dawaa Pharmacy",
            location: "Benha",
            price: 40,
            quantity: 10,
            available: true,
          },
          {
            id: 1,
            name: "El Ezaby Pharmacy",
            location: "Benha",
            price: 42,
            quantity: 7,
            available: true,
          },
        ],

        7: [
          {
            id: 1,
            name: "El Ezaby Pharmacy",
            location: "Cairo",
            price: 75,
            quantity: 5,
            available: true,
          },
          {
            id: 3,
            name: "El Dawaa Pharmacy",
            location: "Cairo",
            price: 72,
            quantity: 3,
            available: true,
          },
        ],

        8: [
          {
            id: 2,
            name: "Seif Pharmacy",
            location: "Giza",
            price: 25,
            quantity: 30,
            available: true,
          },
          {
            id: 1,
            name: "El Ezaby Pharmacy",
            location: "Giza",
            price: 27,
            quantity: 20,
            available: true,
          },
        ],
      };

      resolve(
        pharmacyMap[Number(medicineId)] || []
      );
    }, 700);
  });
};