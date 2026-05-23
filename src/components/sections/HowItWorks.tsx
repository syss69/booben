import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';

const STEPS = ['step1', 'step2', 'step3'] as const;

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-xl font-semibold text-text">
          {t('howItWorks.title')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <Card key={step} className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-muted text-sm font-bold text-primary-hover">
                {index + 1}
              </div>
              <h3 className="font-semibold text-text">{t(`howItWorks.${step}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`howItWorks.${step}.description`)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
