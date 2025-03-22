import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import BackgroundGrid from "@/components/background-grid"
import TerminalPreview from "@/components/terminal-preview"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#042f3d] to-[#051923] relative overflow-hidden">
      <BackgroundGrid />
      <Navbar />
      <HeroSection />
      <TerminalPreview />
    </div>
  )
}

