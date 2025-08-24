import { createContext, useContext, useMemo, useState, ReactNode } from 'react'

type Language = 'en' | 'hi' | 'as' | 'ta'

type I18nContextType = {
	currentLanguage: Language
	setLanguage: (lang: Language) => void
	t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
	en: {
		'app.home': 'Home',
		'app.dashboard': 'Dashboard',
		'app.settings': 'Settings',
		'app.profile': 'Profile',
		'app.chat': 'Announcements',
		'app.alerts': 'Alerts',
		'app.predictions': 'Predictions',

		// Dashboard translations
		'dash.currentRisk': 'Current Risk Level',
		'dash.lastUpdated': 'Last updated',
		'dash.waterLevel': 'Water Level',
		'dash.rainfall': 'Rainfall',
		'dash.riskMap': 'Risk Map',
		'dash.activeAlerts': 'Active Alerts',
		'dash.weeklyForecast': 'Weekly Forecast',
		'dash.liveRiskMonitor': 'Live Risk Monitor',
		'dash.live': 'Live',
		'dash.updatesEvery3Hours': 'Updates every 3 hours',
		'dash.temperature': 'Temperature',
		'dash.humidity': 'Humidity',
		'dash.wind': 'Wind',
		'dash.interactiveRiskMap': 'Interactive Risk Map',
		'dash.lastUpdatedTime': 'Last Updated',
		'dash.mapReadyForML': 'Map Ready for ML Integration',
		'dash.mapDescription': 'This interactive map is prepared for your machine learning model integration. Connect your flood prediction model to display real-time risk data.',
		'dash.timeFrame': 'Time Frame',
		'dash.current': 'Current',
		'dash.showing': 'Showing',
		'dash.highRiskCalendar': 'High Risk Calendar',
		'dash.predictionTimeline': 'Prediction Timeline (3hr intervals)',
		'dash.predictionTime': 'Prediction Time',
		'dash.now': 'Now',
		'dash.timelineVisualization': 'Timeline visualization',
		'dash.loadingFloodMonitor': 'Loading Flood Monitor...',
		'dash.preparingDashboard': 'Preparing your comprehensive dashboard',
		'dash.noNewAlerts': 'No new alerts. All clear!',
		'dash.new': 'New',
		'dash.updated': 'Updated',

		// Risk levels
		'risk.low': 'Low Risk',
		'risk.medium': 'Medium Risk',
		'risk.high': 'High Risk',
		'risk.critical': 'Critical Risk',
		'risk.safe': 'Safe',

		// Alert messages
		'msg.low': 'Low flood risk in your area. Continue normal activities.',
		'msg.medium': 'Moderate flood risk detected in your area. Stay informed and be prepared to take action if conditions worsen.',
		'msg.high': 'High flood risk detected. Prepare for possible evacuation and follow local authorities.',
		'msg.critical': 'Critical flood risk! Immediate evacuation may be required. Follow emergency protocols.',
		'msg.heavyRainfallExpected': 'Heavy rainfall expected in next 3 hours',
		'msg.waterLevelMonitoring': 'Water level monitoring station back online',

		// Registration
		'reg.alertPrefs': 'Alert Preferences',
		'reg.alertPrefsDesc': 'Choose how you\'d like to receive flood alerts.',
		'reg.smsAlerts': 'SMS Alerts',
		'reg.whatsappAlerts': 'WhatsApp Messages',
		'reg.selectOne': 'Select at least one method to receive critical flood alerts.',

		// Forecast
		'forecast.today': 'Today',
		'forecast.tomorrow': 'Tomorrow',
		'forecast.wednesday': 'Wednesday',
		'forecast.thursday': 'Thursday',
		'forecast.friday': 'Friday',
		'forecast.saturday': 'Saturday',
		'forecast.sunday': 'Sunday',

		// Weather
		'weather.moderateRain': 'Moderate Rain',
		'weather.heavyRain': 'Heavy Rain',
		'weather.lightRain': 'Light Rain',
		'weather.clear': 'Clear',

		// Settings
		'settings.alertPreferences': 'Alert Preferences',
		'settings.emailAlerts': 'Email Alerts',
		'settings.pushNotifications': 'Push Notifications',
		'settings.displaySettings': 'Display Settings',
		'settings.darkMode': 'Dark Mode',
		'settings.fontSize': 'Font Size',
		'settings.privacySecurity': 'Privacy & Security',
		'settings.twoFA': '2FA',
		'settings.dataEncryption': 'Data Encryption',
		'settings.managePreferences': 'Manage your preferences',

		// Profile
		'profile.userProfile': 'User Profile',
		'profile.manageAccount': 'Manage your account and preferences',
		'profile.accountDetails': 'Account Details',
		'profile.role': 'Role',
		'profile.status': 'Status',
		'profile.active': 'Active',
		'profile.memberSince': 'Member Since',
		'profile.quickActions': 'Quick Actions',
		'profile.editProfile': 'Edit Profile',
		'profile.changePassword': 'Change Password',
		'profile.notificationSettings': 'Notification Settings',
		'profile.comingSoon': 'Coming Soon',
		'profile.comingSoonDesc': 'We\'re working on exciting new features for your profile management experience.',
		'profile.activityHistory': 'Activity History',
		'profile.activityHistoryDesc': 'Track your dashboard usage and interactions',
		'profile.personalization': 'Personalization',
		'profile.personalizationDesc': 'Customize your dashboard experience',
		'profile.privacySecurity': 'Privacy & Security',
		'profile.privacySecurityDesc': 'Your data is always protected',

		// Official Announcements
		'chat.communityChat': 'Official Announcements',
		'chat.connectCommunity': 'Latest updates from authorities',
		'chat.onlineUsers': 'Recent Posts',
		'chat.typeMessage': 'Type your message...',
		'chat.send': 'Post',

		// Alerts
		'alerts.recentAlerts': 'Recent Alerts',
		'alerts.viewAllAlerts': 'View all recent flood alerts and notifications',
		'alerts.noAlerts': 'No recent alerts',
		'alerts.allClear': 'All clear! No active alerts in your area.',

		// Predictions
		'predictions.riskPredicted': 'Risk Predicted',
		'predictions.viewPredictions': 'View flood risk predictions and forecasts',
		'alerts.warning': 'Warning',
		'alerts.danger': 'Danger',
		'alerts.info': 'Info'
	},
	hi: {
		'app.home': 'होम',
		'app.dashboard': 'डैशबोर्ड',
		'app.settings': 'सेटिंग्स',
		'app.profile': 'प्रोफ़ाइल',
		'app.chat': 'घोषणाएं',
		'app.alerts': 'अलर्ट',
		'app.predictions': 'पूर्वानुमान',

		// Dashboard translations
		'dash.currentRisk': 'वर्तमान जोखिम स्तर',
		'dash.lastUpdated': 'अंतिम अद्यतन',
		'dash.waterLevel': 'जल स्तर',
		'dash.rainfall': 'वर्षा',
		'dash.riskMap': 'जोखिम मानचित्र',
		'dash.activeAlerts': 'सक्रिय अलर्ट',
		'dash.weeklyForecast': 'साप्ताहिक पूर्वानुमान',
		'dash.liveRiskMonitor': 'लाइव जोखिम मॉनिटर',
		'dash.live': 'लाइव',
		'dash.updatesEvery3Hours': 'हर 3 घंटे में अपडेट',
		'dash.temperature': 'तापमान',
		'dash.humidity': 'आर्द्रता',
		'dash.wind': 'हवा',
		'dash.interactiveRiskMap': 'इंटरैक्टिव जोखिम मानचित्र',
		'dash.lastUpdatedTime': 'अंतिम अपडेट',
		'dash.mapReadyForML': 'एमएल इंटीग्रेशन के लिए मानचित्र तैयार',
		'dash.mapDescription': 'यह इंटरैक्टिव मानचित्र आपके मशीन लर्निंग मॉडल इंटीग्रेशन के लिए तैयार है। रीयल-टाइम जोखिम डेटा प्रदर्शित करने के लिए अपने बाढ़ पूर्वानुमान मॉडल को कनेक्ट करें।',
		'dash.timeFrame': 'समय सीमा',
		'dash.current': 'वर्तमान',
		'dash.showing': 'दिखा रहा है',
		'dash.highRiskCalendar': 'उच्च जोखिम कैलेंडर',
		'dash.predictionTimeline': 'पूर्वानुमान समयरेखा (3 घंटे के अंतराल)',
		'dash.predictionTime': 'पूर्वानुमान समय',
		'dash.now': 'अभी',
		'dash.timelineVisualization': 'समयरेखा विज़ुअलाइज़ेशन',
		'dash.loadingFloodMonitor': 'बाढ़ मॉनिटर लोड हो रहा है...',
		'dash.preparingDashboard': 'आपका व्यापक डैशबोर्ड तैयार कर रहा है',
		'dash.noNewAlerts': 'कोई नया अलर्ट नहीं। सब कुछ स्पष्ट!',
		'dash.new': 'नया',
		'dash.updated': 'अपडेट किया गया',

		// Risk levels
		'risk.low': 'कम जोखिम',
		'risk.medium': 'मध्यम जोखिम',
		'risk.high': 'उच्च जोखिम',
		'risk.critical': 'गंभीर जोखिम',
		'risk.safe': 'सुरक्षित',

		// Alert messages
		'msg.low': 'आपके क्षेत्र में बाढ़ का जोखिम कम है। सामान्य गतिविधियाँ जारी रखें।',
		'msg.medium': 'आपके क्षेत्र में मध्यम बाढ़ जोखिम का पता चला है। सूचित रहें और आवश्यकता पड़ने पर कार्रवाई के लिए तैयार रहें।',
		'msg.high': 'उच्च बाढ़ जोखिम का पता चला। निकासी के लिए तैयार रहें और स्थानीय अधिकारियों का पालन करें।',
		'msg.critical': 'गंभीर बाढ़ जोखिम! तुरंत निकासी की आवश्यकता हो सकती है। आपातकालीन निर्देशों का पालन करें।',
		'msg.heavyRainfallExpected': 'अगले 3 घंटों में भारी वर्षा की संभावना',
		'msg.waterLevelMonitoring': 'जल स्तर निगरानी स्टेशन फिर से ऑनलाइन',

		// Registration
		'reg.alertPrefs': 'अलर्ट प्राथमिकताएं',
		'reg.alertPrefsDesc': 'चुनें कि आप बाढ़ अलर्ट कैसे प्राप्त करना चाहते हैं।',
		'reg.smsAlerts': 'एसएमएस अलर्ट',
		'reg.whatsappAlerts': 'व्हाट्सएप संदेश',
		'reg.selectOne': 'महत्वपूर्ण बाढ़ अलर्ट प्राप्त करने के लिए कम से कम एक विधि चुनें।',

		// Forecast
		'forecast.today': 'आज',
		'forecast.tomorrow': 'कल',
		'forecast.wednesday': 'बुधवार',
		'forecast.thursday': 'गुरुवार',
		'forecast.friday': 'शुक्रवार',
		'forecast.saturday': 'शनिवार',
		'forecast.sunday': 'रविवार',

		// Weather
		'weather.moderateRain': 'मध्यम वर्षा',
		'weather.heavyRain': 'भारी वर्षा',
		'weather.lightRain': 'हल्की वर्षा',
		'weather.clear': 'साफ',

		// Settings
		'settings.alertPreferences': 'अलर्ट प्राथमिकताएं',
		'settings.emailAlerts': 'ईमेल अलर्ट',
		'settings.pushNotifications': 'पुश नोटिफिकेशन',
		'settings.displaySettings': 'प्रदर्शन सेटिंग्स',
		'settings.darkMode': 'डार्क मोड',
		'settings.fontSize': 'फ़ॉन्ट आकार',
		'settings.privacySecurity': 'गोपनीयता और सुरक्षा',
		'settings.twoFA': '2FA',
		'settings.dataEncryption': 'डेटा एन्क्रिप्शन',
		'settings.managePreferences': 'अपनी प्राथमिकताएं प्रबंधित करें',

		// Profile
		'profile.userProfile': 'उपयोगकर्ता प्रोफ़ाइल',
		'profile.manageAccount': 'अपना खाता और प्राथमिकताएं प्रबंधित करें',
		'profile.accountDetails': 'खाता विवरण',
		'profile.role': 'भूमिका',
		'profile.status': 'स्थिति',
		'profile.active': 'सक्रिय',
		'profile.memberSince': 'सदस्यता से',
		'profile.quickActions': 'त्वरित कार्रवाई',
		'profile.editProfile': 'प्रोफ़ाइल संपादित करें',
		'profile.changePassword': 'पासवर्ड बदलें',
		'profile.notificationSettings': 'सूचना सेटिंग्स',
		'profile.comingSoon': 'जल्द आ रहा है',
		'profile.comingSoonDesc': 'हम आपके प्रोफ़ाइल प्रबंधन अनुभव के लिए रोमांचक नई सुविधाएं विकसित कर रहे हैं।',
		'profile.activityHistory': 'गतिविधि इतिहास',
		'profile.activityHistoryDesc': 'अपने डैशबोर्ड उपयोग और इंटरैक्शन को ट्रैक करें',
		'profile.personalization': 'व्यक्तिगतकरण',
		'profile.personalizationDesc': 'अपना डैशबोर्ड अनुभव अनुकूलित करें',
		'profile.privacySecurity': 'गोपनीयता और सुरक्षा',
		'profile.privacySecurityDesc': 'आपका डेटा हमेशा सुरक्षित रहता है',

		// Official Announcements
		'chat.communityChat': 'आधिकारिक घोषणाएं',
		'chat.connectCommunity': 'अधिकारियों से नवीनतम अपडेट',
		'chat.onlineUsers': 'हाल के पोस्ट',
		'chat.typeMessage': 'अपना संदेश टाइप करें...',
		'chat.send': 'पोस्ट करें',

		// Alerts
		'alerts.recentAlerts': 'हाल के अलर्ट',
		'alerts.viewAllAlerts': 'सभी हाल के बाढ़ अलर्ट और सूचनाएं देखें',
		'alerts.noAlerts': 'कोई हाल का अलर्ट नहीं',
		'alerts.allClear': 'सब कुछ स्पष्ट! आपके क्षेत्र में कोई सक्रिय अलर्ट नहीं।',

		// Predictions
		'predictions.riskPredicted': 'जोखिम पूर्वानुमान',
		'predictions.viewPredictions': 'बाढ़ जोखिम पूर्वानुमान और पूर्वानुमान देखें',
		'alerts.warning': 'चेतावनी',
		'alerts.danger': 'खतरा',
		'alerts.info': 'जानकारी'
	},
	as: {
		'app.home': 'হোম',
		'app.dashboard': 'ড্যাশবোর্ড',
		'app.settings': 'ছেটিংছ',
		'app.profile': 'প্ৰফাইল',
		'app.chat': 'ঘোষণা',
		'app.alerts': 'সতৰ্কতা',
		'app.predictions': 'পূৰ্বাভাস',

		// Dashboard translations
		'dash.currentRisk': 'বৰ্তমান বিপদৰ স্তৰ',
		'dash.lastUpdated': 'শেহতীয়াকৈ আপডেট',
		'dash.waterLevel': 'পানীৰ স্তৰ',
		'dash.rainfall': 'বৰষুণ',
		'dash.riskMap': 'বিপদ মানচিত্ৰ',
		'dash.activeAlerts': 'সক্ৰিয় সতৰ্কতা',
		'dash.weeklyForecast': 'সাপ্তাহিক পূৰ্বাভাস',
		'dash.liveRiskMonitor': 'লাইভ বিপদ মনিটৰ',
		'dash.live': 'লাইভ',
		'dash.updatesEvery3Hours': 'প্ৰতি ৩ ঘণ্টাত আপডেট',
		'dash.temperature': 'তাপমাত্ৰা',
		'dash.humidity': 'আৰ্দ্ৰতা',
		'dash.wind': 'বতাহ',
		'dash.interactiveRiskMap': 'ইণ্টাৰেক্টিভ বিপদ মানচিত্ৰ',
		'dash.lastUpdatedTime': 'শেহতীয়াকৈ আপডেট',
		'dash.mapReadyForML': 'এমএল সংযোগৰ বাবে মানচিত্ৰ প্ৰস্তুত',
		'dash.mapDescription': 'এই ইণ্টাৰেক্টিভ মানচিত্ৰ আপোনাৰ মেচিন লাৰ্নিং মডেল সংযোগৰ বাবে প্ৰস্তুত। ৰিয়েল-টাইম বিপদৰ তথ্য দেখুৱাবলৈ আপোনাৰ বন্যাৰ পূৰ্বাভাস মডেল সংযোগ কৰক।',
		'dash.timeFrame': 'সময়ৰ সীমা',
		'dash.current': 'বৰ্তমান',
		'dash.showing': 'দেখুৱাইছে',
		'dash.highRiskCalendar': 'উচ্চ বিপদৰ কেলেণ্ডাৰ',
		'dash.predictionTimeline': 'পূৰ্বাভাসৰ সময়ৰেখা (৩ ঘণ্টাৰ অন্তৰাল)',
		'dash.predictionTime': 'পূৰ্বাভাসৰ সময়',
		'dash.now': 'এতিয়া',
		'dash.timelineVisualization': 'সময়ৰেখাৰ দৃশ্যায়ন',
		'dash.loadingFloodMonitor': 'বন্যাৰ মনিটৰ ল\'ড হৈছে...',
		'dash.preparingDashboard': 'আপোনাৰ বিস্তৃত ড্যাশবোর্ড প্ৰস্তুত কৰি আছে',
		'dash.noNewAlerts': 'কোনো নতুন সতৰ্কতা নাই। সকলো নিৰাপদ!',
		'dash.new': 'নতুন',
		'dash.updated': 'আপডেট কৰা হৈছে',

		// Risk levels
		'risk.low': 'কম বিপদ',
		'risk.medium': 'মধ্যম বিপদ',
		'risk.high': 'উচ্চ বিপদ',
		'risk.critical': 'জৰুৰী বিপদ',
		'risk.safe': 'নিরাপদ',

		// Alert messages
		'msg.low': 'আপোনাৰ অঞ্চলত বন্যাৰ বিপদ কম। সাধাৰণ কাৰ্যকলাপ চলাই যাঁওক।',
		'msg.medium': 'আপোনাৰ অঞ্চলত মধ্যম বন্যাৰ বিপদ ধৰা পৰিছে। তথ্যৱান থাকক আৰু প্ৰয়োজন হলে কাৰ্য্য কৰিবলৈ সাজু থাকক।',
		'msg.high': 'উচ্চ বন্যাৰ বিপদ ধৰা পৰিছে। সঁজুলি কৰি ৰাখক আৰু স্থানীয় আধিকাৰীৰ নিৰ্দেশনা অনুসৰণ কৰক।',
		'msg.critical': 'গুরুতৰ বন্যাৰ বিপদ! তৎক্ষণাৎ সুৰক্ষিত ঠাইলৈ যাব লাগিব পাৰে। জরুৰী বিধি-বিধান অনুসৰণ কৰক।',
		'msg.heavyRainfallExpected': 'পৰৱৰ্তী ৩ ঘণ্টাত প্ৰচণ্ড বৰষুণৰ আশংকা',
		'msg.waterLevelMonitoring': 'পানীৰ স্তৰ নিৰীক্ষণ কেন্দ্ৰ আকৌ অনলাইন',

		// Registration
		'reg.alertPrefs': 'সতৰ্কতাৰ পছন্দ',
		'reg.alertPrefsDesc': 'বন্যাৰ সতৰ্কতা কেনেকৈ পাব বিচাৰে তাক বাছনি কৰক।',
		'reg.smsAlerts': 'এছএমএছ সতৰ্কতা',
		'reg.whatsappAlerts': 'ৱাটছএপ বাৰ্তা',
		'reg.selectOne': 'গুৰুত্বপূৰ্ণ বন্যাৰ সতৰ্কতা পাবলৈ কমেও এটা পদ্ধতি বাছনি কৰক।',

		// Forecast
		'forecast.today': 'আজি',
		'forecast.tomorrow': 'কালি',
		'forecast.wednesday': 'বুধবাৰ',
		'forecast.thursday': 'বৃহস্পতিবাৰ',
		'forecast.friday': 'শুক্ৰবাৰ',
		'forecast.saturday': 'শনিবাৰ',
		'forecast.sunday': 'দেওবাৰ',

		// Weather
		'weather.moderateRain': 'মধ্যম বৰষুণ',
		'weather.heavyRain': 'প্ৰচণ্ড বৰষুণ',
		'weather.lightRain': 'লঘু বৰষুণ',
		'weather.clear': 'সৰল',

		// Settings
		'settings.alertPreferences': 'সতৰ্কতাৰ পছন্দ',
		'settings.emailAlerts': 'ইমেইল সতৰ্কতা',
		'settings.pushNotifications': 'পুশ বিজ্ঞপ্তি',
		'settings.displaySettings': 'প্ৰদৰ্শনৰ ছেটিংছ',
		'settings.darkMode': 'ডাৰ্ক মোড',
		'settings.fontSize': 'ফন্টৰ আকাৰ',
		'settings.privacySecurity': 'গোপনীয়তা আৰু সুৰক্ষা',
		'settings.twoFA': '২FA',
		'settings.dataEncryption': 'তথ্যৰ এনক্ৰিপশন',
		'settings.managePreferences': 'আপোনাৰ পছন্দসমূহ পৰিচালনা কৰক',

		// Profile
		'profile.userProfile': 'ব্যৱহাৰকাৰীৰ প্ৰফাইল',
		'profile.manageAccount': 'আপোনাৰ একাউণ্ট আৰু পছন্দসমূহ পৰিচালনা কৰক',
		'profile.accountDetails': 'একাউণ্টৰ বিবৰণ',
		'profile.role': 'ভূমিকা',
		'profile.status': 'অৱস্থা',
		'profile.active': 'সক্ৰিয়',
		'profile.memberSince': 'সদস্য হোৱাৰ পৰা',
		'profile.quickActions': 'দ্রুত কাৰ্য্য',
		'profile.editProfile': 'প্ৰফাইল সম্পাদনা কৰক',
		'profile.changePassword': 'পাছৱৰ্ড সলনি কৰক',
		'profile.notificationSettings': 'বিজ্ঞপ্তিৰ ছেটিংছ',
		'profile.comingSoon': 'শীঘ্ৰে আহিব',
		'profile.comingSoonDesc': 'আমি আপোনাৰ প্ৰফাইল পৰিচালনাৰ অভিজ্ঞতাৰ বাবে উত্তেজনাপূৰ্ণ নতুন বৈশিষ্ট্যসমূহ বিকশিত কৰি আছোঁ।',
		'profile.activityHistory': 'কাৰ্যকলাপৰ ইতিহাস',
		'profile.activityHistoryDesc': 'আপোনাৰ ড্যাশবোর্ডৰ ব্যৱহাৰ আৰু মিথস্ক্ৰিয়া ট্ৰেক কৰক',
		'profile.personalization': 'ব্যক্তিগতকৰণ',
		'profile.personalizationDesc': 'আপোনাৰ ড্যাশবোর্ডৰ অভিজ্ঞতা কাষ্টমাইজ কৰক',
		'profile.privacySecurity': 'গোপনীয়তা আৰু সুৰক্ষা',
		'profile.privacySecurityDesc': 'আপোনাৰ তথ্য সদায় সুৰক্ষিত থাকে',

		// Official Announcements
		'chat.communityChat': 'আধিকাৰিক ঘোষণা',
		'chat.connectCommunity': 'আধিকাৰীসকলৰ পৰা নৱীনতম আপডেট',
		'chat.onlineUsers': 'সাম্প্ৰতিক পোষ্টসমূহ',
		'chat.typeMessage': 'আপোনাৰ বাৰ্তা টাইপ কৰক...',
		'chat.send': 'পোষ্ট কৰক',

		// Alerts
		'alerts.recentAlerts': 'সাম্প্ৰতিক সতৰ্কতা',
		'alerts.viewAllAlerts': 'সকলো সাম্প্ৰতিক বন্যাৰ সতৰ্কতা আৰু বিজ্ঞপ্তি চাওক',
		'alerts.noAlerts': 'কোনো সাম্প্ৰতিক সতৰ্কতা নাই',
		'alerts.allClear': 'সকলো নিৰাপদ! আপোনাৰ অঞ্চলত কোনো সক্ৰিয় সতৰ্কতা নাই।',

		// Predictions
		'predictions.riskPredicted': 'বিপদৰ পূৰ্বাভাস',
		'predictions.viewPredictions': 'বন্যাৰ বিপদৰ পূৰ্বাভাস আৰু ভৱিষ্যদ্বাণী চাওক',
		'alerts.warning': 'সতৰ্কতা',
		'alerts.danger': 'বিপদ',
		'alerts.info': 'তথ্য'
	},
	ta: {
		'app.home': 'முகப்பு',
		'app.dashboard': 'டாஷ்போர்டு',
		'app.settings': 'அமைப்புகள்',
		'app.profile': 'சுயவிவரம்',
		'app.chat': 'அறிவிப்புகள்',
		'app.alerts': 'எச்சரிக்கைகள்',
		'app.predictions': 'முன்கணிப்புகள்',

		// Dashboard translations
		'dash.currentRisk': 'தற்போதைய ஆபத்து நிலை',
		'dash.lastUpdated': 'கடைசியாக புதுப்பிக்கப்பட்டது',
		'dash.waterLevel': 'நீர் மட்டம்',
		'dash.rainfall': 'மழை',
		'dash.riskMap': 'ஆபத்து வரைபடம்',
		'dash.activeAlerts': 'செயலில் உள்ள எச்சரிக்கைகள்',
		'dash.weeklyForecast': 'வாராந்திர முன்கணிப்பு',
		'dash.liveRiskMonitor': 'நேரலை ஆபத்து கண்காணிப்பான்',
		'dash.live': 'நேரலை',
		'dash.updatesEvery3Hours': 'ஒவ்வொரு 3 மணி நேரத்திற்கும் புதுப்பிக்கப்படுகிறது',
		'dash.temperature': 'வெப்பநிலை',
		'dash.humidity': 'ஈரப்பதம்',
		'dash.wind': 'காற்று',
		'dash.interactiveRiskMap': 'ஊடாடும் ஆபத்து வரைபடம்',
		'dash.lastUpdatedTime': 'கடைசியாக புதுப்பிக்கப்பட்டது',
		'dash.mapReadyForML': 'ML ஒருங்கிணைப்புக்கான வரைபடம் தயாராக உள்ளது',
		'dash.mapDescription': 'இந்த ஊடாடும் வரைபடம் உங்கள் இயந்திர கற்றல் மாடல் ஒருங்கிணைப்புக்காக தயாரிக்கப்பட்டுள்ளது. நேரலை ஆபத்து தரவைக் காட்ட உங்கள் வெள்ள முன்கணிப்பு மாடலை இணைக்கவும்.',
		'dash.timeFrame': 'நேர கட்டம்',
		'dash.current': 'தற்போதைய',
		'dash.showing': 'காட்டுகிறது',
		'dash.highRiskCalendar': 'உயர் ஆபத்து நாட்காட்டி',
		'dash.predictionTimeline': 'முன்கணிப்பு நேரக்கோடு (3 மணி இடைவெளிகள்)',
		'dash.predictionTime': 'முன்கணிப்பு நேரம்',
		'dash.now': 'இப்போது',
		'dash.timelineVisualization': 'நேரக்கோடு காட்சிப்படுத்தல்',
		'dash.loadingFloodMonitor': 'வெள்ள கண்காணிப்பான் ஏற்றப்படுகிறது...',
		'dash.preparingDashboard': 'உங்கள் விரிவான டாஷ்போர்டு தயாரிக்கப்படுகிறது',
		'dash.noNewAlerts': 'புதிய எச்சரிக்கைகள் எதுவும் இல்லை. எல்லாம் தெளிவாக உள்ளது!',
		'dash.new': 'புதிய',
		'dash.updated': 'புதுப்பிக்கப்பட்டது',

		// Risk levels
		'risk.low': 'குறைந்த ஆபத்து',
		'risk.medium': 'நடுத்தர ஆபத்து',
		'risk.high': 'உயர் ஆபத்து',
		'risk.critical': 'முக்கிய ஆபத்து',
		'risk.safe': 'பாதுகாப்பான',

		// Alert messages
		'msg.low': 'உங்கள் பகுதியில் வெள்ள ஆபத்து குறைவு. சாதாரண செயல்பாடுகளைத் தொடரவும்.',
		'msg.medium': 'உங்கள் பகுதியில் நடுத்தர வெள்ள ஆபத்து கண்டறியப்பட்டுள்ளது. தகவலறிந்திருக்கவும், நிலைமைகள் மோசமடைந்தால் நடவடிக்கை எடுக்க தயாராக இருங்கள்.',
		'msg.high': 'உயர் வெள்ள ஆபத்து கண்டறியப்பட்டுள்ளது. சாத்தியமான வெளியேற்றத்திற்கு தயாராக இருங்கள் மற்றும் உள்ளூர் அதிகாரிகளைப் பின்பற்றவும்.',
		'msg.critical': 'முக்கிய வெள்ள ஆபத்து! உடனடி வெளியேற்றம் தேவைப்படலாம். அவசர நெறிமுறைகளைப் பின்பற்றவும்.',
		'msg.heavyRainfallExpected': 'அடுத்த 3 மணி நேரத்தில் கனமழை எதிர்பார்க்கப்படுகிறது',
		'msg.waterLevelMonitoring': 'நீர் மட்ட கண்காணிப்பு நிலையம் மீண்டும் ஆன்லைனில்',

		// Registration
		'reg.alertPrefs': 'எச்சரிக்கை விருப்பங்கள்',
		'reg.alertPrefsDesc': 'வெள்ள எச்சரிக்கைகளை எப்படி பெற விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்.',
		'reg.smsAlerts': 'எஸ்எம்எஸ் எச்சரிக்கைகள்',
		'reg.whatsappAlerts': 'வாட்ஸ்அப் செய்திகள்',
		'reg.selectOne': 'முக்கிய வெள்ள எச்சரிக்கைகளைப் பெற குறைந்தபட்சம் ஒரு முறையைத் தேர்ந்தெடுக்கவும்.',

		// Forecast
		'forecast.today': 'இன்று',
		'forecast.tomorrow': 'நாளை',
		'forecast.wednesday': 'புதன்கிழமை',
		'forecast.thursday': 'வியாழக்கிழமை',
		'forecast.friday': 'வெள்ளிக்கிழமை',
		'forecast.saturday': 'சனிக்கிழமை',
		'forecast.sunday': 'ஞாயிற்றுக்கிழமை',

		// Weather
		'weather.moderateRain': 'நடுத்தர மழை',
		'weather.heavyRain': 'கனமழை',
		'weather.lightRain': 'இலேசான மழை',
		'weather.clear': 'தெளிவு',

		// Settings
		'settings.alertPreferences': 'எச்சரிக்கை விருப்பங்கள்',
		'settings.emailAlerts': 'மின்னஞ்சல் எச்சரிக்கைகள்',
		'settings.pushNotifications': 'புஷ் அறிவிப்புகள்',
		'settings.displaySettings': 'காட்சி அமைப்புகள்',
		'settings.darkMode': 'இருள் பயன்முறை',
		'settings.fontSize': 'எழுத்து அளவு',
		'settings.privacySecurity': 'தனியுரிமை மற்றும் பாதுகாப்பு',
		'settings.twoFA': '2FA',
		'settings.dataEncryption': 'தரவு குறியாக்கம்',
		'settings.managePreferences': 'உங்கள் விருப்பங்களை நிர்வகிக்கவும்',

		// Profile
		'profile.userProfile': 'பயனர் சுயவிவரம்',
		'profile.manageAccount': 'உங்கள் கணக்கு மற்றும் விருப்பங்களை நிர்வகிக்கவும்',
		'profile.accountDetails': 'கணக்கு விவரங்கள்',
		'profile.role': 'பங்கு',
		'profile.status': 'நிலை',
		'profile.active': 'செயலில்',
		'profile.memberSince': 'உறுப்பினர் முதல்',
		'profile.quickActions': 'விரைவு செயல்கள்',
		'profile.editProfile': 'சுயவிவரத்தைத் திருத்து',
		'profile.changePassword': 'கடவுச்சொல்லை மாற்று',
		'profile.notificationSettings': 'அறிவிப்பு அமைப்புகள்',
		'profile.comingSoon': 'விரைவில் வருகிறது',
		'profile.comingSoonDesc': 'உங்கள் சுயவிவர நிர்வாக அனுபவத்திற்கான உற்சாகமான புதிய அம்சங்களை நாங்கள் உருவாக்கி வருகிறோம்.',
		'profile.activityHistory': 'செயல்பாட்டு வரலாறு',
		'profile.activityHistoryDesc': 'உங்கள் டாஷ்போர்டு பயன்பாடு மற்றும் தொடர்புகளை கண்காணிக்கவும்',
		'profile.personalization': 'தனிப்பயனாக்கம்',
		'profile.personalizationDesc': 'உங்கள் டாஷ்போர்டு அனுபவத்தை தனிப்பயனாக்கவும்',
		'profile.privacySecurity': 'தனியுரிமை மற்றும் பாதுகாப்பு',
		'profile.privacySecurityDesc': 'உங்கள் தரவு எப்போதும் பாதுகாக்கப்படுகிறது',

		// Official Announcements
		'chat.communityChat': 'அதிகாரப்பூர்வ அறிவிப்புகள்',
		'chat.connectCommunity': 'அதிகாரிகளிடமிருந்து சமீபத்திய புதுப்பிப்புகள்',
		'chat.onlineUsers': 'சமீபத்திய இடுகைகள்',
		'chat.typeMessage': 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
		'chat.send': 'இடுகையிடு',

		// Alerts
		'alerts.recentAlerts': 'சமீபத்திய எச்சரிக்கைகள்',
		'alerts.viewAllAlerts': 'அனைத்து சமீபத்திய வெள்ள எச்சரிக்கைகள் மற்றும் அறிவிப்புகளைக் காண்க',
		'alerts.noAlerts': 'சமீபத்திய எச்சரிக்கைகள் எதுவும் இல்லை',
		'alerts.allClear': 'எல்லாம் தெளிவாக உள்ளது! உங்கள் பகுதியில் செயலில் உள்ள எச்சரிக்கைகள் எதுவும் இல்லை.',

		// Predictions
		'predictions.riskPredicted': 'ஆபத்து முன்கணிக்கப்பட்டது',
		'predictions.viewPredictions': 'வெள்ள ஆபத்து முன்கணிப்புகள் மற்றும் முன்கணிப்புகளைக் காண்க',
		'alerts.warning': 'எச்சரிக்கை',
		'alerts.danger': 'ஆபத்து',
		'alerts.info': 'தகவல்'
	}
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
	const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

	const t = useMemo(() => {
		return (key: string) => translations[currentLanguage][key] ?? translations['en'][key] ?? key
	}, [currentLanguage])

	return (
		<I18nContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage, t }}>
			{children}
		</I18nContext.Provider>
	)
}

export function useI18n() {
	const ctx = useContext(I18nContext)
	if (!ctx) throw new Error('useI18n must be used within I18nProvider')
	return ctx
}
