import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Define supported languages
export const languages = ['en', 'vi', 'ja'] as const;
export type Language = (typeof languages)[number];

// Get saved language or default to 'en'
const savedLanguage = (localStorage.getItem('language') as Language) || 'vi';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'vi',
        lng: savedLanguage,
        backend: {
            loadPath: '/locales/{{lng}}.json'
        },
        interpolation: { escapeValue: false }
    });

export const changeLanguage = (lng: Language) => {
    if (!languages.includes(lng)) return; // Ensure the language is supported
    localStorage.setItem('language', lng);
    i18n.changeLanguage(lng);
};

export default i18n;