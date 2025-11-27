// src/pages/AuctionListPage.tsx
import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { api } from "../services/api";
import AuctionItemCard from "../components/AuctionItemCard";

interface AuctionItem {
  _id: string;
  productName: string;
  description: string;
  currentBid: number;
}

const AuctionListPage = () => {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);

  const fetchAuctions = async () => {
    const res = await api.get("/auctions");
    setAuctions(res.data);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Live Auctions</Typography>
      {auctions.map((a) => (
        <AuctionItemCard
          key={a._id}
          id={a._id} // map _id to id
          productName={a.productName}
          description={a.description}
          currentBid={a.currentBid}
        />
      ))}
    </Container>
  );
};

export default AuctionListPage;
