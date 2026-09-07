const Medicine = require("../models/medicine");

// Add medicine
const addMedicine = async (req, res) => {
  try {
    const { name, description, price, quantity, expiryDate, category } = req.body;

    const existingMedicine = await Medicine.findOne({ name });

    if (existingMedicine) {
      return res.status(409).json({
        message: "Medicine already exists"
      });
    }

    const medicine = await Medicine.create({
      name,
      description,
      price,
      quantity,
      expiryDate,
      category
    });

    res.status(201).json({
      message: "Medicine added successfully",
      medicine
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add medicine",
      error: error.message
    });
  }
};

// Get one medicine
const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.status(200).json(medicine);
  } catch (error) {
    res.status(400).json({
      message: "Invalid medicine ID"
    });
  }
};

// Get all medicines
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve medicines"
    });
  }
};

// Update medicine
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.status(200).json({
      message: "Medicine updated successfully",
      medicine
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update medicine",
      error: error.message
    });
  }
};

// Delete medicine
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.status(200).json({
      message: "Medicine deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid medicine ID"
    });
  }
};

module.exports = {
  addMedicine,
  getMedicine,
  getAllMedicines,
  updateMedicine,
  deleteMedicine
};