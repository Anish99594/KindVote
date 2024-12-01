import React from "react";
import VotePanel from "../components/VotePanel";

const Vote = ({ castVote }) => {
  return (
    <div className="container mt-3">
      <VotePanel castVote={castVote} />
    </div>
  );
};

export default Vote;
