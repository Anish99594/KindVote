import React from "react";
import { useWriteContract } from "wagmi";
import { KINDVOTE, KINDVOTEABI } from "../abi/config";
import toast from "react-hot-toast";

const Admin = () => {
  // Write contract hook for the resetVoting function
  const { writeContractAsync } = useWriteContract();

  // Function to call resetVoting
  const handleResetVoting = async () => {
    try {
      await toast.promise(
        (async () => {
          const { hash } = await writeContractAsync({
            address: KINDVOTE,
            abi: KINDVOTEABI,
            functionName: "resetVoting",
            args: [], // No arguments required
          });

          console.log("Transaction Hash:", hash);
        })(),
        {
          loading: "Resetting voting...",
          success: "Voting has been reset successfully!",
          error: "Failed to reset voting.",
        }
      );
    } catch (error) {
      console.error(error);

      // Extract and display the specific error message
      if (error?.reason === "Voting period not over") {
        toast.error("Voting period is not over yet. Please try later.");
      } else {
        toast.error(
          error.message || "An error occurred while resetting voting."
        );
      }
    }
  };

  return (
    <div className="container mt-4 admin-panel">
      <div className="button-group mt-3">
        <button className="btn btn-warning" onClick={handleResetVoting}>
          Reset Voting
        </button>
      </div>
    </div>
  );
};

export default Admin;
