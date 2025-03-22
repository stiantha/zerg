import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="section flex flex-col items-center justify-center text-center z-10">
      <div className="container">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Modern compositor</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-accent-color mb-6">with the looks</h2>
        <p className="max-w-2xl mx-auto text-text-secondary mb-10 leading-relaxed">
          Hyprland provides the latest Wayland features, dynamic tiling, all the eyecandy, powerful plugins and much
          more, while still being lightweight and responsive
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="#" className="primary-button">
            Install
          </Link>
          <Link href="#" className="secondary-button">
            Wiki
          </Link>
        </div>
      </div>
    </section>
  )
}

