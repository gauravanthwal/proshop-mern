import mongoose from "mongoose";
// import { MONGO_URI } from "./config.js";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (err) {
    console.log(err.message);
  }
}

export { connectDB };
