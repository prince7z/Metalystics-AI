import mongoose from "mongoose";

// Results Schema
export const ResultsSchema = new mongoose.Schema({
  environmentalImpact: {
    core: {
      resultId: String,
      description: String,
      globalWarmingPotential_kg_CO2_eq: Number,
      acidificationPotential_kg_SO2_eq: Number,
      eutrophicationPotential_kg_PO4_eq: Number,
      ozoneDepletionPotential_kg_CFC11_eq: Number,
      cumulativeEnergyDemand_MJ: Number,
      waterFootprint_L: Number,
      landUse_m2: Number,
      photochemicalSmogPotential_kgC2H4eq: Number,
      humanToxicity_kg14DCBeq: Number,
      ecoToxicity_kg14DCBeq: Number,
      waterUse_m3: Number,
      landImpact_m2_year: Number,
      actionsToTake: [String]
    },
    stageWiseBreakdown: {
      unit: String,
      stack_bar_chart: {
        title: String,
        categories: [String],
        series: [
          {
            name: String,
            data: [Number]
          }
        ]
      },
      stages: [
        {
          stage: String,
          value: Number,
          percentOfTotal: Number
        }
      ],
      total: {
        value: Number,
        percentOfTotal: Number
      },
      actionsToTake: [String]
    },
    totalPollutionOutput: {
      sun_burst_chart: {
        name: String,
        children: [
          {
            name: String,
            children: [
              {
                name: String,
                value: Number
              }
            ]
          }
        ]
      },
      air: [
        {
          pollutant: String,
          value_kg_perTon: Number
        }
      ],
      water: [
        {
          pollutant: String,
          value_ml_perTon: Number
        }
      ],
      soil: [
        {
          pollutant: String,
          value_ton_perTon: Number
        }
      ],
      actionsToTake: [String]
    },
    resourceEfficiency: {
      Donut_chart: {
        label: String,
        data: [
          {
            source: String,
            percent: Number
          }
        ],
        unit: String,
        total: Number
      },
      Waterfall_chart: {
        data: [
          {
            label: String,
            value: Number,
            type: {
              type: String,
              enum: ["total", null],
              default: null
            }
          }
        ]
      },
      totalEnergyConsumed: {
        kWh_perTon: Number,
        MJ_perTon: Number
      },
      energyBreakdown: [
        {
          source: String,
          percent: Number
        }
      ],
      materialRecoveryRate_percent: {
        recycled: Number,
        landfilled: Number
      },
      waterConsumption_m3_perTon: Number,
      circularityScore_percent: Number,
      wasteReductionPotential_percent: Number,
      efficiencyTrend: String,
      actionsToTake: [String]
    }
  },
  circularity: {
    gauge_chart: {
      label: String,
      currentValue: Number,
      maxValue: Number,
      targetValue: Number,
      unit: String
    },
    circular_sneeky_chart: {
      nodes: [
        {
          name: String
        }
      ],
      links: [
        {
          source: String,
          target: String,
          value: Number
        }
      ]
    },
    metrics: {
      recycledContent_percent: Number,
      materialRecoveryRate_percent: Number,
      reuseRate_percent: Number,
      landfillRate_percent: Number,
      downcyclingRisk_percent: Number,
      circularityScore_percent: Number,
      circularitySummary: {
        finalCircularityScore_percent: Number,
        targetScore_percent: Number,
        priorityActions: [String]
      }
    },
    strategies: {
      designAndProductLife: {
        designLife_years: Number,
        actualAverageLife_years: Number,
        repairabilityScore_percent: Number,
        maintenanceFrequency_perYear: Number,
        lifeExtensionStrategies: [String],
        actionsToTake: [String]
      },
      reusePotential: {
        componentsReusable_percent: Number,
        primaryReuseApplications: [String],
        barriersToReuse: [String],
        actionsToTake: [String]
      },
      recycledMaterialFlow: {
        currentRecycledContent_percent: Number,
        targetRecycledContent_percent: Number,
        sources: [
          {
            type: String,
            percent: Number
          }
        ],
        qualityLevel: String,
        downcyclingRisk_percent: Number,
        actionsToTake: [String]
      },
      endOfLifeManagement: {
        collectionRate_percent: Number,
        sortingMethod: String,
        materialRecoveryRate_percent: Number,
        landfillRate_percent: Number,
        energyRecoveryRate_percent: Number,
        actionsToTake: [String]
      }
    },
    stageWiseCircularityActions: [
      {
        stage: String,
        actionsToTake: [String]
      }
    ],
    comparison: {
      radar_chart: {
        labels: [String],
        datasets: [
          {
            label: String,
            data: [Number]
          }
        ]
      },
      linearVsCircular: {
        linearModel: {
          rawMaterialUse_percentVirgin: Number,
          recycledContent_percent: Number,
          landfillRate_percent: Number,
          reuseRate_percent: Number,
          productLife_years: Number,
          wasteGenerated_kgPerTon: Number,
          energyConsumption_kWhPerTon: Number,
          CO2Emissions_kgPerTon: Number
        },
        circularModel: {
          rawMaterialUse_percentVirgin: Number,
          recycledContent_percent: Number,
          landfillRate_percent: Number,
          reuseRate_percent: Number,
          productLife_years: Number,
          wasteGenerated_kgPerTon: Number,
          energyConsumption_kWhPerTon: Number,
          CO2Emissions_kgPerTon: Number
        },
        keyIndicators: [
          {
            metric: String,
            linear: Number,
            circular: Number,
            unit: String,
            improvement: String
          }
        ],
        gapAnalysis: [String],
        actionsToTake: [String]
      }
    }
  },
  generatedReport: {
    fileId: String,
    fileType: {
      type: String,
      enum: ["pdf", "docx", "html", "json"]
    },
    description: String,
    filePath: String,
    generatedAt: Date
  }
});


export const Results = mongoose.model("Results", ResultsSchema);