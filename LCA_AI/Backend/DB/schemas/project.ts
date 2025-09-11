import mongoose from "mongoose";
import { InventoryDataSchema } from "./inventory";
import { ResultsSchema } from "./results";

// Main LCA Project Schema
export const LCAProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  metalType: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
    trim: true
  },
  systemBoundary: {
    type: String,
    required: true,
   },
  functionalUnit: {
    type: String,
    default: "1 tonne",
    trim: true
  },
  inventoryData: InventoryDataSchema,
  results: {
      resultId: {type: mongoose.Schema.Types.ObjectId, ref: "Results" },
      description: String,
     
    },
  meta: {
    createdBy: {name: String   },
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["Draft", "In Progress", "Completed", "Archived"],
      default: "Draft"
    },
    version: {
      type: Number,
      default: 1
    }
  }
}, {
  timestamps: true
});

// Create the model
export const LCAProject = mongoose.model("LCAProject", LCAProjectSchema);
