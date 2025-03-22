"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Droplet, Github, DiscIcon, Package } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-teal-950/80 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplet className="h-6 w-6 text-cyan-400" />
          <span className="text-white font-medium">Hyprland</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
            Get started
          </Link>
          <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
            Wiki
          </Link>
          <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
            Hall of fame
          </Link>
          <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
            News
          </Link>
          <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
            Plugins
          </Link>
          <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
            Donate
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#" className="text-white hover:text-cyan-400 transition-colors">
            <DiscIcon className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-white hover:text-cyan-400 transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-white hover:text-cyan-400 transition-colors">
            <Package className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="bg-cyan-400 text-black text-xs font-medium px-4 py-1.5 rounded-full hover:bg-cyan-300 transition-colors"
          >
            INSTALL
          </Link>
        </div>
      </div>
    </header>
  )
}

