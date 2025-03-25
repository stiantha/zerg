import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import TabletSection from "@/components/sections/tablet-section";
import PricingSection from "@/components/sections/pricing-section";
import FAQSection from "@/components/sections/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <section id="hero" className="min-h-screen flex items-center justify-center py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection />
        </div>
      </section>
      <section id="tablet" className="min-h-screen -mt-[20vh] md:-mt-[20vh] lg:-mt-[25vh] flex items-center justify-center py-16 md:py-24 overflow-visible relative z-10">
        <div className="container-xl mx-auto px-12 sm:px-16 lg:px-24 overflow-visible">
          <div className="max-w-[140%] w-[140%] -mx-[20%] overflow-visible">
            <TabletSection />
          </div>
        </div>
      </section>
      <section id="features" className="min-h-screen flex items-center justify-center py-20 md:py-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturesSection />
        </div>
      </section>
      <section id="faq" className="min-h-screen flex items-center justify-center py-10 md:py-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>
      <section id="pricing" className="min-h-screen flex items-center justify-center py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PricingSection />
        </div>
      </section>
      <section className="min-h-screen flex items-center justify-center py-16">
        <Footer />
      </section>
    </main>
  );
}