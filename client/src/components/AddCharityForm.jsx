import React, { useState } from "react";
import { create } from "ipfs-http-client";
import "../styles/Addcharity.css";

// Initialize IPFS client (using Pinata or Infura)
const ipfsClient = create({
  url: "https://mainnet.infura.io/v3/3ae649d328e8405fb461d9cac9b0705b",
});

const AddCharityForm = ({ addCharity }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [charityAddress, setCharityAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image change (file upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Upload image to IPFS
  const uploadToIPFS = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const added = await ipfsClient.add(image);
      return `https://ipfs.infura.io/ipfs/${added.path}`; // IPFS URL
    } catch (err) {
      console.error("Error uploading to IPFS:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Upload image to IPFS
    const ipfsHash = await uploadToIPFS();
    if (!ipfsHash) {
      alert("Error uploading image to IPFS");
      setLoading(false);
      return;
    }

    // Call the addCharity function with the IPFS hash
    addCharity(title, description, ipfsHash, charityAddress);

    // Reset form
    setTitle("");
    setDescription("");
    setCharityAddress("");
    setImage(null);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-charity-form">
      <h3>Add a New Charity</h3>
      <div className="form-group">
        <label>Charity Title:</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Upload Image (will be stored on IPFS):</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Charity Address (Wallet):</label>
        <input
          type="text"
          className="form-control"
          value={charityAddress}
          onChange={(e) => setCharityAddress(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
        {loading ? "Uploading..." : "Add Charity"}
      </button>
    </form>
  );
};

export default AddCharityForm;
