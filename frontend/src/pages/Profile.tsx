import { Card } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'

export default function Profile() {
	const { role } = useAuth()
	const { t } = useI18n()
	
	return (
		<div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden flex flex-col">
			<div className="max-w-4xl mx-auto flex-1 flex flex-col min-h-0 p-2">
				{/* Header Section */}
				<div className="text-center mb-4 animate-slide-down">
					<div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-enhanced-pulse">
						<span className="text-2xl">👤</span>
					</div>
					<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
						{t('profile.userProfile')}
					</h1>
					<p className="text-base text-gray-600">{t('profile.manageAccount')}</p>
				</div>
				{/* Profile Information */}
				<div className="grid md:grid-cols-2 gap-2 mb-2 stagger-animation flex-1 min-h-0">
					<Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up">
						<div className="flex items-center mb-2">
							<div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-2 shadow-lg hover:animate-bounce transition-all duration-300">
								<span className="text-lg">ℹ️</span>
							</div>
							<h2 className="text-lg font-bold text-gray-800">{t('profile.accountDetails')}</h2>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
								<span className="text-gray-700 font-medium text-sm">{t('profile.role')}:</span>
								<span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-semibold capitalize">
									{role || 'User'}
								</span>
							</div>
							<div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
								<span className="text-gray-700 font-medium text-sm">{t('profile.status')}:</span>
								<span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-semibold">
									🟢 {t('profile.active')}
								</span>
							</div>
							<div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
								<span className="text-gray-700 font-medium text-sm">{t('profile.memberSince')}:</span>
								<span className="text-gray-600 text-xs">2024</span>
							</div>
						</div>
					</Card>
					<Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
						<div className="flex items-center mb-2">
							<div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-2 shadow-lg hover:animate-bounce transition-all duration-300" style={{animationDelay: '0.5s'}}>
								<span className="text-lg">⚙️</span>
							</div>
							<h2 className="text-lg font-bold text-gray-800">{t('profile.quickActions')}</h2>
						</div>
						<div className="space-y-2">
							<button className="w-full p-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs">
								🔧 {t('profile.editProfile')}
							</button>
							<button className="w-full p-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs">
								🔐 {t('profile.changePassword')}
							</button>
							<button className="w-full p-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs">
								📱 {t('profile.notificationSettings')}
							</button>
						</div>
					</Card>
				</div>
				{/* Additional Features */}
				<Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-slide-up flex-1 min-h-0" style={{animationDelay: '0.4s'}}>
					<div className="text-center">
						<h3 className="text-lg font-bold text-gray-800 mb-2">🚀 {t('profile.comingSoon')}</h3>
						<p className="text-gray-600 mb-2 text-xs">
							{t('profile.comingSoonDesc')}
						</p>
						<div className="grid md:grid-cols-3 gap-2">
							<div className="text-center p-2">
								<div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg animate-pulse">
									<span className="text-lg">📊</span>
								</div>
								<h4 className="font-semibold text-gray-800 mb-1 text-sm">{t('profile.activityHistory')}</h4>
								<p className="text-xs text-gray-600">{t('profile.activityHistoryDesc')}</p>
							</div>
							<div className="text-center p-2">
								<div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}>
									<span className="text-lg">🎯</span>
								</div>
								<h4 className="font-semibold text-gray-800 mb-1 text-sm">{t('profile.personalization')}</h4>
								<p className="text-xs text-gray-600">{t('profile.personalizationDesc')}</p>
							</div>
							<div className="text-center p-2">
								<div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
									<span className="text-lg">🔒</span>
								</div>
								<h4 className="font-semibold text-gray-800 mb-1 text-sm">{t('profile.privacySecurity')}</h4>
								<p className="text-xs text-gray-600">{t('profile.privacySecurityDesc')}</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
