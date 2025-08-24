import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, StatusPill } from '../components/ui';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'expired';
  icon: string;
  affectedAreas: string[];
}

const RecentAlerts: React.FC = () => {
  const { token, role } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Heavy Rainfall Warning',
      description: 'Intense rainfall expected in Guwahati area with potential flooding in low-lying regions.',
      severity: 'high',
      location: 'Guwahati, Assam',
      timestamp: '2 hours ago',
      status: 'active',
      icon: '🌧️',
      affectedAreas: ['Fancy Bazaar', 'Paltan Bazaar', 'Uzan Bazaar']
    },
    {
      id: '2',
      title: 'River Water Level Rising',
      description: 'Brahmaputra River water level has increased by 2.5 meters in the last 6 hours.',
      severity: 'critical',
      location: 'Brahmaputra Basin',
      timestamp: '4 hours ago',
      status: 'active',
      icon: '🌊',
      affectedAreas: ['North Guwahati', 'Kamrup Rural', 'Dispur']
    },
    {
      id: '3',
      title: 'Flash Flood Alert',
      description: 'Sudden water accumulation reported in several areas due to blocked drainage.',
      severity: 'medium',
      location: 'Central Guwahati',
      timestamp: '6 hours ago',
      status: 'resolved',
      icon: '⚡',
      affectedAreas: ['Lachit Nagar', 'Beltola', 'Kahilipara']
    },
    {
      id: '4',
      title: 'Evacuation Notice',
      description: 'Immediate evacuation required for residents in flood-prone zones.',
      severity: 'critical',
      location: 'South Guwahati',
      timestamp: '8 hours ago',
      status: 'active',
      icon: '🚨',
      affectedAreas: ['Ganeshguri', 'Six Mile', 'Basistha']
    },
    {
      id: '5',
      title: 'Weather Advisory',
      description: 'Moderate rainfall expected with isolated heavy spells in the evening.',
      severity: 'low',
      location: 'Greater Guwahati',
      timestamp: '12 hours ago',
      status: 'expired',
      icon: '🌦️',
      affectedAreas: ['All Areas']
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved' | 'expired'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredAlerts = alerts.filter(alert => {
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    return statusMatch && severityMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'high': return 'from-orange-400 to-red-500';
      case 'critical': return 'from-red-500 to-red-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-lg">🚨</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Recent Alerts</h1>
              <p className="text-xs text-gray-600">Stay informed about flood warnings</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-xs text-gray-600">{filteredAlerts.filter(a => a.status === 'active').length} Active</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 py-1 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-gray-700">Status:</span>
            {(['all', 'active', 'resolved', 'expired'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-gray-700">Severity:</span>
            {(['all', 'low', 'medium', 'high', 'critical'] as const).map(severity => (
              <button
                key={severity}
                onClick={() => setFilterSeverity(severity)}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                  filterSeverity === severity
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 min-h-0 max-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-h-full">
          {filteredAlerts.slice(0, 6).map((alert, index) => (
            <Card key={alert.id} className="p-2 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start space-x-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${getSeverityColor(alert.severity)} rounded-full flex items-center justify-center text-lg animate-bounce`}>
                  {alert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-gray-800">{alert.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>{alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{alert.description}</p>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-500 mb-1">
                    <span className="flex items-center">
                      <span className="mr-0.5">📍</span>
                      {alert.location}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-0.5">⏰</span>
                      {alert.timestamp}
                    </span>
                  </div>
                  {alert.affectedAreas.length > 0 && (
                    <div className="mt-1 pt-1 border-t border-gray-200">
                      <p className="text-[10px] font-medium text-gray-700 mb-0.5">Affected Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {alert.affectedAreas.map((area, areaIndex) => (
                          <span key={areaIndex} className="px-1 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full animate-pulse">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentAlerts;
