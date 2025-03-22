import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import BentoGridSection from "@/components/bento-section";
import TabletSection from "@/components/tablet-section";
import {InfiniteMovingCardsSection} from "@/components/infinite-moving-cards";
import Footer from "@/components/footer";

const testimonials = [
  {
    quote: "The best way to predict the future is to create it.",
    name: "Peter Drucker",
    title: "Management Consultant",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    name: "Steve Jobs",
    title: "Apple Co-founder",
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    name: "Eleanor Roosevelt",
    title: "Former First Lady",
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    name: "Winston Churchill",
    title: "Former Prime Minister",
  },
];

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
          <section className="h-screen flex items-center justify-center -mt-[45vh]">
            <InfiniteMovingCardsSection />
          </section>
          <section className="h-screen flex items-center justify-center -mt-[30vh]">
            <BentoGridSection />
          </section>
          <Footer/>
        </main>
    </div>
  );
}
