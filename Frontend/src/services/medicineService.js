const medicines = [
  {
    id: 1,
    name: "Panadol Extra",
    description: "Pain relief and fever reducer",
    price: 50,
    pharmacy: "El Ezaby Pharmacy",
    location: "Benha",
    quantity: 20,
    available: true,
  },
  {
    id: 2,
    name: "Panadol Children",
    description: "Pain and fever relief for children",
    price: 35,
    pharmacy: "Seif Pharmacy",
    location: "Benha",
    quantity: 15,
    available: true,
  },
  {
    id: 3,
    name: "Panadol Advance",
    description: "Fast acting pain relief",
    price: 45,
    pharmacy: "El Dawaa Pharmacy",
    location: "Cairo",
    quantity: 8,
    available: true,
  },
  {
    id: 4,
    name: "Panadol Cold & Flu",
    description: "Relief from cold and flu symptoms",
    price: 60,
    pharmacy: "El Ezaby Pharmacy",
    location: "Cairo",
    quantity: 0,
    available: false,
  },
  {
    id: 5,
    name: "Brufen 400",
    description: "Ibuprofen pain reliever",
    price: 30,
    pharmacy: "Seif Pharmacy",
    location: "Giza",
    quantity: 25,
    available: true,
  },
  {
    id: 6,
    name: "Brufen 600",
    description: "Ibuprofen tablets",
    price: 40,
    pharmacy: "El Dawaa Pharmacy",
    location: "Benha",
    quantity: 10,
    available: true,
  },
  {
    id: 7,
    name: "Augmentin 625",
    description: "Antibiotic medicine",
    price: 75,
    pharmacy: "El Ezaby Pharmacy",
    location: "Cairo",
    quantity: 5,
    available: true,
  },
  {
    id: 8,
    name: "Vitamin C",
    description: "Vitamin C supplement",
    price: 25,
    pharmacy: "Seif Pharmacy",
    location: "Giza",
    quantity: 30,
    available: true,
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