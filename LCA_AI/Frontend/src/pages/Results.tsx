import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const model_thinking = [
    "Analyzing project data...",
    "Calculating core impacts...",
    "Reviewing lifecycle stages...",
    "Identifying key metrics...",
    "Synthesizing results...",
    "Compiling lifecycle metrics...",
    "Evaluating environmental impact...",
    "Assessing circularity potential...",
    "Generating comprehensive insights..."
];

export default function Results() {
    const { id } = useParams();
    
    const [loading, setLoading] = useState(true);
    const [thinkingIndex, setThinkingIndex] = useState(0); // ← Move this to component level
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000); // 5 seconds
        
        return () => clearTimeout(timer);
    }, []);

    // ← Move the thinking text effect to component level
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setThinkingIndex(prev => (prev + 1) % model_thinking.length);
            }, 500); // Change every 0.5 seconds
            
            return () => clearInterval(interval);
        }
    }, [loading]);
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600 mb-2">{model_thinking[thinkingIndex]}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Project Results</h1>
                    <p className="text-lg text-gray-600">Comprehensive analysis and insights for your LCA project</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-6xl mx-auto px-6 py-6">
                <nav className="mb-8">
                    <div className="border-b border-gray-200">
                        <ul className="flex space-x-8 -mb-px">
                            <li>
                                <Link 
                                    to={`/project/results/envimpact/${id}`}
                                    className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
                                >
                                    <span className="mr-2">🌍</span>
                                    Environmental Impact
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={`/project/results/circularity/${id}`}
                                    className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
                                >
                                    <span className="mr-2">♻️</span>
                                    Circularity
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={`/project/results/strategies/${id}`}
                                    className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
                                >
                                    <span className="mr-2">📋</span>
                                    Strategies
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={`/project/results/stageaction/${id}`}
                                    className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
                                >
                                    <span className="mr-2">🎯</span>
                                    Stage Actions
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={`/project/results/comparison/${id}`}
                                    className="group inline-flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
                                >
                                    <span className="mr-2">📊</span>
                                    Comparison
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Content Area */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="text-center mb-12">
                        <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">📈</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Results Overview</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore comprehensive analysis and insights across different sustainability dimensions. 
                            Select a category from the navigation above to view detailed results.
                        </p>
                    </div>

                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Link 
                            to={`/project/results/envimpact/${id}`}
                            className="group bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-white text-xl">🌍</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700">
                                    Environmental Impact
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Analyze carbon footprint, resource usage, emissions, and other environmental metrics across the lifecycle.
                            </p>
                            <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                                <span className="mr-2">View Analysis</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>

                        <Link 
                            to={`/project/results/circularity/${id}`}
                            className="group bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-white text-xl">♻️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                                    Circularity Assessment
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Evaluate material flows, recycling rates, and circular economy potential for sustainable design.
                            </p>
                            <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                                <span className="mr-2">View Analysis</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>

                        <Link 
                            to={`/project/results/strategies/${id}`}
                            className="group bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-white text-xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700">
                             Strategies
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Review product lifecycle strategies, repairability scores, and life extension recommendations.
                            </p>
                            <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                                <span className="mr-2">View Analysis</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>

                  

                      

                        
                    </div>

                    {/* Quick Access Actions */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                <span className="mr-2">📄</span>
                                Export Report
                            </button>
                            <button className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                <span className="mr-2">📊</span>
                                Download Data
                            </button>
                            <button className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                <span className="mr-2">📤</span>
                                Share Results
                            </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
