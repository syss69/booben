import type { Marketplace } from '@/types/review';

export const MARKETPLACES: { value: Marketplace; labelKey: string }[] = [
  { value: 'amazon-global', labelKey: 'Amazon' },
  { value: 'aliexpress', labelKey: 'AliExpress' },
  { value: 'wildberries', labelKey: 'Wildberries' },
];
