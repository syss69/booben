import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import type { Product } from '@/types/review';

interface ProductCardProps {
  product: Product;
  title?: string;
  badge?: string;
}

export function ProductCard({ product, title, badge }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-text">
          {title ?? t('results.productTitle')}
        </h3>
        {badge && (
          <span className="rounded-full bg-primary-muted px-3 py-1 text-xs font-medium text-primary-hover">
            {badge}
          </span>
        )}
      </div>
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
  );
}
