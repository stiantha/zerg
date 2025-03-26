import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import TabletSection from "@/components/sections/tablet-section";
import PricingSection from "@/components/sections/pricing-section";
import FAQSection from "@/components/sections/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <section id="hero" className="w-full flex items-center justify-center py-16 md:py-55 xl:py-55">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl w-full">
          <HeroSection />
        </div>
      </section>
      <section id="tablet" className="w-full md:-mt-[10vh] lg:-mt-[15vh] xl:-mt-[15vh] flex items-center justify-center py-12 md:py-30 xl:py-30 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl w-full">
          <div className="w-full md:max-w-full">
            <TabletSection />
          </div>
        </div>
      </section>
      <section id="features" className="w-full flex items-center justify-center py-16 md:py-40 xl:py-0 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl w-full">
          <FeaturesSection />
        </div>
      </section>
      <section id="faq" className="w-full flex items-center justify-center py-16 md:py-30 xl:py-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl w-full">
          <FAQSection />
        </div>
      </section>
      <section id="pricing" className="w-full flex items-center justify-center py-16 md:py-30 xl:py-30 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl w-full">
          <PricingSection />
        </div>
      </section>
      <section className="w-full flex items-center justify-center py-12 xl:py-12 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl w-full">
          <Footer />
        </div>
      </section>
    </main>
  );
}