function MedicineCard({ medicine }) {
  return (
    <article className="medicine-card">
      <div className="card-top">
        <div>
          <h3>{medicine.name}</h3>
          <p>{medicine.description}</p>
        </div>

        <span
          className={
            medicine.available
              ? "availability available"
              : "availability unavailable"
          }
        >
          {medicine.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="medicine-details">
        <div>
          <span>Price</span>
          <strong>{medicine.price} EGP</strong>
        </div>

        <div>
          <span>Pharmacy</span>
          <strong>{medicine.pharmacy}</strong>
        </div>

        <div>
          <span>Location</span>
          <strong>{medicine.location}</strong>
        </div>

        <div>
          <span>Quantity</span>
          <strong>
            {medicine.available ? medicine.quantity : "N/A"}
          </strong>
        </div>
      </div>

      <div className="card-actions">
        <button
          onClick={() =>
            alert(`Medicine details: ${medicine.name}`)
          }
        >
          Medicine Details
        </button>

        <button
          className="secondary-button"
          onClick={() =>
            alert(`Pharmacy details: ${medicine.pharmacy}`)
          }
        >
          Pharmacy Details
        </button>
      </div>
    </article>
  );
}

export default MedicineCard;