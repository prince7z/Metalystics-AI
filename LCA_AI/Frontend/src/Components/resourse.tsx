
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Resource(params: any) {
    const resourceData = params.data || params;

    // Safety check for data
    if (!resourceData) {
        return (
            <div className="max-w-6xl mx-auto p-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No resource data available to display.</p>
                </div>
            </div>
        );
    }

    // Donut Chart Data
    const donutData = {
        labels: resourceData.Donut_chart?.data.map((item: any) => item.source) || [],
        datasets: [
            {
                data: resourceData.Donut_chart?.data.map((item: any) => item.percent) || [],
                backgroundColor: [
                    'rgba(139, 69, 19, 0.8)',   // Coal - Brown
                    'rgba(54, 162, 235, 0.8)',  // Natural Gas - Blue
                    'rgba(76, 175, 80, 0.8)',   // Renewable - Green
                ],
                borderColor: [
                    'rgba(139, 69, 19, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(76, 175, 80, 1)',
                ],
                borderWidth: 2
            }
        ]
    };

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 10,
                    usePointStyle: true
                }
            },
            title: {
                display: true,
                text: resourceData.Donut_chart?.label || 'Energy Distribution',
                font: {
                    size: 14,
                    weight: 'bold' as const
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        }
    };

    // Waterfall Chart Data (using Bar chart to simulate waterfall)
    const waterfallData = {
        labels: resourceData.Waterfall_chart?.data.map((item: any) => item.label) || [],
        datasets: [
            {
                label: 'Resource Consumption',
                data: resourceData.Waterfall_chart?.data.map((item: any) => item.value) || [],
                backgroundColor: resourceData.Waterfall_chart?.data.map((item: any) => 
                    item.type === 'total' ? 'rgba(255, 152, 0, 0.8)' : 'rgba(33, 150, 243, 0.8)'
                ) || [],
                borderColor: resourceData.Waterfall_chart?.data.map((item: any) => 
                    item.type === 'total' ? 'rgba(255, 152, 0, 1)' : 'rgba(33, 150, 243, 1)'
                ) || [],
                borderWidth: 1
            }
        ]
    };

    const waterfallOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Resource Consumption Breakdown',
                font: {
                    size: 14,
                    weight: 'bold' as const
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.parsed.y} units`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Units'
                }
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-4">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Resource Efficiency Dashboard</h1>
                <p className="text-gray-600 text-sm">Energy distribution and resource consumption analysis</p>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Donut Chart */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="h-64">
                        <Doughnut data={donutData} options={donutOptions} />
                    </div>
                    <div className="mt-3 text-center">
                        <p className="text-sm text-gray-600">
                            Total: {resourceData.Donut_chart?.total || 0} {resourceData.Donut_chart?.unit || 'kWh'}
                        </p>
                    </div>
                </div>

                {/* Waterfall Chart */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="h-64">
                        <Bar data={waterfallData} options={waterfallOptions} />
                    </div>
                </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">Energy Consumption</p>
                    <p className="text-lg font-bold text-blue-900">
                        {resourceData.totalEnergyConsumed?.kWh_perTon || 0}
                    </p>
                    <p className="text-xs text-blue-500">kWh/ton</p>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-green-600 font-medium">Recovery Rate</p>
                    <p className="text-lg font-bold text-green-900">
                        {resourceData.materialRecoveryRate_percent?.recycled || 0}%
                    </p>
                    <p className="text-xs text-green-500">Recycled</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <p className="text-xs text-purple-600 font-medium">Circularity Score</p>
                    <p className="text-lg font-bold text-purple-900">
                        {resourceData.circularityScore_percent || 0}%
                    </p>
                    <p className="text-xs text-purple-500">Efficiency</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-orange-600 font-medium">Water Use</p>
                    <p className="text-lg font-bold text-orange-900">
                        {resourceData.waterConsumption_m3_perTon || 0}
                    </p>
                    <p className="text-xs text-orange-500">m³/ton</p>
                </div>
            </div>

            {/* Action Items */}
            {resourceData.actionsToTake && resourceData.actionsToTake.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2">
                            {resourceData.actionsToTake.map((action: string, index: number) => (
                                <li key={index} className="text-gray-700">{action}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}
  