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
      <section
        id="hero"
        className="w-full flex items-center justify-center h-screen relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl w-full">
          <HeroSection />
        </div>
      </section>
      <section
        id="tablet"
        className="w-full h-screen flex items-center justify-center py-16 md:py-0 xl:py-0 overflow-x-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl w-full">
          <TabletSection />
        </div>
      </section>
      <section
        id="features"
        className="w-full h-screen flex items-center justify-center py-16 md:py-0 xl:py-0 overflow-x-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl w-full">
          <FeaturesSection />
        </div>
      </section>
      <section
        id="faq"
        className="w-full h-screen flex items-center justify-center py-24 md:py-44 xl:py-44 mt-8 md:mt-24 xl:mt-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl w-full">
          <FAQSection />
        </div>
      </section>
      <section
        id="pricing"
        className="w-full h-screen flex items-center justify-center py-16 md:py-30 xl:py-30 overflow-x-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl w-full">
          <PricingSection />
        </div>
      </section>
      <section className="w-full flex items-center justify-center py-12 xl:py-12 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl w-full">
          <Footer />
        </div>
      </section>
    </main>
  );
}
