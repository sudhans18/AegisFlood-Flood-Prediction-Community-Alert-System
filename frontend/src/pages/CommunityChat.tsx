import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Announcement {
  id: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  authority: string;
  isVerified: boolean;
}

const Announcements: React.FC = () => {
  const { token, role } = useAuth();
  const { t } = useI18n();
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Flood Situation in Guwahati City Center',
      description: 'Heavy rainfall has caused severe flooding in the city center. Water levels are rising rapidly. All residents in the affected area are advised to evacuate immediately.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      location: 'Guwahati, Assam',
      severity: 'high',
      timestamp: '2 hours ago',
      authority: 'Assam State Disaster Management Authority',
      isVerified: true
    },
    {
      id: '2',
      title: 'River Brahmaputra Water Level Update',
      description: 'Current water level at Pandu Ghat: 50.2 meters (above danger level). Continuous monitoring in progress.',
      mediaType: 'video',
      mediaUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      location: 'Pandu Ghat, Guwahati',
      severity: 'medium',
      timestamp: '4 hours ago',
      authority: 'Central Water Commission',
      isVerified: true
    },
    {
      id: '3',
      title: 'Emergency Response Team Deployment',
      description: 'NDRF teams have been deployed to assist in rescue operations. Boats and emergency supplies are being distributed.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
      location: 'Multiple locations, Assam',
      severity: 'critical',
      timestamp: '6 hours ago',
      authority: 'National Disaster Response Force',
      isVerified: true
    },
    {
      id: '4',
      title: 'Road Closure Alert - NH-37',
      description: 'National Highway 37 is closed between Jorabat and Nagaon due to flooding. Alternative routes available.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&h=600&fit=crop',
      location: 'NH-37, Assam',
      severity: 'medium',
      timestamp: '8 hours ago',
      authority: 'Assam Police Traffic Control',
      isVerified: true
    }
  ]);

  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🟠';
      case 'critical': return '🔴';
      default: return '⚪';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const severityMatch = selectedSeverity === 'all' || announcement.severity === selectedSeverity;
    const locationMatch = selectedLocation === 'all' || announcement.location.includes(selectedLocation);
    return severityMatch && locationMatch;
  });

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center hover:animate-bounce transition-all duration-300">
              <span className="text-xl">📢</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Official Announcements</h1>
              <p className="text-sm text-gray-600">Latest updates from authorities on flood situations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm text-gray-600 font-medium">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 py-2 flex-shrink-0">
        <div className="flex space-x-3">
          <select 
            value={selectedSeverity} 
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Severity Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical</option>
          </select>
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Locations</option>
            <option value="Guwahati">Guwahati</option>
            <option value="Assam">Assam</option>
            <option value="NH-37">NH-37</option>
          </select>
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredAnnouncements.map((announcement, index) => (
          <Card key={announcement.id} className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(announcement.severity)}`}>
                  {getSeverityIcon(announcement.severity)} {announcement.severity.toUpperCase()}
                </span>
                {announcement.isVerified && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold border border-blue-200">
                    ✅ Verified
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">{announcement.timestamp}</span>
            </div>

            {/* Title and Authority */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">{announcement.title}</h3>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-semibold">Authority:</span> {announcement.authority}
            </p>

            {/* Media */}
            <div className="mb-3">
              {announcement.mediaType === 'image' ? (
                <img 
                  src={announcement.mediaUrl} 
                  alt={announcement.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Flood+Image';
                  }}
                />
              ) : (
                <video 
                  src={announcement.mediaUrl} 
                  controls
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-3 leading-relaxed">{announcement.description}</p>

            {/* Location */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>📍</span>
              <span className="font-medium">{announcement.location}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm py-2">
                📍 View on Map
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm py-2">
                📞 Emergency Contact
              </Button>
            </div>
          </Card>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📭</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No announcements found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for updates.</p>
          </div>
        )}
      </div>

      {/* Authority Post Button (only for authority users) */}
      {role === 'authority' && (
        <div className="bg-white/90 backdrop-blur-sm border-t border-slate-200 px-4 py-3 flex-shrink-0">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3">
            📢 Post New Announcement
          </Button>
        </div>
      )}
    </div>
  );
};

export default Announcements;
