export type Marketplace = 'amazon-global' | 'aliexpress' | 'wildberries';

export type PromptType = 'review' | 'blog';

export type LanguageCode =
  | 'fr'
  | 'en'
  | 'es'
  | 'it'
  | 'pt'
  | 'de'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'ar'
  | 'hi';

export interface Product {
  title: string;
  price: string;
  overview: string;
  description: string;
}

export interface GenerateReviewResponse {
  product: Product;
  review: string | null;
}

export interface GenerateReviewPayload {
  url: string;
  marketplace: Marketplace;
  prompt: PromptType;
  language: LanguageCode;
}
