import type {
  GenerateReviewPayload,
  GenerateReviewResponse,
} from '@/types/review';

function getApiBase(): string {
  const base = import.meta.env.VITE_API_URL as string | undefined;
  return base?.replace(/\/$/, '') ?? '/api';
}

export class ReviewerApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ReviewerApiError';
    this.status = status;
  }
}

export async function generateReview(
  payload: GenerateReviewPayload,
): Promise<GenerateReviewResponse> {
  const url = `${getApiBase()}/ai`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ReviewerApiError('network');
  }

  if (!response.ok) {
    if (response.status === 400) {
      throw new ReviewerApiError('badRequest', 400);
    }
    throw new ReviewerApiError('generic', response.status);
  }

  const data = (await response.json()) as GenerateReviewResponse;

  if (!data.review?.trim()) {
    throw new ReviewerApiError('emptyReview');
  }

  return data;
}
