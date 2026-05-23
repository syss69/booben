import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateReview, ReviewerApiError } from '@/api/reviewer';
import type {
  GenerateReviewPayload,
  GenerateReviewResponse,
} from '@/types/review';

export type ReviewStatus = 'idle' | 'loading' | 'success' | 'error';

export function useGenerateReview() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<ReviewStatus>('idle');
  const [data, setData] = useState<GenerateReviewResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setErrorMessage(null);
  }, []);

  const submit = useCallback(
    async (payload: GenerateReviewPayload) => {
      setStatus('loading');
      setData(null);
      setErrorMessage(null);

      try {
        const result = await generateReview(payload);
        setData(result);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        if (err instanceof ReviewerApiError) {
          const key =
            err.message === 'network' ||
            err.message === 'badRequest' ||
            err.message === 'emptyReview'
              ? err.message
              : 'generic';
          setErrorMessage(t(`errors.${key}`));
        } else {
          setErrorMessage(t('errors.generic'));
        }
      }
    },
    [t],
  );

  return { status, data, errorMessage, submit, reset };
}
