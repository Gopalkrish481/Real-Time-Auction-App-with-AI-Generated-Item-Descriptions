// src/pages/CreateAuctionPage.tsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { api } from "../services/api";

const CreateAuctionPage = () => {
  const [productName, setProductName] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [auctionId, setAuctionId] = useState<string | null>(null);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("basePrice", basePrice.toString());
    if (image) formData.append("image", image);

    const res = await api.post("/auctions", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
        style={{ marginBottom: "16px" }}
      />
      <div>
        <Button variant="contained" onClick={handleCreate} sx={{ mr: 2 }}>Create</Button>
        <Button variant="outlined" onClick={handleGenerateDescription}>Generate AI Description</Button>
      </div>
      {description && <Typography sx={{ mt: 2 }}>{description}</Typography>}
    </Container>
  );
};

export default CreateAuctionPage;
