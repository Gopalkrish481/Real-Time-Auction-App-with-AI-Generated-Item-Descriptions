// src/pages/LoginPage.tsx
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setSubmitted(true);

    if (!username || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Dummy login
    localStorage.setItem("token", "dummy-jwt-token");
    window.location.href = "/auctions";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #ffffff, #f6f9fc)",
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Welcome Back 👋
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={submitted && !username}
          helperText={submitted && !username ? "Username is required" : ""}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={submitted && !password}
          helperText={submitted && !password ? "Password is required" : ""}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            py: 1.3,
            borderRadius: 3,
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          }}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
