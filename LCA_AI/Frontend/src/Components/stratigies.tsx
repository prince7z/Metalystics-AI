export default function Strategies(params: any) {
    const strategyData = params.data || params;

    // Safety check for data
    if (!strategyData || !strategyData.designAndProductLife) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No strategy data available to display.</p>
                </div>
            </div>
        );
    }

    const designData = strategyData.designAndProductLife;

    // Helper function to format numbers
    const formatValue = (value: number | undefined | null, unit: string = "") => {
        if (value === undefined || value === null || isNaN(value)) {
            return "N/A";
        }
        return `${value}${unit}`;
    };

    // Function to get status based on metric performance
    const getLifecycleStatus = (actual: number, design: number) => {
        const ratio = (actual / design) * 100;
        if (ratio >= 90) {
            return { status: 'Excellent', colorClass: 'bg-green-500', textClass: 'text-green-800' };
        } else if (ratio >= 70) {
            return { status: 'Good', colorClass: 'bg-blue-500', textClass: 'text-blue-800' };
        } else if (ratio >= 50) {
            return { status: 'Moderate', colorClass: 'bg-yellow-500', textClass: 'text-yellow-800' };
        } else {
            return { status: 'Poor', colorClass: 'bg-red-500', textClass: 'text-red-800' };
        }
    };

    const repairabilityStatus = (score: number) => {
        if (score >= 80) {
            return { status: 'Excellent', colorClass: 'bg-green-500', textClass: 'text-green-800' };
        } else if (score >= 60) {
            return { status: 'Good', colorClass: 'bg-blue-500', textClass: 'text-blue-800' };
        } else if (score >= 40) {
            return { status: 'Moderate', colorClass: 'bg-yellow-500', textClass: 'text-yellow-800' };
        } else {
            return { status: 'Poor', colorClass: 'bg-red-500', textClass: 'text-red-800' };
        }
    };

    const lifecycleStatus = getLifecycleStatus(designData.actualAverageLife_years, designData.designLife_years);
    const repairStatus = repairabilityStatus(designData.repairabilityScore_percent);

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Design & Product Life Strategies</h1>
                <p className="text-gray-600">Product lifecycle optimization and sustainability strategies</p>
            </div>

            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Design Life vs Actual Life */}
                <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Product Lifespan</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatValue(designData.actualAverageLife_years)} years
                            </p>
                            <p className="text-xs text-gray-500">
                                Design: {formatValue(designData.designLife_years)} years
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${lifecycleStatus.colorClass} mr-2`}></div>
                            <span className={`text-xs font-medium ${lifecycleStatus.textClass}`}>
                                {lifecycleStatus.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Repairability Score */}
                <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Repairability</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatValue(designData.repairabilityScore_percent, "%")}
                            </p>
                            <p className="text-xs text-gray-500">Repair Score</p>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${repairStatus.colorClass} mr-2`}></div>
                            <span className={`text-xs font-medium ${repairStatus.textClass}`}>
                                {repairStatus.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Maintenance Frequency */}
                <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Maintenance</h3>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatValue(designData.maintenanceFrequency_perYear)}
                        </p>
                        <p className="text-xs text-gray-500">Times per year</p>
                    </div>
                </div>

                {/* Life Extension Potential */}
                <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Extension Potential</h3>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">
                            {designData.lifeExtensionStrategies ? designData.lifeExtensionStrategies.length : 0}
                        </p>
                        <p className="text-xs text-gray-500">Active strategies</p>
                    </div>
                </div>
            </div>

            {/* Current Life Extension Strategies */}
            {designData.lifeExtensionStrategies && designData.lifeExtensionStrategies.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Current Life Extension Strategies</h2>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {designData.lifeExtensionStrategies.map((strategy: string, index: number) => (
                                <div key={index} className="bg-white border border-green-300 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{strategy}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Actions to Take */}
            {designData.actionsToTake && designData.actionsToTake.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions for Improvement</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="space-y-4">
                            {designData.actionsToTake.map((action: string, index: number) => (
                                <div key={index} className="bg-white border border-blue-300 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold text-sm">→</span>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{action}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Performance Analysis */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lifespan Analysis */}
                    <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifespan Performance</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Design Life:</span>
                                <span className="text-sm font-medium">{formatValue(designData.designLife_years)} years</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Actual Average Life:</span>
                                <span className="text-sm font-medium">{formatValue(designData.actualAverageLife_years)} years</span>
                            </div>
                            <div className="border-t pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Achievement Rate:</span>
                                    <span className={`text-sm font-bold ${lifecycleStatus.textClass}`}>
                                        {((designData.actualAverageLife_years / designData.designLife_years) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance Analysis */}
                    <div className="bg-white border border-gray-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Profile</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Frequency per Year:</span>
                                <span className="text-sm font-medium">{formatValue(designData.maintenanceFrequency_perYear)} times</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Repairability Score:</span>
                                <span className={`text-sm font-bold ${repairStatus.textClass}`}>
                                    {formatValue(designData.repairabilityScore_percent, "%")}
                                </span>
                            </div>
                            <div className="border-t pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Maintenance Level:</span>
                                    <span className="text-sm font-medium">
                                        {designData.maintenanceFrequency_perYear <= 1 ? 'Low' : 
                                         designData.maintenanceFrequency_perYear <= 3 ? 'Moderate' : 'High'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Insights */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className={`w-12 h-12 rounded-full ${lifecycleStatus.colorClass} mx-auto mb-2 flex items-center justify-center`}>
                            <span className="text-white font-bold">L</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Lifespan</p>
                        <p className={`text-xs ${lifecycleStatus.textClass}`}>{lifecycleStatus.status}</p>
                    </div>
                    <div className="text-center">
                        <div className={`w-12 h-12 rounded-full ${repairStatus.colorClass} mx-auto mb-2 flex items-center justify-center`}>
                            <span className="text-white font-bold">R</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Repairability</p>
                        <p className={`text-xs ${repairStatus.textClass}`}>{repairStatus.status}</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-500 mx-auto mb-2 flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Strategies</p>
                        <p className="text-xs text-gray-600">
                            {designData.lifeExtensionStrategies ? designData.lifeExtensionStrategies.length : 0} Active
                        </p>
                    </div>
                </div>
            </div>

            {/* Debug Section (remove in production) */}
            <details className="mt-8">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Debug: Raw Data Structure
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify(strategyData, null, 2)}
                </pre>
            </details>
        </div>
    );
}