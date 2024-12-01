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

  // Fetch and set winner details
  useEffect(() => {
    if (
      data &&
      data.title &&
      data.votes &&
      data.charityAddress &&
      data.ipfsHash
    ) {
      setWinner({
        title: data.title,
        description: data.description || "No description provided.",
        votes: data.votes.toString(),
        charityAddress: data.charityAddress,
        ipfsHash: data.ipfsHash,
      });
    }
  }, [data]);

  // Handle Remove Winning Charity
  const handleRemoveWinningCharity = async () => {
    try {
      await toast.promise(writeContractAsync(), {
        loading: "Removing winning charity...",
        success: "Winning charity removed successfully!",
        error: "Failed to remove the winning charity.",
      });
      setWinner(null); // Clear local winner data after successful removal
    } catch (err) {
      console.error(err.message);
    }
  };

  if (isLoading) {
    return <p>Loading winning charity details...</p>;
  }

  if (isError || !winner) {
    return <p>No winner details available at the moment.</p>;
  }

  return (
    <div className="winner-panel mt-4 p-3 bg-light border rounded shadow-lg">
      <h3 className="winner-panel-title">Winning Charity</h3>
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
        <strong>Address:</strong> {winner.charityAddress}
      </p>
      <img
        src={`https://gateway.pinata.cloud/ipfs/${charity.ipfsHash}`}
        alt="Winning Charity"
        className="winner-panel-img img-fluid"
      />
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
