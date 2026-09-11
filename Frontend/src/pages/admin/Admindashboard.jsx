import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Pill,
  Store,
  CalendarCheck,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  LogOut,
} from "lucide-react";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [pharmacySearch, setPharmacySearch] = useState("");
  const [medicineSearch, setMedicineSearch] = useState("");
  const [reservationSearch, setReservationSearch] = useState("");
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

const [newMedicine, setNewMedicine] = useState({
  name: "",
  category: "",
  price: "",
  stock: "",
});
  const [showAddPharmacy, setShowAddPharmacy] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState(null);

const [newPharmacy, setNewPharmacy] = useState({
  name: "",
  location: "",
});
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  role: "Customer",
});

  const menuItems = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "users", label: "Users", icon: <Users size={18} /> },
  { id: "pharmacies", label: "Pharmacies", icon: <Store size={18} /> },
  { id: "medicines", label: "Medicines", icon: <Pill size={18} /> },
  {
    id: "reservations",
    label: "Reservations",
    icon: <CalendarCheck size={18} />,
  },
];

const [pharmacies, setPharmacies] = useState([
  {
    id: 1,
    name: "El Ezaby Pharmacy",
    location: "Cairo",
    status: "Active",
  },
  {
    id: 2,
    name: "Seif Pharmacy",
    location: "Giza",
    status: "Active",
  },
  {
    id: 3,
    name: "19011 Pharmacy",
    location: "Alexandria",
    status: "Inactive",
  },
]);
const filteredPharmacies = pharmacies.filter((pharmacy) =>
  pharmacy.name.toLowerCase().includes(pharmacySearch.toLowerCase()) ||
  pharmacy.location.toLowerCase().includes(pharmacySearch.toLowerCase())
);
const [medicines, setMedicines] = useState([
  {
    id: 1,
    name: "Panadol",
    category: "Pain Relief",
    price: 10,
    stock: 120,
    status: "Available",
  },
  {
    id: 2,
    name: "Augmentin",
    category: "Antibiotic",
    price: 25,
    stock: 80,
    status: "Available",
  },
  {
    id: 3,
    name: "Vitamin C",
    category: "Vitamins",
    price: 8,
    stock: 0,
    status: "Out of Stock",
  },
]);
const filteredMedicines = medicines.filter((medicine) =>
  medicine.name.toLowerCase().includes(medicineSearch.toLowerCase()) ||
  medicine.category.toLowerCase().includes(medicineSearch.toLowerCase())
);
const [reservations, setReservations] = useState([
  {
    id: 1,
    customer: "Ahmed Ali",
    medicine: "Panadol",
    pharmacy: "El Ezaby Pharmacy",
    date: "11 Sep 2026",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Sara Mohamed",
    medicine: "Augmentin",
    pharmacy: "Seif Pharmacy",
    date: "10 Sep 2026",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Omar Hassan",
    medicine: "Vitamin C",
    pharmacy: "19011 Pharmacy",
    date: "09 Sep 2026",
    status: "Pending",
  },
]);

const filteredReservations = reservations.filter(
  (reservation) =>
    reservation.customer
      .toLowerCase()
      .includes(reservationSearch.toLowerCase()) ||
    reservation.medicine
      .toLowerCase()
      .includes(reservationSearch.toLowerCase()) ||
    reservation.pharmacy
      .toLowerCase()
      .includes(reservationSearch.toLowerCase())
);
const [users, setUsers] = useState([
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    name: "Sara Mohamed",
    email: "sara@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 3,
    name: "Omar Hassan",
    email: "omar@example.com",
    role: "Admin",
    status: "Active",
  },
]);
const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
);
const stats = [
  {
    title: "Total Users",
    value: users.length,
    description: "Registered users",
  },
  {
    title: "Pharmacies",
    value: pharmacies.length,
    description: "Registered pharmacies",
  },
  {
    title: "Medicines",
    value: medicines.length,
    description: "Total medicines",
  },
  {
    title: "Reservations",
    value: reservations.length,
    description: "Total reservations",
  },
  {
  title: "Pending Reservations",
  value: reservations.filter(
    (reservation) => reservation.status === "Pending"
  ).length,
  description: "Waiting for confirmation",
},
];
const handleAddUser = () => {
  if (!newUser.name.trim() || !newUser.email.trim()) {
    return;
  }
  if (!newUser.email.includes("@")) {
  return;
  }

  const user = {
    id: Date.now(),
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    status: "Active",
  };

  setUsers([...users, user]);

  setNewUser({
    name: "",
    email: "",
    role: "Customer",
  });

  setShowAddUser(false);
  
};
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>MediFind</h2>
        <p className="sidebar-subtitle">Admin Panel</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={activeView === item.id ? "active" : ""}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <button
        className="logout-button"
        onClick={() => {
        const confirmed = window.confirm(
            "Are you sure you want to logout?"
        );

        if (confirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
        }}
        >
        <LogOut size={18} />
        Logout
        </button>
      </aside>

    <main className="admin-main">
        {activeView === "overview" && (
            <>
            <h1>Admin Dashboard</h1>

            <div className="stats-grid">
                {stats.map((stat) => (
                <div
                className="stat-card"
                key={stat.title}
                onClick={() => {
                if (stat.title === "Total Users") {
                    setActiveView("users");
                } else if (stat.title === "Pharmacies") {
                    setActiveView("pharmacies");
                } else if (stat.title === "Medicines") {
                    setActiveView("medicines");
                } else if (
                    stat.title === "Reservations" ||
                    stat.title === "Pending Reservations"
                ) {
                    setActiveView("reservations");
                }
                }}
                >
                    <h3>{stat.title}</h3>
                    <p>{stat.value}</p>
                    <span>{stat.description}</span>
                </div>
                ))}
            </div>
            <div className="recent-activity">
            <h2>Recent Activity</h2>
            

            <div className="activity-item">
                <div>
                <strong>New user registered</strong>
                <p>Ahmed Ali created a new account</p>
                </div>
                <span>Today</span>
            </div>

            <div className="activity-item">
                <div>
                <strong>New pharmacy added</strong>
                <p>El Ezaby Pharmacy joined the platform</p>
                </div>
                <span>Yesterday</span>
            </div>

            <div className="activity-item">
                <div>
                <strong>New reservation</strong>
                <p>Sara Mohamed made a reservation</p>
                </div>
                <span>2 days ago</span>
            </div>
            </div>
            <div className="quick-access">
            <h2>Quick Access</h2>

            <div className="quick-access-grid">
                <button onClick={() => setActiveView("users")}>
                Manage Users
                </button>

                <button onClick={() => setActiveView("pharmacies")}>
                Manage Pharmacies
                </button>

                <button onClick={() => setActiveView("medicines")}>
                Manage Medicines
                </button>

                <button onClick={() => setActiveView("reservations")}>
                View Reservations
                </button>
            </div>
            </div>
            <div className="platform-health">
            <h2>Platform Health</h2>

            <div className="health-item">
                <div>
                <strong>System Status</strong>
                <p>All systems are operating normally</p>
                </div>
                <span className="health-online">Online</span>
            </div>

            <div className="health-item">
                <div>
                <strong>Database</strong>
                <p>Database connection is stable</p>
                </div>
                <span className="health-online">Connected</span>
            </div>

            <div className="health-item">
                <div>
                <strong>API</strong>
                <p>API services are responding normally</p>
                </div>
                <span className="health-online">Healthy</span>
            </div>
            </div>
            </>
            
        )}

    {activeView === "users" && (
    <>
        <h1>Users</h1>
        <div className="admin-search">
        <Search size={18} />
        <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        <button className="add-button" onClick={() => setShowAddUser(true)}>
        <Plus size={18} />
        Add User
        </button>
        {showAddUser && (
    <div className="add-user-form">
        <input
        type="text"
        placeholder="Full Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />

        <input
        type="email"
        placeholder="Email Address"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />

        <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
        <option value="Customer">Customer</option>
        <option value="Admin">Admin</option>
        </select>

        <div>
        <button className="save-button" onClick={handleAddUser}>
            Save
        </button>

        <button
            className="cancel-button"
            onClick={() => setShowAddUser(false)}
        >
            Cancel
        </button>
        </div>
    </div>
    )}
    {editingUser && (
    <div className="add-user-form">
        <input
        type="text"
        placeholder="Name"
        value={editingUser.name}
        onChange={(e) =>
            setEditingUser({
            ...editingUser,
            name: e.target.value,
            })
        }
        />

        <input
        type="email"
        placeholder="Email"
        value={editingUser.email}
        onChange={(e) =>
            setEditingUser({
            ...editingUser,
            email: e.target.value,
            })
        }
        />

        <select
        value={editingUser.role}
        onChange={(e) =>
            setEditingUser({
            ...editingUser,
            role: e.target.value,
            })
        }
        >
        <option value="Customer">Customer</option>
        <option value="Admin">Admin</option>
        </select>

        <div>
        <button
            className="save-button"
            onClick={() => {
            if (
                !editingUser.name.trim() ||
                !editingUser.email.trim()
            ) {
                return;
            }

            if (!editingUser.email.includes("@")) {
                return;
            }

            setUsers(
                users.map((u) =>
                u.id === editingUser.id ? editingUser : u
                )
            );

            setEditingUser(null);
            }}
        >
            Save Changes
        </button>

        <button
            className="cancel-button"
            onClick={() => setEditingUser(null)}
        >
            Cancel
        </button>
        </div>
    </div>
    )}
        <div className="admin-table-wrapper">
        <table className="admin-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>
            {filteredUsers.map((user) => (
                <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td> <span className="status-badge">{user.status}</span> </td>
                <td>
                <button
                    className="status-button"
                    onClick={() => {
                    setUsers(
                        users.map((u) =>
                        u.id === user.id
                            ? {
                                ...u,
                                status:
                                u.status === "Active"
                                    ? "Inactive"
                                    : "Active",
                            }
                            : u
                        )
                    );
                    }}
                >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button
                className="edit-button"
                onClick={() => setEditingUser(user)}
                >
                    <Edit size={14} />
                    Edit
                </button>
                <button
                className="delete-button"
                onClick={() => {
                setUsers(users.filter((u) => u.id !== user.id));
                }}
            >
                Delete
            </button>
                </td>
                </tr>
            ))}
            {filteredUsers.length === 0 && (
            <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                No users found
                </td>
            </tr>
            )}
            </tbody>
        </table>
        </div>
    </>
    )}

        {activeView === "pharmacies" && (
        <>
            <h1>Pharmacies</h1>
            <button
            className="add-button"
            onClick={() => setShowAddPharmacy(true)}
            >
            <Plus size={18} />
            Add Pharmacy
            </button>
            {showAddPharmacy && (
            <div className="add-user-form">
                <input
                type="text"
                placeholder="Pharmacy Name"
                value={newPharmacy.name}
                onChange={(e) =>
                    setNewPharmacy({
                    ...newPharmacy,
                    name: e.target.value,
                    })
                }
                />

                <input
                type="text"
                placeholder="Location"
                value={newPharmacy.location}
                onChange={(e) =>
                    setNewPharmacy({
                    ...newPharmacy,
                    location: e.target.value,
                    })
                }
                />

                <div>
                <button
                    className="save-button"
                    onClick={() => {
                    if (!newPharmacy.name.trim() || !newPharmacy.location.trim()) {
                        return;
                    }

                    setPharmacies([
                        ...pharmacies,
                        {
                        id: Date.now(),
                        name: newPharmacy.name,
                        location: newPharmacy.location,
                        status: "Active",
                        },
                    ]);

                    setNewPharmacy({
                        name: "",
                        location: "",
                    });

                    setShowAddPharmacy(false);
                    }}
                >
                    Save
                </button>

                <button
                    className="cancel-button"
                    onClick={() => setShowAddPharmacy(false)}
                >
                    Cancel
                </button>
                </div>
            </div>
            )}
            <div className="admin-search">
            <Search size={18} />

            <input
                type="text"
                placeholder="Search pharmacies..."
                value={pharmacySearch}
                onChange={(e) => setPharmacySearch(e.target.value)}
            />
            </div>
            {editingPharmacy && (
            <div className="add-user-form">
                <input
                type="text"
                placeholder="Pharmacy Name"
                value={editingPharmacy.name}
                onChange={(e) =>
                    setEditingPharmacy({
                    ...editingPharmacy,
                    name: e.target.value,
                    })
                }
                />

                <input
                type="text"
                placeholder="Location"
                value={editingPharmacy.location}
                onChange={(e) =>
                    setEditingPharmacy({
                    ...editingPharmacy,
                    location: e.target.value,
                    })
                }
                />

                <div>
                <button
                    className="save-button"
                    onClick={() => {
                    setPharmacies(
                        pharmacies.map((p) =>
                        p.id === editingPharmacy.id
                            ? editingPharmacy
                            : p
                        )
                    );

                    setEditingPharmacy(null);
                    }}
                >
                    Save Changes
                </button>

                <button
                    className="cancel-button"
                    onClick={() => setEditingPharmacy(null)}
                >
                    Cancel
                </button>
                </div>
            </div>
            )}
            <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {filteredPharmacies.map((pharmacy) => (
                    <tr key={pharmacy.id}>
                    <td>{pharmacy.name}</td>
                    <td>{pharmacy.location}</td>
                    <td>
                        <span className="status-badge">
                        {pharmacy.status}
                        </span>
                    </td>
                    <td>
                    <button
                        className="status-button"
                        onClick={() => {
                        setPharmacies(
                            pharmacies.map((p) =>
                            p.id === pharmacy.id
                                ? {
                                    ...p,
                                    status:
                                    p.status === "Active"
                                        ? "Inactive"
                                        : "Active",
                                }
                                : p
                            )
                        );
                        }}
                    >
                        {pharmacy.status === "Active" ? "Deactivate" : "Activate"}
                    </button>

                    <button
                        className="edit-button"
                        onClick={() => setEditingPharmacy(pharmacy)}
                    >
                        <Edit size={14} />
                        Edit
                    </button>
                    <button
                    className="delete-button"
                    onClick={() => {
                        setPharmacies(
                        pharmacies.filter((p) => p.id !== pharmacy.id)
                        );
                    }}
                    >
                    Delete
                    </button>
                    </td>
                    </tr>
                ))}
                {filteredPharmacies.length === 0 && (
                <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                    No pharmacies found
                    </td>
                </tr>
                )}
                </tbody>
            </table>
            </div>
        </>
        )}

        {activeView === "medicines" && (
        <>
            <h1>Medicines</h1>
            <button
            className="add-button"
            onClick={() => setShowAddMedicine(true)}
            >
            <Plus size={18} />
            Add Medicine
            </button>
            <div className="admin-search">
            <Search size={18} />

            <input
                type="text"
                placeholder="Search medicines..."
                value={medicineSearch}
                onChange={(e) => setMedicineSearch(e.target.value)}
            />
            </div>
            {showAddMedicine && (
            <div className="add-user-form">
                <input
                type="text"
                placeholder="Medicine Name"
                value={newMedicine.name}
                onChange={(e) =>
                    setNewMedicine({
                    ...newMedicine,
                    name: e.target.value,
                    })
                }
                />

                <input
                type="text"
                placeholder="Category"
                value={newMedicine.category}
                onChange={(e) =>
                    setNewMedicine({
                    ...newMedicine,
                    category: e.target.value,
                    })
                }
                />

                <input
                type="number"
                placeholder="Price"
                value={newMedicine.price}
                onChange={(e) =>
                    setNewMedicine({
                    ...newMedicine,
                    price: e.target.value,
                    })
                }
                />

                <input
                type="number"
                placeholder="Stock"
                value={newMedicine.stock}
                onChange={(e) =>
                    setNewMedicine({
                    ...newMedicine,
                    stock: e.target.value,
                    })
                }
                />

                <div>
                <button
                    className="save-button"
                    onClick={() => {
                    if (
                        !newMedicine.name.trim() ||
                        !newMedicine.category.trim() ||
                        newMedicine.price === "" ||
                        newMedicine.stock === ""
                    ) {
                        return;
                    }

                    const stock = Number(newMedicine.stock);

                    setMedicines([
                        ...medicines,
                        {
                        id: Date.now(),
                        name: newMedicine.name,
                        category: newMedicine.category,
                        price: Number(newMedicine.price),
                        stock: stock,
                        status: stock > 0 ? "Available" : "Out of Stock",
                        },
                    ]);

                    setNewMedicine({
                        name: "",
                        category: "",
                        price: "",
                        stock: "",
                    });

                    setShowAddMedicine(false);
                    }}
                >
                    Save
                </button>

                <button
                    className="cancel-button"
                    onClick={() => setShowAddMedicine(false)}
                >
                    Cancel
                </button>
                </div>
            </div>
            )}
            {editingMedicine && (
            <div className="add-user-form">
                <input
                type="text"
                placeholder="Medicine Name"
                value={editingMedicine.name}
                onChange={(e) =>
                    setEditingMedicine({
                    ...editingMedicine,
                    name: e.target.value,
                    })
                }
                />

                <input
                type="text"
                placeholder="Category"
                value={editingMedicine.category}
                onChange={(e) =>
                    setEditingMedicine({
                    ...editingMedicine,
                    category: e.target.value,
                    })
                }
                />

                <input
                type="number"
                placeholder="Price"
                value={editingMedicine.price}
                onChange={(e) =>
                    setEditingMedicine({
                    ...editingMedicine,
                    price: Number(e.target.value),
                    })
                }
                />

                <input
                type="number"
                placeholder="Stock"
                value={editingMedicine.stock}
                onChange={(e) =>
                    setEditingMedicine({
                    ...editingMedicine,
                    stock: Number(e.target.value),
                    })
                }
                />

                <div>
                <button
                    className="save-button"
                    onClick={() => {
                    const updatedMedicine = {
                        ...editingMedicine,
                        status:
                        Number(editingMedicine.stock) > 0
                            ? "Available"
                            : "Out of Stock",
                    };

                    setMedicines(
                        medicines.map((m) =>
                        m.id === editingMedicine.id
                            ? updatedMedicine
                            : m
                        )
                    );

                    setEditingMedicine(null);
                    }}
                >
                    Save Changes
                </button>

                <button
                    className="cancel-button"
                    onClick={() => setEditingMedicine(null)}
                >
                    Cancel
                </button>
                </div>
            </div>
            )}
            <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {filteredMedicines.map((medicine) => (
                    <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td>{medicine.category}</td>
                    <td>${medicine.price}</td>
                    <td>{medicine.stock}</td>
                    <td>
                        <span className="status-badge">
                        {medicine.status}
                        </span>
                    </td>
                    <td>
                    <button
                    className="status-button"
                    onClick={() => {
                        setMedicines(
                        medicines.map((m) =>
                            m.id === medicine.id
                            ? {
                                ...m,
                                status:
                                    m.status === "Available"
                                    ? "Out of Stock"
                                    : m.stock > 0
                                    ? "Available"
                                    : "Out of Stock",
                                }
                            : m
                        )
                        );
                    }}
                    >
                    {medicine.status === "Available"
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                        className="edit-button"
                        onClick={() => setEditingMedicine(medicine)}
                    >
                        <Edit size={14} />
                        Edit
                    </button>
                    <button
                    className="delete-button"
                    onClick={() => {
                        setMedicines(medicines.filter((m) => m.id !== medicine.id));
                    }}
                    >
                        Delete
                    </button>
                    </td>
                    </tr>
                ))}
                {filteredMedicines.length === 0 && (
                <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                    No medicines found
                    </td>
                </tr>
                )}
                </tbody>
            </table>
            </div>
        </>
        )}
        {activeView === "reservations" && (
        <>
            <h1>Reservations</h1>
            <div className="admin-search">
            <Search size={18} />
            <input
                type="text"
                placeholder="Search reservations..."
                value={reservationSearch}
                onChange={(e) => setReservationSearch(e.target.value)}
            />
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
                {filteredReservations.map((reservation) => (
                    <tr key={reservation.id}>
                    <td>{reservation.customer}</td>
                    <td>{reservation.medicine}</td>
                    <td>{reservation.pharmacy}</td>
                    <td>{reservation.date}</td>
                    <td>
                        <span className={`status-badge ${
                            reservation.status === "Confirmed"
                            ? "status-confirmed"
                            : "status-pending"
                        }`}
                        >
                        {reservation.status}
                        </span>
                    </td>
                    <td>
                    <button
                        className="status-button"
                        onClick={() => {
                        if (reservation.status === "Pending") {
                            setReservations(
                            reservations.map((r) =>
                                r.id === reservation.id
                                ? { ...r, status: "Confirmed" }
                                : r
                            )
                            );
                        }
                        }}
                    >
                        {reservation.status === "Confirmed" ? "View" : "Confirm"}
                    </button>
                    <button
                    className="delete-button"
                    onClick={() => {
                        setReservations(
                        reservations.filter((r) => r.id !== reservation.id)
                        );
                    }}
                    >
                    <Trash2 size={14} />
                    Delete
                    </button>
                    </td>
                    </tr>
                ))}
                {filteredReservations.length === 0 && (
                <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                    No reservations found
                    </td>
                </tr>
                )}
                </tbody>
            </table>
            </div>
        </>
        )}
            </main>
            </div>
        );
        }


export default AdminDashboard;