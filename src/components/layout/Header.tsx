import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-border/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted">
            <span className="text-lg font-bold text-primary-hover">R</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">{t('header.logo')}</p>
            <p className="text-xs text-muted">{t('header.tagline')}</p>
          </div>
        </div>
        <span className="rounded-full bg-primary-muted px-3 py-1 text-xs font-medium text-primary-hover">
          {t('hero.badge')}
        </span>
      </div>
    </header>
  );
}
