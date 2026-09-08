import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyPharmacy,
  getPharmacyInventory,
  getMedicines,
  addInventoryItem,
  updateInventoryItem,
  removeInventoryItem,
} from "../../services/pharmacyManagementService";

import "./InventoryManagement.css";

const emptyForm = {
  medicineId: "",
  quantity: "",
  price: "",
  availability: true,
};

const InventoryManagement = () => {
  const navigate = useNavigate();

  const [pharmacy, setPharmacy] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [formData, setFormData] = useState(emptyForm);
  const [editingItem, setEditingItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const currentPharmacy = await getMyPharmacy();

      const pharmacyId = currentPharmacy?._id;

      if (!pharmacyId) {
        throw new Error(
          "Pharmacy ID could not be found."
        );
      }

      const [inventoryData, medicinesData] =
        await Promise.all([
          getPharmacyInventory(pharmacyId),
          getMedicines(),
        ]);

      setPharmacy(currentPharmacy);
      setInventory(inventoryData);
      setMedicines(medicinesData);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const availableMedicinesForSelect = useMemo(() => {
    const existingMedicineIds = new Set(
      inventory.map((item) => {
        const medicine =
          typeof item.medicineId === "object"
            ? item.medicineId?._id
            : item.medicineId;

        return String(medicine);
      })
    );

    return medicines.filter((medicine) => {
      if (editingItem) {
        return true;
      }

      return !existingMedicineIds.has(
        String(medicine._id)
      );
    });
  }, [medicines, inventory, editingItem]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
    setSuccess("");
  };

  const validate = () => {
    const errors = {};

    if (!editingItem && !formData.medicineId) {
      errors.medicineId = "Please select a medicine.";
    }

    if (
      formData.quantity === "" ||
      formData.quantity === null
    ) {
      errors.quantity = "Quantity is required.";
    } else if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      errors.quantity =
        "Quantity must be a non-negative integer.";
    }

    if (
      formData.price === "" ||
      formData.price === null
    ) {
      errors.price = "Price is required.";
    } else if (
      Number.isNaN(Number(formData.price)) ||
      Number(formData.price) < 0
    ) {
      errors.price =
        "Price must be a non-negative number.";
    }

    return errors;
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingItem(null);
    setFieldErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setSaving(true);

      if (editingItem) {
        await updateInventoryItem(
          editingItem._id,
          {
            quantity: Number(formData.quantity),
            price: Number(formData.price),
            availability:
              Boolean(formData.availability),
          }
        );

        setSuccess(
          "Inventory item updated successfully."
        );
      } else {
        await addInventoryItem({
          medicineId: formData.medicineId,
          quantity: Number(formData.quantity),
          price: Number(formData.price),
          availability:
            Boolean(formData.availability),
        });

        setSuccess(
          "Medicine added to inventory successfully."
        );
      }

      resetForm();

      await loadInventory();
    } catch (err) {
      setError(
        err.message ||
          "Unable to save inventory item."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    const medicineId =
      typeof item.medicineId === "object"
        ? item.medicineId?._id
        : item.medicineId;

    setEditingItem(item);

    setFormData({
      medicineId: medicineId || "",
      quantity: String(item.quantity ?? ""),
      price: String(item.price ?? ""),
      availability:
        item.availability !== false,
    });

    setFieldErrors({});
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (item) => {
    const medicineName =
      typeof item.medicineId === "object"
        ? item.medicineId?.name
        : "this medicine";

    const confirmed = window.confirm(
      `Remove ${medicineName} from inventory?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setRemovingId(item._id);
      setError("");
      setSuccess("");

      await removeInventoryItem(item._id);

      if (editingItem?._id === item._id) {
        resetForm();
      }

      setSuccess(
        "Medicine removed from inventory successfully."
      );

      await loadInventory();
    } catch (err) {
      setError(
        err.message ||
          "Unable to remove inventory item."
      );
    } finally {
      setRemovingId(null);
    }
  };

  const getMedicineName = (item) => {
    if (
      item?.medicineId &&
      typeof item.medicineId === "object"
    ) {
      return item.medicineId.name || "Unknown medicine";
    }

    const medicine = medicines.find(
      (medicineItem) =>
        String(medicineItem._id) ===
        String(item?.medicineId)
    );

    return medicine?.name || "Unknown medicine";
  };

  if (loading) {
    return (
      <div className="inventory-page">
        <div className="inventory-state">
          <div className="inventory-loader"></div>
          <p>Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-page">
      <div className="inventory-container">
        <div className="inventory-header">
          <div>
            <p className="inventory-eyebrow">
              Pharmacy Management
            </p>

            <h1>Inventory Management</h1>

            <p>
              Manage medicines, quantities, prices and
              availability.
            </p>
          </div>

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/pharmacy/dashboard")
            }
          >
            Back to Dashboard
          </button>
        </div>

        {pharmacy && (
          <div className="pharmacy-summary">
            <strong>{pharmacy.name}</strong>
            <span>{pharmacy.address}</span>
          </div>
        )}

        {error && (
          <div className="inventory-alert error">
            {error}
          </div>
        )}

        {success && (
          <div className="inventory-alert success">
            {success}
          </div>
        )}

        <section className="inventory-form-card">
          <div className="inventory-card-header">
            <div>
              <h2>
                {editingItem
                  ? "Edit Inventory Item"
                  : "Add Medicine"}
              </h2>

              <p>
                {editingItem
                  ? "Update the selected medicine."
                  : "Add a medicine to your pharmacy inventory."}
              </p>
            </div>

            {editingItem && (
              <button
                type="button"
                className="cancel-edit-button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="inventory-form"
          >
            <div className="inventory-form-grid">
              <div className="form-group">
                <label htmlFor="medicineId">
                  Medicine
                </label>

                <select
                  id="medicineId"
                  name="medicineId"
                  value={formData.medicineId}
                  onChange={handleChange}
                  disabled={Boolean(editingItem)}
                  className={
                    fieldErrors.medicineId
                      ? "input-error"
                      : ""
                  }
                >
                  <option value="">
                    Select medicine
                  </option>

                  {availableMedicinesForSelect.map(
                    (medicine) => (
                      <option
                        key={medicine._id}
                        value={medicine._id}
                      >
                        {medicine.name}
                      </option>
                    )
                  )}
                </select>

                {fieldErrors.medicineId && (
                  <span className="field-error">
                    {fieldErrors.medicineId}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="quantity">
                  Quantity
                </label>

                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={
                    fieldErrors.quantity
                      ? "input-error"
                      : ""
                  }
                  placeholder="0"
                />

                {fieldErrors.quantity && (
                  <span className="field-error">
                    {fieldErrors.quantity}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="price">
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className={
                    fieldErrors.price
                      ? "input-error"
                      : ""
                  }
                  placeholder="0.00"
                />

                {fieldErrors.price && (
                  <span className="field-error">
                    {fieldErrors.price}
                  </span>
                )}
              </div>

              <div className="availability-group">
                <label className="availability-label">
                  Availability
                </label>

                <label className="switch-row">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChange}
                  />

                  <span className="switch"></span>

                  <span>
                    {formData.availability
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              {editingItem && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                  disabled={saving}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingItem
                  ? "Update Medicine"
                  : "Add Medicine"}
              </button>
            </div>
          </form>
        </section>

        <section className="inventory-list-card">
          <div className="inventory-card-header">
            <div>
              <h2>Current Inventory</h2>

              <p>
                {inventory.length} medicine
                {inventory.length !== 1 ? "s" : ""} in
                inventory
              </p>
            </div>
          </div>

          {inventory.length === 0 ? (
            <div className="inventory-empty">
              <div className="empty-icon">+</div>

              <h3>No medicines yet</h3>

              <p>
                Add your first medicine to start
                managing your inventory.
              </p>
            </div>
          ) : (
            <>
              <div className="inventory-table-wrapper">
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <strong>
                            {getMedicineName(item)}
                          </strong>
                        </td>

                        <td>
                          {item.quantity}
                        </td>

                        <td>
                          {Number(item.price).toFixed(2)}
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              item.availability &&
                              Number(item.quantity) > 0
                                ? "available"
                                : "unavailable"
                            }`}
                          >
                            {item.availability &&
                            Number(item.quantity) > 0
                              ? "Available"
                              : "Unavailable"}
                          </span>
                        </td>

                        <td>
                          <div className="action-buttons">
                            <button
                              type="button"
                              className="edit-button"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-button"
                              onClick={() =>
                                handleDelete(item)
                              }
                              disabled={
                                removingId === item._id
                              }
                            >
                              {removingId === item._id
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="inventory-mobile-list">
                {inventory.map((item) => (
                  <div
                    className="inventory-mobile-card"
                    key={item._id}
                  >
                    <div className="mobile-card-header">
                      <strong>
                        {getMedicineName(item)}
                      </strong>

                      <span
                        className={`status-badge ${
                          item.availability &&
                          Number(item.quantity) > 0
                            ? "available"
                            : "unavailable"
                        }`}
                      >
                        {item.availability &&
                        Number(item.quantity) > 0
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>

                    <div className="mobile-info-grid">
                      <div>
                        <span>Quantity</span>
                        <strong>
                          {item.quantity}
                        </strong>
                      </div>

                      <div>
                        <span>Price</span>
                        <strong>
                          {Number(item.price).toFixed(2)}
                        </strong>
                      </div>
                    </div>

                    <div className="mobile-actions">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          handleDelete(item)
                        }
                        disabled={
                          removingId === item._id
                        }
                      >
                        {removingId === item._id
                          ? "Removing..."
                          : "Remove"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default InventoryManagement;