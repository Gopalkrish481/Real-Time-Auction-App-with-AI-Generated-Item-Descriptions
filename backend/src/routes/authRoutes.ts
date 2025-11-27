import { Router } from "express";

const router = Router();

// Dummy login route for testing
router.post("/login", (req, res) => {
  return res.json({
    user: "demo",
    token: "dummy-jwt-token"
  });
});

export default router;
