import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-6 py-8 text-center text-sm text-muted">
        <p className="font-medium text-text/80">{t('footer.mvp')}</p>
        <p>{t('footer.copyright', { year })}</p>
      </div>
    </footer>
  );
}
