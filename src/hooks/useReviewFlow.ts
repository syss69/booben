import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  generateSimpleReview,
  parseProduct,
  ReviewerApiError,
} from '@/api/reviewer';
import type {
  FlowPhase,
  LanguageCode,
  LinkSubmitPayload,
  Product,
  PromptType,
  ReviewMode,
  ReviewResult,
  SimpleReviewPayload,
} from '@/types/review';

const ERROR_KEYS = [
  'network',
  'notFound',
  'badRequest',
  'emptyReview',
  'generic',
] as const;

function isErrorKey(key: string): key is (typeof ERROR_KEYS)[number] {
  return (ERROR_KEYS as readonly string[]).includes(key);
}

export function useReviewFlow() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<FlowPhase>('idle');
  const [mode, setMode] = useState<ReviewMode>('link');
  const [product, setProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [prompt, setPrompt] = useState<PromptType>('review');
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resolveError = useCallback(
    (err: unknown) => {
      if (err instanceof ReviewerApiError) {
        const key = isErrorKey(err.message) ? err.message : 'generic';
        let message = t(`errors.${key}`);
        if (key === 'notFound' && err.detail) {
          message = `${message}: ${err.detail}`;
        } else if (err.detail && key === 'generic') {
          message = err.detail;
        }
        setErrorMessage(message);
      } else {
        setErrorMessage(t('errors.generic'));
      }
      setPhase('error');
    },
    [t],
  );

  const reset = useCallback(() => {
    setPhase('idle');
    setProduct(null);
    setResult(null);
    setErrorMessage(null);
  }, []);

  const back = useCallback(() => {
    setPhase('idle');
    setProduct(null);
    setErrorMessage(null);
  }, []);

  const changeMode = useCallback(
    (next: ReviewMode) => {
      setMode(next);
      reset();
    },
    [reset],
  );

  const submitLink = useCallback(
    async (payload: LinkSubmitPayload) => {
      setPhase('parsing');
      setProduct(null);
      setResult(null);
      setErrorMessage(null);
      setLanguage(payload.language);
      setPrompt(payload.prompt);

      try {
        const parsed = await parseProduct(payload.marketplace, payload.url);
        setProduct(parsed);
        setPhase('productReady');
      } catch (err) {
        resolveError(err);
      }
    },
    [resolveError],
  );

  const generateFromProduct = useCallback(async () => {
    if (!product) return;

    setPhase('generating');
    setErrorMessage(null);

    const aiPayload: SimpleReviewPayload = { product, language, prompt };

    try {
      const { review } = await generateSimpleReview(aiPayload);
      setResult({ product, review });
      setPhase('success');
    } catch (err) {
      resolveError(err);
    }
  }, [product, language, prompt, resolveError]);

  const submitManual = useCallback(
    async (payload: SimpleReviewPayload) => {
      setPhase('generating');
      setProduct(payload.product);
      setLanguage(payload.language);
      setPrompt(payload.prompt);
      setResult(null);
      setErrorMessage(null);

      try {
        const { review } = await generateSimpleReview(payload);
        setResult({ product: payload.product, review });
        setPhase('success');
      } catch (err) {
        resolveError(err);
      }
    },
    [resolveError],
  );

  return {
    phase,
    mode,
    product,
    language,
    prompt,
    result,
    errorMessage,
    setMode: changeMode,
    submitLink,
    generateFromProduct,
    submitManual,
    reset,
    back,
  };
}
