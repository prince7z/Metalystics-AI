import mongoose from "mongoose";

// MongoDB connection
const MDB_URI = "mongodb://localhost:27017/Matalstics";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(MDB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    
  }
};

// Export the model and schemas from the modular schema files
export { LCAProject } from "./schemas/project";
export * from "./schemas/index";

