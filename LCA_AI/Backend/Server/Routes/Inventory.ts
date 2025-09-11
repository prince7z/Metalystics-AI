

import express from "express";
import { LCAProject } from "../../DB/schemas/project";
import { Results } from "../../DB/schemas/results";
import { 
  Extraction, 
  Transportation, 
  Refining, 
  Smelting, 
  Casting, 
  Recycling 
} from '../../DB/models';
import e from "express";

const router = express.Router();

// Helper function to validate and transform energySource
const validateEnergySource = (energySource: any) => {
    if (typeof energySource === 'string') {
        // Map common string values to proper energy source objects
        const energyTypeMap: Record<string, string> = {
            'gas': 'Natural Gas',
            'coal': 'Coal',
            'renewable': 'Renewable',
            'electricity': 'Electricity',
            'nuclear': 'Nuclear',
            'solar': 'Solar',
            'wind': 'Wind',
            'hydroelectric': 'Hydroelectric'
        };
        
        const energyType = energyTypeMap[energySource.toLowerCase()] || 'Electricity';
        return [{ type: energyType, percent: 100 }];
    } else if (!energySource || !Array.isArray(energySource)) {
        return [{ type: 'Electricity', percent: 100 }];
    }
    return energySource;
};

// Helper function to validate and transform chemicals array
const validateChemicals = (chemicals: any) => {
    if (typeof chemicals === 'string') {
        return [{ name: chemicals, amount_kg: 0 }];
    } else if (!chemicals || !Array.isArray(chemicals)) {
        return [];
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
    let { metal, materialGrade, sourceType, region, method, energySource, totalEnergyConsumption_kWh_perTon, waterUsage_L_perTon, wasteGenerated_kg_perTon, costOfExtraction_USD_perTon } = req.body;

    if (!metal || !sourceType || !region) {
        return res.status(400).send({ error: 'Metal, Source Type, and Region fields are required' });
    }

    // Transform energySource using helper function
    energySource = validateEnergySource(energySource);

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
        const project: { inventoryData: { extraction?: { processId: string } } } | null = await LCAProject.findById(projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }
        const extractiondata = await Extraction.findById(project.inventoryData.extraction?.processId);
        if (extractiondata) {
            // Update existing extraction data
            extractiondata.metal = metal;
            extractiondata.materialGrade = materialGrade;
            extractiondata.sourceType = sourceType;
            extractiondata.region = region;
            extractiondata.method = method;
            extractiondata.energySource = energySource ;
            extractiondata.totalEnergyConsumption_kWh_perTon = totalEnergyConsumption_kWh_perTon;
            extractiondata.waterUsage_L_perTon = waterUsage_L_perTon;
            extractiondata.wasteGenerated_kg_perTon = wasteGenerated_kg_perTon;
            extractiondata.costOfExtraction_USD_perTon = costOfExtraction_USD_perTon;
            await extractiondata.save();
        } else {
            // Create new extraction data
            const newExtraction = new Extraction({
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
            await newExtraction.save();
        }
        console.log("Extraction data processed:");
        res.status(201).send({ message: 'Extraction data added successfully', extractiondata });
    } catch (error) {
        console.error('Error adding extraction data:', error);
        res.status(500).send({ error: 'Failed to add extraction data' });
    }
});

router.post('/refining/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { refiningType, materialInput_tons,
         outputEfficiency_percent, energyConsumption_kWh_perTon,
         energySource, waterConsumption_L_perTon, chemicalsUsed_kg_perTon, 
         wasteSlagGenerated_kg_perTon, materialLostAsImpurity_percent,
         recyclingContent_percent, recyclingOutputQuality, operatingCost_USD_perTon } = req.body;

if (!refiningType || refiningType.length < 3) {
    refiningType = "Electrolysis";
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
if (!energySource || !Array.isArray(energySource) || energySource.length === 0) {
    energySource = [{ type: 'Electricity', percent: 100 }];
}
if (!waterConsumption_L_perTon || waterConsumption_L_perTon <= 0) {
    waterConsumption_L_perTon = 3000;
}
if (!chemicalsUsed_kg_perTon || !Array.isArray(chemicalsUsed_kg_perTon)) {
    chemicalsUsed_kg_perTon = [  { name: "Cycolite", amount_kg: 0.5 },
      { name: "Sodium Carbonate", amount_kg: 1.2 }
    ];
}
if (!wasteSlagGenerated_kg_perTon || wasteSlagGenerated_kg_perTon <= 0) {
    wasteSlagGenerated_kg_perTon = 50;
}
if (!materialLostAsImpurity_percent || materialLostAsImpurity_percent < 0) {
    materialLostAsImpurity_percent = 5;
}
if (!recyclingContent_percent || recyclingContent_percent < 0) {
    recyclingContent_percent = 20;
}
if (!recyclingOutputQuality || recyclingOutputQuality.length < 3) {
    recyclingOutputQuality = "Closed-loop";
}
if (!operatingCost_USD_perTon || operatingCost_USD_perTon <= 0) {
    operatingCost_USD_perTon = 100;
}

try {
         const refining_id = await LCAProject.findById(projectId).select('inventoryData.refining.processId').exec();
const refiningData = await Refining.findById(refining_id);
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
    console.log("Refining data updated:", refiningData);
    res.status(201).send({ message: 'Refining data added successfully', refiningData });

} else {
    // Create new refining data
    const refiningData = new Refining({
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
    console.log("New refining data created:");
    res.status(201).send({ message: 'Refining data added successfully', refiningData });

}
} catch (error) {
    console.error('Error adding refining data:', error);
    res.status(500).send({ error: 'Failed to add refining data' });
}

});

router.post('/smelting/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { smeltingTech, materialInput_tons_perBatch, operatingTemp_C, 
         energyConsumption_kWh_perTon, energySource, fluxMaterials_kg_perTon,
         slagGenerated_kg_perTon, outputEfficiency_percent, recycledScrapInput_tons_perTon,
         recyclingQuality, waterConsumption_L_perTon, operatingCost_USD_perTon } = req.body;

    // Validate and set defaults
    if (!smeltingTech || smeltingTech.length < 3) {
        smeltingTech = "Blast Furnace";
    }
    if (!materialInput_tons_perBatch || materialInput_tons_perBatch <= 0) {
        materialInput_tons_perBatch = 1;
    }
    if (!operatingTemp_C || operatingTemp_C <= 0) {
        operatingTemp_C = 1000;
    }
    if (!energyConsumption_kWh_perTon || energyConsumption_kWh_perTon <= 0) {
        energyConsumption_kWh_perTon = 3000;
    }
    
    // Transform and validate energySource
    energySource = validateEnergySource(energySource);
    
    // Transform and validate fluxMaterials
    fluxMaterials_kg_perTon = validateMaterials(fluxMaterials_kg_perTon);
    
    if (!slagGenerated_kg_perTon || slagGenerated_kg_perTon < 0) {
        slagGenerated_kg_perTon = 100;
    }
    if (!outputEfficiency_percent || outputEfficiency_percent <= 0) {
        outputEfficiency_percent = 85;
    }
    if (!recycledScrapInput_tons_perTon || recycledScrapInput_tons_perTon < 0) {
        recycledScrapInput_tons_perTon = 0.1;
    }
    if (!recyclingQuality || recyclingQuality.length < 3) {
        recyclingQuality = "None";
    } else {
        // Validate recyclingQuality enum values: ["Closed-loop", "Open-loop", "Downcycled", "None"]
        const validRecyclingQualities = ["Closed-loop", "Open-loop", "Downcycled", "None"];
        if (!validRecyclingQualities.includes(recyclingQuality)) {
            // Map common values to valid enum values
            const qualityMap: Record<string, string> = {
                'high': 'Closed-loop',
                'medium': 'Open-loop', 
                'low': 'Downcycled',
                'good': 'Closed-loop',
                'poor': 'Downcycled',
                'closed': 'Closed-loop',
                'open': 'Open-loop'
            };
            recyclingQuality = qualityMap[recyclingQuality.toLowerCase()] || "None";
        }
    }
    if (!waterConsumption_L_perTon || waterConsumption_L_perTon < 0) {
        waterConsumption_L_perTon = 200;
    }
    if (!operatingCost_USD_perTon || operatingCost_USD_perTon <= 0) {
        operatingCost_USD_perTon = 150;
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project || !project.inventoryData) {
            return res.status(404).send({ error: 'Project not found or inventory data missing' });
        }

        const smeltingData = await Smelting.findById(project.inventoryData.smelting?.processId);
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
        } else {
            // Create new smelting data
            const newSmelting = new Smelting({
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
            await newSmelting.save();
        }

        res.status(201).send({ message: 'Smelting data added successfully', smeltingData });
    } catch (error) {
        console.error('Error adding smelting data:', error);
        res.status(500).send({ error: 'Failed to add smelting data' });
    }
});

router.post('/transportation/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
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
        if (!project || !project.inventoryData) {
            return res.status(404).send({ error: 'Project not found or inventory data missing' });
        }

        // Determine which transportation stage to update based on the stage parameter
        let transportationProcessId;
        switch (stage) {
            case 'toRefinery':
                transportationProcessId = project.inventoryData.transportToRefinery?.processId;
                break;
            case 'toFactory':
                transportationProcessId = project.inventoryData.transportToFactory?.processId;
                break;
            case 'toConsumer':
                transportationProcessId = project.inventoryData.transportToConsumer?.processId;
                break;
            default:
                return res.status(400).send({ error: 'Invalid stage. Use: toRefinery, toFactory, or toConsumer' });
        }

        const transportationData = await Transportation.findById(transportationProcessId);
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
        } else {
            // Create new transportation data
            const newTransportation = new Transportation({
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
            await newTransportation.save();
        }

        res.status(201).send({ 
            message: `Transportation data for ${stage} added successfully`, 
            stage,
            transportationData 
        });
    } catch (error) {
        console.error('Error adding transportation data:', error);
        res.status(500).send({ error: 'Failed to add transportation data' });
    }
});

router.post('/casting/:projectId', async (req, res) => {
    const projectId: string = req.params.projectId;
    
    let { castingProcessType, materialInputQuantity_tons, operatingTemperature_C,
         energyConsumption_kWh_per_ton, energySource, moldMaterial, coolingMethod,
         waterConsumption_liters_per_ton, emissions, defectRate_percent,
         scrapRecycled_percent, scrapQualityLevel, packagingType,
         finalProductYield_percent, materialLoss_percent, wasteGenerated_kg_per_ton,
         operatingCost_per_ton } = req.body;

    // Validate and set defaults
    if (!castingProcessType || castingProcessType.length < 3) {
        castingProcessType = "Die Casting";
    }
    if (!materialInputQuantity_tons || materialInputQuantity_tons <= 0) {
        materialInputQuantity_tons = 1;
    }
    if (!operatingTemperature_C || operatingTemperature_C <= 0) {
        operatingTemperature_C = 750;
    }
    if (!energyConsumption_kWh_per_ton || energyConsumption_kWh_per_ton <= 0) {
        energyConsumption_kWh_per_ton = 120;
    }
    
    // Transform and validate energySource
    energySource = validateEnergySource(energySource);
    
    // Transform and validate moldMaterial
    moldMaterial = validateMaterials(moldMaterial);
    
    if (!coolingMethod || coolingMethod.length < 3) {
        coolingMethod = "Water Cooled";
    }
    if (!waterConsumption_liters_per_ton || waterConsumption_liters_per_ton < 0) {
        waterConsumption_liters_per_ton = 300;
    }
    if (!emissions || typeof emissions !== 'object') {
        emissions = {
            CO2_kg_per_ton: 0,
            NOx_kg_per_ton: 0,
            SOx_kg_per_ton: 0
        };
    }
    if (!defectRate_percent || defectRate_percent < 0) {
        defectRate_percent = 2.5;
    }
    if (!scrapRecycled_percent || scrapRecycled_percent < 0) {
        scrapRecycled_percent = 80;
    }
    if (!scrapQualityLevel || scrapQualityLevel.length < 3) {
        scrapQualityLevel = "None";
    } else {
        // Validate scrapQualityLevel enum values: ["Closed Loop", "Open Loop", "Downcycled", "None"]
        const validQualityLevels = ["Closed Loop", "Open Loop", "Downcycled", "None"];
        if (!validQualityLevels.includes(scrapQualityLevel)) {
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
            scrapQualityLevel = qualityMap[scrapQualityLevel.toLowerCase()] || "None";
        }
    }
    if (!packagingType || packagingType.length < 3) {
        packagingType = "Bulk";
    }
    if (!finalProductYield_percent || finalProductYield_percent <= 0) {
        finalProductYield_percent = 95;
    }
    if (!materialLoss_percent || materialLoss_percent < 0) {
        materialLoss_percent = 5;
    }
    if (!wasteGenerated_kg_per_ton || wasteGenerated_kg_per_ton < 0) {
        wasteGenerated_kg_per_ton = 20;
    }
    if (!operatingCost_per_ton || operatingCost_per_ton <= 0) {
        operatingCost_per_ton = 450;
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project || !project.inventoryData) {
            return res.status(404).send({ error: 'Project not found or inventory data missing' });
        }

        const castingData = await Casting.findById(project.inventoryData.casting?.processId);
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
        } else {
            // Create new casting data
            const newCasting = new Casting({
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
            await newCasting.save();
        }

        res.status(201).send({ message: 'Casting data added successfully', castingData });
    } catch (error) {
        console.error('Error adding casting data:', error);
        res.status(500).send({ error: 'Failed to add casting data' });
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
    
    // Transform and validate chemicals
    chemicalUsed_kg_per_ton = validateChemicals(chemicalUsed_kg_per_ton);
    
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
    if (!transportationForRecycling || typeof transportationForRecycling !== 'object') {
        transportationForRecycling = {
            mode: "Truck",
            distance_km: 0,
            fuelType: "Diesel",
            fuelConsumption_liters_per_km: 0,
            materialLossDuringTransport_percent: 0,
            costPerTrip: 0
        };
    }

    try {
        const project = await LCAProject.findById(projectId);
        if (!project || !project.inventoryData) {
            return res.status(404).send({ error: 'Project not found or inventory data missing' });
        }

        const recyclingData = await Recycling.findById(project.inventoryData.recycling?.processId);
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
        } else {
            // Create new recycling data
            const newRecycling = new Recycling({
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
            await newRecycling.save();
        }

        res.status(201).send({ message: 'Recycling data added successfully', recyclingData });
    } catch (error) {
        console.error('Error adding recycling data:', error);
        res.status(500).send({ error: 'Failed to add recycling data' });
    }
});


export default router;