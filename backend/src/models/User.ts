import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // hashed
});

export const User = mongoose.model("User", userSchema);
