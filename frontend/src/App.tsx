import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import AuctionListPage from "./pages/AuctionListPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create" element={<CreateAuctionPage />} />
        <Route path="/auctions" element={<AuctionListPage />} />
      </Routes>
    </Router>
  );
}
