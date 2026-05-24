import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/components/results/ProductCard';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types/review';

interface ProductPreviewProps {
  product: Product;
  generating: boolean;
  onGenerate: () => void;
  onBack: () => void;
}

export function ProductPreview({
  product,
  generating,
  onGenerate,
  onBack,
}: ProductPreviewProps) {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <ProductCard
          product={product}
          title={t('preview.title')}
          badge={t('preview.success')}
        />

        {generating && (
          <p className="rounded-xl bg-primary-muted px-4 py-3 text-sm text-primary-hover">
            {t('form.generatingAiHint')}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            loading={generating}
            disabled={generating}
            onClick={onGenerate}
          >
            {generating ? t('form.generatingAi') : t('preview.generateReview')}
          </Button>
          <Button
            type="button"
            disabled={generating}
            onClick={onBack}
            className="!bg-white !text-text ring-1 ring-border hover:!bg-surface"
          >
            {t('preview.back')}
          </Button>
        </div>
      </div>
    </section>
  );
}
