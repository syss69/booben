import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { LANGUAGES } from '@/constants/languages';
import { PROMPTS } from '@/constants/prompts';
import type {
  FlowPhase,
  LanguageCode,
  Product,
  PromptType,
  SimpleReviewPayload,
} from '@/types/review';

interface ManualReviewFormProps {
  phase: FlowPhase;
  apiError: string | null;
  onSubmit: (payload: SimpleReviewPayload) => void;
}

export function ManualReviewForm({ phase, apiError, onSubmit }: ManualReviewFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [overview, setOverview] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [prompt, setPrompt] = useState<PromptType>('review');
  const [validationError, setValidationError] = useState<string | null>(null);

  const generating = phase === 'generating';
  const disabled = generating;
  const displayError = validationError ?? apiError;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setValidationError(null);

    const trimmedTitle = title.trim();
    const trimmedPrice = price.trim();
    const trimmedOverview = overview.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setValidationError(t('errors.titleRequired'));
      return;
    }
    if (!trimmedPrice) {
      setValidationError(t('errors.priceRequired'));
      return;
    }
    if (!trimmedOverview && !trimmedDescription) {
      setValidationError(t('errors.detailsRequired'));
      return;
    }

    const product: Product = {
      title: trimmedTitle,
      price: trimmedPrice,
      overview: trimmedOverview,
      description: trimmedDescription,
    };

    onSubmit({ product, language, prompt });
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-text">{t('form.manual.title')}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label={t('form.manual.titleLabel')}
          placeholder={t('form.manual.titlePlaceholder')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled}
          required
        />

        <Input
          label={t('form.manual.priceLabel')}
          placeholder={t('form.manual.pricePlaceholder')}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={disabled}
          required
        />

        {displayError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {displayError}
          </p>
        )}

        <Textarea
          label={t('form.manual.characteristicsLabel')}
          placeholder={t('form.manual.characteristicsPlaceholder')}
          hint={t('form.manual.characteristicsHint')}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          disabled={disabled}
        />

        <Textarea
          label={t('form.manual.descriptionLabel')}
          placeholder={t('form.manual.descriptionPlaceholder')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disabled}
        />

        <div className="grid gap-5 sm:grid-cols-2">
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

          <Select
            label={t('form.prompt.label')}
            options={PROMPTS.map((p) => ({
              value: p.value,
              label: p.labelKey,
            }))}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value as PromptType)}
            disabled={disabled}
          />
        </div>

        {generating && (
          <p className="rounded-xl bg-primary-muted px-4 py-3 text-sm text-primary-hover">
            {t('form.generatingAiHint')}
          </p>
        )}

        <Button type="submit" loading={generating} className="w-full sm:w-auto">
          {generating ? t('form.generatingAi') : t('form.manual.submit')}
        </Button>
      </form>
    </Card>
  );
}
