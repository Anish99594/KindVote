import React, { useState } from "react";

const DonationForm = ({ donate }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      donate(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="form-group">
        <label>Enter Donation Amount (in XFI):</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Donate
      </button>
    </form>
  );
};

export default DonationForm;
