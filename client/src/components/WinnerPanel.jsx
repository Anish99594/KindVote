import React from "react";
import "../styles/winnerPanel.css";

const WinnerPanel = () => {
  // Dummy data for winner
  const winner = {
    title: "Feed the Children",
    description: "Helping children around the world with food and basic needs.",
    votes: 1500,
    charityAddress: "0x1234567890abcdef1234567890abcdef12345678",
    ipfsHash: "QmXg7SbGTa7nvJd9qW5oJ7eP6zH2KMqHruyMqeMvRA3xQp",
  };

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
        src={`https://ipfs.io/ipfs/${winner.ipfsHash}`}
        alt="Winning Charity"
        className="winner-panel-img img-fluid"
      />
    </div>
  );
};

export default WinnerPanel;
