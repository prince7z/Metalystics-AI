import { useState } from "react";
import axios from "axios";

function InputPage() {
  // Project initialization state variables
  const [projectName, setProjectName] = useState("");
  const [goal, setGoal] = useState("");
  const [metalType, setMetalType] = useState("");
  const [systemBoundary, setSystemBoundary] = useState("");
  const [functionalUnit, setFunctionalUnit] = useState("");
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [projectResponse, setProjectResponse] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Extraction state variables
  const [extractionMetal, setExtractionMetal] = useState("");
  const [materialGrade, setMaterialGrade] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [region, setRegion] = useState("");
  const [method, setMethod] = useState("");
  const [energySource, setEnergySource] = useState("");
  const [totalEnergyConsumption, setTotalEnergyConsumption] = useState("");
  const [waterUsage, setWaterUsage] = useState("");
  const [wasteGenerated, setWasteGenerated] = useState("");
  const [costOfExtraction, setCostOfExtraction] = useState("");
  const [extractionResponse, setExtractionResponse] = useState<any>(null);
  const [showExtractionModal, setShowExtractionModal] = useState(false);

  const [stageCounter, setStageCounter] = useState(0);

  // Function to initialize project
  const initializeProject = async () => {
    if (!projectName || !metalType || !systemBoundary) {
      setError("Please fill in all required fields: Project Name, Metal Type, and System Boundary");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/project/init", {
        projectName,
        metalType,
        goal,
        systemBoundary,
        functionalUnit
      });

      console.log("Project initialized successfully:", response.data);
      setProjectResponse(response.data);
      setShowSuccessModal(true);
      
    } catch (error: any) {
      console.error("Error initializing project:", error);
      setError(error.response?.data?.message || "Failed to initialize project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAndProceed = () => {
    setShowSuccessModal(false);
    setProjectResponse(null);
    incrementCounter();
  };

  // Function to submit extraction data
  const submitExtractionData = async () => {
    if (!extractionMetal || !sourceType || !region) {
      setError("Please fill in all required fields: Metal, Source Type, and Region");
      return;
    }

    // Get project ID from projectResponse or use a fallback
    let projectId = projectResponse?.id;
    if (!projectId) {
      projectId = "68c30b5357406494ce63b8f9"; // Fallback ID for testing
    }

    setIsLoading(true);
    setError("");

    try {
      const extractionPayload = {
        metal: extractionMetal,
        materialGrade,
        sourceType,
        region,
        method,
        energySource: energySource ? [{ type: energySource, percent: 100 }] : [],
        totalEnergyConsumption_kWh_perTon: totalEnergyConsumption ? Number(totalEnergyConsumption) : undefined,
        waterUsage_L_perTon: waterUsage ? Number(waterUsage) : undefined,
        wasteGenerated_kg_perTon: wasteGenerated ? Number(wasteGenerated) : undefined,
        costOfExtraction_USD_perTon: costOfExtraction ? Number(costOfExtraction) : undefined,
      };

      const response = await axios.post(
        `http://localhost:5000/api/inventory/extraction/${projectId}`,
        extractionPayload
      );

      console.log("Extraction data submitted successfully:", response.data);
      setExtractionResponse(response.data);
      setShowExtractionModal(true);
      
    } catch (error: any) {
      console.error("Error submitting extraction data:", error);
      setError(error.response?.data?.message || "Failed to submit extraction data");
    } finally {
      setIsLoading(false);
    }
  };

  const incrementCounter = () => {
    setStageCounter((prevCount) => prevCount + 1);
    console.log(stageCounter);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[30px]">
        <div id="inputCard">
          <div className="flex flex-col space-y-5 text-black h-[65vh] overflow-scroll scrollbar-hide">
            {stageCounter === 0 && (
              <>
                <span className="text-2xl font-semibold">
                  Project Initialisation
                </span>
                
                {/* Error and Success Messages */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                )}
                
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <textarea
                  placeholder="Goal of the LCA Study"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <select
                  value={metalType}
                  onChange={(e) => setMetalType(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                >
                  <option value="" disabled>
                    Select Metal Type
                  </option>
                  <option value="Aluminium">Aluminium</option>
                  <option value="Copper">Copper</option>
                  <option value="Iron">Iron</option>
                  <option value="Steel">Steel</option>
                  <option value="Lead">Lead</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                </select>
                <select
                  value={systemBoundary}
                  onChange={(e) => setSystemBoundary(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                >
                  <option value="" disabled>
                    Select System Boundary
                  </option>
                  <option value="Cradle-to-Gate">Cradle to Gate</option>
                  <option value="Cradle-to-Grave">Cradle to Grave</option>
                  <option value="Cradle-to-Cradle">Cradle to Cradle</option>
                  <option value="Gate-to-Gate">Gate to Gate</option>
                </select>
                <input
                  type="text"
                  placeholder="Functional Unit (e.g., 1 tonne)"
                  value={functionalUnit}
                  onChange={(e) => setFunctionalUnit(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                {/* Initialize Project Button */}
                <button
                  onClick={initializeProject}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors w-[400px]"
                >
                  {isLoading ? "Initializing..." : "Initialize Project"}
                </button>
              </>
            )}
            {stageCounter === 1 && (
              <>
                <span className="text-2xl font-semibold">Extraction</span>
                
                {/* Error Messages */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Metal"
                    value={extractionMetal}
                    onChange={(e) => setExtractionMetal(e.target.value)}
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                  <span className="text-red-500 text-lg absolute -top-1 -right-2">*</span>
                </div>
                
                <input
                  type="text"
                  placeholder="Material Grade"
                  value={materialGrade}
                  onChange={(e) => setMaterialGrade(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Source Type"
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value)}
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                  <span className="text-red-500 text-lg absolute -top-1 -right-2">*</span>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                  <span className="text-red-500 text-lg absolute -top-1 -right-2">*</span>
                </div>
                
                <input
                  type="text"
                  placeholder="Method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                <input
                  type="text"
                  placeholder="Energy Source (e.g., Electricity, Coal)"
                  value={energySource}
                  onChange={(e) => setEnergySource(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                <input
                  type="number"
                  placeholder="Total Energy Consumption (kWh/ton)"
                  value={totalEnergyConsumption}
                  onChange={(e) => setTotalEnergyConsumption(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                <input
                  type="number"
                  placeholder="Water Usage (L/ton)"
                  value={waterUsage}
                  onChange={(e) => setWaterUsage(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                <input
                  type="number"
                  placeholder="Waste Generated (kg/ton)"
                  value={wasteGenerated}
                  onChange={(e) => setWasteGenerated(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                <input
                  type="number"
                  placeholder="Cost of Extraction (USD/ton)"
                  value={costOfExtraction}
                  onChange={(e) => setCostOfExtraction(e.target.value)}
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                
                {/* Submit Extraction Data Button */}
                <button
                  onClick={submitExtractionData}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors w-[400px]"
                >
                  {isLoading ? "Submitting..." : "Submit Extraction Data"}
                </button>
                
                <div className="text-xs text-gray-500 mt-2">
                  <span className="text-red-500">*</span> Required fields
                </div>
              </>
            )}
            {stageCounter === 2 && (
              <>
                <span className="text-2xl font-semibold"> Transportation </span>
                <input
                  type="text"
                  placeholder="Mode of transport"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Distance travelled (km)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Fuel Type"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Fuel Consumption"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Fuel Consumption per km"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Load Capacity Utilization (percent)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Average Vehicle Load (tons)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Packaging Type"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Material Loss During Transport (percent)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Cost of Transport per Trip (USD)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />

                {/* mode
distance travelled (km)
fuel type
fuel consumption
fuel consumption per km
load capacity utilization (percent)
average vehicle load (tons)
packaging type
material loss during transport (percent)
cost of transport per trip (USD) */}
              </>
            )}

            {stageCounter === 3 && (
              <>
                {/* refining type
material input (tons)
output efficiency (percent)
energy consumption (kwh/ton)
water consumption (litre/ton)
chemical used (kg/ton)
waste slag generated (kg/ton)
material lost as impurity (percent)
recycling content (percent)
recycling output quality
operating cost (usd/ton) */}

                <span className="text-2xl font-semibold"> Refining </span>
                <input
                  type="text"
                  placeholder="Refining Type"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Material Input (tons)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Output Efficiency (percent)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Energy Consumption (kWh/ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Water Consumption (litre/ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Chemical Used (kg/ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Waste Slag Generated (kg/ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Material Lost as Impurity (percent)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Recycling Content (percent)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Recycling Output Quality"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Operating Cost (USD/ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
              </>
            )}
            {stageCounter === 4 && (
              <>
                {/* smelting tech
material input tons per batch
operating temperature
energy consumption kWh per ton
slag generated kg per ton
out put efficiency (percent)
recycled scrap input tons per ton
recycling quality
water consumption litre per ton
operating cost usd per ton
    "notes": "All numeric fields are per tonne of final metal unless otherwise specified." */}

                <span className="text-2xl font-semibold"> Smelting </span>
                <input
                  type="text"
                  placeholder="Smelting Technology"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Material Input (tons per batch)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Operating Temperature (°C)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Energy Consumption (kWh per ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Slag Generated (kg per ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Output Efficiency (percent)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus
:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Recycled Scrap Input (tons per ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Recycling Quality"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Water Consumption (litre per ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Operating Cost (USD per ton)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
              </>
            )}
            { stageCounter === 5 && (
                

// casting process type
// material input quantity (tons)
// operating temperature (celcius)
// energy consumption (kwh/ton)
// cooling method
// water consumption (liter/ton)
// emissions 
// defect rate (percent)
// scrap recycle (percent)
// packaging type
// final product yield (percent)
// material loss (percent)
// waste generated (kg / ton)
// operating cost (per ton)
            <>
                <span className="text-2xl font-semibold"> Casting </span>
                <input
                  type="text"
                  placeholder="Casting Process Type"    
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Material Input Quantity (tons)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Operating Temperature (°C)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Energy Consumption (kWh/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Cooling Method"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Water Consumption (litre/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"                 
                    placeholder="Emissions"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Defect Rate (percent)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Scrap Recycle (percent)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Packaging Type"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Final Product Yield (percent)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Material Loss (percent)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Waste Generated (kg/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Operating Cost (USD/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />

            </>

            )}
            { stageCounter === 6 && (
                <>
                
{/* recycling process type
input material type
input quantity (tons)
sorting method
cleaning process
energy consumption (kwh/ton)
energy source
water consumption (liters/ton)
chemical used per ton
material recovery rate (percent)
material loss (percent)
output quality level
final output (tons)
emission
slag generated (kg / ton)
hazardous waste (kg/ton)
heading - transportation for recycling 
mode
distance (km)
fuel type
fuel consumption (liters /km)
material loss during transport (percent)
cost per trip (usd)  */}

                <span className="text-2xl font-semibold"> Recycling </span>
                <input              
                    type="text"     
                    placeholder="Recycling Process Type"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input

                    type="text"
                    placeholder="Input Material Type"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />

                <input

                    type="text"
                    placeholder="Input Quantity (tons)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input

                    type="text"
                    placeholder="Sorting Method"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Cleaning Process"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input

                    type="text"
                    placeholder="Energy Consumption (kWh/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input

                    type="text"
                    placeholder="Energy Source"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Water Consumption (liters/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Chemical Used per Ton"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Material Recovery Rate (percent)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Material Loss (percent)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Output Quality Level"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"

                />
                <input
                    type="text"
                    placeholder="Final Output (tons)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Emissions"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Slag Generated (kg/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Hazardous Waste (kg/ton)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <span className="text-xl font-semibold mt-[20px]"> Transportation for Recycling </span>
                <input

                    type="text"
                    placeholder="Mode of Transport"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Distance (km)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Fuel Type"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Fuel Consumption (liters/km)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Material Loss During Transport (percent)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                    type="text"
                    placeholder="Cost per Trip (USD)"
                    className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />

                </>   
            )}

             <button
              className=" bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 self-start mt-[13px]"
              onClick={() => incrementCounter()}
            >
              {" "}
              Next{" "}
            </button>
          </div>
          <div className=" flex flex-col space-y-4 text-black">
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2 pl-[1rem] pr-[0.6rem] border-gray-300 rounded-md"
                onClick={() => setStageCounter(0)}
            >
              <span>Project Initialisation</span>
              <img
                src="/circle-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-white"
              />
            </button>
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2  pl-[1rem] pr-[0.6rem] border-gray-300 rounded-md"
                onClick={() => setStageCounter(1)}
            >
              <span> Extraction </span>
              <img
                src="/exclamation-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-red-500"
              />
            </button>
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2  pl-[1rem] pr-[0.6rem] border-gray-300 rounded-md"
                onClick={() => setStageCounter(2)}
            >
              <span> Transport to Refiney </span>
              <img
                src="/exclamation-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-red-500"
              />
            </button>
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2  pl-[1rem] pr-[0.6rem] border-gray-300 rounded-md"
                onClick={() => setStageCounter(3)}
            >
              <span> Refining </span>
              <img
                src="/exclamation-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-red-500"
              />
            </button>
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2  pl-[1rem] pr-[0.6rem] border-gray-300 rounded-md"
                onClick={() => setStageCounter(4)}
            >
              <span> Smelting </span>
              <img
                src="/exclamation-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-red-500"
              />
            </button>
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2  pl-[1rem] pr-[0.6rem] border-gray-300 rounded-md"
                onClick={() => setStageCounter(5)}
            >
              <span> Casting </span>
              <img
                src="/exclamation-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-red-500"
              />
            </button>
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2  pl-[1rem] pr-[0.6rem]border-gray-300 rounded-md"
                onClick={() => setStageCounter(6)}
            >
              <span> Recycle </span>
              <img
                src="/exclamation-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-red-500"
              />
            </button>
            <button className="bg-white flex justify-between w-[445px] p-[0.45rem] border-2  pl-[1rem] pr-[0.6rem]border-gray-300 rounded-md"
                onClick={() => setStageCounter(7)}
            >
              <span> End of Life </span>
              <img
                src="/exclamation-solid-full.svg"
                alt="Project initialisation complete"
                className="self-end w-[19px] border rounded-full bg-red-500"
              />
            </button>

            {/* extraction 
transport to refinery
refining
smelting
casting
recycle */}
           
          </div>
        </div>
        <div className="text-gray-500 text-sm mt-[1rem]">
          {" "}
          (Note: This is a mockup input form. Functionality to be implemented.){" "}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && projectResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-green-500 text-6xl mb-2">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Initialized Successfully!</h2>
              <p className="text-gray-600">Your LCA project has been created with complete structure.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Project ID:</span>
                  <p className="text-gray-900 font-mono">{projectResponse.id}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <p className="text-gray-900">{projectResponse.projectData?.status}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Project Name:</span>
                  <p className="text-gray-900">{projectResponse.projectData?.projectName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Metal Type:</span>
                  <p className="text-gray-900">{projectResponse.projectData?.metalType}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">System Boundary:</span>
                  <p className="text-gray-900">{projectResponse.projectData?.systemBoundary}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Functional Unit:</span>
                  <p className="text-gray-900">{projectResponse.projectData?.functionalUnit}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="font-medium text-gray-700">Goal:</span>
                <p className="text-gray-900 text-sm mt-1">{projectResponse.projectData?.goal}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Inventory Structure Created</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(projectResponse.inventoryStructure || {}).map(([process, id]) => (
                  <div key={process} className="flex justify-between items-center py-1">
                    <span className="font-medium text-gray-700 capitalize">
                      {process.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-xs font-mono text-gray-600">{String(id)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleConfirmAndProceed}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Continue to Next Stage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Extraction Success Modal */}
      {showExtractionModal && extractionResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-green-500 text-6xl mb-2">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Extraction Data Submitted Successfully!</h2>
              <p className="text-gray-600">Your extraction process data has been recorded.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Extraction Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Process ID:</span>
                  <p className="text-gray-900 font-mono">{extractionResponse.extractiondata?._id}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Metal:</span>
                  <p className="text-gray-900">{extractionResponse.extractiondata?.metal}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Source Type:</span>
                  <p className="text-gray-900">{extractionResponse.extractiondata?.sourceType}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Region:</span>
                  <p className="text-gray-900">{extractionResponse.extractiondata?.region}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Method:</span>
                  <p className="text-gray-900">{extractionResponse.extractiondata?.method || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Material Grade:</span>
                  <p className="text-gray-900">{extractionResponse.extractiondata?.materialGrade || 'N/A'}</p>
                </div>
              </div>
            </div>

            {extractionResponse.extractiondata && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Resource Consumption</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {extractionResponse.extractiondata.energySource && extractionResponse.extractiondata.energySource.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-700">Energy Source:</span>
                      <div className="text-gray-900">
                        {extractionResponse.extractiondata.energySource.map((energy: any, index: number) => (
                          <p key={index}>{energy.type}: {energy.percent}%</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {extractionResponse.extractiondata.totalEnergyConsumption_kWh_perTon && (
                    <div>
                      <span className="font-medium text-gray-700">Energy Consumption:</span>
                      <p className="text-gray-900">{extractionResponse.extractiondata.totalEnergyConsumption_kWh_perTon} kWh/ton</p>
                    </div>
                  )}
                  {extractionResponse.extractiondata.waterUsage_L_perTon && (
                    <div>
                      <span className="font-medium text-gray-700">Water Usage:</span>
                      <p className="text-gray-900">{extractionResponse.extractiondata.waterUsage_L_perTon} L/ton</p>
                    </div>
                  )}
                  {extractionResponse.extractiondata.wasteGenerated_kg_perTon && (
                    <div>
                      <span className="font-medium text-gray-700">Waste Generated:</span>
                      <p className="text-gray-900">{extractionResponse.extractiondata.wasteGenerated_kg_perTon} kg/ton</p>
                    </div>
                  )}
                  {extractionResponse.extractiondata.costOfExtraction_USD_perTon && (
                    <div>
                      <span className="font-medium text-gray-700">Extraction Cost:</span>
                      <p className="text-gray-900">${extractionResponse.extractiondata.costOfExtraction_USD_perTon}/ton</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => {
                  setShowExtractionModal(false);
                  setStageCounter(2); // Move to next stage
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Continue to Refining Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default InputPage;
