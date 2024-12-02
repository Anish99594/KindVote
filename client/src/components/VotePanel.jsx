import React, { useState } from "react";
import "../styles/VotePanel.css";
import toast from "react-hot-toast";
import { useReadContract, useWriteContract } from "wagmi";
import { KINDVOTE, KINDVOTEABI } from "../abi/config";

const VotePanel = () => {
  const [charityIndex, setCharityIndex] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch charities using the read contract hook
  const {
    data: charities,
    isLoading: isFetchingCharities,
    isError,
  } = useReadContract({
    address: KINDVOTE,
    abi: KINDVOTEABI,
    functionName: "getCharities",
  });

  // Write to the contract to cast a vote
  const { writeContractAsync } = useWriteContract();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (charityIndex === "" || amount <= 0) {
      toast.error("Please select a charity and enter a valid amount.");
      return;
    }

    try {
      await toast.promise(
        (async () => {
          // Call the smart contract's `vote` function
          const { hash } = await writeContractAsync({
            address: KINDVOTE,
            abi: KINDVOTEABI,
            functionName: "vote",
            args: [charityIndex, amount],
          });

          toast.success(`Vote successful! Transaction Hash: ${hash}`);
        })(),
        {
          loading: "Submitting your vote...",
          success: "Vote submitted successfully!",
          error: "Error submitting your vote.",
        }
      );
      setCharityIndex("");
      setAmount("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <div className="vote-panel">
      <h2 className="vote-panel-title">Cast Your Vote</h2>
      {isFetchingCharities ? (
        <p>Loading charities...</p>
      ) : isError || !charities ? (
        <p>Failed to load charities. Please try again later.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="charity">Select Charity:</label>
            <select
              id="charity"
              className="form-control"
              value={charityIndex}
              onChange={(e) => setCharityIndex(e.target.value)}
              required
            >
              <option value="">-- Select Charity --</option>
              {charities.map((charity, index) => (
                <option key={index} value={index}>
                  {charity.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount of Governance Tokens:</label>
            <input
              id="amount"
              type="number"
              className="inputbox form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              placeholder="Enter amount"
              required
              style={{ backgroundColor: "white" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!charityIndex || amount <= 0}
          >
            Vote
          </button>
        </form>
      )}
    </div>
  );
};

export default VotePanel;
