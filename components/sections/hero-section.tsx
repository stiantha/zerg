import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeroSection() {
  return (

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
              Learn development
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#00cfff] uppercase">
              The fun way
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-2 text-gray-300 text-sm sm:text-base md:text-lg">
            <p>
              Master coding through our innovative game-based learning platform.
            </p>
            <p>
              Experience rapid skill acquisition inspired by the Zerg mentality.
            </p>
            <p>
              Join our growing hive of successful zerg developers!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
            <Link
              href="#features"
              className="w-full sm:w-auto bg-[white] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#00cfff]/90 transition-colors font-medium text-sm sm:text-base"
            >
              Explore
            </Link>
            <Link
              href="#get-started"
              className="w-full sm:w-auto bg-transparent border-2 border-[#00cfff] text-[#00cfff] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#00cfff]/10 transition-colors font-medium text-sm sm:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
  );
}
