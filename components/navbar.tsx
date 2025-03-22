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
      className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-background-start/80 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Droplet className="h-6 w-6 text-accent-color" />
          <span className="font-medium">Hyprland</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="nav-link">
            Get started
          </Link>
          <Link href="#" className="nav-link">
            Wiki
          </Link>
          <Link href="#" className="nav-link">
            Hall of fame
          </Link>
          <Link href="#" className="nav-link">
            News
          </Link>
          <Link href="#" className="nav-link">
            Plugins
          </Link>
          <Link href="#" className="nav-link">
            Donate
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#" className="social-icon">
            <DiscIcon className="h-5 w-5" />
          </Link>
          <Link href="#" className="social-icon">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="social-icon">
            <Package className="h-5 w-5" />
          </Link>
          <Link href="#" className="accent-button">
            INSTALL
          </Link>
        </div>
      </div>
    </header>
  )
}

