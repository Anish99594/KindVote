import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import toast from "react-hot-toast";
import { useReadContract } from "wagmi";
import { KINDVOTE, KINDVOTEABI } from "../abi/config";

const Dashboard = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch charities using the useReadContract hook
  const { data, isLoading, isError } = useReadContract({
    address: KINDVOTE,
    abi: KINDVOTEABI,
    functionName: "getCharities",
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching charities...");
    } else if (isError) {
      toast.error("Failed to fetch charities.");
      setLoading(false);
    } else if (data) {
      const formattedData = data.map((charity) => ({
        votes: Number(charity.votes),
        title: charity.title,
        description: charity.description,
        image: `https://gateway.pinata.cloud/ipfs/${charity.ipfsHash}`,
        charityAddress: charity.charityAddress,
      }));

      setCharities(formattedData);
      setLoading(false);
      toast.success("Charities fetched successfully!");
    }
  }, [data, isLoading, isError]);

  if (loading) {
    return <div className="dashboard">Loading charities...</div>;
  }

  return (
    <div className="dashboard">
      <div className="charity-cards-container">
        {charities.length > 0 ? (
          charities.map((charity, index) => (
            <div className="charity-card" key={index}>
              <img src={charity.image} alt={charity.title} />
              <h3>{charity.title}</h3>
              <p>{charity.description}</p>
              <p>
                <strong>Address:</strong> {charity.charityAddress}
              </p>
              <button>Votes: {charity.votes}</button>
            </div>
          ))
        ) : (
          <div>No charities available.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
