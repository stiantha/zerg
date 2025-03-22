import HeroSection from "@/components/hero-section"
import InstallSection from "@/components/install-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import BackgroundGrid from "@/components/background-grid"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-950 to-blue-950 relative overflow-hidden">
      <BackgroundGrid />
      <Navbar />
      <HeroSection />
      <InstallSection />
      <Footer />
    </div>
  )
}

