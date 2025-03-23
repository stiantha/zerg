import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeroSection() {
  return (
    <section id="hero" className={`${inter.className} min-h-[80vh] flex items-center justify-center`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase">
              Learn development
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00cfff] uppercase">
              The fast way
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-2 text-gray-300 text-base sm:text-lg">
            <p>
              Master coding through our innovative game-based learning platform.
            </p>
            <p>
              Experience rapid skill acquisition inspired by the Zerg mentality.
            </p>
            <p>
              Evolve your development abilities faster than traditional methods.
            </p>
            <p>
              Join our growing hive of successful developers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="#features"
              className="w-full sm:w-auto bg-[white] text-black px-8 py-3 rounded-md hover:bg-[#00cfff]/90 transition-colors font-medium text-base"
            >
              Explore
            </Link>
            <Link
              href="#get-started"
              className="w-full sm:w-auto bg-transparent border-2 border-[#00cfff] text-[#00cfff] px-8 py-3 rounded-md hover:bg-[#00cfff]/10 transition-colors font-medium text-base"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
