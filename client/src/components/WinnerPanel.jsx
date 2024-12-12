import React, { useState, useEffect } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { KINDVOTE, KINDVOTEABI } from "../abi/config";
import "../styles/winnerPanel.css";
import toast from "react-hot-toast";

const WinnerPanel = () => {
  const [winner, setWinner] = useState(null);

  // Fetch winning charity details
  const { data, isLoading, isError } = useReadContract({
    address: KINDVOTE,
    abi: KINDVOTEABI,
    functionName: "winningCharityDetails",
  });

  // Write contract for removeWinningCharity function
  const { writeContractAsync, isPending } = useWriteContract({
    address: KINDVOTE,
    abi: KINDVOTEABI,
    functionName: "removeWinningCharity",
  });

  // Process and set winner details
  useEffect(() => {
    if (Array.isArray(data) && data.length === 6) {
      const [
        votes,
        title,
        charityAddress,
        description,
        ipfsHash,
        deletionTime,
      ] = data;

      setWinner({
        title,
        description: description || "No description provided.",
        votes: votes.toString(),
        charityAddress,
        ipfsHash,
        deletionTime: Number(deletionTime), // Convert BigInt if necessary
      });
    }
  }, [data]);

  const handleRemoveWinningCharity = async () => {
    try {
      await toast.promise(writeContractAsync(), {
        loading: "Removing winning charity...",
        success: "Winning charity removed successfully!",
        error: "Failed to remove the winning charity.",
      });
      setWinner(null);
    } catch (err) {
      console.error("Error removing winning charity:", err);
    }
  };

  // Handle loading, errors, or no data
  if (isLoading) {
    return (
      <div className="winner-panel-loading">
        <p>Loading winning charity details...</p>
      </div>
    );
  }

  if (isError || !winner) {
    return (
      <div className="winner-panel-empty">
        <p>No winner details available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="winner-panel mt-4 p-3 bg-light border rounded shadow-lg">
      <h3 className="winner-panel-title">Winning Charity</h3>
      <div className="winner-panel-content">
        <p>
          <strong>Title:</strong> {winner.title}
        </p>
        <p>
          <strong>Description:</strong> {winner.description}
        </p>
        <p>
          <strong>Votes:</strong> {winner.votes}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          <span className="winner-panel-address">{winner.charityAddress}</span>
        </p>
        <img
          src={`https://gateway.pinata.cloud/ipfs/${winner.ipfsHash}`}
          alt={`${winner.title}`}
          className="winner-panel-img img-fluid"
        />
      </div>
      <button
        className="btn btn-danger mt-3"
        onClick={handleRemoveWinningCharity}
        disabled={isPending}
      >
        {isPending ? "Removing..." : "Remove Winning Charity"}
      </button>
    </div>
  );
};

export default WinnerPanel;
