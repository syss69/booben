import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { GenerateReviewResponse } from '@/types/review';

interface ReviewResultProps {
  data: GenerateReviewResponse;
  onReset: () => void;
}

export function ReviewResult({ data, onReset }: ReviewResultProps) {
  const { t } = useTranslation();
  const { product, review } = data;

  return (
    <section className="px-6 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-text">
            {t('results.productTitle')}
          </h3>
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dd className="text-base font-semibold text-text">{product.title}</dd>
            </div>
            {product.price && (
              <div>
                <dt className="font-medium text-muted">{t('results.price')}</dt>
                <dd className="text-text">{product.price}</dd>
              </div>
            )}
            {product.overview && (
              <div>
                <dt className="font-medium text-muted">{t('results.overview')}</dt>
                <dd className="leading-relaxed text-text">{product.overview}</dd>
              </div>
            )}
            {product.description && (
              <div>
                <dt className="font-medium text-muted">{t('results.description')}</dt>
                <dd className="leading-relaxed text-text">{product.description}</dd>
              </div>
            )}
          </dl>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-text">
            {t('results.reviewTitle')}
          </h3>
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
