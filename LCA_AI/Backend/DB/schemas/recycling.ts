import mongoose from "mongoose";
import { EnergySourceSchema, EmissionsSchema } from "./common";

// Recycling Schema
export const RecyclingSchema = new mongoose.Schema({
  recyclingProcessType: {
    type: String,
    required: true,
  },
  inputMaterialType: [{
    type: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  }],
  inputQuantity_tons: {
    type: Number,
    required: true,
    min: 0
  },
  sortingMethod: {
    type: String,
    required: true,
  },
  cleaningProcess: {
    type: String,
    required: true,
  },
  energyConsumption_kWh_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  energySource: [EnergySourceSchema],
  waterConsumption_liters_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  chemicalUsed_kg_per_ton: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  materialRecoveryRate_percent: {
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
  outputQualityLevel: {
    type: String,
    required: true,
  },
  finalOutput_tons: {
    type: Number,
    required: true,
    min: 0
  },
  emissions: EmissionsSchema,
  slagGenerated_kg_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  hazardousWaste_kg_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  packagingType: {
    type: String,
    required: true,
  },
  costOfRecycling_per_ton: {
    type: Number,
    required: true,
    min: 0
  },
  transportationForRecycling: {
    mode: {
      type: String,
      required: true,
    },
    distance_km: {
      type: Number,
      required: true,
      min: 0
    },
    fuelType: {
      type: String,
      required: true,
    },
    fuelConsumption_liters_per_km: {
      type: Number,
      required: true,
      min: 0
    },
    materialLossDuringTransport_percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    costPerTrip: {
      type: Number,
      required: true,
      min: 0
    }
  }
});