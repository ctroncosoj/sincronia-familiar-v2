import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

// Detect user's preferred language from browser, stored preference, or system
function detectLanguage(): string {
  // 1. Stored user preference (from toggle)
  const stored = localStorage.getItem('senda-lang');
  if (stored === 'es' || stored === 'en') return stored;

  // 2. Browser/system language
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'es';
  if (browserLang.startsWith('en')) return 'en';

  // 3. Default to Spanish
  return 'es';
}

const detectedLang = detectLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: detectedLang,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

// Persist language changes to localStorage
i18n.on('languageChanged', (lang) => {
  localStorage.setItem('senda-lang', lang);
  document.documentElement.lang = lang;
});

// Set initial lang attribute
document.documentElement.lang = detectedLang;

export default i18n;
