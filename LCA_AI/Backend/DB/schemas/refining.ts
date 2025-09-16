import mongoose from "mongoose";
import { EnergySourceSchema, ChemicalSchema } from "./common";

// Refining Schema
export const RefiningSchema = new mongoose.Schema({
  refiningType: {
    type: String,
    required: true,
    
  },
  materialInput_tons: {
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
  energyConsumption_kWh_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  energySource: [EnergySourceSchema],
  waterConsumption_L_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  chemicalsUsed_kg_perTon: [ChemicalSchema],
  wasteSlagGenerated_kg_perTon: {
    type: Number,
    required: true,
    min: 0
  },
  materialLostAsImpurity_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  recyclingContent_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  recyclingOutputQuality: {
    type: String,
    required: true,
    enum: ["Closed-loop", "Open-loop", "Downcycled", "None"]
  },
  operatingCost_USD_perTon: {
    type: Number,
    required: true,
    min: 0
  }
});