import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-border/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted">
            <span className="text-lg font-bold text-primary-hover">B</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{t('header.logo')}</p>
            <p className="text-xs text-muted">{t('header.tagline')}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher />
          <span className="hidden rounded-full bg-primary-muted px-3 py-1 text-xs font-medium text-primary-hover sm:inline">
            {t('hero.badge')}
          </span>
        </div>
      </div>
    </header>
  );
}
