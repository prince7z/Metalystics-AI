
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StageWise(params: any) {
    const stageData = params.data || params;

    // Safety check for data
    if (!stageData || !stageData.stack_bar_chart) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No stage-wise data available to display.</p>
                </div>
            </div>
        );
    }

    const chartData = stageData.stack_bar_chart;

    // Prepare data for the stacked bar chart
    const barData = {
        labels: chartData.categories,
        datasets: chartData.series.map((series: any, index: number) => {
            const colors = [
                'rgba(51, 101, 138, 0.8)',   // Ozone - Dark blue/teal
                'rgba(76, 175, 80, 0.8)',    // Eutro - Green
                'rgba(244, 67, 54, 0.8)',    // Acid - Red
                'rgba(33, 150, 243, 0.8)',   // GWP - Light blue/cyan
            ];
            const borderColors = [
                'rgba(51, 101, 138, 1)',
                'rgba(76, 175, 80, 1)',
                'rgba(244, 67, 54, 1)',
                'rgba(33, 150, 243, 1)',
            ];
            
            return {
                label: series.name,
                data: series.data,
                backgroundColor: colors[index % colors.length],
                borderColor: borderColors[index % borderColors.length],
                borderWidth: 1
            };
        })
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: chartData.title
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const percentage = stageData.stages[context.dataIndex]?.percentOfTotal || 0;
                        return `${context.dataset.label}: ${context.parsed.y} ${stageData.unit} (${percentage}%)`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: `Impact Value`
                }
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Stage-wise Breakdown</h1>
                <p className="text-gray-600 text-sm">GHG emissions analysis by process stage</p>
            </div>

            {/* Chart and Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4">
                    <div className="h-80">
                        <Bar data={barData} options={chartOptions} />
                    </div>
                </div>

                {/* Summary Panel */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Emissions Summary</h2>
                    
                    {/* Total Emissions */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{stageData.total.value}</p>
                            <p className="text-sm text-gray-600">{stageData.unit}</p>
                            <p className="text-xs text-gray-500">Total Emissions</p>
                        </div>
                    </div>

                    {/* Stage Breakdown */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-800 text-sm mb-2">By Stage:</h3>
                        {stageData.stages.map((stage: any, index: number) => {
                            const colors = [
                                'border-red-500',
                                'border-blue-500', 
                                'border-yellow-500',
                                'border-teal-500',
                                'border-purple-500'
                            ];
                            
                            return (
                                <div key={stage._id} className={`border-l-4 ${colors[index]} pl-3 py-1`}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-medium capitalize">
                                            {stage.stage.replace(/_/g, ' ')}
                                        </span>
                                        <span className="text-xs text-gray-600">
                                            {stage.percentOfTotal}%
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stage.value} {stageData.unit}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Action Items */}
            {stageData.actionsToTake && stageData.actionsToTake.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2">
                            {stageData.actionsToTake.map((action: string, index: number) => (
                                <li key={index} className="text-gray-700">{action}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}