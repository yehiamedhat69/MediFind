const User = require("../models/User");
const Pharmacy = require("../models/Pharmacy");
const Reservation = require("../models/Reservation");

// ===== users =====

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid user ID" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { role } = req.body;

    if (role && !["user", "admin", "pharmacy"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role value" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid user ID" });
  }
};

// ===== PHARMACIES =====

const getAllPharmaciesAdmin = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.status(200).json({ success: true, data: pharmacies });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve pharmacies" });
  }
};

const updatePharmacyAdmin = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: "Pharmacy not found" });
    }
    res.status(200).json({ success: true, message: "Pharmacy updated successfully", data: pharmacy });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update pharmacy", error: error.message });
  }
};

const deletePharmacyAdmin = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!pharmacy) {
      return res.status(404).json({ success: false, message: "Pharmacy not found" });
    }
    res.status(200).json({ success: true, message: "Pharmacy deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid pharmacy ID" });
  }
};

// ===== Reservation =====

const getAllReservationsAdmin = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve reservations" });
  }
};

const deleteReservationAdmin = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }
    res.status(200).json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid reservation ID" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllPharmaciesAdmin,
  updatePharmacyAdmin,
  deletePharmacyAdmin,
  getAllReservationsAdmin,
  deleteReservationAdmin
};