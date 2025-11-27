import { Router } from "express";
import { AuctionItem } from "../models/AuctionItem";
import { generateDescription } from "../services/aiService";

const router = Router();

router.get("/", async (req, res) => {
  const items = await AuctionItem.find();
  res.json(items);
});

router.post("/", async (req, res) => {
  const { productName, basePrice } = req.body;
  const item = new AuctionItem({ productName, basePrice, currentBid: basePrice });
  await item.save();
  res.json(item);
});

router.post("/:id/ai-description", async (req, res) => {
  const item = await AuctionItem.findById(req.params.id);
  if (!item) return res.status(404).json({ msg: "Item not found" });
if (!item.productName) {
  return res.status(400).json({ msg: "productName is missing" });
}
  const description = await generateDescription(item.productName);
  item.description = description;
  await item.save();
  res.json(item);
});

export default router;
