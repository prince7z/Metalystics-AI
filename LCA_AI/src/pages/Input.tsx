import { useEffect, useState } from "react";

function InputPage() {
  //     "projectName": "Primary Aluminum Ingot Production LCA",
  //   "metalType": "Aluminium",
  //   "goal": "To assess the environmental impact of producing 1 tonne of primary aluminum ingot.",
  //   "systemBoundary": "Cradle-to-Gate",

  const [systemBoundary, setSystemBoundary] = useState("");
  const [metalType, setMetalType] = useState("");

  const [stageCounter, setStageCounter] = useState(0);

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
                  {" "}
                  Project Initialisation{" "}
                </span>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <textarea
                  placeholder="Goal of the LCA Study"
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
                  <option value="Cradle to Gate">Cradle to Gate</option>
                  <option value="Cradle to Grave">Cradle to Grave</option>
                  <option value="Well to Wheel">Cradle to Cradle</option>
                  <option value="Gate to Gate">Gate to Gate</option>
                </select>
              </>
            )}
            {stageCounter === 1 && (
              <>
                <span className="text-2xl font-semibold"> Extraction </span>
                <input
                  type="text"
                  placeholder="Metal"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Material Grade"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Source Type"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Region"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Method"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                {/* <textarea placeholder="Energy Source (Type, Percentage)" className="border border-gray-400 rounded-md px-4 py-2 w-[400px] h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white" /> */}
                <input
                  type="text"
                  placeholder="Total Energy Consumption"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Water Usage per Ton"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Waste Generated per Ton"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />
                <input
                  type="text"
                  placeholder="Cost of Extraction per Ton (USD)"
                  className="border border-gray-400 rounded-md px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                />

                {/* metal
material grade
source type
region
method
energy source [{
	type:
	percentage
}]
total energy consumption
water usage per ton
waste generated per ton
cost of extraction per ton (USD) */}
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
    </>
  );
}
export default InputPage;
