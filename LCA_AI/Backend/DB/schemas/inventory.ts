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
    processId: {type: mongoose.Schema.Types.ObjectId, ref: "EndOfLife"},
    description: String,   
    
  }


  
});




export const InventoryData = mongoose.model("InventoryData", InventoryDataSchema);