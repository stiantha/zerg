import Link from "next/link";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
export default function HeroSection() {
  const words = [
    {
      text: "for",
    },
    {
      text: "hours",
    },
    {
      text: "in",
    },
    {
      text: "day",
    },
    {
      text: "do",
    },
    {
      text: "refactor",
    },

  ]
  return (
    <div className="container mx-auto px-4 text-center">
      <TypewriterEffectSmooth words={words} />
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
        ZERG
      </h1>
      <h2 className="text-4xl md:text-5xl font-bold text-[#00cfff] mb-6">
        development
      </h2>
      <p className="max-w-2xl mx-auto text-gray-300 mb-10 leading-relaxed text center">
        Hyprland provides the latest Wayland features, dynamic tiling, all the
        eyecandy, powerful plugins and much more, while still being
        lightweight and responsive
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="#"
          className="bg-white text-black px-8 py-2.5 rounded hover:bg-gray-100 transition-colors font-medium"
        >
          Install
        </Link>
        <Link
          href="#"
          className="bg-transparent border border-[#00cfff] text-white px-8 py-2.5 rounded hover:bg-[#00cfff]/10 transition-colors font-medium"
        >
          Wiki
        </Link>
      </div>
    </div>
  );
}
