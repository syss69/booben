import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { MARKETPLACES } from '@/constants/marketplaces';
import { LANGUAGES } from '@/constants/languages';
import { PROMPTS } from '@/constants/prompts';
import type {
  GenerateReviewPayload,
  LanguageCode,
  Marketplace,
  PromptType,
} from '@/types/review';
import type { ReviewStatus } from '@/hooks/useGenerateReview';

interface ReviewFormProps {
  status: ReviewStatus;
  apiError: string | null;
  onSubmit: (payload: GenerateReviewPayload) => void;
}

export function ReviewForm({ status, apiError, onSubmit }: ReviewFormProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [marketplace, setMarketplace] = useState<Marketplace>('amazon-global');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [prompt, setPrompt] = useState<PromptType>('review');
  const [validationError, setValidationError] = useState<string | null>(null);

  const loading = status === 'loading';
  const displayError = validationError ?? apiError;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setValidationError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError(t('errors.urlRequired'));
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setValidationError(t('errors.urlInvalid'));
      return;
    }

    onSubmit({ url: trimmed, marketplace, language, prompt });
  }

  return (
    <section className="px-6 py-6" id="generate">
      <div className="mx-auto max-w-3xl">
        <Card>
          <h2 className="mb-6 text-xl font-semibold text-text">{t('form.title')}</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label={t('form.url.label')}
              type="url"
              placeholder={t('form.url.placeholder')}
              hint={t('form.url.hint')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              error={displayError ?? undefined}
              required
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label={t('form.marketplace.label')}
                options={MARKETPLACES.map((m) => ({
                  value: m.value,
                  label: m.labelKey,
                }))}
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value as Marketplace)}
                disabled={loading}
              />

              <Select
                label={t('form.language.label')}
                hint={t('form.language.hint')}
                options={LANGUAGES.map((l) => ({
                  value: l.value,
                  label: l.label,
                }))}
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                disabled={loading}
              />
            </div>

            <Select
              label={t('form.prompt.label')}
              options={PROMPTS.map((p) => ({
                value: p.value,
                label: p.labelKey,
              }))}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value as PromptType)}
              disabled={loading}
            />

            {loading && (
              <p className="rounded-xl bg-primary-muted px-4 py-3 text-sm text-primary-hover">
                {t('form.loadingHint')}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full sm:w-auto">
              {loading ? t('form.loading') : t('form.submit')}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
