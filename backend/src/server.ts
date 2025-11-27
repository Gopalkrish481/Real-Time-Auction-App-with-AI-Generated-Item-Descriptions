import mongoose from "mongoose";
import app from "./app";
import { setupSocket } from "./services/socket";

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auction");

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

setupSocket(server);
