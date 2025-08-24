import { Card } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
	const { role } = useAuth()
	
	return (
		<div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden flex flex-col">
			<div className="max-w-4xl mx-auto flex-1 flex flex-col min-h-0 p-2">
				{/* Header Section */}
				<div className="text-center mb-4 animate-slide-down">
					<div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-enhanced-pulse">
						<span className="text-2xl">👤</span>
					</div>
					<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
						User Profile
					</h1>
					<p className="text-base text-gray-600">Manage your account and preferences</p>
				</div>
				{/* Profile Information */}
				<div className="grid md:grid-cols-2 gap-2 mb-2 stagger-animation flex-1 min-h-0">
					<Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up">
						<div className="flex items-center mb-2">
							<div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-2 shadow-lg animate-bounce">
								<span className="text-lg">ℹ️</span>
							</div>
							<h2 className="text-lg font-bold text-gray-800">Account Details</h2>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
								<span className="text-gray-700 font-medium text-sm">Role:</span>
								<span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-semibold capitalize">
									{role || 'User'}
								</span>
							</div>
							<div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
								<span className="text-gray-700 font-medium text-sm">Status:</span>
								<span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-semibold">
									🟢 Active
								</span>
							</div>
							<div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
								<span className="text-gray-700 font-medium text-sm">Member Since:</span>
								<span className="text-gray-600 text-xs">2024</span>
							</div>
						</div>
					</Card>
					<Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
						<div className="flex items-center mb-2">
							<div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-2 shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
								<span className="text-lg">⚙️</span>
							</div>
							<h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
						</div>
						<div className="space-y-2">
							<button className="w-full p-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs">
								🔧 Edit Profile
							</button>
							<button className="w-full p-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs">
								🔐 Change Password
							</button>
							<button className="w-full p-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs">
								📱 Notification Settings
							</button>
						</div>
					</Card>
				</div>
				{/* Additional Features */}
				<Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-slide-up flex-1 min-h-0" style={{animationDelay: '0.4s'}}>
					<div className="text-center">
						<h3 className="text-lg font-bold text-gray-800 mb-2">🚀 Coming Soon</h3>
						<p className="text-gray-600 mb-2 text-xs">
							We're working on exciting new features for your profile management experience.
						</p>
						<div className="grid md:grid-cols-3 gap-2">
							<div className="text-center p-2">
								<div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg animate-pulse">
									<span className="text-lg">📊</span>
								</div>
								<h4 className="font-semibold text-gray-800 mb-1 text-sm">Activity History</h4>
								<p className="text-xs text-gray-600">Track your dashboard usage and interactions</p>
							</div>
							<div className="text-center p-2">
								<div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}>
									<span className="text-lg">🎯</span>
								</div>
								<h4 className="font-semibold text-gray-800 mb-1 text-sm">Personalization</h4>
								<p className="text-xs text-gray-600">Customize your dashboard experience</p>
							</div>
							<div className="text-center p-2">
								<div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
									<span className="text-lg">🔒</span>
								</div>
								<h4 className="font-semibold text-gray-800 mb-1 text-sm">Privacy & Security</h4>
								<p className="text-xs text-gray-600">Your data is always protected</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
