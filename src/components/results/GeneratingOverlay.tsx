import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/components/results/ProductCard';
import type { Product } from '@/types/review';

interface GeneratingOverlayProps {
  product: Product | null;
}

export function GeneratingOverlay({ product }: GeneratingOverlayProps) {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {product && <ProductCard product={product} />}
        <div className="flex items-center gap-3 rounded-xl bg-primary-muted px-4 py-4">
          <span
            className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-primary/30 border-t-primary-hover"
            aria-hidden
          />
          <div>
            <p className="text-sm font-medium text-primary-hover">
              {t('form.generatingAi')}
            </p>
            <p className="mt-0.5 text-xs text-muted">{t('form.generatingAiHint')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
