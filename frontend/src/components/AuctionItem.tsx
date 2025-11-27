import React, { useState } from "react";
import { api } from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

interface Props {
  id: string;
  productName: string;
  description: string;
  currentBid: number;
}

const AuctionItem: React.FC<Props> = ({ id, productName, description, currentBid }) => {
  const [bid, setBid] = useState(currentBid);
  const [input, setInput] = useState(0);

  socket.on("bidUpdated", (data: any) => {
    if (data.id === id) setBid(data.currentBid);
  });

  const placeBid = async () => {
    if (input <= bid) return alert("Bid must be higher than current");
    socket.emit("placeBid", { id, currentBid: input });
    setBid(input);
  };

  return (
    <div>
      <h3>{productName}</h3>
      <p>{description}</p>
      <p>Current Bid: ${bid}</p>
      <input type="number" value={input} onChange={(e) => setInput(Number(e.target.value))} />
      <button onClick={placeBid}>Place Bid</button>
    </div>
  );
};

export default AuctionItem;
