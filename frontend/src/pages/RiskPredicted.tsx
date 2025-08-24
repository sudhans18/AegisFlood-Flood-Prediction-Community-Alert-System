import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, StatusPill } from '../components/ui';

interface RiskPrediction {
  id: string;
  location: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  timeframe: string;
  factors: string[];
  recommendations: string[];
  icon: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: string;
}

const RiskPredicted: React.FC = () => {
  const { token, role } = useAuth();
  const [predictions, setPredictions] = useState<RiskPrediction[]>([
    {
      id: '1',
      location: 'Guwahati City Center',
      riskLevel: 'high',
      probability: 85,
      timeframe: 'Next 24 hours',
      factors: ['Heavy rainfall forecast', 'High river levels', 'Poor drainage'],
      recommendations: ['Avoid low-lying areas', 'Keep emergency kit ready', 'Monitor updates'],
      icon: '🌧️',
      trend: 'increasing',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      location: 'North Guwahati',
      riskLevel: 'critical',
      probability: 95,
      timeframe: 'Next 12 hours',
      factors: ['Brahmaputra overflow', 'Landslide risk', 'Evacuation needed'],
      recommendations: ['Immediate evacuation', 'Move to higher ground', 'Follow emergency protocols'],
      icon: '🌊',
      trend: 'increasing',
      lastUpdated: '1 hour ago'
    },
    {
      id: '3',
      location: 'South Guwahati',
      riskLevel: 'medium',
      probability: 60,
      timeframe: 'Next 48 hours',
      factors: ['Moderate rainfall', 'Localized flooding', 'Drainage issues'],
      recommendations: ['Stay alert', 'Avoid waterlogged areas', 'Keep documents safe'],
      icon: '⚡',
      trend: 'stable',
      lastUpdated: '3 hours ago'
    },
    {
      id: '4',
      location: 'East Guwahati',
      riskLevel: 'low',
      probability: 25,
      timeframe: 'Next 72 hours',
      factors: ['Light rainfall', 'Good drainage', 'Elevated terrain'],
      recommendations: ['Normal activities', 'Stay informed', 'Report any issues'],
      icon: '🌤️',
      trend: 'decreasing',
      lastUpdated: '4 hours ago'
    },
    {
      id: '5',
      location: 'West Guwahati',
      riskLevel: 'high',
      probability: 75,
      timeframe: 'Next 36 hours',
      factors: ['Heavy downpour', 'Flash flood risk', 'Urban flooding'],
      recommendations: ['Avoid travel', 'Secure belongings', 'Stay indoors'],
      icon: '🌩️',
      trend: 'increasing',
      lastUpdated: '30 minutes ago'
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState<'12h' | '24h' | '48h' | '72h'>('24h');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredPredictions = predictions.filter(prediction => {
    const riskMatch = selectedRiskLevel === 'all' || prediction.riskLevel === selectedRiskLevel;
    return riskMatch;
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'high': return 'from-orange-400 to-red-500';
      case 'critical': return 'from-red-500 to-red-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-red-600';
      case 'decreasing': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-lg">🔮</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Risk Predictions</h1>
              <p className="text-xs text-gray-600">AI-powered flood risk forecasting</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
            <span className="text-xs text-gray-600">Live Predictions</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 py-1 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-gray-700">Timeframe:</span>
            {(['12h', '24h', '48h', '72h'] as const).map(timeframe => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                  selectedTimeframe === timeframe
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-gray-700">Risk Level:</span>
            {(['all', 'low', 'medium', 'high', 'critical'] as const).map(level => (
              <button
                key={level}
                onClick={() => setSelectedRiskLevel(level)}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                  selectedRiskLevel === level
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 min-h-0 max-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-h-full">
          {filteredPredictions.slice(0, 6).map((prediction, index) => (
            <Card key={prediction.id} className="p-2 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start space-x-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${getRiskColor(prediction.riskLevel)} rounded-full flex items-center justify-center text-lg animate-bounce`}>
                  {prediction.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-800">{prediction.location}</h3>
                    <div className="flex items-center space-x-1">
                      <StatusPill status={prediction.riskLevel} />
                      <span className={`text-lg ${getTrendColor(prediction.trend)} animate-pulse`}>
                        {getTrendIcon(prediction.trend)}
                      </span>
                    </div>
                  </div>
                  {/* Probability Bar */}
                  <div className="mb-1">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="text-gray-600">Probability: {prediction.probability}%</span>
                      <span className="text-gray-500">{prediction.timeframe}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full bg-gradient-to-r ${getRiskColor(prediction.riskLevel)} transition-all duration-1000 animate-pulse`}
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* Risk Factors */}
                  <div className="mb-1">
                    <p className="text-[10px] font-medium text-gray-700 mb-0.5">Risk Factors:</p>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.map((factor, factorIndex) => (
                        <span key={factorIndex} className="px-1 py-0.5 bg-red-100 text-red-700 text-[10px] rounded-full animate-pulse">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Recommendations */}
                  <div className="mb-1">
                    <p className="text-[10px] font-medium text-gray-700 mb-0.5">Recommendations:</p>
                    <div className="space-y-0.5">
                      {prediction.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="flex items-center space-x-1 text-[10px] text-gray-600">
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                    <span className="text-[10px] text-gray-500">Updated: {prediction.lastUpdated}</span>
                    <Button className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskPredicted;
