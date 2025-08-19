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

		'dash.currentRisk': 'Current Risk Level',
		'dash.lastUpdated': 'Last updated',
		'dash.waterLevel': 'Water Level',
		'dash.rainfall': 'Rainfall',
		'dash.riskMap': 'Risk Map',
		'dash.activeAlerts': 'Active Alerts',
		'dash.weeklyForecast': 'Weekly Forecast',

		'risk.low': 'Low Risk',
		'risk.medium': 'Medium Risk',
		'risk.high': 'High Risk',
		'risk.critical': 'Critical Risk',

		'msg.low': 'Low flood risk in your area. Continue normal activities.',
		'msg.medium': 'Moderate flood risk detected in your area. Stay informed and be prepared to take action if conditions worsen.',
		'msg.high': 'High flood risk detected. Prepare for possible evacuation and follow local authorities.',
		'msg.critical': 'Critical flood risk! Immediate evacuation may be required. Follow emergency protocols.',

		'reg.alertPrefs': 'Alert Preferences',
		'reg.alertPrefsDesc': 'Choose how you\'d like to receive flood alerts.',
		'reg.smsAlerts': 'SMS Alerts',
		'reg.whatsappAlerts': 'WhatsApp Messages',
		'reg.selectOne': 'Select at least one method to receive critical flood alerts.',

		'forecast.today': 'Today',
		'forecast.tomorrow': 'Tomorrow',
		'forecast.wednesday': 'Wednesday',
		'forecast.thursday': 'Thursday',
		'forecast.friday': 'Friday',
		'forecast.saturday': 'Saturday',
		'forecast.sunday': 'Sunday',

		'weather.moderateRain': 'Moderate Rain',
		'weather.heavyRain': 'Heavy Rain',
		'weather.lightRain': 'Light Rain',
		'weather.clear': 'Clear'
	},
	hi: {
		'app.home': 'होम',
		'app.dashboard': 'डैशबोर्ड',
		'app.settings': 'सेटिंग्स',
		'app.profile': 'प्रोफ़ाइल',

		'dash.currentRisk': 'वर्तमान जोखिम स्तर',
		'dash.lastUpdated': 'अंतिम अद्यतन',
		'dash.waterLevel': 'जल स्तर',
		'dash.rainfall': 'वर्षा',
		'dash.riskMap': 'जोखिम मानचित्र',
		'dash.activeAlerts': 'सक्रिय अलर्ट',
		'dash.weeklyForecast': 'साप्ताहिक पूर्वानुमान',

		'risk.low': 'कम जोखिम',
		'risk.medium': 'मध्यम जोखिम',
		'risk.high': 'उच्च जोखिम',
		'risk.critical': 'गंभीर जोखिम',

		'msg.low': 'आपके क्षेत्र में बाढ़ का जोखिम कम है। सामान्य गतिविधियाँ जारी रखें।',
		'msg.medium': 'आपके क्षेत्र में मध्यम बाढ़ जोखिम का पता चला है। सूचित रहें और आवश्यकता पड़ने पर कार्रवाई के लिए तैयार रहें।',
		'msg.high': 'उच्च बाढ़ जोखिम का पता चला। निकासी के लिए तैयार रहें और स्थानीय अधिकारियों का पालन करें।',
		'msg.critical': 'गंभीर बाढ़ जोखिम! तुरंत निकासी की आवश्यकता हो सकती है। आपातकालीन निर्देशों का पालन करें।',

		'reg.alertPrefs': 'अलर्ट प्राथमिकताएं',
		'reg.alertPrefsDesc': 'चुनें कि आप बाढ़ अलर्ट कैसे प्राप्त करना चाहते हैं।',
		'reg.smsAlerts': 'एसएमएस अलर्ट',
		'reg.whatsappAlerts': 'व्हाट्सएप संदेश',
		'reg.selectOne': 'महत्वपूर्ण बाढ़ अलर्ट प्राप्त करने के लिए कम से कम एक विधि चुनें।',

		'forecast.today': 'आज',
		'forecast.tomorrow': 'कल',
		'forecast.wednesday': 'बुधवार',
		'forecast.thursday': 'गुरुवार',
		'forecast.friday': 'शुक्रवार',
		'forecast.saturday': 'शनिवार',
		'forecast.sunday': 'रविवार',

		'weather.moderateRain': 'मध्यम वर्षा',
		'weather.heavyRain': 'भारी वर्षा',
		'weather.lightRain': 'हल्की वर्षा',
		'weather.clear': 'साफ'
	},
	as: {
		'app.home': 'হোম',
		'app.dashboard': 'ড্যাশবোর্ড',
		'app.settings': 'ছেটিংছ',
		'app.profile': 'প্ৰফাইল',

		'dash.currentRisk': 'বৰ্তমান বিপদৰ স্তৰ',
		'dash.lastUpdated': 'শেহতীয়াকৈ আপডেট',
		'dash.waterLevel': 'পানীৰ স্তৰ',
		'dash.rainfall': 'বৰষুণ',
		'dash.riskMap': 'বিপদ মানচিত্ৰ',
		'dash.activeAlerts': 'সক্ৰিয় সতৰ্কতা',
		'dash.weeklyForecast': 'সাপ্তাহিক পূৰ্বাভাস',

		'risk.low': 'কম বিপদ',
		'risk.medium': 'মধ্যম বিপদ',
		'risk.high': 'উচ্চ বিপদ',
		'risk.critical': 'জৰুৰী বিপদ',

		'msg.low': 'আপোনাৰ অঞ্চলত বন্যাৰ বিপদ কম। সাধাৰণ কাৰ্যকলাপ চলাই যাঁওক।',
		'msg.medium': 'আপোনাৰ অঞ্চলত মধ্যম বন্যাৰ বিপদ ধৰা পৰিছে। তথ্যৱান থাকক আৰু প্ৰয়োজন হলে কাৰ্য্য কৰিবলৈ সাজু থাকক।',
		'msg.high': 'উচ্চ বন্যাৰ বিপদ ধৰা পৰিছে। সঁজুলি কৰি ৰাখক আৰু স্থানীয় আধিকাৰীৰ নিৰ্দেশনা অনুসৰণ কৰক।',
		'msg.critical': 'গুরুতৰ বন্যাৰ বিপদ! তৎক্ষণাৎ সুৰক্ষিত ঠাইলৈ যাব লাগিব পাৰে। জরুৰী বিধি-বিধান অনুসৰণ কৰক।',

		'reg.alertPrefs': 'সতৰ্কতাৰ পছন্দ',
		'reg.alertPrefsDesc': 'বন্যাৰ সতৰ্কতা কেনেকৈ পাব বিচাৰে তাক বাছনি কৰক।',
		'reg.smsAlerts': 'এছএমএছ সতৰ্কতা',
		'reg.whatsappAlerts': 'ৱাটছএপ বাৰ্তা',
		'reg.selectOne': 'গুৰুত্বপূৰ্ণ বন্যাৰ সতৰ্কতা পাবলৈ কমেও এটা পদ্ধতি বাছনি কৰক।',

		'forecast.today': 'আজি',
		'forecast.tomorrow': 'কালি',
		'forecast.wednesday': 'বুধবাৰ',
		'forecast.thursday': 'বৃহস্পতিবাৰ',
		'forecast.friday': 'শুক্ৰবাৰ',
		'forecast.saturday': 'শনিবাৰ',
		'forecast.sunday': 'দেওবাৰ',

		'weather.moderateRain': 'মধ্যম বৰষুণ',
		'weather.heavyRain': 'প্ৰচণ্ড বৰষুণ',
		'weather.lightRain': 'লঘু বৰষুণ',
		'weather.clear': 'সৰল'
	},
	ta: {
		'app.home': 'முகப்பு',
		'app.dashboard': 'டாஷ்போர்டு',
		'app.settings': 'அமைப்புகள்',
		'app.profile': 'சுயவிவரம்',

		'dash.currentRisk': 'தற்போதைய ஆபத்து நிலை',
		'dash.lastUpdated': 'கடைசியாக புதுப்பிக்கப்பட்டது',
		'dash.waterLevel': 'நீர் மட்டம்',
		'dash.rainfall': 'மழை',
		'dash.riskMap': 'ஆபத்து வரைபடம்',
		'dash.activeAlerts': 'செயலில் உள்ள எச்சரிக்கைகள்',
		'dash.weeklyForecast': 'வாராந்திர முன்கணிப்பு',

		'risk.low': 'குறைந்த ஆபத்து',
		'risk.medium': 'நடுத்தர ஆபத்து',
		'risk.high': 'உயர் ஆபத்து',
		'risk.critical': 'முக்கிய ஆபத்து',

		'msg.low': 'உங்கள் பகுதியில் வெள்ள ஆபத்து குறைவு. சாதாரண செயல்பாடுகளைத் தொடரவும்.',
		'msg.medium': 'உங்கள் பகுதியில் நடுத்தர வெள்ள ஆபத்து கண்டறியப்பட்டுள்ளது. தகவலறிந்திருக்கவும், நிலைமைகள் மோசமடைந்தால் நடவடிக்கை எடுக்க தயாராக இருங்கள்.',
		'msg.high': 'உயர் வெள்ள ஆபத்து கண்டறியப்பட்டுள்ளது. சாத்தியமான வெளியேற்றத்திற்கு தயாராக இருங்கள் மற்றும் உள்ளூர் அதிகாரிகளைப் பின்பற்றவும்.',
		'msg.critical': 'முக்கிய வெள்ள ஆபத்து! உடனடி வெளியேற்றம் தேவைப்படலாம். அவசர நெறிமுறைகளைப் பின்பற்றவும்.',

		'reg.alertPrefs': 'எச்சரிக்கை விருப்பங்கள்',
		'reg.alertPrefsDesc': 'வெள்ள எச்சரிக்கைகளை எப்படி பெற விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்.',
		'reg.smsAlerts': 'எஸ்எம்எஸ் எச்சரிக்கைகள்',
		'reg.whatsappAlerts': 'வாட்ஸ்அப் செய்திகள்',
		'reg.selectOne': 'முக்கிய வெள்ள எச்சரிக்கைகளைப் பெற குறைந்தபட்சம் ஒரு முறையைத் தேர்ந்தெடுக்கவும்.',

		'forecast.today': 'இன்று',
		'forecast.tomorrow': 'நாளை',
		'forecast.wednesday': 'புதன்கிழமை',
		'forecast.thursday': 'வியாழக்கிழமை',
		'forecast.friday': 'வெள்ளிக்கிழமை',
		'forecast.saturday': 'சனிக்கிழமை',
		'forecast.sunday': 'ஞாயிற்றுக்கிழமை',

		'weather.moderateRain': 'நடுத்தர மழை',
		'weather.heavyRain': 'கனமழை',
		'weather.lightRain': 'இலேசான மழை',
		'weather.clear': 'தெளிவு'
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
