import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeroSection() {
  return (
    <div className={`${inter.className} container mx-auto px-4 text-center`}>
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 uppercase">
        Learn development
      </h1>
      <h2 className="text-4xl md:text-5xl font-bold text-[#00cfff] mb-15 uppercase">
        The fast way
      </h2>
      <div className="mx-auto text-gray-300 mb-10 text-center">
        <p className="leading-relaxed mb-2">
          Master coding through our innovative game-based learning platform.
        </p>
        <p className="leading-relaxed mb-2">
          Experience rapid skill acquisition inspired by the Zerg mentality.
        </p>
        <p className="leading-relaxed mb-2">
          Evolve your development abilities faster than traditional methods.
        </p>
        <p className="leading-relaxed">
          Join our growing hive of successful developers.
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <Link
          href="#"
          className="bg-white text-black px-8 py-2.5 rounded hover:bg-gray-100 transition-colors font-medium"
        >
          Explore
        </Link>
        <Link
          href="#"
          className="bg-transparent border border-[#00cfff] text-white px-8 py-2.5 rounded hover:bg-[#00cfff]/10 transition-colors font-medium"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
