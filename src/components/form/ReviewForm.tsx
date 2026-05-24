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
  FlowPhase,
  LanguageCode,
  LinkSubmitPayload,
  Marketplace,
  PromptType,
} from '@/types/review';

interface ReviewFormProps {
  phase: FlowPhase;
  apiError: string | null;
  onSubmit: (payload: LinkSubmitPayload) => void;
}

export function ReviewForm({ phase, apiError, onSubmit }: ReviewFormProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [marketplace, setMarketplace] = useState<Marketplace>('amazon-global');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [prompt, setPrompt] = useState<PromptType>('review');
  const [validationError, setValidationError] = useState<string | null>(null);

  const parsing = phase === 'parsing';
  const disabled = parsing;
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
          disabled={disabled}
          error={displayError ?? undefined}
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            label={t('form.marketplace.label')}
            options={MARKETPLACES.map((m) => ({
              value: m.value,
              label: t(`marketplaces.${m.value}`),
            }))}
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value as Marketplace)}
            disabled={disabled}
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
            disabled={disabled}
          />
        </div>

        <Select
          label={t('form.prompt.label')}
          options={PROMPTS.map((p) => ({
            value: p.value,
            label: t(`prompts.${p.value}`),
          }))}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value as PromptType)}
          disabled={disabled}
        />

        {parsing && (
          <p className="rounded-xl bg-primary-muted px-4 py-3 text-sm text-primary-hover">
            {t('form.parsingHint')}
          </p>
        )}

        <Button type="submit" loading={parsing} className="w-full sm:w-auto">
          {parsing ? t('form.parsing') : t('form.fetchProduct')}
        </Button>
      </form>
    </Card>
  );
}
