import React from "react";
import "../styles/Dashboard.css";

const charityData = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Provide clean drinking water to remote areas.",
    image: "https://via.placeholder.com/300x150",
    votes: 32,
  },
  {
    id: 2,
    title: "Education for All",
    description: "Support underprivileged children with quality education.",
    image: "https://via.placeholder.com/300x150",
    votes: 332,
  },
  {
    id: 3,
    title: "Save the Environment",
    description: "Plant trees and preserve biodiversity.",
    image: "https://via.placeholder.com/300x150",
    votes: 432,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="charity-cards-container">
        {charityData.map((charity) => (
          <div className="charity-card" key={charity.id}>
            <img src={charity.image} alt={charity.title} />
            <h3>{charity.title}</h3>
            <p>{charity.description}</p>
            <button>Votes: {charity.votes}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
