import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import Vote from "./pages/Vote";
import Admin from "./pages/Admin";
import { ethers } from "ethers";
import "./App.css";
import WinnerPanel from "./components/WinnerPanel";
import AddCharityForm from "./components/AddCharityForm";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Add your smart contract connection logic here (e.g., load contract instance)

  return (
    <Router>
      <Header connectWallet={connectWallet} walletAddress={walletAddress} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/winnerpanel" element={<WinnerPanel />} />
        <Route path="/addcharity" element={<AddCharityForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
