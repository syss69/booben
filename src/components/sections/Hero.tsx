import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="px-6 pb-4 pt-12 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  );
}
