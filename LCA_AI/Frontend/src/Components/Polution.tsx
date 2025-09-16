

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import SunburstChart from './SunburstChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Polution(params: any) {
    const pollutionData = params.data || params;

    // Safety check for data
    if (!pollutionData) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No pollution data available to display.</p>
                </div>
            </div>
        );
    }

    // Air Pollution Bar Chart
    const airData = {
        labels: pollutionData.air?.map((item: any) => item.pollutant) || [],
        datasets: [
            {
                label: 'Air Pollutants (kg/ton)',
                data: pollutionData.air?.map((item: any) => item.value_kg_perTon) || [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ]
    };

    // Water Pollution Bar Chart
    const waterData = {
        labels: pollutionData.water?.map((item: any) => item.pollutant) || [],
        datasets: [
            {
                label: 'Water Pollutants (ml/ton)',
                data: pollutionData.water?.map((item: any) => item.value_ml_perTon) || [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
        ]
    };

    // Soil Pollution Doughnut Chart
    const soilData = {
        labels: pollutionData.soil?.map((item: any) => item.pollutant) || [],
        datasets: [
            {
                data: pollutionData.soil?.map((item: any) => item.value_ton_perTon) || [],
                backgroundColor: ['#FFCE56', '#FF6384'],
                borderWidth: 2,
                borderColor: '#fff'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Pollution Analysis'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Soil Pollution Distribution'
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Pollution Analysis Dashboard</h1>
                <p className="text-gray-600 text-sm">Comprehensive view of air, water, and soil pollution metrics</p>
            </div>

            {/* Compact Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sunburst Chart */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 text-center">
                        🌟 Overall Distribution
                    </h2>
                    <div className="flex justify-center">
                        {pollutionData.sun_burst_chart && (
                            <SunburstChart 
                                data={pollutionData.sun_burst_chart} 
                                width={320} 
                                height={320} 
                            />
                        )}
                    </div>
                </div>

                {/* Pollution Summary Table */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">📊 Pollution Summary</h2>
                    <div className="space-y-3">
                        {/* Air Pollution Summary */}
                        <div className="border-l-4 border-red-500 pl-3">
                            <h3 className="font-semibold text-red-700 text-sm">Air Pollution</h3>
                            <div className="text-xs text-gray-600 space-y-1">
                                {pollutionData.air?.map((item: any) => (
                                    <div key={item._id} className="flex justify-between">
                                        <span>{item.pollutant}:</span>
                                        <span className="font-medium">{item.value_kg_perTon} kg/ton</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Water Pollution Summary */}
                        <div className="border-l-4 border-blue-500 pl-3">
                            <h3 className="font-semibold text-blue-700 text-sm">Water Pollution</h3>
                            <div className="text-xs text-gray-600 space-y-1">
                                {pollutionData.water?.map((item: any) => (
                                    <div key={item._id} className="flex justify-between">
                                        <span>{item.pollutant}:</span>
                                        <span className="font-medium">{item.value_ml_perTon} ml/ton</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soil Pollution Summary */}
                        <div className="border-l-4 border-yellow-500 pl-3">
                            <h3 className="font-semibold text-yellow-700 text-sm">Soil Pollution</h3>
                            <div className="text-xs text-gray-600 space-y-1">
                                {pollutionData.soil?.map((item: any) => (
                                    <div key={item._id} className="flex justify-between">
                                        <span>{item.pollutant}:</span>
                                        <span className="font-medium">{item.value_ton_perTon} ton/ton</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Air Pollution */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-1">🌫️</span>
                        Air Pollution
                    </h3>
                    <div className="h-40">
                        <Bar data={airData} options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                legend: { display: false },
                                title: { display: false }
                            }
                        }} />
                    </div>
                </div>

                {/* Water Pollution */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-1">💧</span>
                        Water Pollution
                    </h3>
                    <div className="h-40">
                        <Bar data={waterData} options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                legend: { display: false },
                                title: { display: false }
                            }
                        }} />
                    </div>
                </div>

                {/* Soil Pollution */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                        <span className="mr-1">🌱</span>
                        Soil Pollution
                    </h3>
                    <div className="h-40">
                        <Doughnut data={soilData} options={{
                            ...doughnutOptions,
                            plugins: {
                                ...doughnutOptions.plugins,
                                legend: { display: false },
                                title: { display: false }
                            }
                        }} />
                    </div>
                </div>
            </div>

            {/* Action Items - Compact */}
            {pollutionData.actionsToTake && pollutionData.actionsToTake.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2">
                            {pollutionData.actionsToTake.map((action: string, index: number) => (
                                <li key={index} className="text-gray-700">{action}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}