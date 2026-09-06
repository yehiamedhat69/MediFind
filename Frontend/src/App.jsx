
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./rout/protectroutes";

// Medicine Search
import MedicineSearch from "./pages/medicine/search/MedicineSearch";

// Temporary pages for testing Task 3
function LoginPage() {
  return <h2>Login Page - Task 2</h2>;
}

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

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/medicine-search"
          element={<MedicineSearch />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        {/* =========================
            CUSTOMER ROUTES
        ========================== */}

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

        {/* =========================
            PHARMACY ROUTES
        ========================== */}

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

        {/* =========================
            ADMIN ROUTES
        ========================== */}

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

        {/* =========================
            DEFAULT ROUTE
        ========================== */}

        <Route
          path="/"
          element={
            <Navigate to="/medicine-search" replace />
          }
        />

        {/* =========================
            UNKNOWN ROUTES
        ========================== */}

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
