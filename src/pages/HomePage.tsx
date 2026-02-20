import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { CompanyOverview } from '../components/CompanyOverview';
import { BusinessPortfolio } from '../components/BusinessPortfolio';
import { StoreSection } from '../components/StoreSection';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ScrollReveal';
import { ScrollToTop } from '../components/ScrollToTop';

export function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        
        <ScrollReveal>
          <CompanyOverview />
        </ScrollReveal>
        
        <ScrollReveal>
          <BusinessPortfolio />
        </ScrollReveal>
        
        <ScrollReveal>
          <StoreSection />
        </ScrollReveal>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
