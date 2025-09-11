import mongoose from "mongoose";


// Inventory Data Schema
export const InventoryDataSchema = new mongoose.Schema({
  extraction: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Extraction"},
    description: String,
   
  },
  transportToRefinery: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Transportation"},
    description: String,
   
  },
  refining: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Refining"},
    description: String,
  
  },
  smelting: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Smelting"},
    description: String,
   
  },
  transportToFactory: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Transportation"},
    description: String,
    
  },
  casting: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Casting"},
    description: String,
   
  },
  transportToConsumer: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Transportation"},
    description: String,
  },
  usagePhase: {
    processId: String,
    description: String,
    usageDuration_years: Number,
    maintenanceFrequency_years: Number,
    energyConsumption_kWh_per_year: Number,
    maintenanceCost_USD_per_year: Number
  },
  recycling: {
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "Recycling"},
    description: String,
    
  },
  endOfLife: {
    description: String,
    disposalMethod: {
      type: String,
      enum: ["Recycling", "Landfill", "Incineration", "Reuse", "Composting"]
    },
    disposalCost_USD_per_ton: Number,
    
  }
});

export const InventoryData = mongoose.model("InventoryData", InventoryDataSchema);