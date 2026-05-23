import type { PromptType } from '@/types/review';

export const PROMPTS: { value: PromptType; labelKey: string }[] = [
  { value: 'review', labelKey: 'Short review (~150 words)' },
  { value: 'blog', labelKey: 'Blog post (~500 words)' },
];
