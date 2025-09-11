import mongoose from "mongoose";

// Transportation Schema
export const TransportationSchema = new mongoose.Schema({
  mode: {
    type: String,
    required: true,
  },
  distanceTravelled_km: {
    type: Number,
    required: true,
    min: 0
  },
  fuelType: {
    type: String,
    required: true,
  },
  fuelConsumption_perKm: {
    type: Number,
    required: true,
    min: 0
  },
  loadCapacityUtilization_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  averageVehicleLoad_tons: {
    type: Number,
    required: true,
    min: 0
  },
  packagingType: {
    type: String,
    required: true,
  },
  materialLossDuringTransport_percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  costOfTransport_perTrip_USD: {
    type: Number,
    required: true,
    min: 0
  }
});