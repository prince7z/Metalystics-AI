import mongoose from "mongoose";
import { EnergySourceSchema } from "./common";

// Extraction Schema
export const ExtractionSchema = new mongoose.Schema({
  metal: {
    type: String,
    required: true,
  },
  materialGrade: {
    type: String,
    required: true
  },
  sourceType: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true,
    enum: ["Open-pit Mining", "Underground Mining", "Placer Mining", "Solution Mining"]
  },
  energySource: [EnergySourceSchema],
  totalEnergyConsumption_kWh_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  waterUsage_L_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  wasteGenerated_kg_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  costOfExtraction_USD_perTon: {
    type: Number,
    required: true,
    min: 0
  }
});