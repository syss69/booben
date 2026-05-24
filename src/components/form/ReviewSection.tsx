import { ModeTabs } from '@/components/ui/ModeTabs';
import { ReviewForm } from '@/components/form/ReviewForm';
import { ManualReviewForm } from '@/components/form/ManualReviewForm';
import type { useReviewFlow } from '@/hooks/useReviewFlow';

type ReviewFlow = ReturnType<typeof useReviewFlow>;

interface ReviewSectionProps {
  flow: ReviewFlow;
}

export function ReviewSection({ flow }: ReviewSectionProps) {
  const {
    phase,
    mode,
    setMode,
    errorMessage,
    submitLink,
    submitManual,
  } = flow;

  const showForm =
    phase === 'idle' || phase === 'parsing' || phase === 'error';

  if (!showForm) return null;

  return (
    <section className="px-6 py-6" id="generate">
      <div className="mx-auto max-w-3xl">
        <ModeTabs
          mode={mode}
          onChange={setMode}
          disabled={phase === 'parsing'}
        />

        {mode === 'link' ? (
          <ReviewForm
            phase={phase}
            apiError={errorMessage}
            onSubmit={submitLink}
          />
        ) : (
          <ManualReviewForm
            phase={phase}
            apiError={errorMessage}
            onSubmit={submitManual}
          />
        )}
      </div>
    </section>
  );
}
