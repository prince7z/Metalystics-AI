import express from "express";
import { LCAProject } from "../../DB/schemas/project";
import { Results } from "../../DB/schemas/results";
import { 
  Extraction, 
  Transportation, 
  Refining, 
  Smelting, 
  Casting, 
  Recycling, 
  EndOfLife
} from '../../DB/models';
import e from "express";

const router = express.Router();

// Helper function to validate and transform energySource
const validateEnergySource = (energySource: any) => {
    if (typeof energySource === 'string') {
        // Convert string to array format
        const energyMap: Record<string, string> = {
            'electricity': 'Electricity',
            'natural_gas': 'Natural Gas',
            'coal': 'Coal',
            'oil': 'Oil',
            'renewable': 'Renewable',
            'mixed': 'Mixed'
        };
        const mappedType = energyMap[energySource.toLowerCase()] || 'Electricity';
        return [{ type: mappedType, percent: 100 }];
    } else if (Array.isArray(energySource) && energySource.length > 0) {
        return energySource;
    } else {
        return [{ type: 'Electricity', percent: 100 }];
    }
};

// Helper function to validate and transform chemicals array
const validateChemicals = (chemicals: any) => {
    if (typeof chemicals === 'string' || typeof chemicals === 'number') {
        return [{ name: "General Chemicals", amount_kg: Number(chemicals) || 1.0 }];
    } else if (!chemicals || !Array.isArray(chemicals)) {
        return [
            { name: "Cryolite", amount_kg: 0.5 },
            { name: "Sodium Carbonate", amount_kg: 1.2 }
        ];
    }
    return chemicals;
};

// Helper function to validate and transform materials array
const validateMaterials = (materials: any) => {
    if (typeof materials === 'string') {
        return [{ type: materials, amount_kg: 0 }];
    } else if (!materials || !Array.isArray(materials)) {
        return [];
    }
    return materials;
};

router.post('/extraction/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    console.log('Request body:', req.body);
    
    let { metal, materialGrade, sourceType, region, method, energySource, 
          totalEnergyConsumption_kWh_perTon, waterUsage_L_perTon, 
          wasteGenerated_kg_perTon, costOfExtraction_USD_perTon } = req.body;

    // Validate required fields
    if (!metal || !sourceType || !region) {
        return res.status(400).send({ error: 'Metal, Source Type, and Region fields are required' });
    }

    // Transform energySource using helper function
    energySource = validateEnergySource(energySource);

    // Set defaults for optional fields
    if (!materialGrade || materialGrade.length < 3) {
        materialGrade = "High-grade Bauxite";
    }
    if (!method || method.length < 3) {
        method = 'Open-pit Mining';
    }
    if (!totalEnergyConsumption_kWh_perTon || totalEnergyConsumption_kWh_perTon <= 0) {
        totalEnergyConsumption_kWh_perTon = 1200;
    }
    if (!waterUsage_L_perTon || waterUsage_L_perTon <= 0) {
        waterUsage_L_perTon = 5000;
    }
    if (!wasteGenerated_kg_perTon || wasteGenerated_kg_perTon <= 0) {
        wasteGenerated_kg_perTon = 300;
    }
    if (!costOfExtraction_USD_perTon || costOfExtraction_USD_perTon <= 0) {
        costOfExtraction_USD_perTon = 50;
    }

    try {
        // Find the project
        const project = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }
        
       // console.log('Project found:', project);

        // Initialize inventoryData if it doesn't exist
        if (!project.inventoryData) {
            project.inventoryData = {};
        }

        let extractionData;
        const existingExtractionId = project.inventoryData.extraction?.processId;

        if (existingExtractionId) {
            // Try to find existing extraction data
            extractionData = await Extraction.findById(existingExtractionId);
        }

        if (extractionData) {
            // Update existing extraction data
            extractionData.metal = metal;
            extractionData.materialGrade = materialGrade;
            extractionData.sourceType = sourceType;
            extractionData.region = region;
            extractionData.method = method;
            extractionData.energySource = energySource;
            extractionData.totalEnergyConsumption_kWh_perTon = totalEnergyConsumption_kWh_perTon;
            extractionData.waterUsage_L_perTon = waterUsage_L_perTon;
            extractionData.wasteGenerated_kg_perTon = wasteGenerated_kg_perTon;
            extractionData.costOfExtraction_USD_perTon = costOfExtraction_USD_perTon;
            
            await extractionData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.extraction": 2 } }
            );
            console.log("Extraction data updated:", extractionData._id);
        } else {
            // Create new extraction data
            extractionData = new Extraction({
                projectId,
                metal,
                materialGrade,
                sourceType,
                region,
                method,
                energySource,
                totalEnergyConsumption_kWh_perTon,
                waterUsage_L_perTon,
                wasteGenerated_kg_perTon,
                costOfExtraction_USD_perTon
            });
            
            await extractionData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.extraction": 2 } }
            );
            // Link the extraction data to the project
            project.inventoryData.extraction = {
                processId: extractionData._id
            };
            await project.save();
            console.log("Project updated with extraction data link");
        }

        res.status(201).send({ 
            message: 'Extraction data processed successfully', 
            extractionData: {
                _id: extractionData._id,
                metal: extractionData.metal,
                materialGrade: extractionData.materialGrade,
                sourceType: extractionData.sourceType,
                region: extractionData.region,
                method: extractionData.method,
                energySource: extractionData.energySource,
                totalEnergyConsumption_kWh_perTon: extractionData.totalEnergyConsumption_kWh_perTon,
                waterUsage_L_perTon: extractionData.waterUsage_L_perTon,
                wasteGenerated_kg_perTon: extractionData.wasteGenerated_kg_perTon,
                costOfExtraction_USD_perTon: extractionData.costOfExtraction_USD_perTon
            }
        });

    } catch (error: any) {
        console.error('Error processing extraction data:', error);
        res.status(500).send({ 
            error: 'Failed to process extraction data',
            details: error.message || String(error)
        });
    }
});

router.post('/refining/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { refiningType, materialInput_tons, outputEfficiency_percent, energyConsumption_kWh_perTon,
         energySource, waterConsumption_L_perTon, chemicalsUsed_kg_perTon, 
         wasteSlagGenerated_kg_perTon, materialLostAsImpurity_percent,
         recyclingContent_percent, recyclingOutputQuality, operatingCost_USD_perTon } = req.body;

    // Validate and map refiningType to valid enum values
    if (!refiningType || refiningType.length < 3) {
        refiningType = "Electrolysis";
    } else {
        // Map common refining types to valid enum values
        const refiningTypeMap: Record<string, string> = {
            'electrolysis': 'Electrolysis',
            'pyrometallurgy': 'Pyrometallurgy',
            'hydrometallurgy': 'Hydrometallurgy',
            'smelting': 'Smelting',
            'chemical': 'Chemical Processing',
            'thermal': 'Thermal Processing',
            'mechanical': 'Mechanical Processing',
            'biological': 'Biological Processing'
        };
        refiningType = refiningTypeMap[refiningType.toLowerCase()] || "Electrolysis";
    }
    
    if (!materialInput_tons || materialInput_tons <= 0) {
        materialInput_tons = 1;
    }
    if (!outputEfficiency_percent || outputEfficiency_percent <= 0) {
        outputEfficiency_percent = 90;
    }
    if (!energyConsumption_kWh_perTon || energyConsumption_kWh_perTon <= 0) {
        energyConsumption_kWh_perTon = 2000;
    }
    
    // Transform energySource using helper function
    energySource = validateEnergySource(energySource);
    
    if (!waterConsumption_L_perTon || waterConsumption_L_perTon <= 0) {
        waterConsumption_L_perTon = 3000;
    }
    
    // Transform chemicalsUsed using helper function
    chemicalsUsed_kg_perTon = validateChemicals(chemicalsUsed_kg_perTon);
    
    if (!wasteSlagGenerated_kg_perTon || wasteSlagGenerated_kg_perTon <= 0) {
        wasteSlagGenerated_kg_perTon = 50;
    }
    if (!materialLostAsImpurity_percent || materialLostAsImpurity_percent < 0) {
        materialLostAsImpurity_percent = 5;
    }
    if (!recyclingContent_percent || recyclingContent_percent < 0) {
        recyclingContent_percent = 20;
    }
    
    // Validate and map recyclingOutputQuality to valid enum values
    if (!recyclingOutputQuality || recyclingOutputQuality.length < 3) {
        recyclingOutputQuality = "Closed-loop";
    } else {
        // Map common values to valid enum values
        const qualityMap: Record<string, string> = {
            'high': 'Closed-loop',
            'medium': 'Open-loop', 
            'low': 'Downcycled',
            'good': 'Closed-loop',
            'poor': 'Downcycled',
            'closed': 'Closed-loop',
            'open': 'Open-loop',
            'closed-loop': 'Closed-loop',
            'open-loop': 'Open-loop',
            'downcycled': 'Downcycled',
            'none': 'None'
        };
        recyclingOutputQuality = qualityMap[recyclingOutputQuality.toLowerCase()] || "Closed-loop";
    }
    
    if (!operatingCost_USD_perTon || operatingCost_USD_perTon <= 0) {
        operatingCost_USD_perTon = 100;
    }

    try {
        // Find the project
        const project = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        // Initialize inventoryData if it doesn't exist
        if (!project.inventoryData) {
            project.inventoryData = {};
        }

        let refiningData;
        const existingRefiningId = project.inventoryData.refining?.processId;

        if (existingRefiningId) {
            refiningData = await Refining.findById(existingRefiningId);
        }

        if (refiningData) {
            // Update existing refining data
            refiningData.refiningType = refiningType;
            refiningData.materialInput_tons = materialInput_tons;
            refiningData.outputEfficiency_percent = outputEfficiency_percent;
            refiningData.energyConsumption_kWh_perTon = energyConsumption_kWh_perTon;
            refiningData.energySource = energySource;
            refiningData.waterConsumption_L_perTon = waterConsumption_L_perTon;
            refiningData.chemicalsUsed_kg_perTon = chemicalsUsed_kg_perTon;
            refiningData.wasteSlagGenerated_kg_perTon = wasteSlagGenerated_kg_perTon;
            refiningData.materialLostAsImpurity_percent = materialLostAsImpurity_percent;
            refiningData.recyclingContent_percent = recyclingContent_percent;
            refiningData.recyclingOutputQuality = recyclingOutputQuality;
            refiningData.operatingCost_USD_perTon = operatingCost_USD_perTon;
            
            await refiningData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.refining": 2 } }
            );
            console.log("Refining data updated:", refiningData._id);
        } else {
            // Create new refining data
            refiningData = new Refining({
                projectId,
                refiningType,
                materialInput_tons,
                outputEfficiency_percent,
                energyConsumption_kWh_perTon,
                energySource,
                waterConsumption_L_perTon,
                chemicalsUsed_kg_perTon,
                wasteSlagGenerated_kg_perTon,
                materialLostAsImpurity_percent,
                recyclingContent_percent,
                recyclingOutputQuality,
                operatingCost_USD_perTon
            });
            
            await refiningData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.refining": 2 } }
            );
            
            project.inventoryData.refining = {
                processId: refiningData._id
            };
            await project.save();
            console.log("Project updated with refining data link");
        }

        res.status(201).send({ 
            message: 'Refining data processed successfully', 
            refiningData: {
                _id: refiningData._id,
                refiningType: refiningData.refiningType,
                materialInput_tons: refiningData.materialInput_tons,
                outputEfficiency_percent: refiningData.outputEfficiency_percent,
                energyConsumption_kWh_perTon: refiningData.energyConsumption_kWh_perTon,
                energySource: refiningData.energySource,
                waterConsumption_L_perTon: refiningData.waterConsumption_L_perTon,
                chemicalsUsed_kg_perTon: refiningData.chemicalsUsed_kg_perTon,
                wasteSlagGenerated_kg_perTon: refiningData.wasteSlagGenerated_kg_perTon,
                materialLostAsImpurity_percent: refiningData.materialLostAsImpurity_percent,
                recyclingContent_percent: refiningData.recyclingContent_percent,
                recyclingOutputQuality: refiningData.recyclingOutputQuality,
                operatingCost_USD_perTon: refiningData.operatingCost_USD_perTon
            }
        });

    } catch (error: any) {
        console.error('Error processing refining data:', error);
        res.status(500).send({ 
            error: 'Failed to process refining data',
            details: error.message || String(error)
        });
    }
});

router.post('/smelting/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { smeltingTech, materialInput_tons_perBatch, operatingTemp_C, energyConsumption_kWh_perTon,
         energySource, fluxMaterials_kg_perTon, slagGenerated_kg_perTon, outputEfficiency_percent,
         recycledScrapInput_tons_perTon, recyclingQuality, waterConsumption_L_perTon, operatingCost_USD_perTon } = req.body;

    // Validate required fields
    if (!smeltingTech || smeltingTech.length < 3) {
        return res.status(400).send({ error: 'Smelting Technology is required' });
    }

    // Set defaults for optional fields
    if (!materialInput_tons_perBatch || materialInput_tons_perBatch <= 0) {
        materialInput_tons_perBatch = 10;
    }
    if (!operatingTemp_C || operatingTemp_C <= 0) {
        operatingTemp_C = 1500;
    }
    if (!energyConsumption_kWh_perTon || energyConsumption_kWh_perTon <= 0) {
        energyConsumption_kWh_perTon = 3000;
    }

    // Transform energySource using helper function
    energySource = validateEnergySource(energySource);

    // Transform fluxMaterials using helper function
    fluxMaterials_kg_perTon = validateMaterials(fluxMaterials_kg_perTon);

    if (!slagGenerated_kg_perTon || slagGenerated_kg_perTon <= 0) {
        slagGenerated_kg_perTon = 100;
    }
    if (!outputEfficiency_percent || outputEfficiency_percent <= 0) {
        outputEfficiency_percent = 85;
    }
    if (!recycledScrapInput_tons_perTon || recycledScrapInput_tons_perTon < 0) {
        recycledScrapInput_tons_perTon = 0.2;
    }

    // Validate and map recyclingQuality to valid enum values
    if (!recyclingQuality || recyclingQuality.length < 3) {
        recyclingQuality = "Closed-loop";
    } else {
        const qualityMap: Record<string, string> = {
            'high': 'Closed-loop',
            'medium': 'Open-loop',
            'low': 'Downcycled',
            'good': 'Closed-loop',
            'poor': 'Downcycled',
            'closed': 'Closed-loop',
            'open': 'Open-loop',
            'closed-loop': 'Closed-loop',
            'open-loop': 'Open-loop',
            'downcycled': 'Downcycled',
            'none': 'None'
        };
        recyclingQuality = qualityMap[recyclingQuality.toLowerCase()] || "Closed-loop";
    }

    if (!waterConsumption_L_perTon || waterConsumption_L_perTon <= 0) {
        waterConsumption_L_perTon = 1000;
    }
    if (!operatingCost_USD_perTon || operatingCost_USD_perTon <= 0) {
        operatingCost_USD_perTon = 200;
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        // Initialize inventoryData if it doesn't exist
        if (!project.inventoryData) {
            project.inventoryData = {};
        }

        let smeltingData;
        const existingSmeltingId = project.inventoryData.smelting?.processId;

        if (existingSmeltingId) {
            smeltingData = await Smelting.findById(existingSmeltingId);
        }

        if (smeltingData) {
            // Update existing smelting data
            smeltingData.smeltingTech = smeltingTech;
            smeltingData.materialInput_tons_perBatch = materialInput_tons_perBatch;
            smeltingData.operatingTemp_C = operatingTemp_C;
            smeltingData.energyConsumption_kWh_perTon = energyConsumption_kWh_perTon;
            smeltingData.energySource = energySource;
            smeltingData.fluxMaterials_kg_perTon = fluxMaterials_kg_perTon;
            smeltingData.slagGenerated_kg_perTon = slagGenerated_kg_perTon;
            smeltingData.outputEfficiency_percent = outputEfficiency_percent;
            smeltingData.recycledScrapInput_tons_perTon = recycledScrapInput_tons_perTon;
            smeltingData.recyclingQuality = recyclingQuality;
            smeltingData.waterConsumption_L_perTon = waterConsumption_L_perTon;
            smeltingData.operatingCost_USD_perTon = operatingCost_USD_perTon;
            
            await smeltingData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.smelting": 2 } }
            );
            console.log("Smelting data updated:", smeltingData._id);
        } else {
            // Create new smelting data
            smeltingData = new Smelting({
                projectId, // ← Make sure this is included
                smeltingTech,
                materialInput_tons_perBatch,
                operatingTemp_C,
                energyConsumption_kWh_perTon,
                energySource,
                fluxMaterials_kg_perTon,
                slagGenerated_kg_perTon,
                outputEfficiency_percent,
                recycledScrapInput_tons_perTon,
                recyclingQuality,
                waterConsumption_L_perTon,
                operatingCost_USD_perTon
            });
            
            await smeltingData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.smelting": 2 } }
            );
            
            // Link the smelting data to the project
            project.inventoryData.smelting = {
                processId: smeltingData._id
            };
            await project.save();
            console.log("Project updated with smelting data link");
        }

        // ← THE ISSUE WAS HERE: Return the actual smeltingData, not null
        res.status(201).send({ 
            message: 'Smelting data processed successfully', 
            smeltingData: {
                _id: smeltingData._id,
                smeltingTech: smeltingData.smeltingTech,
                materialInput_tons_perBatch: smeltingData.materialInput_tons_perBatch,
                operatingTemp_C: smeltingData.operatingTemp_C,
                energyConsumption_kWh_perTon: smeltingData.energyConsumption_kWh_perTon,
                energySource: smeltingData.energySource,
                fluxMaterials_kg_perTon: smeltingData.fluxMaterials_kg_perTon,
                slagGenerated_kg_perTon: smeltingData.slagGenerated_kg_perTon,
                outputEfficiency_percent: smeltingData.outputEfficiency_percent,
                recycledScrapInput_tons_perTon: smeltingData.recycledScrapInput_tons_perTon,
                recyclingQuality: smeltingData.recyclingQuality,
                waterConsumption_L_perTon: smeltingData.waterConsumption_L_perTon,
                operatingCost_USD_perTon: smeltingData.operatingCost_USD_perTon
            }
        });

    } catch (error: any) {
        console.error('Error processing smelting data:', error);
        res.status(500).send({ 
            error: 'Failed to process smelting data',
            details: error.message || String(error)
        });
    }
});

router.post('/transportation/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    console.log('Request body:', req.body);
    let { mode, distanceTravelled_km, fuelType, fuelConsumption_perKm,
         loadCapacityUtilization_percent, averageVehicleLoad_tons, packagingType,
         materialLossDuringTransport_percent, costOfTransport_perTrip_USD, stage } = req.body;

    // Validate required fields
    if (!mode || !fuelType || !stage) {
        return res.status(400).send({ error: 'Mode, Fuel Type, and Stage fields are required' });
    }

    // Validate and set defaults
    if (!distanceTravelled_km || distanceTravelled_km <= 0) {
        distanceTravelled_km = 100;
    }
    if (!fuelConsumption_perKm || fuelConsumption_perKm <= 0) {
        fuelConsumption_perKm = 0.3;
    }
    if (!loadCapacityUtilization_percent || loadCapacityUtilization_percent <= 0) {
        loadCapacityUtilization_percent = 80;
    }
    if (!averageVehicleLoad_tons || averageVehicleLoad_tons <= 0) {
        averageVehicleLoad_tons = 20;
    }
    if (!packagingType || packagingType.length < 3) {
        packagingType = "Bulk";
    }
    if (!materialLossDuringTransport_percent || materialLossDuringTransport_percent < 0) {
        materialLossDuringTransport_percent = 1;
    }
    if (!costOfTransport_perTrip_USD || costOfTransport_perTrip_USD <= 0) {
        costOfTransport_perTrip_USD = 500;
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        // Initialize inventoryData if it doesn't exist
        if (!project.inventoryData) {
            project.inventoryData = {};
        }

        // Determine which transportation stage to update based on the stage parameter
        let transportationProcessId;
        
        // Fix the transportation route field names:
        switch (stage) {
            case 'transport-refinery':
                transportationProcessId = project.inventoryData.transportToRefinery?.processId; // ← Correct field name
                break;
            case 'transport-consumer':
                transportationProcessId = project.inventoryData.transportToConsumer?.processId; // ← Correct field name
                break;
            default:
                return res.status(400).send({ error: 'Invalid stage. Use: transport-refinery or transport-consumer' });
        }

        let transportationData;
        
        if (transportationProcessId) {
            // Try to find existing transportation data
            transportationData = await Transportation.findById(transportationProcessId);
        }

        if (transportationData) {
            // Update existing transportation data
            transportationData.mode = mode;
            transportationData.distanceTravelled_km = distanceTravelled_km;
            transportationData.fuelType = fuelType;
            transportationData.fuelConsumption_perKm = fuelConsumption_perKm;
            transportationData.loadCapacityUtilization_percent = loadCapacityUtilization_percent;
            transportationData.averageVehicleLoad_tons = averageVehicleLoad_tons;
            transportationData.packagingType = packagingType;
            transportationData.materialLossDuringTransport_percent = materialLossDuringTransport_percent;
            transportationData.costOfTransport_perTrip_USD = costOfTransport_perTrip_USD;
            
            await transportationData.save();
            
            // ← Add metadata updates
            if (stage === 'transport-refinery') {
                await LCAProject.updateOne(
                    { _id: projectId },
                    { $set: { "meta.inventory.Tport_to_refinary": 2 } }
                );
            } else if (stage === 'transport-consumer') {
                await LCAProject.updateOne(
                    { _id: projectId },
                    { $set: { "meta.inventory.Tport_to_consumer": 2 } }
                );
            }
            
            console.log(`Transportation data updated for ${stage}:`, transportationData._id);
        } else {
            // Create new transportation data
            transportationData = new Transportation({
                projectId,
                mode,
                distanceTravelled_km,
                fuelType,
                fuelConsumption_perKm,
                loadCapacityUtilization_percent,
                averageVehicleLoad_tons,
                packagingType,
                materialLossDuringTransport_percent,
                costOfTransport_perTrip_USD
            });
            
            await transportationData.save();
            
            // Assign to the appropriate property based on the stage
            if (stage === 'transport-refinery') {
                project.inventoryData.transportToRefinery = { // ← Correct field name
                    processId: transportationData._id
                };
                await LCAProject.updateOne(
                    { _id: projectId },
                    { $set: { "meta.inventory.Tport_to_refinary": 2 } }
                );
            } else if (stage === 'transport-consumer') {
                project.inventoryData.transportToConsumer = { // ← Correct field name
                    processId: transportationData._id
                };
                await LCAProject.updateOne(
                    { _id: projectId },
                    { $set: { "meta.inventory.Tport_to_consumer": 2 } }
                );
            }
            
            await project.save();
            console.log(`Project updated with ${stage} transportation data link`);
        }

        res.status(201).send({ 
            message: `Transportation data for ${stage} processed successfully`, 
            stage,
            transportationData: {
                _id: transportationData._id,
                mode: transportationData.mode,
                distanceTravelled_km: transportationData.distanceTravelled_km,
                fuelType: transportationData.fuelType,
                fuelConsumption_perKm: transportationData.fuelConsumption_perKm,
                loadCapacityUtilization_percent: transportationData.loadCapacityUtilization_percent,
                averageVehicleLoad_tons: transportationData.averageVehicleLoad_tons,
                packagingType: transportationData.packagingType,
                materialLossDuringTransport_percent: transportationData.materialLossDuringTransport_percent,
                costOfTransport_perTrip_USD: transportationData.costOfTransport_perTrip_USD
            }
        });
    } catch (error: any) {
        console.error('Error processing transportation data:', error);
        res.status(500).send({ 
            error: 'Failed to process transportation data',
            details: error.message || String(error)
        });
    }
});

router.post('/casting/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { castingProcessType, materialInputQuantity_tons, operatingTemperature_C, energyConsumption_kWh_per_ton,
         energySource, moldMaterial, coolingMethod, waterConsumption_liters_per_ton,
         emissions, defectRate_percent, scrapRecycled_percent, scrapQualityLevel,
         packagingType, finalProductYield_percent, materialLoss_percent,
         wasteGenerated_kg_per_ton, operatingCost_per_ton } = req.body;

    // Validate required fields
    if (!castingProcessType || !materialInputQuantity_tons || !operatingTemperature_C) {
        return res.status(400).send({ 
            error: 'Casting Process Type, Material Input Quantity, and Operating Temperature are required' 
        });
    }

    // Validate and map castingProcessType to valid enum values
    if (!castingProcessType || castingProcessType.length < 3) {
        castingProcessType = "Sand Casting";
    } else {
        const castingTypeMap: Record<string, string> = {
            'sand_casting': 'Sand Casting',
            'sand casting': 'Sand Casting',
            'investment_casting': 'Investment Casting',
            'investment casting': 'Investment Casting',
            'die_casting': 'Die Casting',
            'die casting': 'Die Casting',
            'permanent_mold': 'Permanent Mold',
            'permanent mold': 'Permanent Mold',
            'centrifugal_casting': 'Centrifugal Casting',
            'centrifugal casting': 'Centrifugal Casting',
            'continuous_casting': 'Continuous Casting',
            'continuous casting': 'Continuous Casting',
            'shell_molding': 'Shell Molding',
            'shell molding': 'Shell Molding',
            'pressure_die_casting': 'Pressure Die Casting',
            'pressure die casting': 'Pressure Die Casting'
        };
        castingProcessType = castingTypeMap[castingProcessType.toLowerCase()] || "Sand Casting";
    }

    // Set defaults for required fields
    if (!materialInputQuantity_tons || materialInputQuantity_tons <= 0) {
        materialInputQuantity_tons = 1;
    }
    if (!operatingTemperature_C || operatingTemperature_C <= 0) {
        operatingTemperature_C = 1200;
    }
    if (!energyConsumption_kWh_per_ton || energyConsumption_kWh_per_ton <= 0) {
        energyConsumption_kWh_per_ton = 1500;
    }

    // Transform energySource using helper function
    energySource = validateEnergySource(energySource);

    // ← FIX: Transform moldMaterial to array format
    if (typeof moldMaterial === 'string') {
        moldMaterial = [{ 
            type: moldMaterial, 
            amount_kg: 100,
            cost_USD: 10 
        }];
    } else if (!moldMaterial || !Array.isArray(moldMaterial)) {
        moldMaterial = [{ 
            type: "Sand", 
            amount_kg: 100,
            cost_USD: 10 
        }];
    }

    // Validate and map coolingMethod to string (not array)
    if (!coolingMethod || coolingMethod.length < 3) {
        coolingMethod = "Air Cooling";
    } else {
        const coolingMap: Record<string, string> = {
            'air_cooling': 'Air Cooling',
            'air cooling': 'Air Cooling',
            'water_cooling': 'Water Cooling',
            'water cooling': 'Water Cooling',
            'forced_air': 'Forced Air',
            'forced air': 'Forced Air',
            'oil_quenching': 'Oil Quenching',
            'oil quenching': 'Oil Quenching',
            'natural_cooling': 'Natural Cooling',
            'natural cooling': 'Natural Cooling',
            'spray_cooling': 'Spray Cooling',
            'spray cooling': 'Spray Cooling'
        };
        coolingMethod = coolingMap[coolingMethod.toLowerCase()] || "Air Cooling";
    }

    if (!waterConsumption_liters_per_ton || waterConsumption_liters_per_ton <= 0) {
        waterConsumption_liters_per_ton = 500;
    }

    // ← FIX: Transform emissions to object format (not array)
    if (Array.isArray(emissions) && emissions.length > 0) {
        // Convert array to object
        const emissionObj = emissions[0];
        emissions = {
            CO2_kg_per_ton: emissionObj.type === 'CO2' ? emissionObj.amount_kg : 100,
            NOx_kg_per_ton: emissionObj.type === 'NOx' ? emissionObj.amount_kg : 5,
            SOx_kg_per_ton: emissionObj.type === 'SOx' ? emissionObj.amount_kg : 3
        };
    } else if (typeof emissions === 'string' || typeof emissions === 'number') {
        emissions = {
            CO2_kg_per_ton: Number(emissions) || 100,
            NOx_kg_per_ton: 5,
            SOx_kg_per_ton: 3
        };
    } else if (!emissions || typeof emissions !== 'object') {
        emissions = {
            CO2_kg_per_ton: 100,
            NOx_kg_per_ton: 5,
            SOx_kg_per_ton: 3
        };
    }

    if (!defectRate_percent || defectRate_percent < 0) {
        defectRate_percent = 2;
    }
    if (!scrapRecycled_percent || scrapRecycled_percent < 0) {
        scrapRecycled_percent = 80;
    }

    // Validate and map scrapQualityLevel to enum
    if (!scrapQualityLevel || scrapQualityLevel.length < 3) {
        scrapQualityLevel = "Closed-loop";
    } else {
        const qualityMap: Record<string, string> = {
            'high': 'Closed-loop',
            'medium': 'Open-loop',
            'low': 'Downcycled',
            'good': 'Closed-loop',
            'poor': 'Downcycled',
            'closed': 'Closed-loop',
            'open': 'Open-loop',
            'closed-loop': 'Closed-loop',
            'open-loop': 'Open-loop',
            'downcycled': 'Downcycled',
            'none': 'None',
            'industrial_grade': 'Closed-loop',
            'commercial_grade': 'Open-loop'
        };
        scrapQualityLevel = qualityMap[scrapQualityLevel.toLowerCase()] || "Closed-loop";
    }

    // Validate and map packagingType to enum
    if (!packagingType || packagingType.length < 3) {
        packagingType = "Bulk";
    } else {
        const packagingMap: Record<string, string> = {
            'bulk': 'Bulk',
            'palletized': 'Palletized',
            'containerized': 'Containerized',
            'crated': 'Crated',
            'wrapped': 'Wrapped',
            'bundled': 'Bundled'
        };
        packagingType = packagingMap[packagingType.toLowerCase()] || "Bulk";
    }

    if (!finalProductYield_percent || finalProductYield_percent <= 0) {
        finalProductYield_percent = 95;
    }
    if (!materialLoss_percent || materialLoss_percent < 0) {
        materialLoss_percent = 3;
    }
    if (!wasteGenerated_kg_per_ton || wasteGenerated_kg_per_ton < 0) {
        wasteGenerated_kg_per_ton = 50;
    }
    if (!operatingCost_per_ton || operatingCost_per_ton <= 0) {
        operatingCost_per_ton = 150;
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        // Initialize inventoryData if it doesn't exist
        if (!project.inventoryData) {
            project.inventoryData = {};
        }

        let castingData;
        const existingCastingId = project.inventoryData.casting?.processId;

        if (existingCastingId) {
            castingData = await Casting.findById(existingCastingId);
        }

        if (castingData) {
            // Update existing casting data
            castingData.castingProcessType = castingProcessType;
            castingData.materialInputQuantity_tons = materialInputQuantity_tons;
            castingData.operatingTemperature_C = operatingTemperature_C;
            castingData.energyConsumption_kWh_per_ton = energyConsumption_kWh_per_ton;
            castingData.energySource = energySource;
            castingData.moldMaterial = moldMaterial;
            castingData.coolingMethod = coolingMethod;
            castingData.waterConsumption_liters_per_ton = waterConsumption_liters_per_ton;
            castingData.emissions = emissions;
            castingData.defectRate_percent = defectRate_percent;
            castingData.scrapRecycled_percent = scrapRecycled_percent;
            castingData.scrapQualityLevel = scrapQualityLevel;
            castingData.packagingType = packagingType;
            castingData.finalProductYield_percent = finalProductYield_percent;
            castingData.materialLoss_percent = materialLoss_percent;
            castingData.wasteGenerated_kg_per_ton = wasteGenerated_kg_per_ton;
            castingData.operatingCost_per_ton = operatingCost_per_ton;
            
            await castingData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.Casting": 2 } } // ← Note: Capital C
            );
            console.log("Casting data updated:", castingData._id);
        } else {
            // Create new casting data
            castingData = new Casting({
                projectId,
                castingProcessType,
                materialInputQuantity_tons,
                operatingTemperature_C,
                energyConsumption_kWh_per_ton,
                energySource,
                moldMaterial,
                coolingMethod,
                waterConsumption_liters_per_ton,
                emissions,
                defectRate_percent,
                scrapRecycled_percent,
                scrapQualityLevel,
                packagingType,
                finalProductYield_percent,
                materialLoss_percent,
                wasteGenerated_kg_per_ton,
                operatingCost_per_ton
            });
            
            await castingData.save();
            await LCAProject.updateOne(
                { _id: projectId },
                { $set: { "meta.inventory.Casting": 2 } } // ← Note: Capital C
            );
            
            // Link the casting data to the project
            project.inventoryData.casting = { // ← Fix this to match inventory schema
                processId: castingData._id
            };
            await project.save();
            console.log("Project updated with casting data link");
        }

        // Return the actual castingData
        res.status(201).send({ 
            message: 'Casting data processed successfully', 
            castingData: {
                _id: castingData._id,
                castingProcessType: castingData.castingProcessType,
                materialInputQuantity_tons: castingData.materialInputQuantity_tons,
                operatingTemperature_C: castingData.operatingTemperature_C,
                energyConsumption_kWh_per_ton: castingData.energyConsumption_kWh_per_ton,
                energySource: castingData.energySource,
                moldMaterial: castingData.moldMaterial,
                coolingMethod: castingData.coolingMethod,
                waterConsumption_liters_per_ton: castingData.waterConsumption_liters_per_ton,
                emissions: castingData.emissions,
                defectRate_percent: castingData.defectRate_percent,
                scrapRecycled_percent: castingData.scrapRecycled_percent,
                scrapQualityLevel: castingData.scrapQualityLevel,
                packagingType: castingData.packagingType,
                finalProductYield_percent: castingData.finalProductYield_percent,
                materialLoss_percent: castingData.materialLoss_percent,
                wasteGenerated_kg_per_ton: castingData.wasteGenerated_kg_per_ton,
                operatingCost_per_ton: castingData.operatingCost_per_ton
            }
        });

    } catch (error: any) {
        console.error('Error processing casting data:', error);
        res.status(500).send({ 
            error: 'Failed to process casting data',
            details: error.message || String(error)
        });
    }
});

router.post('/endoflife/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { recyclingRate, disposalMethod, Energy_used_kWh_perTon } = req.body;

    // Validate and set defaults
    if (!recyclingRate || recyclingRate < 0 || recyclingRate > 100) {
        recyclingRate = 50; // Default to 50% recycling rate
    }
    
    if (!disposalMethod || disposalMethod.length < 3) {
        disposalMethod = "Landfill"; // Default disposal method
    } else {
        // Validate disposalMethod against allowed values
        const validDisposalMethods = ["Recycling", "Landfill", "Incineration", "Reuse", "Composting"];
        if (!validDisposalMethods.includes(disposalMethod)) {
            // Map common values to valid enum values
            const methodMap: Record<string, string> = {
                'recycle': 'Recycling',
                'dump': 'Landfill', 
                'burn': 'Incineration',
                'compost': 'Composting',
                'reuse': 'Reuse'
            };
            disposalMethod = methodMap[disposalMethod.toLowerCase()] || "Landfill";
        }
    }
    
    if (!Energy_used_kWh_perTon || Energy_used_kWh_perTon < 0) {
        Energy_used_kWh_perTon = 100; // Default energy consumption
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        // Initialize inventoryData if it doesn't exist
        if (!project.inventoryData) {
            project.inventoryData = {};
        }

        let endOfLifeData;
        const existingEndOfLifeId = project.inventoryData.endOfLife?.processId;

        if (existingEndOfLifeId) {
            // Try to find existing end-of-life data
            endOfLifeData = await EndOfLife.findById(existingEndOfLifeId);
        }

        if (endOfLifeData) {
            // Update existing end-of-life data
            endOfLifeData.recyclingRate = recyclingRate;
            endOfLifeData.disposalMethod = disposalMethod;
            endOfLifeData.Energy_used_kWh_perTon = Energy_used_kWh_perTon;
            await endOfLifeData.save();
            console.log("End of life data updated:", endOfLifeData._id);
        } else {
            // Create new end-of-life data
            endOfLifeData = new EndOfLife({
                projectId,
                recyclingRate,
                disposalMethod,
                Energy_used_kWh_perTon
            });
            
            await endOfLifeData.save();
            console.log("New end of life data created:", endOfLifeData._id);

            // Link the end-of-life data to the project
            project.inventoryData.endOfLife = {
                processId: endOfLifeData._id
            };
            await project.save();
            console.log("Project updated with end of life data link");
        }

        res.status(201).send({ 
            message: 'End of life data processed successfully', 
            endOfLifeData: {
                _id: endOfLifeData._id,
                recyclingRate: endOfLifeData.recyclingRate,
                disposalMethod: endOfLifeData.disposalMethod,
                Energy_used_kWh_perTon: endOfLifeData.Energy_used_kWh_perTon
            }
        });

    } catch (error: any) {
        console.error('Error processing end of life data:', error);
        res.status(500).send({ 
            error: 'Failed to process end of life data',
            details: error.message || String(error)
        });
    }
});

router.post('/recycling/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { recyclingProcessType, inputMaterialType, inputQuantity_tons, sortingMethod,
         cleaningProcess, energyConsumption_kWh_per_ton, energySource,
         waterConsumption_liters_per_ton, chemicalUsed_kg_per_ton, materialRecoveryRate_percent,
         materialLoss_percent, outputQualityLevel, finalOutput_tons, emissions,
         slagGenerated_kg_per_ton, hazardousWaste_kg_per_ton, packagingType,
         costOfRecycling_per_ton, transportationForRecycling } = req.body;

    // Validate and set defaults
    if (!recyclingProcessType || recyclingProcessType.length < 3) {
        recyclingProcessType = "Secondary Smelting";
    }
    if (!inputMaterialType || !Array.isArray(inputMaterialType)) {
        inputMaterialType = [];
    }
    if (!inputQuantity_tons || inputQuantity_tons <= 0) {
        inputQuantity_tons = 1;
    }
    if (!sortingMethod || sortingMethod.length < 3) {
        sortingMethod = "Magnetic Separation";
    }
    if (!cleaningProcess || cleaningProcess.length < 3) {
        cleaningProcess = "Chemical Cleaning";
    }
    if (!energyConsumption_kWh_per_ton || energyConsumption_kWh_per_ton <= 0) {
        energyConsumption_kWh_per_ton = 150;
    }
    
    // Transform and validate energySource
    energySource = validateEnergySource(energySource);
    
    if (!waterConsumption_liters_per_ton || waterConsumption_liters_per_ton < 0) {
        waterConsumption_liters_per_ton = 250;
    }
    
    // ← FIX: Transform chemicals to match schema requirements
    if (typeof chemicalUsed_kg_per_ton === 'string' || typeof chemicalUsed_kg_per_ton === 'number') {
        chemicalUsed_kg_per_ton = [{ 
            name: "General Chemicals", 
            amount: Number(chemicalUsed_kg_per_ton) || 1.0 // ← Use 'amount' not 'amount_kg'
        }];
    } else if (!chemicalUsed_kg_per_ton || !Array.isArray(chemicalUsed_kg_per_ton)) {
        chemicalUsed_kg_per_ton = [
            { name: "Cryolite", amount: 0.5 },
            { name: "Sodium Carbonate", amount: 1.2 }
        ];
    } else {
        // Ensure existing array has 'amount' field
        chemicalUsed_kg_per_ton = chemicalUsed_kg_per_ton.map(chemical => ({
            name: chemical.name || "Unknown Chemical",
            amount: chemical.amount || chemical.amount_kg || 1.0
        }));
    }
    
    if (!materialRecoveryRate_percent || materialRecoveryRate_percent <= 0) {
        materialRecoveryRate_percent = 90;
    }
    if (!materialLoss_percent || materialLoss_percent < 0) {
        materialLoss_percent = 8;
    }
    if (!outputQualityLevel || outputQualityLevel.length < 3) {
        outputQualityLevel = "None";
    } else {
        // Validate outputQualityLevel enum values: ["Closed Loop", "Open Loop", "Downcycled", "None"]
        const validQualityLevels = ["Closed Loop", "Open Loop", "Downcycled", "None"];
        if (!validQualityLevels.includes(outputQualityLevel)) {
            // Map common values to valid enum values
            const qualityMap: Record<string, string> = {
                'high': 'Closed Loop',
                'medium': 'Open Loop', 
                'low': 'Downcycled',
                'good': 'Closed Loop',
                'poor': 'Downcycled',
                'closed': 'Closed Loop',
                'open': 'Open Loop',
                'closed-loop': 'Closed Loop',
                'open-loop': 'Open Loop'
            };
            outputQualityLevel = qualityMap[outputQualityLevel.toLowerCase()] || "None";
        }
    }
    if (!finalOutput_tons || finalOutput_tons <= 0) {
        finalOutput_tons = 0.9;
    }
    if (!emissions || typeof emissions !== 'object') {
        emissions = {
            CO2_kg_per_ton: 0,
            NOx_kg_per_ton: 0,
            SOx_kg_per_ton: 0
        };
    }
    if (!slagGenerated_kg_per_ton || slagGenerated_kg_per_ton < 0) {
        slagGenerated_kg_per_ton = 25;
    }
    if (!hazardousWaste_kg_per_ton || hazardousWaste_kg_per_ton < 0) {
        hazardousWaste_kg_per_ton = 5;
    }
    if (!packagingType || packagingType.length < 3) {
        packagingType = "Bulk";
    }
    if (!costOfRecycling_per_ton || costOfRecycling_per_ton <= 0) {
        costOfRecycling_per_ton = 320;
    }

    // ← FIX: Ensure transportationForRecycling has all required fields
    if (!transportationForRecycling || typeof transportationForRecycling !== 'object') {
        transportationForRecycling = {
            mode: "Truck",
            distance_km: 50,
            fuelType: "Diesel",
            fuelConsumption_liters_per_km: 0.3,
            materialLossDuringTransport_percent: 1.0,
            costPerTrip: 200
        };
    } else {
        // Ensure all required fields are present
        transportationForRecycling = {
            mode: transportationForRecycling.mode || "Truck",
            distance_km: transportationForRecycling.distance_km || 50,
            fuelType: transportationForRecycling.fuelType || "Diesel",
            fuelConsumption_liters_per_km: transportationForRecycling.fuelConsumption_liters_per_km || 0.3,
            materialLossDuringTransport_percent: transportationForRecycling.materialLossDuringTransport_percent || 1.0,
            costPerTrip: transportationForRecycling.costPerTrip || 200
        };
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        // Initialize inventoryData if it doesn't exist
        if (!project.inventoryData) {
            project.inventoryData = {};
        }

        let recyclingData;
        const existingRecyclingId = project.inventoryData.recycling?.processId;

        if (existingRecyclingId) {
            recyclingData = await Recycling.findById(existingRecyclingId);
        }

        if (recyclingData) {
            // Update existing recycling data
            recyclingData.recyclingProcessType = recyclingProcessType;
            recyclingData.inputMaterialType = inputMaterialType;
            recyclingData.inputQuantity_tons = inputQuantity_tons;
            recyclingData.sortingMethod = sortingMethod;
            recyclingData.cleaningProcess = cleaningProcess;
            recyclingData.energyConsumption_kWh_per_ton = energyConsumption_kWh_per_ton;
            recyclingData.energySource = energySource;
            recyclingData.waterConsumption_liters_per_ton = waterConsumption_liters_per_ton;
            recyclingData.chemicalUsed_kg_per_ton = chemicalUsed_kg_per_ton;
            recyclingData.materialRecoveryRate_percent = materialRecoveryRate_percent;
            recyclingData.materialLoss_percent = materialLoss_percent;
            recyclingData.outputQualityLevel = outputQualityLevel;
            recyclingData.finalOutput_tons = finalOutput_tons;
            recyclingData.emissions = emissions;
            recyclingData.slagGenerated_kg_per_ton = slagGenerated_kg_per_ton;
            recyclingData.hazardousWaste_kg_per_ton = hazardousWaste_kg_per_ton;
            recyclingData.packagingType = packagingType;
            recyclingData.costOfRecycling_per_ton = costOfRecycling_per_ton;
            recyclingData.transportationForRecycling = transportationForRecycling;
            
            await recyclingData.save();
            console.log("Recycling data updated:", recyclingData._id);
        } else {
            // Create new recycling data
            recyclingData = new Recycling({
                projectId, // ← Add this
                recyclingProcessType,
                inputMaterialType,
                inputQuantity_tons,
                sortingMethod,
                cleaningProcess,
                energyConsumption_kWh_per_ton,
                energySource,
                waterConsumption_liters_per_ton,
                chemicalUsed_kg_per_ton,
                materialRecoveryRate_percent,
                materialLoss_percent,
                outputQualityLevel,
                finalOutput_tons,
                emissions,
                slagGenerated_kg_per_ton,
                hazardousWaste_kg_per_ton,
                packagingType,
                costOfRecycling_per_ton,
                transportationForRecycling
            });
            
            await recyclingData.save();
            console.log("New recycling data created:", recyclingData._id);

            // Link to project
            project.inventoryData.recycling = {
                processId: recyclingData._id
            };
            
            await project.save();
            console.log("Project updated with recycling data link");
        }

        res.status(201).send({ 
            message: 'Recycling data processed successfully', 
            recyclingData: {
                _id: recyclingData._id,
                recyclingProcessType: recyclingData.recyclingProcessType,
                inputMaterialType: recyclingData.inputMaterialType,
                inputQuantity_tons: recyclingData.inputQuantity_tons,
                sortingMethod: recyclingData.sortingMethod,
                cleaningProcess: recyclingData.cleaningProcess,
                energyConsumption_kWh_per_ton: recyclingData.energyConsumption_kWh_per_ton,
                energySource: recyclingData.energySource,
                waterConsumption_liters_per_ton: recyclingData.waterConsumption_liters_per_ton,
                chemicalUsed_kg_per_ton: recyclingData.chemicalUsed_kg_per_ton,
                materialRecoveryRate_percent: recyclingData.materialRecoveryRate_percent,
                materialLoss_percent: recyclingData.materialLoss_percent,
                outputQualityLevel: recyclingData.outputQualityLevel,
                finalOutput_tons: recyclingData.finalOutput_tons,
                emissions: recyclingData.emissions,
                slagGenerated_kg_per_ton: recyclingData.slagGenerated_kg_per_ton,
                hazardousWaste_kg_per_ton: recyclingData.hazardousWaste_kg_per_ton,
                packagingType: recyclingData.packagingType,
                costOfRecycling_per_ton: recyclingData.costOfRecycling_per_ton,
                transportationForRecycling: recyclingData.transportationForRecycling
            }
        });

    } catch (error: any) {
        console.error('Error processing recycling data:', error);
        res.status(500).send({ 
            error: 'Failed to process recycling data',
            details: error.message || String(error)
        });
    }
});

router.get("/metadata/:id", async (req, res) => {
  
    const projectId: string = req.params.id;
   try{
    const project = await LCAProject.findById(projectId).select('projectName metalType goal systemBoundary functionalUnit inventoryData createdAt updatedAt functionalUnit meta ').lean().exec();
     
    if (project){
        console.log("Fetched project:", project.meta?.inventory);
const meta = {
        project_id: project._id,
        project_name: project.projectName,
        metal_type: project.metalType,
        goal: project.goal,
        system_boundary: project.systemBoundary,
        functional_unit: project.functionalUnit,
        inventory: {
                extraction: project.meta?.inventory?.extraction ,
                Tport_to_refinary: project.meta?.inventory?.Tport_to_refinary ,
                refining: project.meta?.inventory?.refining ,
                smelting: project.meta?.inventory?.smelting ,
                Casting: project.meta?.inventory?.Casting ,
                Tport_to_consumer: project.meta?.inventory?.Tport_to_consumer ,
                usage_phase: project.meta?.inventory?.usage_phase ,
                Recycle: project.meta?.inventory?.Recycle ,
                end_of_life: project.meta?.inventory?.end_of_life 
            },
        results: project.meta?.inventory?.result || 1
            };     
              res.status(200).send({ meta });  
    };

  

   } catch (error: any) {
       console.error('Error fetching project metadata:', error);
       res.status(500).send({
           error: 'Failed to fetch project metadata',
           details: error.message || String(error)
       });
   }

});


export default router;