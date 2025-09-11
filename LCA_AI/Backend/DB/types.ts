// TypeScript interfaces for LCA Project data structures with reference-based approach

export interface EnergySource {
  type: "Coal" | "Natural Gas" | "Renewable" | "Electricity" | "Nuclear" | "Hydroelectric" | "Solar" | "Wind";
  percent: number;
}

export interface Chemical {
  name: string;
  amount_kg: number;
}

export interface Material {
  type: string;
  amount_kg: number;
}

export interface Extraction {
  _id?: string;
  metal: "Aluminium" | "Copper" | "Iron" | "Steel" | "Zinc" | "Lead" | "Nickel" | "Tin";
  materialGrade: string;
  sourceType: "Virgin" | "Recycled" | "Mixed";
  region: string;
  method: "Open-pit Mining" | "Underground Mining" | "Placer Mining" | "Solution Mining";
  energySource: EnergySource[];
  totalEnergyConsumption_kWh_perTon: number;
  waterUsage_L_perTon: number;
  wasteGenerated_kg_perTon: number;
  costOfExtraction_USD_perTon: number;
}

export interface Transportation {
  _id?: string;
  mode: "Truck" | "Ship" | "Rail" | "Pipeline" | "Air";
  distanceTravelled_km: number;
  fuelType: "Diesel" | "Gasoline" | "Electric" | "Hydrogen" | "Biofuel" | "Natural Gas";
  fuelConsumption_perKm: number;
  loadCapacityUtilization_percent: number;
  averageVehicleLoad_tons: number;
  packagingType: "Bulk" | "Containerized" | "Palletized" | "Bagged";
  materialLossDuringTransport_percent: number;
  costOfTransport_perTrip_USD: number;
}

export interface Refining {
  _id?: string;
  refiningType: "Electrolysis" | "Chemical" | "Thermal" | "Solvent Extraction" | "Electrowinning";
  materialInput_tons: number;
  outputEfficiency_percent: number;
  energyConsumption_kWh_perTon: number;
  energySource: EnergySource[];
  waterConsumption_L_perTon: number;
  chemicalsUsed_kg_perTon: Chemical[];
  wasteSlagGenerated_kg_perTon: number;
  materialLostAsImpurity_percent: number;
  recyclingContent_percent: number;
  recyclingOutputQuality: "Closed-loop" | "Open-loop" | "Downcycled" | "None";
  operatingCost_USD_perTon: number;
}

export interface Smelting {
  _id?: string;
  smeltingTech: "Hall-Héroult" | "Blast Furnace" | "Electric Arc Furnace" | "Induction Furnace" | "Reverberatory Furnace";
  materialInput_tons_perBatch: number;
  operatingTemp_C: number;
  energyConsumption_kWh_perTon: number;
  energySource: EnergySource[];
  fluxMaterials_kg_perTon: Material[];
  slagGenerated_kg_perTon: number;
  outputEfficiency_percent: number;
  recycledScrapInput_tons_perTon: number;
  recyclingQuality: "Closed-loop" | "Open-loop" | "Downcycled" | "None";
  waterConsumption_L_perTon: number;
  operatingCost_USD_perTon: number;
  notes?: string;
}

export interface Emissions {
  CO2_kg_per_ton: number;
  NOx_kg_per_ton: number;
  SOx_kg_per_ton: number;
}

export interface Casting {
  _id?: string;
  castingProcessType: "Die Casting" | "Sand Casting" | "Investment Casting" | "Continuous Casting" | "Centrifugal Casting";
  materialInputQuantity_tons: number;
  operatingTemperature_C: number;
  energyConsumption_kWh_per_ton: number;
  energySource: EnergySource[];
  moldMaterial: Material[];
  coolingMethod: "Water Cooled" | "Air Cooled" | "Oil Cooled" | "Sand Cooled";
  waterConsumption_liters_per_ton: number;
  emissions: Emissions;
  defectRate_percent: number;
  scrapRecycled_percent: number;
  scrapQualityLevel: "Closed Loop" | "Open Loop" | "Downcycled" | "None";
  packagingType: "Bulk" | "Containerized" | "Palletized" | "Bagged";
  finalProductYield_percent: number;
  materialLoss_percent: number;
  wasteGenerated_kg_per_ton: number;
  operatingCost_per_ton: number;
}

export interface RecyclingTransportation {
  mode: "Truck" | "Ship" | "Rail" | "Pipeline" | "Air";
  distance_km: number;
  fuelType: "Diesel" | "Gasoline" | "Electric" | "Hydrogen" | "Biofuel" | "Natural Gas";
  fuelConsumption_liters_per_km: number;
  materialLossDuringTransport_percent: number;
  costPerTrip: number;
}

export interface Recycling {
  _id?: string;
  recyclingProcessType: "Secondary Smelting" | "Mechanical Recycling" | "Chemical Recycling" | "Pyrometallurgical" | "Hydrometallurgical";
  inputMaterialType: {
    type: "Post-Consumer Scrap" | "Industrial Scrap" | "Construction Scrap" | "Automotive Scrap";
    percent: number;
  }[];
  inputQuantity_tons: number;
  sortingMethod: "Magnetic Separation" | "Density Separation" | "Optical Sorting" | "Manual Sorting" | "Eddy Current";
  cleaningProcess: "Chemical Cleaning" | "Mechanical Cleaning" | "Thermal Cleaning" | "Ultrasonic Cleaning";
  energyConsumption_kWh_per_ton: number;
  energySource: EnergySource[];
  waterConsumption_liters_per_ton: number;
  chemicalUsed_kg_per_ton: {
    name: string;
    amount: number;
  }[];
  materialRecoveryRate_percent: number;
  materialLoss_percent: number;
  outputQualityLevel: "Closed Loop" | "Open Loop" | "Downcycled" | "None";
  finalOutput_tons: number;
  emissions: Emissions;
  slagGenerated_kg_per_ton: number;
  hazardousWaste_kg_per_ton: number;
  packagingType: "Bulk" | "Containerized" | "Palletized" | "Bagged";
  costOfRecycling_per_ton: number;
  transportationForRecycling: RecyclingTransportation;
}

export interface UsagePhase {
  processId?: string;
  description?: string;
  usageDuration_years?: number;
  maintenanceFrequency_years?: number;
  energyConsumption_kWh_per_year?: number;
  maintenanceCost_USD_per_year?: number;
}

export interface EndOfLife {
  processId?: string;
  description?: string;
  disposalMethod?: "Recycling" | "Landfill" | "Incineration" | "Reuse" | "Composting";
  disposalCost_USD_per_ton?: number;
  environmentalImpact?: string;
}

// Reference-based process data interfaces
export interface ProcessReference {
  processId?: string; // ObjectId reference
  description?: string;
}

// Updated Inventory Data interface for reference-based approach
export interface InventoryData {
  extraction?: ProcessReference;
  transportToRefinery?: ProcessReference;
  refining?: ProcessReference;
  smelting?: ProcessReference;
  transportToFactory?: ProcessReference;
  casting?: ProcessReference;
  transportToConsumer?: ProcessReference;
  usagePhase?: UsagePhase;
  recycling?: ProcessReference;
  endOfLife?: EndOfLife;
}

export interface EnvironmentalImpact {
  resultId?: string;
  description?: string;
  globalWarmingPotential_kg_CO2_eq?: number;
  acidificationPotential_kg_SO2_eq?: number;
  eutrophicationPotential_kg_PO4_eq?: number;
  ozoneDepletionPotential_kg_CFC11_eq?: number;
  cumulativeEnergyDemand_MJ?: number;
  waterFootprint_L?: number;
  landUse_m2?: number;
}

export interface CircularityMetrics {
  resultId?: string;
  description?: string;
  recycledContent_percent?: number;
  recyclability_percent?: number;
  materialRecoveryRate_percent?: number;
  circularityIndicator?: number;
  wasteGeneration_kg_per_ton?: number;
}

export interface GeneratedReport {
  fileId?: string;
  fileType?: "pdf" | "docx" | "html" | "json";
  description?: string;
  filePath?: string;
  generatedAt?: Date;
}

export interface Results {
  environmentalImpact?: EnvironmentalImpact;
  circularityMetrics?: CircularityMetrics;
  generatedReport?: GeneratedReport;
}

export interface ProjectMeta {
  createdBy: string; // ObjectId as string
  createdAt?: Date;
  lastUpdated?: Date;
  status?: "Draft" | "In Progress" | "Completed" | "Archived";
  version?: number;
}

export interface LCAProject {
  _id?: string;
  projectName: string;
  metalType: "Aluminium" | "Copper" | "Iron" | "Steel" | "Zinc" | "Lead" | "Nickel" | "Tin";
  goal: string;
  systemBoundary: "Cradle-to-Gate" | "Cradle-to-Grave" | "Gate-to-Gate" | "Cradle-to-Cradle";
  functionalUnit?: string;
  inventoryData?: InventoryData;
  results?: Results;
  meta: ProjectMeta;
}

// Populated interfaces for when you fetch with references populated
export interface PopulatedInventoryData {
  extraction?: ProcessReference & { data?: Extraction };
  transportToRefinery?: ProcessReference & { data?: Transportation };
  refining?: ProcessReference & { data?: Refining };
  smelting?: ProcessReference & { data?: Smelting };
  transportToFactory?: ProcessReference & { data?: Transportation };
  casting?: ProcessReference & { data?: Casting };
  transportToConsumer?: ProcessReference & { data?: Transportation };
  usagePhase?: UsagePhase;
  recycling?: ProcessReference & { data?: Recycling };
  endOfLife?: EndOfLife;
}

export interface PopulatedLCAProject extends Omit<LCAProject, 'inventoryData'> {
  inventoryData?: PopulatedInventoryData;
}

// Utility types
export type MetalType = LCAProject["metalType"];
export type SystemBoundary = LCAProject["systemBoundary"];
export type ProjectStatus = ProjectMeta["status"];
export type EnergyType = EnergySource["type"];
export type TransportMode = Transportation["mode"];
export type RecyclingQuality = "Closed-loop" | "Open-loop" | "Downcycled" | "None" | "Closed Loop" | "Open Loop";

// Form data types for frontend (with optional _id for editing)
export interface ExtractionFormData extends Partial<Extraction> {}
export interface TransportationFormData extends Partial<Transportation> {}
export interface RefiningFormData extends Partial<Refining> {}
export interface SmeltingFormData extends Partial<Smelting> {}
export interface CastingFormData extends Partial<Casting> {}
export interface RecyclingFormData extends Partial<Recycling> {}
export interface UsagePhaseFormData extends Partial<UsagePhase> {}
export interface EndOfLifeFormData extends Partial<EndOfLife> {}

// API Response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Database operation types for the new reference-based approach
export interface CreateProjectData extends Omit<LCAProject, "_id" | "meta"> {
  meta: Omit<ProjectMeta, "createdAt" | "lastUpdated" | "version">;
}

export interface UpdateProjectData extends Partial<Omit<LCAProject, "_id" | "meta">> {
  meta?: Partial<Omit<ProjectMeta, "createdBy">>;
}

// Process creation interfaces
export interface CreateExtractionData extends Omit<Extraction, "_id"> {}
export interface CreateTransportationData extends Omit<Transportation, "_id"> {}
export interface CreateRefiningData extends Omit<Refining, "_id"> {}
export interface CreateSmeltingData extends Omit<Smelting, "_id"> {}
export interface CreateCastingData extends Omit<Casting, "_id"> {}
export interface CreateRecyclingData extends Omit<Recycling, "_id"> {}
