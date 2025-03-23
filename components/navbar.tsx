"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, DiscIcon, Package } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-transparent py-3" : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4 grid grid-cols-[1fr_3fr_1fr]">
        {/* Left column - Logo */}
        <div className="flex items-center justify-start">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">zerg.dev</span>
          </div>
        </div>

        {/* Middle column - Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-10">
          <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">Blog</Link>
          <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">News</Link>
          <Link href="#features" className="text-white text-sm hover:text-[#00cfff] transition-colors">Features</Link>
          <Link href="#faq" className="text-white text-sm hover:text-[#00cfff] transition-colors">FAQ</Link>
          <Link href="#about" className="text-white text-sm hover:text-[#00cfff] transition-colors">About</Link>
          <Link href="#contact" className="text-white text-sm hover:text-[#00cfff] transition-colors">Contact</Link>
        </nav>

        {/* Right column - Social links and CTA */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="#"
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="bg-[#00cfff] text-black text-xs font-medium px-4 py-1.5 rounded-full hover:bg-[#00b8e6] transition-colors"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </header>
  );
}
