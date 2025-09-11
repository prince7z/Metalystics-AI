import mongoose from "mongoose";
import { 
  ExtractionSchema, 
  TransportationSchema, 
  RefiningSchema, 
  SmeltingSchema, 
  CastingSchema, 
  RecyclingSchema 
} from "./schemas";

// Create all models in one centralized file
export const Extraction = mongoose.model("Extraction", ExtractionSchema);
export const Transportation = mongoose.model("Transportation", TransportationSchema);
export const Refining = mongoose.model("Refining", RefiningSchema);
export const Smelting = mongoose.model("Smelting", SmeltingSchema);
export const Casting = mongoose.model("Casting", CastingSchema);
export const Recycling = mongoose.model("Recycling", RecyclingSchema);

// Export the LCAProject model as well
export { LCAProject } from "./schemas/project";
