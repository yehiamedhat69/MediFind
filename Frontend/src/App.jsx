import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./rout/protectroutes";

import MedicineSearch from "./pages/medicine/search/MedicineSearch";

import Login from "./pages/authentication/Login/Login";
import Register from "./pages/authentication/Register/Register";

// Temporary pages for testing other tasks
function UnauthorizedPage() {
  return <h2>403 - Unauthorized</h2>;
}

function CustomerDashboard() {
  return <h2>Customer Dashboard - Task 4</h2>;
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

        {/* Default */}

        <Route
          path="/"
          element={
            <Navigate to="/medicine-search" replace />
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/medicine-search" replace />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;