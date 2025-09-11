import mongoose from "mongoose";
import { EnergySourceSchema, MaterialSchema, EmissionsSchema } from "./common";

// Casting Schema
export const CastingSchema = new mongoose.Schema({
  castingProcessType: {
    type: String,
    required: true,
  },
  materialInputQuantity_tons: {
    type: Number,
    required: true,
    min: 0
  },
  operatingTemperature_C: {
    type: Number,
    required: true,
    min: 0
  },
  energyConsumption_kWh_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  energySource: [EnergySourceSchema],
  moldMaterial: [MaterialSchema],
  coolingMethod: {
    type: String,
    required: true,
  },
  waterConsumption_liters_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  emissions: EmissionsSchema,
  defectRate_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  scrapRecycled_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  scrapQualityLevel: {
    type: String,
    required: true,
  },
  packagingType: {
    type: String,
    required: true,
  },
  finalProductYield_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  materialLoss_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  wasteGenerated_kg_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  operatingCost_per_ton: {
    type: Number,
    required: true,
    min: 0
  }
});