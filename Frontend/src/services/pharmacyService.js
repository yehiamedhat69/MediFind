const API_BASE_URL = "http://localhost:5000/api";

export const getPharmacyDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/pharmacy/dashboard`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pharmacy dashboard");
  }

  return response.json();
};