import { useMemo, useState } from "react";
import { useMedicine } from "../../context/MedicineContext.jsx";
import "./Admindashboard.css";

function AdminDashboard() {
  // ==========================================
  // Medicine Context
  // ==========================================

  const {
    medicines,
    addMedicine,
    updateMedicine,
    removeMedicine,
  } = useMedicine();

  // ==========================================
  // Main Navigation
  // ==========================================

  const [activeSection, setActiveSection] = useState("overview");

  // ==========================================
  // Users
  // ==========================================

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@test.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 2,
      name: "El Nour Pharmacy",
      email: "nour@pharmacy.com",
      role: "Pharmacy",
      status: "Active",
    },
    {
      id: 3,
      name: "Mohamed Ali",
      email: "mohamed@test.com",
      role: "Customer",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Al Shifa Pharmacy",
      email: "shifa@pharmacy.com",
      role: "Pharmacy",
      status: "Active",
    },
  ]);

  const [userSearch, setUserSearch] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Customer",
  });

  // ==========================================
  // Pharmacies
  // ==========================================

  const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      name: "El Nour Pharmacy",
      email: "nour@pharmacy.com",
      phone: "01012345678",
      address: "Benha, Qalyubia",
      status: "Active",
    },
    {
      id: 2,
      name: "Al Shifa Pharmacy",
      email: "shifa@pharmacy.com",
      phone: "01098765432",
      address: "Benha, Qalyubia",
      status: "Active",
    },
    {
      id: 3,
      name: "El Hayah Pharmacy",
      email: "hayah@pharmacy.com",
      phone: "01123456789",
      address: "Banha, Qalyubia",
      status: "Inactive",
    },
  ]);

  const [pharmacySearch, setPharmacySearch] = useState("");
  const [showPharmacyForm, setShowPharmacyForm] = useState(false);
  const [editingPharmacyId, setEditingPharmacyId] = useState(null);

  const [pharmacyForm, setPharmacyForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ==========================================
  // Medicines
  // ==========================================

  const [medicineSearch, setMedicineSearch] = useState("");
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicineId, setEditingMedicineId] = useState(null);

  const [medicineForm, setMedicineForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  // ==========================================
  // Reservations
  // ==========================================

  const [reservations, setReservations] = useState([
    {
      id: 1,
      customer: "Ahmed Mohamed",
      medicine: "Panadol Extra",
      pharmacy: "El Nour Pharmacy",
      date: "2026-09-10",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Mohamed Ali",
      medicine: "Brufen 400",
      pharmacy: "Al Shifa Pharmacy",
      date: "2026-09-09",
      status: "Confirmed",
    },
    {
      id: 3,
      customer: "Omar Hassan",
      medicine: "Vitamin C",
      pharmacy: "El Nour Pharmacy",
      date: "2026-09-08",
      status: "Completed",
    },
    {
      id: 4,
      customer: "Ali Ahmed",
      medicine: "Augmentin 625",
      pharmacy: "El Hayah Pharmacy",
      date: "2026-09-07",
      status: "Cancelled",
    },
  ]);

  const [reservationSearch, setReservationSearch] = useState("");

  // ==========================================
  // Overview Calculations
  // ==========================================

  const totalUsers = users.length;
  const totalPharmacies = pharmacies.length;
  const totalMedicines = medicines.length;
  const totalReservations = reservations.length;

  // ==========================================
  // Filtered Data
  // ==========================================

  const filteredUsers = useMemo(() => {
    const search = userSearch.toLowerCase().trim();

    if (!search) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search)
    );
  }, [users, userSearch]);

  const filteredPharmacies = useMemo(() => {
    const search = pharmacySearch.toLowerCase().trim();

    if (!search) {
      return pharmacies;
    }

    return pharmacies.filter(
      (pharmacy) =>
        pharmacy.name.toLowerCase().includes(search) ||
        pharmacy.email.toLowerCase().includes(search) ||
        pharmacy.address.toLowerCase().includes(search)
    );
  }, [pharmacies, pharmacySearch]);

  const filteredMedicines = useMemo(() => {
    const search = medicineSearch.toLowerCase().trim();

    if (!search) {
      return medicines;
    }

    return medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(search) ||
        medicine.category.toLowerCase().includes(search) ||
        medicine.description.toLowerCase().includes(search)
    );
  }, [medicines, medicineSearch]);

  const filteredReservations = useMemo(() => {
    const search = reservationSearch.toLowerCase().trim();

    if (!search) {
      return reservations;
    }

    return reservations.filter(
      (reservation) =>
        reservation.customer.toLowerCase().includes(search) ||
        reservation.medicine.toLowerCase().includes(search) ||
        reservation.pharmacy.toLowerCase().includes(search) ||
        reservation.status.toLowerCase().includes(search)
    );
  }, [reservations, reservationSearch]);

  // ==========================================
  // User Functions
  // ==========================================

  const resetUserForm = () => {
    setUserForm({
      name: "",
      email: "",
      role: "Customer",
    });

    setEditingUserId(null);
    setShowUserForm(false);
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();

    if (
      !userForm.name.trim() ||
      !userForm.email.trim()
    ) {
      return;
    }

    if (editingUserId !== null) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                name: userForm.name.trim(),
                email: userForm.email.trim(),
                role: userForm.role,
              }
            : user
        )
      );
    } else {
      setUsers((currentUsers) => [
        ...currentUsers,
        {
          id: Date.now(),
          name: userForm.name.trim(),
          email: userForm.email.trim(),
          role: userForm.role,
          status: "Active",
        },
      ]);
    }

    resetUserForm();
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);

    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setShowUserForm(true);
  };

  const handleToggleUserStatus = (id) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );
  };

  const handleDeleteUser = (id) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  };

  // ==========================================
  // Pharmacy Functions
  // ==========================================

  const resetPharmacyForm = () => {
    setPharmacyForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    setEditingPharmacyId(null);
    setShowPharmacyForm(false);
  };

  const handlePharmacySubmit = (event) => {
    event.preventDefault();

    if (
      !pharmacyForm.name.trim() ||
      !pharmacyForm.email.trim()
    ) {
      return;
    }

    if (editingPharmacyId !== null) {
      setPharmacies((currentPharmacies) =>
        currentPharmacies.map((pharmacy) =>
          pharmacy.id === editingPharmacyId
            ? {
                ...pharmacy,
                name: pharmacyForm.name.trim(),
                email: pharmacyForm.email.trim(),
                phone: pharmacyForm.phone.trim(),
                address: pharmacyForm.address.trim(),
              }
            : pharmacy
        )
      );
    } else {
      setPharmacies((currentPharmacies) => [
        ...currentPharmacies,
        {
          id: Date.now(),
          name: pharmacyForm.name.trim(),
          email: pharmacyForm.email.trim(),
          phone: pharmacyForm.phone.trim(),
          address: pharmacyForm.address.trim(),
          status: "Active",
        },
      ]);
    }

    resetPharmacyForm();
  };

  const handleEditPharmacy = (pharmacy) => {
    setEditingPharmacyId(pharmacy.id);

    setPharmacyForm({
      name: pharmacy.name,
      email: pharmacy.email,
      phone: pharmacy.phone,
      address: pharmacy.address,
    });

    setShowPharmacyForm(true);
  };

  const handleTogglePharmacyStatus = (id) => {
    setPharmacies((currentPharmacies) =>
      currentPharmacies.map((pharmacy) =>
        pharmacy.id === id
          ? {
              ...pharmacy,
              status:
                pharmacy.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : pharmacy
      )
    );
  };

  const handleDeletePharmacy = (id) => {
    setPharmacies((currentPharmacies) =>
      currentPharmacies.filter(
        (pharmacy) => pharmacy.id !== id
      )
    );
  };

  // ==========================================
  // Medicine Functions
  // ==========================================

  const resetMedicineForm = () => {
    setMedicineForm({
      name: "",
      category: "",
      description: "",
    });

    setEditingMedicineId(null);
    setShowMedicineForm(false);
  };

  const handleMedicineSubmit = (event) => {
    event.preventDefault();

    if (
      !medicineForm.name.trim() ||
      !medicineForm.category.trim()
    ) {
      return;
    }

    const medicineData = {
      name: medicineForm.name.trim(),
      category: medicineForm.category.trim(),
      description: medicineForm.description.trim(),
    };

    if (editingMedicineId !== null) {
      updateMedicine(
        editingMedicineId,
        medicineData
      );
    } else {
      addMedicine(medicineData);
    }

    resetMedicineForm();
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicineId(medicine.id);

    setMedicineForm({
      name: medicine.name,
      category: medicine.category,
      description: medicine.description,
    });

    setShowMedicineForm(true);
  };

  const handleDeleteMedicine = (id) => {
    removeMedicine(id);

    if (editingMedicineId === id) {
      resetMedicineForm();
    }
  };

  // ==========================================
  // Reservation Functions
  // ==========================================

  const handleConfirmReservation = (id) => {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              status: "Confirmed",
            }
          : reservation
      )
    );
  };

  const handleDeleteReservation = (id) => {
    setReservations((currentReservations) =>
      currentReservations.filter(
        (reservation) => reservation.id !== id
      )
    );
  };

  // ==========================================
  // Sidebar Navigation
  // ==========================================

  const navigationItems = [
    {
      id: "overview",
      label: "Overview",
      icon: "▦",
    },
    {
      id: "users",
      label: "Users",
      icon: "♙",
    },
    {
      id: "pharmacies",
      label: "Pharmacies",
      icon: "⌂",
    },
    {
      id: "medicines",
      label: "Medicines",
      icon: "▣",
    },
    {
      id: "reservations",
      label: "Reservations",
      icon: "◷",
    },
  ];

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="admin-dashboard">

      {/* ======================================
          Sidebar
      ====================================== */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <div className="admin-logo-icon">
            <span>+</span>
          </div>

          <span className="admin-logo-text">
            MediFind
          </span>
        </div>

        <nav className="admin-nav">

          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-nav-item ${
                activeSection === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(item.id)
              }
            >
              <span className="admin-nav-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}

        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>

      </aside>

      {/* ======================================
          Main Content
      ====================================== */}

      <main className="admin-main">

        {/* ====================================
            Header
        ==================================== */}

        <header className="admin-header">

          <div>
            <h1>
              {activeSection === "overview" &&
                "Overview"}

              {activeSection === "users" &&
                "Users Management"}

              {activeSection === "pharmacies" &&
                "Pharmacy Management"}

              {activeSection === "medicines" &&
                "Medicine Management"}

              {activeSection === "reservations" &&
                "Reservations Management"}
            </h1>

            <p>
              Manage and monitor the MediFind platform
            </p>
          </div>

        </header>

        {/* ====================================
            Overview
        ==================================== */}

        {activeSection === "overview" && (
          <section className="admin-section">

            <div className="admin-stats-grid">

              <div className="admin-stat-card">
                <div className="admin-stat-icon">
                  ♙
                </div>

                <div>
                  <span>Total Users</span>
                  <strong>{totalUsers}</strong>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon">
                  ⌂
                </div>

                <div>
                  <span>Total Pharmacies</span>
                  <strong>
                    {totalPharmacies}
                  </strong>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon">
                  ▣
                </div>

                <div>
                  <span>Total Medicines</span>
                  <strong>
                    {totalMedicines}
                  </strong>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon">
                  ◷
                </div>

                <div>
                  <span>Total Reservations</span>
                  <strong>
                    {totalReservations}
                  </strong>
                </div>
              </div>

            </div>

            <div className="admin-content-card">

              <div className="admin-card-header">
                <div>
                  <h2>Recent Reservations</h2>
                  <p>
                    Latest activity on the platform
                  </p>
                </div>

                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() =>
                    setActiveSection("reservations")
                  }
                >
                  View All
                </button>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Medicine</th>
                      <th>Pharmacy</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {reservations
                      .slice(0, 5)
                      .map((reservation) => (
                        <tr key={reservation.id}>

                          <td>
                            {reservation.customer}
                          </td>

                          <td>
                            {reservation.medicine}
                          </td>

                          <td>
                            {reservation.pharmacy}
                          </td>

                          <td>
                            {reservation.date}
                          </td>

                          <td>
                            <span
                              className={`admin-status ${
                                reservation.status
                                  .toLowerCase()
                              }`}
                            >
                              {reservation.status}
                            </span>
                          </td>

                        </tr>
                      ))}

                  </tbody>

                </table>

              </div>

            </div>

          </section>
        )}

        {/* ====================================
            Users
        ==================================== */}

        {activeSection === "users" && (
          <section className="admin-section">

            <div className="admin-toolbar">

              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(event) =>
                  setUserSearch(event.target.value)
                }
                className="admin-search-input"
              />

              <button
                type="button"
                className="admin-primary-button"
                onClick={() => {
                  setEditingUserId(null);

                  setUserForm({
                    name: "",
                    email: "",
                    role: "Customer",
                  });

                  setShowUserForm(true);
                }}
              >
                + Add User
              </button>

            </div>

            {showUserForm && (
              <div className="admin-form-card">

                <div className="admin-card-header">
                  <div>
                    <h2>
                      {editingUserId !== null
                        ? "Edit User"
                        : "Add User"}
                    </h2>
                  </div>
                </div>

                <form
                  onSubmit={handleUserSubmit}
                  className="admin-form"
                >

                  <input
                    type="text"
                    placeholder="Name"
                    value={userForm.name}
                    onChange={(event) =>
                      setUserForm({
                        ...userForm,
                        name: event.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={(event) =>
                      setUserForm({
                        ...userForm,
                        email: event.target.value,
                      })
                    }
                  />

                  <select
                    value={userForm.role}
                    onChange={(event) =>
                      setUserForm({
                        ...userForm,
                        role: event.target.value,
                      })
                    }
                  >
                    <option value="Customer">
                      Customer
                    </option>

                    <option value="Pharmacy">
                      Pharmacy
                    </option>

                    <option value="Admin">
                      Admin
                    </option>
                  </select>

                  <div className="admin-form-actions">

                    <button
                      type="submit"
                      className="admin-primary-button"
                    >
                      {editingUserId !== null
                        ? "Update User"
                        : "Add User"}
                    </button>

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={resetUserForm}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>
            )}

            <div className="admin-content-card">

              <div className="admin-card-header">
                <div>
                  <h2>All Users</h2>
                  <p>
                    Manage customer, pharmacy and admin
                    accounts
                  </p>
                </div>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredUsers.map((user) => (
                      <tr key={user.id}>

                        <td>{user.name}</td>

                        <td>{user.email}</td>

                        <td>{user.role}</td>

                        <td>
                          <span
                            className={`admin-status ${
                              user.status.toLowerCase()
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td>

                          <div className="admin-action-buttons">

                            <button
                              type="button"
                              className="admin-edit-button"
                              onClick={() =>
                                handleEditUser(user)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="admin-toggle-button"
                              onClick={() =>
                                handleToggleUserStatus(
                                  user.id
                                )
                              }
                            >
                              {user.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                            <button
                              type="button"
                              className="admin-delete-button"
                              onClick={() =>
                                handleDeleteUser(
                                  user.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </section>
        )}

        {/* ====================================
            Pharmacies
        ==================================== */}

        {activeSection === "pharmacies" && (
          <section className="admin-section">

            <div className="admin-toolbar">

              <input
                type="text"
                placeholder="Search pharmacies..."
                value={pharmacySearch}
                onChange={(event) =>
                  setPharmacySearch(
                    event.target.value
                  )
                }
                className="admin-search-input"
              />

              <button
                type="button"
                className="admin-primary-button"
                onClick={() => {
                  setEditingPharmacyId(null);

                  setPharmacyForm({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                  });

                  setShowPharmacyForm(true);
                }}
              >
                + Add Pharmacy
              </button>

            </div>

            {showPharmacyForm && (
              <div className="admin-form-card">

                <div className="admin-card-header">
                  <div>
                    <h2>
                      {editingPharmacyId !== null
                        ? "Edit Pharmacy"
                        : "Add Pharmacy"}
                    </h2>
                  </div>
                </div>

                <form
                  onSubmit={handlePharmacySubmit}
                  className="admin-form"
                >

                  <input
                    type="text"
                    placeholder="Pharmacy Name"
                    value={pharmacyForm.name}
                    onChange={(event) =>
                      setPharmacyForm({
                        ...pharmacyForm,
                        name: event.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={pharmacyForm.email}
                    onChange={(event) =>
                      setPharmacyForm({
                        ...pharmacyForm,
                        email: event.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Phone"
                    value={pharmacyForm.phone}
                    onChange={(event) =>
                      setPharmacyForm({
                        ...pharmacyForm,
                        phone: event.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Address"
                    value={pharmacyForm.address}
                    onChange={(event) =>
                      setPharmacyForm({
                        ...pharmacyForm,
                        address: event.target.value,
                      })
                    }
                  />

                  <div className="admin-form-actions">

                    <button
                      type="submit"
                      className="admin-primary-button"
                    >
                      {editingPharmacyId !== null
                        ? "Update Pharmacy"
                        : "Add Pharmacy"}
                    </button>

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={resetPharmacyForm}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>
            )}

            <div className="admin-content-card">

              <div className="admin-card-header">
                <div>
                  <h2>All Pharmacies</h2>
                  <p>
                    Manage registered pharmacies
                  </p>
                </div>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredPharmacies.map(
                      (pharmacy) => (
                        <tr key={pharmacy.id}>

                          <td>{pharmacy.name}</td>

                          <td>{pharmacy.email}</td>

                          <td>{pharmacy.phone}</td>

                          <td>{pharmacy.address}</td>

                          <td>
                            <span
                              className={`admin-status ${
                                pharmacy.status.toLowerCase()
                              }`}
                            >
                              {pharmacy.status}
                            </span>
                          </td>

                          <td>

                            <div className="admin-action-buttons">

                              <button
                                type="button"
                                className="admin-edit-button"
                                onClick={() =>
                                  handleEditPharmacy(
                                    pharmacy
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="admin-toggle-button"
                                onClick={() =>
                                  handleTogglePharmacyStatus(
                                    pharmacy.id
                                  )
                                }
                              >
                                {pharmacy.status ===
                                "Active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>

                              <button
                                type="button"
                                className="admin-delete-button"
                                onClick={() =>
                                  handleDeletePharmacy(
                                    pharmacy.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>
        )}

        {/* ====================================
            Medicines
        ==================================== */}

        {activeSection === "medicines" && (
          <section className="admin-section">

            <div className="admin-toolbar">

              <input
                type="text"
                placeholder="Search medicines..."
                value={medicineSearch}
                onChange={(event) =>
                  setMedicineSearch(
                    event.target.value
                  )
                }
                className="admin-search-input"
              />

              <button
                type="button"
                className="admin-primary-button"
                onClick={() => {
                  setEditingMedicineId(null);

                  setMedicineForm({
                    name: "",
                    category: "",
                    description: "",
                  });

                  setShowMedicineForm(true);
                }}
              >
                + Add Medicine
              </button>

            </div>

            {showMedicineForm && (
              <div className="admin-form-card">

                <div className="admin-card-header">
                  <div>
                    <h2>
                      {editingMedicineId !== null
                        ? "Edit Medicine"
                        : "Add Medicine"}
                    </h2>

                    <p>
                      Medicine catalog information only
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleMedicineSubmit}
                  className="admin-form"
                >

                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={medicineForm.name}
                    onChange={(event) =>
                      setMedicineForm({
                        ...medicineForm,
                        name: event.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Category"
                    value={medicineForm.category}
                    onChange={(event) =>
                      setMedicineForm({
                        ...medicineForm,
                        category:
                          event.target.value,
                      })
                    }
                  />

                  <textarea
                    placeholder="Description"
                    value={medicineForm.description}
                    onChange={(event) =>
                      setMedicineForm({
                        ...medicineForm,
                        description:
                          event.target.value,
                      })
                    }
                    rows="4"
                  />

                  <div className="admin-form-actions">

                    <button
                      type="submit"
                      className="admin-primary-button"
                    >
                      {editingMedicineId !== null
                        ? "Update Medicine"
                        : "Add Medicine"}
                    </button>

                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={resetMedicineForm}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>
            )}

            <div className="admin-content-card">

              <div className="admin-card-header">
                <div>
                  <h2>Medicine Catalog</h2>

                  <p>
                    Manage medicines available in the
                    MediFind system
                  </p>
                </div>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredMedicines.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="admin-empty-cell"
                        >
                          No medicines found.
                        </td>
                      </tr>
                    ) : (
                      filteredMedicines.map(
                        (medicine) => (
                          <tr key={medicine.id}>

                            <td>
                              <strong>
                                {medicine.name}
                              </strong>
                            </td>

                            <td>
                              {medicine.category}
                            </td>

                            <td>
                              {medicine.description ||
                                "No description"}
                            </td>

                            <td>

                              <div className="admin-action-buttons">

                                <button
                                  type="button"
                                  className="admin-edit-button"
                                  onClick={() =>
                                    handleEditMedicine(
                                      medicine
                                    )
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="admin-delete-button"
                                  onClick={() =>
                                    handleDeleteMedicine(
                                      medicine.id
                                    )
                                  }
                                >
                                  Delete
                                </button>

                              </div>

                            </td>

                          </tr>
                        )
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>
        )}

        {/* ====================================
            Reservations
        ==================================== */}

        {activeSection === "reservations" && (
          <section className="admin-section">

            <div className="admin-toolbar">

              <input
                type="text"
                placeholder="Search reservations..."
                value={reservationSearch}
                onChange={(event) =>
                  setReservationSearch(
                    event.target.value
                  )
                }
                className="admin-search-input"
              />

            </div>

            <div className="admin-content-card">

              <div className="admin-card-header">
                <div>
                  <h2>All Reservations</h2>

                  <p>
                    Monitor medicine reservation
                    requests
                  </p>
                </div>
              </div>

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Medicine</th>
                      <th>Pharmacy</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredReservations.length ===
                    0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="admin-empty-cell"
                        >
                          No reservations found.
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map(
                        (reservation) => (
                          <tr
                            key={reservation.id}
                          >

                            <td>
                              {reservation.customer}
                            </td>

                            <td>
                              {reservation.medicine}
                            </td>

                            <td>
                              {reservation.pharmacy}
                            </td>

                            <td>
                              {reservation.date}
                            </td>

                            <td>
                              <span
                                className={`admin-status ${
                                  reservation.status.toLowerCase()
                                }`}
                              >
                                {reservation.status}
                              </span>
                            </td>

                            <td>

                              <div className="admin-action-buttons">

                                {reservation.status ===
                                  "Pending" && (
                                  <button
                                    type="button"
                                    className="admin-edit-button"
                                    onClick={() =>
                                      handleConfirmReservation(
                                        reservation.id
                                      )
                                    }
                                  >
                                    Confirm
                                  </button>
                                )}

                                <button
                                  type="button"
                                  className="admin-delete-button"
                                  onClick={() =>
                                    handleDeleteReservation(
                                      reservation.id
                                    )
                                  }
                                >
                                  Delete
                                </button>

                              </div>

                            </td>

                          </tr>
                        )
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default AdminDashboard;