import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import BackgroundGrid from "@/components/background-grid"
import TerminalPreview from "@/components/terminal-preview"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#042f3d] to-[#051923] relative overflow-hidden">
      <BackgroundGrid />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="h-screen flex items-center justify-center">
          <HeroSection />
        </section>
        <section className="h-screen flex items-center justify-center">
          <TerminalPreview />
        </section>
      </main>
    </div>
  )
}

