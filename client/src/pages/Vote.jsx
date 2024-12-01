import React from "react";
import VotePanel from "../components/VotePanel";

const Vote = ({ castVote }) => {
  return (
    <div className="container mt-3">
      <h2>Cast Your Vote</h2>
      <VotePanel castVote={castVote} />
    </div>
  );
};

export default Vote;
