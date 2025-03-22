import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 z-10">
      <div className="container">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Modern compositor</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-[#00cfff] mb-6">with the looks</h2>
        <p className="max-w-2xl mx-auto text-gray-300 mb-10 leading-relaxed">
          Hyprland provides the latest Wayland features, dynamic tiling, all the eyecandy, powerful plugins and much
          more, while still being lightweight and responsive
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
    </section>
  )
}

