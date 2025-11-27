// src/components/AuctionItemCard.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import socket from "../services/socket";

interface Props {
  id: string;
  productName: string;
  description: string;
  currentBid: number;
}

const AuctionItemCard: React.FC<Props> = ({ id, productName, description, currentBid }) => {
  const [bid, setBid] = useState(currentBid);
  const [input, setInput] = useState(0);

  useEffect(() => {
  if (!id) return; // guard against undefined

  const handleBidUpdated = (data: any) => {
    if (data.id === id) setBid(data.currentBid);
  };

  socket.on("bidUpdated", handleBidUpdated);

  return () => {
    socket.off("bidUpdated", handleBidUpdated);
  };
}, [id]); // add id as dependency


  const placeBid = () => {
    if (input <= bid) return alert("Bid must be higher than current");
    socket.emit("placeBid", { id, currentBid: input });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{productName}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography>Current Bid: ${bid}</Typography>
        <TextField
          type="number"
          size="small"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" size="small" onClick={placeBid}>Place Bid</Button>
      </CardContent>
    </Card>
  );
};

export default AuctionItemCard;
