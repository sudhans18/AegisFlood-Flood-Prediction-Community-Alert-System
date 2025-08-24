import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  avatar: string;
  isOnline: boolean;
}

const CommunityChat: React.FC = () => {
  const { token, role } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'FloodGuard_Admin',
      message: 'Welcome to the AegisFlood Community! Stay safe and stay connected. 🌊',
      timestamp: '2 min ago',
      avatar: '🛡️',
      isOnline: true
    },
    {
      id: '2',
      user: 'WeatherWatcher',
      message: 'Heavy rainfall expected in Guwahati area. Stay alert everyone! ⚠️',
      timestamp: '5 min ago',
      avatar: '🌦️',
      isOnline: true
    },
    {
      id: '3',
      user: 'SafetyFirst',
      message: 'Remember to keep emergency contacts handy. Better safe than sorry! 📞',
      timestamp: '8 min ago',
      avatar: '🚨',
      isOnline: false
    },
    {
      id: '4',
      user: 'LocalHero',
      message: 'Community evacuation plan updated. Check your designated safe zones! 🏠',
      timestamp: '12 min ago',
      avatar: '🏆',
      isOnline: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState([
    { name: 'FloodGuard_Admin', avatar: '🛡️', status: 'online' },
    { name: 'WeatherWatcher', avatar: '🌦️', status: 'online' },
    { name: 'LocalHero', avatar: '🏆', status: 'online' },
    { name: 'SafetyFirst', avatar: '🚨', status: 'offline' },
    { name: 'EmergencyTeam', avatar: '🚑', status: 'online' }
  ]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: role === 'citizen' ? 'Citizen' : role === 'authority' ? 'Authority' : 'Anonymous',
        message: newMessage,
        timestamp: 'Just now',
        avatar: '👤',
        isOnline: true
      };
      setMessages([message, ...messages]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-lg">💬</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Community Chat</h1>
              <p className="text-xs text-gray-600">Connect with your community</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-2 min-h-0 p-2">
        {/* Online Users */}
        <div className="w-1/4 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg flex-shrink-0 flex flex-col max-h-full">
          <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
            <span className="mr-1 animate-pulse">👥</span>
            Online Users
          </h3>
          <div className="flex-1 space-y-1 overflow-hidden">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center space-x-1 p-1 rounded-lg hover:bg-gray-50 transition-all animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-xs animate-float">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-800">{user.name}</p>
                  <div className="flex items-center space-x-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'online' ? 'bg-green-500 animate-ping' : 'bg-gray-400'}`}></div>
                    <span className="text-[10px] text-gray-500">{user.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex flex-col max-h-full min-h-0">
          {/* Messages Area */}
          <div className="flex-1 px-2 py-1 space-y-2 min-h-0 max-h-[calc(100vh-180px)] overflow-hidden">
            {messages.slice(0, 10).map((message, index) => {
              const isCurrentUser = message.user === (role === 'citizen' ? 'Citizen' : role === 'authority' ? 'Authority' : 'Anonymous');
              return (
                <div key={message.id} className={`flex space-x-2 animate-slide-up ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-base animate-float">
                    {message.avatar}
                  </div>
                  <div className={`flex-1 max-w-xs ${isCurrentUser ? 'text-right' : ''}`}>
                    <div className={`inline-block p-2 rounded-lg ${isCurrentUser ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-xs font-medium mb-0.5">{message.user}</p>
                      <p className="text-xs">{message.message}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{message.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="p-2 border-t border-gray-200 flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage()}
                className="flex-1 p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 animate-pulse text-sm"
              >
                <span className="mr-1">📤</span>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
