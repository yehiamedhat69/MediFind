import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./rout/protectroutes";

import MedicineSearch from "./pages/medicine/search/MedicineSearch";
import MedicineDetails from "./pages/medicine/details/MedicineDetails";
import PharmacyDetails from "./pages/pharmacy/PharmacyDetails";

import PharmacyNotifications from "./pages/PharmacyNotifications";

import Login from "./pages/authentication/Login/Login";
import Register from "./pages/authentication/Register/Register";

import MedicineReservation from "./pages/reservation/MedicineReservation";

import CustomerReservations from "./pages/reservation/CustomerReservations";
import CustomerNotifications from "./pages/notifications/CustomerNotifications";

import PharmacyProfile from "./pages/pharmacy/PharmacyProfile";
import InventoryManagement from "./pages/pharmacy/InventoryManagement";

import PharmacyReservations from "./pages/reservation/PharmacyReservations";

import CustomerDashboard from "./pages/customerdashboard/customerdashboard";

function UnauthorizedPage() {
  return <h2>403 - Unauthorized</h2>;
}

function PharmacyDashboard() {
  return <h2>Pharmacy Dashboard - Task 10</h2>;
}

function AdminDashboard() {
  return <h2>Admin Dashboard - Task 14</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/medicine-search"
          element={<MedicineSearch />}
        />

        <Route
          path="/medicine/:medicineId"
          element={<MedicineDetails />}
        />

        <Route
          path="/pharmacy/:pharmacyId"
          element={<PharmacyDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        {/* Medicine Reservation */}

        <Route
          path="/reservation/:medicineId/:pharmacyId"
          element={<MedicineReservation />}
        />

        {/* Customer Routes */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["customer"]} />
          }
        >
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/customer/reservations"
            element={<CustomerReservations />}
          />

          <Route
            path="/customer/notifications"
            element={<CustomerNotifications />}
          />
        </Route>

        {/* Pharmacy Routes */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]} />
          }
        >
          <Route
            path="/pharmacy/dashboard"
            element={<PharmacyDashboard />}
          />

          <Route
            path="/pharmacy/notifications"
            element={<PharmacyNotifications />}
          />

          <Route
            path="/pharmacy/profile"
            element={<PharmacyProfile />}
          />

          <Route
            path="/pharmacy/inventory"
            element={<InventoryManagement />}
          />

          <Route
            path="/pharmacy/reservation"
            element={<PharmacyReservations />}
          />
        </Route>

        {/* Admin Routes */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]} />
          }
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Route>

        {/* Default Route */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Fallback */}

        <Route
          path="*"
          element={
            <Navigate
              to="/medicine-search"
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;