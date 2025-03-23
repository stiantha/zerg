import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import BentoGridSection from "@/components/sections/features-section";
import TabletSection from "@/components/sections/tablet-section";
import FAQSection from "@/components/sections/faq-section";
import { InfiniteMovingCardsSection } from "@/components/infinite-moving-cards";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="h-screen flex items-center justify-center">
          <HeroSection />
        </section>
        <section className="h-screen flex items-center justify-center -mt-[30vh]">
          <TabletSection />
        </section>
        {/* <section className="h-screen flex items-center justify-center -mt-[45vh]">
          <InfiniteMovingCardsSection />
        </section> */}
        <section className="h-screen flex items-center justify-center -mt-[10vh]">
          <BentoGridSection />
        </section>
        <section className="h-screen container mx-auto mt-[20vh]">
          <FAQSection />
        </section>
        <section className="h-screen container mx-auto mt-[20vh]">

        </section>
        <Footer />
      </main>
    </div>
  );
}
