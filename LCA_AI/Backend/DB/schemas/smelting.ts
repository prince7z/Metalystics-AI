import mongoose from "mongoose";
import { EnergySourceSchema, MaterialSchema } from "./common";

// Smelting Schema
export const SmeltingSchema = new mongoose.Schema({
  smeltingTech: {
    type: String,
    required: true,
  },
  materialInput_tons_perBatch: {
    type: Number,
    required: true,
    min: 0
  },
  operatingTemp_C: {
    type: Number,
    required: true,
    min: 0
  },
  energyConsumption_kWh_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  energySource: [EnergySourceSchema],
  fluxMaterials_kg_perTon: [MaterialSchema],
  slagGenerated_kg_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  outputEfficiency_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  recycledScrapInput_tons_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  recyclingQuality: {
    type: String,
    required: true,
    enum: ["Closed-loop", "Open-loop", "Downcycled", "None"]
  },
  waterConsumption_L_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  operatingCost_USD_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  notes: String
});