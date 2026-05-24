import type { Marketplace } from '@/types/review';

export const MARKETPLACES: {
  value: Marketplace;
  parsePath: Marketplace;
  labelKey: string;
}[] = [
  { value: 'amazon-global', parsePath: 'amazon-global', labelKey: 'Amazon' },
  { value: 'aliexpress', parsePath: 'aliexpress', labelKey: 'AliExpress' },
  { value: 'wildberries', parsePath: 'wildberries', labelKey: 'Wildberries' },
];
