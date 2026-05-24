import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/components/results/ProductCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { ReviewResult as ReviewResultData } from '@/types/review';

interface ReviewResultProps {
  data: ReviewResultData;
  onReset: () => void;
}

export function ReviewResult({ data, onReset }: ReviewResultProps) {
  const { t } = useTranslation();
  const { product, review } = data;
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="px-6 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <ProductCard product={product} />

        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-text">
              {t('results.reviewTitle')}
            </h3>
            <Button
              type="button"
              onClick={() => void handleCopy()}
              className="!bg-white !px-4 !py-2 !text-sm !text-text ring-1 ring-border hover:!bg-surface"
            >
              {copied ? t('results.copiedReview') : t('results.copyReview')}
            </Button>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-text">
            {review}
          </div>
        </Card>

        <Button type="button" onClick={onReset} className="self-start">
          {t('results.generateAnother')}
        </Button>
      </div>
    </section>
  );
}
