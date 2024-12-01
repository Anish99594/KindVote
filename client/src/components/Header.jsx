import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = ({ connectWallet, walletAddress }) => {
  return (
    <header>
      <div className="container d-flex justify-content-between align-items-center">
        <h1>KindVote</h1>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/donate" className="nav-link">
            Donate
          </Link>
          <Link to="/vote" className="nav-link">
            Vote
          </Link>
          <Link to="/admin" className="nav-link">
            ResetVoting
          </Link>
          <Link to="/winnerpanel" className="nav-link">
            Winner
          </Link>
          <Link to="/addcharity" className="nav-link">
            CreateCharity
          </Link>
        </nav>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
