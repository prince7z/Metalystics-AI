import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
// MongoDB connection
const MDB_URI = process.env.MDB_URI;

if (!MDB_URI) {
  throw new Error("Please define the MDB_URI environment variable inside .env");
}

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(MDB_URI);
    console.log("MongoDB connected successfully ");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    
  }
};

// Export the model and schemas from the modular schema files
export { LCAProject } from "./schemas/project";
export * from "./schemas/index";

