import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  timestamp: Date,
});

const auctionSchema = new mongoose.Schema({
  productName: String,
  image: String,
  basePrice: Number,
  currentBid: { type: Number, default: 0 },
  description: String,
  bids: [bidSchema],
  createdAt: { type: Date, default: Date.now },
});

export const AuctionItem = mongoose.model("AuctionItem", auctionSchema);
