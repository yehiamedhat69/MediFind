import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import StatsCards from "./components/StatsCards.jsx";
import ReservationsList from "./components/ReservationsList.jsx";
import {
  customerName,
  reservations,
  stats,
} from "./dashboardData.js";
import "./customerdashboard.css";
export default function CustomerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="dashboard">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        <header className="page-header">
          <h1>Welcome, {customerName}! 👋</h1>
          <p className="subtitle">
            Here is your recent activity
          </p>
        </header>

        <StatsCards stats={stats} />

        <ReservationsList reservations={reservations} />
      </main>
    </div>
  );
}