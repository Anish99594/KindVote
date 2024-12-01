import React, { useState } from "react";
import { pinata } from "../utils/config"; // Adjust the import path based on your folder structure
import toast from "react-hot-toast";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi"; // Import the required wagmi functions
import { formatUnits, parseEther } from "ethers";
import "../styles/Addcharity.css";

import { KINDVOTE, KINDVOTEABI } from "../abi/config";

const AddCharityForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [charityAddress, setCharityAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { writeContractAsync, isPending } = useWriteContract();
  const CONTRACT_ADDRESS = KINDVOTE;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const uploadToPinata = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return null;
    }

    try {
      setLoading(true);
      const upload = await pinata.upload.file(selectedFile);
      const url = await pinata.gateways.convert(upload.IpfsHash);
      setIpfsUrl(url);
      return upload.IpfsHash; // Returns the IPFS hash
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      toast.error("Failed to upload to IPFS.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ipfsHash = await uploadToPinata();
    if (!ipfsHash) {
      toast.error("Failed to upload image to IPFS.");
      return;
    }

    console.log("Submit button clicked");
    console.log("Charity Title:", title);
    console.log("Description:", description);
    console.log("IPFS Hash:", ipfsHash);
    console.log("Charity Address:", charityAddress);

    try {
      await toast.promise(
        (async () => {
          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: KINDVOTEABI,
            functionName: "addCharity", // Replace with your smart contract function name
            args: [charityAddress, description, ipfsHash, title],
          });
          console.log("Transaction Hash:", hash);
        })(),
        {
          loading: "Submitting data to blockchain...",
          success: "Charity added successfully!",
          error: "Failed to add charity.",
        }
      );
    } catch (err) {
      console.error("Blockchain submission error:", err.message);
      toast.error(err.message || "Failed to add charity.");
    }

    // Reset form
    setTitle("");
    setDescription("");
    setCharityAddress("");
    setSelectedFile(null);
    setIpfsUrl(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-charity-form">
      <h3>Add a New Charity</h3>
      <div className="form-group">
        <label>Charity Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Upload Charity Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {ipfsUrl && (
        <div>
          <p>File Uploaded to IPFS:</p>
          <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
            {ipfsUrl}
          </a>
        </div>
      )}
      <div className="form-group">
        <label>Charity Wallet Address:</label>
        <input
          type="text"
          value={charityAddress}
          onChange={(e) => setCharityAddress(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Add Charity"}
      </button>
    </form>
  );
};

export default AddCharityForm;
