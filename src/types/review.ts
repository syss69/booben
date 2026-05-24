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

export interface SimpleReviewPayload {
  product: Product;
  language: LanguageCode;
  prompt: PromptType;
}

export interface SimpleReviewResponse {
  review: string;
}

export interface ReviewResult {
  product: Product;
  review: string;
}

export type ReviewMode = 'link' | 'manual';

export type FlowPhase =
  | 'idle'
  | 'parsing'
  | 'productReady'
  | 'generating'
  | 'success'
  | 'error';

export interface LinkSubmitPayload {
  url: string;
  marketplace: Marketplace;
  language: LanguageCode;
  prompt: PromptType;
}
