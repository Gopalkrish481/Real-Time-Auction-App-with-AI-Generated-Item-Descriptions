// src/pages/CreateAuctionPage.tsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { api } from "../services/api";

const CreateAuctionPage = () => {
  const [productName, setProductName] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [description, setDescription] = useState("");
  const [auctionId, setAuctionId] = useState<string | null>(null);

  const handleCreate = async () => {
    const body = {
      productName,
      basePrice,
    };

    const res = await api.post("/auctions", body);
    setAuctionId(res.data._id);
    alert("Auction created!");
  };

  const handleGenerateDescription = async () => {
    if (!auctionId) return alert("Create an auction first");

    const res = await api.post(`/auctions/${auctionId}/ai-description`);
    setDescription(res.data.description);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Create Auction</Typography>

      <TextField
        label="Product Name"
        fullWidth
        sx={{ mb: 2 }}
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <TextField
        label="Base Price"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={basePrice}
        onChange={(e) => setBasePrice(Number(e.target.value))}
      />

      <div>
        <Button variant="contained" onClick={handleCreate} sx={{ mr: 2 }}>
          Create
        </Button>
        <Button variant="outlined" onClick={handleGenerateDescription}>
          Generate AI Description
        </Button>
      </div>

      {description && <Typography sx={{ mt: 2 }}>{description}</Typography>}
    </Container>
  );
};

export default CreateAuctionPage;
