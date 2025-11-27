// src/pages/LoginPage.tsx
import React from "react";
import { Container, TextField, Button, Typography } from "@mui/material";

const LoginPage = () => {
  const handleLogin = () => {
    localStorage.setItem("token", "dummy-jwt-token"); // dummy auth
    window.location.href = "/auctions";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField label="Username" fullWidth sx={{ mb: 2 }} />
      <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleLogin} fullWidth>Login</Button>
    </Container>
  );
};

export default LoginPage;
