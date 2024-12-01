import React, { useState } from "react";
import { ethers } from "ethers";
//import { getContractInstance } from "../utils/interact";
import "../styles/Donate.css";

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      setIsLoading(true);
      //const contract = await getContractInstance();
      const tx = await contract.donate({
        value: ethers.utils.parseEther(donationAmount),
      });
      await tx.wait();
      alert("Thank you for your donation!");
      setDonationAmount("");
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donate-container">
      <h2>Donate to KindVote</h2>
      <p>
        Support KindVote by donating Ether. Your contributions will be used to
        vote and support your chosen charities.
      </p>
      <div className="form-group mt-4">
        <label>Enter Amount (in XFI):</label>
        <input
          type="number"
          className="form-control"
          placeholder="e.g., 0.5"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={handleDonate}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Donate"}
      </button>
    </div>
  );
};

export default Donate;
