import React, { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { KINDVOTE, KINDVOTEABI } from "../abi/config";
import toast from "react-hot-toast";
import { parseEther, parseUnits } from "ethers";
import "../styles/Donate.css";

const DonationForm = () => {
  const [amount, setAmount] = useState("");

  const { writeContractAsync, isPending } = useWriteContract();

  const { address, signer } = useAccount(); // Get the address and signer directly from useAccount
  const CONTRACT_ADDRESS = KINDVOTE;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    try {
      await toast.promise(
        (async () => {
          const amountXFI = parseUnits(amount.toString(), 18);
          // Prepare contract call
          console.log("Amount", amountXFI);

          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: KINDVOTEABI,
            functionName: "donate",
            args: [],
            value: amountXFI,
          });
        })(),
        {
          loading: `Approving token ...`, // Loading state message
          success: (hash) => `Approval successful! Transaction Hash:`, // Success state message with the hash
          // error: (error) => `Approval failed: ${error.message}`, // Error state message
        }
      );
    } catch (err) {
      // console.log("error message" , err.message);
      toast.error(err.message);
    }
  };
  return (
    <div className="form-container">
      <h2 className="text-sm font-semibold text-gray-500 underline">
        1 XFI = 10 GT(Governance Tokens)
      </h2>
      <h2 className="text-sm font-semibold text-gray-500 underline">
        Donate Funds
      </h2>
      <form>
        <label>Amount to Donate (in XFI):</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!amount || amount <= 0}
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
