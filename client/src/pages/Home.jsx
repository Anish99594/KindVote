import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to KindVote</h1>
      <p>
        Support charities by donating and voting on a decentralized platform.
      </p>
      <div className="mt-4">
        <Link to="/donate" className="btn btn-primary mx-2">
          Donate
        </Link>
        <Link to="/vote" className="btn btn-success mx-2">
          Vote
        </Link>
        <Link to="/dashboard" className="btn btn-info mx-2">
          View Charities
        </Link>
      </div>
    </div>
  );
};

export default Home;
