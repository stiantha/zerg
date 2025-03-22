"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Droplet, Github, DiscIcon as Discord, Package } from "lucide-react"

export default function HyprlandUI() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#042f3d] to-[#051923] relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-12 md:grid-cols-24 gap-8 p-8 opacity-10">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-[#00cfff]/30 rounded-lg h-full"></div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-[#042f3d]/80 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-6 w-6 text-[#00cfff]" />
            <span className="text-white font-medium">Hyprland</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">
              Get started
            </Link>
            <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">
              Wiki
            </Link>
            <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">
              Hall of fame
            </Link>
            <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">
              News
            </Link>
            <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">
              Plugins
            </Link>
            <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">
              Donate
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-white hover:text-[#00cfff] transition-colors">
              <Discord className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#00cfff] transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#00cfff] transition-colors">
              <Package className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="bg-[#00cfff] text-black text-xs font-medium px-4 py-1.5 rounded-full hover:bg-[#00b8e6] transition-colors"
            >
              INSTALL
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Modern compositor</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-[#00cfff] mb-6">with the looks</h2>
        <p className="max-w-2xl text-gray-300 mb-10 leading-relaxed">
          Hyprland provides the latest Wayland features, dynamic tiling, all the eyecandy, powerful plugins and much
          more, while still being lightweight and responsive
        </p>

        <div className="flex gap-4">
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
      </main>

      {/* Bottom Screenshot Preview */}
      <div className="w-full max-w-5xl mx-auto mt-auto px-4 pb-8 z-10">
        <div className="relative overflow-hidden rounded-lg border border-[#00cfff]/30 shadow-[0_0_15px_rgba(0,207,255,0.15)]">
          <div className="bg-black/30 rounded-t-lg border-b border-[#00cfff]/30 h-8 w-full flex items-center px-3">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="h-40 bg-black/50"></div>
        </div>
      </div>
    </div>
  )
}

