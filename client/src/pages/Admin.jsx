import React from "react";

const Admin = ({ resetVoting, withdrawFunds }) => {
  return (
    <div className="container mt-4">
      <div className="mt-3">
        <button className="btn btn-warning mr-3" onClick={resetVoting}>
          Reset Voting
        </button>
        <button className="btn btn-danger" onClick={withdrawFunds}>
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default Admin;
