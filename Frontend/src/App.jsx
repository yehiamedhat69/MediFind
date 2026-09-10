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
import CustomerDashboard from "./pages/customerdashboard/customerdashboard";

// Temporary pages for testing other tasks
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
        <Route path="/" element={<Navigate to="/medicine-search" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/medicine-search"
          element={<MedicineSearch />}
        />

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacy/dashboard"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route
          path="*"
          element={<Navigate to="/medicine-search" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;