import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import TabletSection from "@/components/sections/tablet-section";
import PricingSection from "@/components/sections/pricing-section";
import FAQSection from "@/components/sections/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-hidden">
      <Navbar />
      <section id="hero" className="w-full flex items-center justify-center py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <HeroSection />
        </div>
      </section>
      <section id="tablet" className="w-full md:-mt-[10vh] lg:-mt-[15vh] flex items-center justify-center py-12 md:py-20 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full md:max-w-full">
            <TabletSection />
          </div>
        </div>
      </section>
      <section id="features" className="w-full flex items-center justify-center py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FeaturesSection />
        </div>
      </section>
      <section id="faq" className="w-full flex items-center justify-center py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FAQSection />
        </div>
      </section>
      <section id="pricing" className="w-full flex items-center justify-center py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <PricingSection />
        </div>
      </section>
      <section className="w-full flex items-center justify-center py-12 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Footer />
        </div>
      </section>
    </main>
  );
}