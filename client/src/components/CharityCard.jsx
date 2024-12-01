import React from "react";

const CharityCard = ({ charity, onVote }) => {
  return (
    <div className="charity-card">
      <h3>{charity.title}</h3>
      <p>{charity.description}</p>
      <p>Votes: {charity.votes}</p>
    </div>
  );
};

export default CharityCard;
