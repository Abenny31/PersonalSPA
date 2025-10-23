import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../locales/en/common.json';
import hrCommon from '../locales/hr/common.json';

export const STORAGE_KEY = 'personal-spa-language';
export const FALLBACK_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'hr'] as const;

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return FALLBACK_LANGUAGE;
  }

  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage as (typeof SUPPORTED_LANGUAGES)[number])) {
      return savedLanguage;
    }
  } catch {
    // Ignore storage access errors and fall back to defaults.
  }

  if (typeof navigator !== 'undefined') {
    const [browserLanguage] = navigator.language.split('-');
    if (SUPPORTED_LANGUAGES.includes(browserLanguage as (typeof SUPPORTED_LANGUAGES)[number])) {
      return browserLanguage;
    }
  }

  return FALLBACK_LANGUAGE;
};

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    hr: { common: hrCommon }
  },
  lng: getInitialLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false
  },
  defaultNS: 'common'
});

i18n.on('languageChanged', (lng) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // Ignore storage access errors to avoid noisy logs.
  }
});

export default i18n;
