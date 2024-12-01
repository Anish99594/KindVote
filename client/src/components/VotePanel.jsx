import React, { useState } from "react";
import "../styles/VotePanel.css";

const VotePanel = ({ castVote }) => {
  const [charityIndex, setCharityIndex] = useState("");
  const [amount, setAmount] = useState("");

  // Dummy data for charities
  const dummyCharities = [
    { title: "Feed the Children" },
    { title: "Clean Water Initiative" },
    { title: "Education for All" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charityIndex !== "" && amount > 0) {
      alert(
        `You voted ${amount} governance tokens for "${dummyCharities[charityIndex].title}".`
      );
      castVote(charityIndex, amount);
      setCharityIndex("");
      setAmount("");
    } else {
      alert("Please select a charity and enter a valid amount.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="vote-panel-container">
      <h3 className="vote-panel-title">Cast Your Vote</h3>
      <div className="form-group">
        <label>Select Charity:</label>
        <select
          className="form-control"
          value={charityIndex}
          onChange={(e) => setCharityIndex(e.target.value)}
          required
        >
          <option value="">-- Select Charity --</option>
          {dummyCharities.map((charity, index) => (
            <option key={index} value={index}>
              {charity.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Amount of Governance Tokens:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Vote
      </button>
    </form>
  );
};

export default VotePanel;
