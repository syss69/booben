import { useTranslation } from 'react-i18next';
import { UI_LANGUAGES, setUiLanguage, type UiLanguage } from '@/i18n';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const resolved = (i18n.resolvedLanguage ?? i18n.language) as UiLanguage;
  const current = UI_LANGUAGES.includes(resolved) ? resolved : 'en';

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{t('uiLanguage.label')}</span>
      <div
        className="flex rounded-lg bg-surface p-0.5 ring-1 ring-border"
        role="group"
        aria-label={t('uiLanguage.label')}
      >
        {UI_LANGUAGES.map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => setUiLanguage(lng)}
            aria-pressed={current === lng}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              current === lng
                ? 'bg-white text-primary-hover shadow-sm'
                : 'text-muted hover:text-text'
            }`}
          >
            {t(`uiLanguage.${lng}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
