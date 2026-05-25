import { buildApiUrl } from '@/api/config';
import type {
  Marketplace,
  Product,
  SimpleReviewPayload,
  SimpleReviewResponse,
} from '@/types/review';

interface NestErrorBody {
  statusCode?: number;
  message?: string | string[];
}

export class ReviewerApiError extends Error {
  status?: number;
  detail?: string;

  constructor(code: string, status?: number, detail?: string) {
    super(code);
    this.name = 'ReviewerApiError';
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, body: unknown): Promise<T> {
  const url = buildApiUrl(path);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ReviewerApiError('network');
  }

  if (!response.ok) {
    let detail: string | undefined;
    try {
      const errBody = (await response.json()) as NestErrorBody;
      const msg = errBody.message;
      if (typeof msg === 'string') {
        detail = msg;
      } else if (Array.isArray(msg)) {
        detail = msg.join(', ');
      }
    } catch {
      // ignore parse errors
    }

    if (response.status === 404) {
      throw new ReviewerApiError('notFound', 404, detail);
    }
    if (response.status === 400) {
      throw new ReviewerApiError('badRequest', 400, detail);
    }
    throw new ReviewerApiError('generic', response.status, detail);
  }

  return (await response.json()) as T;
}

export async function parseProduct(
  marketplace: Marketplace,
  productUrl: string,
): Promise<Product> {
  return request<Product>(`/${marketplace}`, { url: productUrl });
}

export async function generateSimpleReview(
  payload: SimpleReviewPayload,
): Promise<SimpleReviewResponse> {
  const data = await request<SimpleReviewResponse>('/ai/simple', payload);

  if (!data.review?.trim()) {
    throw new ReviewerApiError('emptyReview');
  }

  return { review: data.review };
}
