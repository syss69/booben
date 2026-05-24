import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/common.json';
import ru from '@/locales/ru/common.json';
import fr from '@/locales/fr/common.json';

export const UI_LANGUAGES = ['en', 'ru', 'fr'] as const;
export type UiLanguage = (typeof UI_LANGUAGES)[number];

const STORAGE_KEY = 'booben-ui-lang';

function getStoredLanguage(): UiLanguage {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'ru' || stored === 'fr') {
    return stored;
  }
  return 'en';
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    ru: { common: ru },
    fr: { common: fr },
  },
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru', 'fr'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem(STORAGE_KEY, lng);
});

document.documentElement.lang = i18n.language;

export function setUiLanguage(lng: UiLanguage) {
  void i18n.changeLanguage(lng);
}

export default i18n;
