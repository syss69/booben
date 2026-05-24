import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ReviewSection } from '@/components/form/ReviewSection';
import { ProductPreview } from '@/components/results/ProductPreview';
import { GeneratingOverlay } from '@/components/results/GeneratingOverlay';
import { ReviewResult } from '@/components/results/ReviewResult';
import { useReviewFlow } from '@/hooks/useReviewFlow';

function App() {
  const flow = useReviewFlow();
  const { phase, product, result, generateFromProduct, back, reset } = flow;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-surface/50 to-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />

        {phase === 'success' && result ? (
          <ReviewResult data={result} onReset={reset} />
        ) : phase === 'productReady' && product ? (
          <ProductPreview
            product={product}
            generating={false}
            onGenerate={() => void generateFromProduct()}
            onBack={back}
          />
        ) : phase === 'generating' ? (
          <GeneratingOverlay product={product} />
        ) : (
          <ReviewSection flow={flow} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
