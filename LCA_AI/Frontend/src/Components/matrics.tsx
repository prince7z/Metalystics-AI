export default function Matrics(params: any) {
    const data = params.data || params;

    // Safety check for data
    if (!data) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No circularity data available to display.</p>
                </div>
            </div>
        );
    }

    const circularityData = data;

    // Helper function to format numbers
    const formatValue = (value: number | undefined | null) => {
        if (value === undefined || value === null || isNaN(value)) {
            return "N/A";
        }
        return `${value}%`;
    };

    // Function to get status based on metric thresholds for circularity
    const getCircularityStatus = (value: number | undefined | null, metricType: string) => {
        if (value === undefined || value === null || isNaN(value)) {
            return { status: 'N/A', colorClass: 'bg-gray-500' };
        }

        const thresholds: Record<string, { green: number; red: number }> = {
            'circularity': { green: 80, red: 50 },
            'recycledContent': { green: 50, red: 20 },
            'materialRecovery': { green: 85, red: 60 },
            'reuse': { green: 60, red: 30 },
            'landfill': { green: 10, red: 30 }, // Lower is better for landfill
            'downcycling': { green: 10, red: 25 } // Lower is better for downcycling
        };

        const threshold = thresholds[metricType];
        if (!threshold) return { status: 'Unknown', colorClass: 'bg-gray-500' };

        // For negative metrics (landfill, downcycling), reverse the logic
        if (metricType === 'landfill' || metricType === 'downcycling') {
            if (value <= threshold.green) {
                return { status: 'Good', colorClass: 'bg-green-500' };
            } else if (value <= threshold.red) {
                return { status: 'Moderate', colorClass: 'bg-yellow-500' };
            } else {
                return { status: 'Poor', colorClass: 'bg-red-500' };
            }
        } else {
            // For positive metrics
            if (value >= threshold.green) {
                return { status: 'Good', colorClass: 'bg-green-500' };
            } else if (value >= threshold.red) {
                return { status: 'Moderate', colorClass: 'bg-yellow-500' };
            } else {
                return { status: 'Poor', colorClass: 'bg-red-500' };
            }
        }
    };

    // All circularity metrics for the table
    const circularityMetrics = [
        {
            name: "Overall Circularity Score",
            value: circularityData.circularityScore_percent,
            unit: "%",
            metricType: 'circularity',
            description: "Overall measure of circular economy implementation"
        },
        {
            name: "Recycled Content",
            value: circularityData.recycledContent_percent,
            unit: "%",
            metricType: 'recycledContent',
            description: "Percentage of recycled materials in production"
        },
        {
            name: "Material Recovery Rate",
            value: circularityData.materialRecoveryRate_percent,
            unit: "%",
            metricType: 'materialRecovery',
            description: "Efficiency of material recovery from waste"
        },
        {
            name: "Reuse Rate",
            value: circularityData.reuseRate_percent,
            unit: "%",
            metricType: 'reuse',
            description: "Percentage of materials reused without reprocessing"
        },
        {
            name: "Landfill Rate",
            value: circularityData.landfillRate_percent,
            unit: "%",
            metricType: 'landfill',
            description: "Percentage of waste sent to landfill (lower is better)"
        },
        {
            name: "Downcycling Risk",
            value: circularityData.downcyclingRisk_percent,
            unit: "%",
            metricType: 'downcycling',
            description: "Risk of material quality degradation (lower is better)"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Circularity Assessment</h1>
                <p className="text-gray-600">Material flow and circular economy metrics</p>
                
                {/* Summary Score Card */}
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Current Circularity Score</h3>
                            <p className="text-3xl font-bold text-blue-600">
                                {circularityData.circularitySummary?.finalCircularityScore_percent || circularityData.circularityScore_percent}%
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Target Score</p>
                            <p className="text-xl font-semibold text-green-600">
                                {circularityData.circularitySummary?.targetScore_percent || 85}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Circularity Metrics Table */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Circularity Metric
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {circularityMetrics.map((metric, index) => {
                            const status = getCircularityStatus(metric.value, metric.metricType);
                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                                        {metric.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                                        <span className="text-lg font-semibold">
                                            {formatValue(metric.value)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                                        <div className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full ${status.colorClass} mr-2`}></div>
                                            <span className="font-medium">{status.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 border-b">
                                        {metric.description}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="mb-6 flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Good</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Moderate</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Poor</span>
                </div>
            </div>

            {/* Priority Actions */}
            {circularityData.circularitySummary?.priorityActions && circularityData.circularitySummary.priorityActions.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Priority Actions for Circularity Improvement</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2">
                            {circularityData.circularitySummary.priorityActions.map((action: string, index: number) => (
                                <li key={index} className="text-blue-800 font-medium">{action}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}

            {/* Additional Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Strengths</h3>
                    <p className="text-sm text-green-700">
                        {circularityData.materialRecoveryRate_percent >= 80 ? "Excellent material recovery" : "Good recovery potential"}
                    </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">Opportunities</h3>
                    <p className="text-sm text-yellow-700">
                        {circularityData.recycledContent_percent < 50 ? "Increase recycled content" : "Optimize processes"}
                    </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2">Areas of Concern</h3>
                    <p className="text-sm text-red-700">
                        {circularityData.landfillRate_percent > 20 ? "High landfill rate" : "Monitor waste streams"}
                    </p>
                </div>
            </div>

            {/* Debug Section (remove in production) */}
            <details className="mt-8">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Debug: Raw Data Structure
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </details>
        </div>
    );
}
