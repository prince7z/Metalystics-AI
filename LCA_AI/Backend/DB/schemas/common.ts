import mongoose from "mongoose";

// Energy Source Schema
export const EnergySourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Coal", "Natural Gas", "Renewable", "Electricity", "Nuclear", "Hydroelectric", "Solar", "Wind"]
  },
  percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

// Chemical Schema
export const ChemicalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount_kg: {
    type: Number,
    required: true,
    min: 0
  }
});

// Material Schema
export const MaterialSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  amount_kg: {
    type: Number,
    required: true,
    min: 0
  }
});

// Emissions Schema
export const EmissionsSchema = new mongoose.Schema({
  CO2_kg_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  NOx_kg_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  SOx_kg_per_ton: {
    type: Number,
    required: true,
    min: 0
  }
});
