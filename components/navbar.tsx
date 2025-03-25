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
      <div className="flex justify-end items-center w-full px-6">
        <Link
          href="#"
          className="text-white text-xl hover:text-[#00cfff] transition-colors mr-auto mx-5"
        >
          zerg.dev
        </Link>

        <nav className="hidden md:flex space-x-10 items-center">
          <Link
            href="#"
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            News
          </Link>
          <Link
            href="#features"
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#faq"
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="#pricing"
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="bg-[#00cfff] text-black text-xs font-medium px-5 py-1.5 mx-5 rounded-full hover:bg-[#00b8e6] transition-colors"
          >
            LOGIN
          </Link>
        </nav>
      </div>
    </header>
  );
}
