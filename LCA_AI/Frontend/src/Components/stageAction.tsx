export default function StageActions(params: any) {
    const stageData = params.data || params;

    // Safety check for data
    if (!stageData || !Array.isArray(stageData) || stageData.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No stage actions data available to display.</p>
                </div>
            </div>
        );
    }

    // Stage metadata for better display
    const stageMetadata: Record<string, { icon: string; color: string; bgColor: string; title: string }> = {
        extraction: {
            icon: "⛏️",
            color: "text-orange-700",
            bgColor: "bg-orange-50 border-orange-200",
            title: "Material Extraction"
        },
        refining: {
            icon: "🏭",
            color: "text-blue-700",
            bgColor: "bg-blue-50 border-blue-200",
            title: "Material Refining"
        },
        smelting: {
            icon: "🔥",
            color: "text-red-700",
            bgColor: "bg-red-50 border-red-200",
            title: "Smelting Process"
        },
        casting: {
            icon: "🔨",
            color: "text-purple-700",
            bgColor: "bg-purple-50 border-purple-200",
            title: "Casting & Forming"
        },
        recycling: {
            icon: "♻️",
            color: "text-green-700",
            bgColor: "bg-green-50 border-green-200",
            title: "Recycling & Recovery"
        },
        transportation: {
            icon: "🚚",
            color: "text-yellow-700",
            bgColor: "bg-yellow-50 border-yellow-200",
            title: "Transportation"
        },
        endOfLife: {
            icon: "🗂️",
            color: "text-gray-700",
            bgColor: "bg-gray-50 border-gray-200",
            title: "End of Life"
        }
    };

    // Count total actions
    const totalActions = stageData.reduce((total: number, stage: any) => 
        total + (stage.actionsToTake ? stage.actionsToTake.length : 0), 0
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Stage-Specific Action Plan</h1>
                <p className="text-gray-600">Recommended improvement actions across all lifecycle stages</p>
                
                {/* Summary Stats */}
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Action Summary</h3>
                            <p className="text-sm text-gray-600">
                                {totalActions} total actions across {stageData.length} stages
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-blue-600">{totalActions}</p>
                            <p className="text-sm text-gray-600">Actions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stage Actions Grid */}
            <div className="space-y-6">
                {stageData.map((stage: any, stageIndex: number) => {
                    const metadata = stageMetadata[stage.stage] || {
                        icon: "📋",
                        color: "text-gray-700",
                        bgColor: "bg-gray-50 border-gray-200",
                        title: stage.stage.charAt(0).toUpperCase() + stage.stage.slice(1)
                    };

                    return (
                        <div key={stage._id || stageIndex} className={`border rounded-lg p-6 ${metadata.bgColor}`}>
                            {/* Stage Header */}
                            <div className="flex items-center mb-4">
                                <div className="flex items-center flex-1">
                                    <span className="text-2xl mr-3">{metadata.icon}</span>
                                    <div>
                                        <h2 className={`text-xl font-bold ${metadata.color}`}>
                                            {metadata.title}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {stage.actionsToTake ? stage.actionsToTake.length : 0} recommended actions
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${metadata.color} bg-white border`}>
                                    Stage {stageIndex + 1}
                                </div>
                            </div>

                            {/* Actions List */}
                            {stage.actionsToTake && stage.actionsToTake.length > 0 ? (
                                <div className="space-y-3">
                                    {stage.actionsToTake.map((action: string, actionIndex: number) => (
                                        <div key={actionIndex} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                                                        metadata.color.replace('text-', 'bg-').replace('-700', '-500')
                                                    }`}>
                                                        {actionIndex + 1}
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <p className="text-sm font-medium text-gray-900 leading-relaxed">
                                                        {action}
                                                    </p>
                                                    
                                                    {/* Action Type Badge */}
                                                    <div className="mt-2">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            action.toLowerCase().includes('energy') || action.toLowerCase().includes('renewable') ? 
                                                                'bg-yellow-100 text-yellow-800' :
                                                            action.toLowerCase().includes('recycle') || action.toLowerCase().includes('reuse') ?
                                                                'bg-green-100 text-green-800' :
                                                            action.toLowerCase().includes('water') || action.toLowerCase().includes('waste') ?
                                                                'bg-blue-100 text-blue-800' :
                                                            action.toLowerCase().includes('optimize') || action.toLowerCase().includes('efficiency') ?
                                                                'bg-purple-100 text-purple-800' :
                                                                'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {action.toLowerCase().includes('energy') || action.toLowerCase().includes('renewable') ? '⚡ Energy' :
                                                             action.toLowerCase().includes('recycle') || action.toLowerCase().includes('reuse') ? '♻️ Circular' :
                                                             action.toLowerCase().includes('water') || action.toLowerCase().includes('waste') ? '💧 Resource' :
                                                             action.toLowerCase().includes('optimize') || action.toLowerCase().includes('efficiency') ? '⚙️ Efficiency' :
                                                             '📋 General'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                    <p className="text-gray-500 text-sm">No specific actions recommended for this stage</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Action Categories Summary */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Action Categories Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(() => {
                        const categories = {
                            energy: { count: 0, icon: '⚡', label: 'Energy', color: 'bg-yellow-500' },
                            circular: { count: 0, icon: '♻️', label: 'Circular', color: 'bg-green-500' },
                            resource: { count: 0, icon: '💧', label: 'Resource', color: 'bg-blue-500' },
                            efficiency: { count: 0, icon: '⚙️', label: 'Efficiency', color: 'bg-purple-500' }
                        };

                        // Count actions by category
                        stageData.forEach((stage: any) => {
                            if (stage.actionsToTake) {
                                stage.actionsToTake.forEach((action: string) => {
                                    const lowerAction = action.toLowerCase();
                                    if (lowerAction.includes('energy') || lowerAction.includes('renewable')) {
                                        categories.energy.count++;
                                    } else if (lowerAction.includes('recycle') || lowerAction.includes('reuse')) {
                                        categories.circular.count++;
                                    } else if (lowerAction.includes('water') || lowerAction.includes('waste')) {
                                        categories.resource.count++;
                                    } else if (lowerAction.includes('optimize') || lowerAction.includes('efficiency')) {
                                        categories.efficiency.count++;
                                    }
                                });
                            }
                        });

                        return Object.entries(categories).map(([key, category]) => (
                            <div key={key} className="bg-white border border-gray-300 rounded-lg p-4 text-center">
                                <div className={`w-12 h-12 rounded-full ${category.color} mx-auto mb-2 flex items-center justify-center`}>
                                    <span className="text-white text-lg">{category.icon}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{category.label}</p>
                                <p className="text-lg font-bold text-gray-900">{category.count}</p>
                                <p className="text-xs text-gray-500">actions</p>
                            </div>
                        ));
                    })()}
                </div>
            </div>

            {/* Implementation Priority */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Priority Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">🔴 High Priority</h4>
                        <p className="text-sm text-red-700">
                            Energy efficiency and renewable energy actions - immediate environmental impact
                        </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">🟡 Medium Priority</h4>
                        <p className="text-sm text-yellow-700">
                            Process optimization and waste reduction - cost-effective improvements
                        </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">🟢 Long Term</h4>
                        <p className="text-sm text-green-700">
                            Circular economy initiatives - strategic sustainability goals
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
                    {JSON.stringify(stageData, null, 2)}
                </pre>
            </details>
        </div>
    );
}