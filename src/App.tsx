import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ReviewForm } from '@/components/form/ReviewForm';
import { ReviewResult } from '@/components/results/ReviewResult';
import { useGenerateReview } from '@/hooks/useGenerateReview';

function App() {
  const { status, data, errorMessage, submit, reset } = useGenerateReview();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-surface/50 to-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        {status === 'success' && data ? (
          <ReviewResult data={data} onReset={reset} />
        ) : (
          <ReviewForm status={status} apiError={errorMessage} onSubmit={submit} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
