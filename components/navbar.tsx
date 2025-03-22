"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Droplet, Github, DiscIcon, Package } from "lucide-react";

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
  className={`sticky top-0 z-50 transition-all duration-200 ${
    scrolled ? "bg-[#042f3d]/80 backdrop-blur-md" : "bg-transparent"
  }`}
>
  <div className="container mx-auto px-4 py-3 grid grid-cols-[1fr_3fr_1fr]">
    {/* Left column - Logo */}
    <div className="flex items-center justify-start">
      <div className="flex items-center gap-2">
        <Droplet className="h-6 w-6 text-[#00cfff]" />
        <span className="text-white font-medium">zerg.dev</span>
      </div>
    </div>

    {/* Middle column - Navigation */}
    <nav className="hidden md:flex items-center justify-center gap-10">
      <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">Get started</Link>
      <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">Wiki</Link>
      <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">Hall of fame</Link>
      <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">News</Link>
      <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">Plugins</Link>
      <Link href="#" className="text-white text-sm hover:text-[#00cfff] transition-colors">Donate</Link>
    </nav>

    {/* Right column - Social links and CTA */}
    <div className="flex items-center justify-end gap-4">
      <Link
        href="#"
        className="text-white hover:text-[#00cfff] transition-colors"
      >
        <DiscIcon className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="text-white hover:text-[#00cfff] transition-colors"
      >
        <Github className="h-5 w-5" />
      </Link>
      <Link
        href="#"
        className="text-white hover:text-[#00cfff] transition-colors"
      >
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

  );
}
