"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { 
  FaHome, 
  FaLaptopCode, 
  FaUser, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode,
  FaDollarSign, 
  FaEnvelope, 
  FaBars,
  FaExclamation,
  FaQuestion,
  FaPaperPlane,
  FaMoneyBill,
  FaTimes
} from "react-icons/fa";
import { useRoute } from '@/hooks/use-route';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleRouteChange, currentPath } = useRoute();

  // Navigation links (without GitHub)
  const navLinks = [
    { id: "hero", icon: FaHome, text: "Home", path: "/" },
    { id: "features", icon: FaCode, text: "Features", path: "/features" },
    { id: "faq", icon: FaQuestion, text: "FAQ", path: "/faq" },
    { id: "pricing", icon: FaDollarSign, text: "Pricing", path: "/pricing" },
    { id: "blog", icon: FaPaperPlane, text: "Blog", path: "/blog" },
    { id: "news", icon: FaExclamation, text: "News", path: "/news" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-8 py-3">
        {/* Left Section - Logo */}
        <div className="flex-none w-[180px]">
          <Link href="#" className="text-[var(--text-primary)] font-bold text-xl hover:text-[var(--accent-color)] transition-colors">
            zerg.dev
          </Link>
        </div>

        {/* Middle Section - Navigation (absolute positioning to ensure it's always centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="p-[2px] rounded-md">
            <nav className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-md">
              <div className="flex items-center gap-2">
                {navLinks.map(({ id, icon: Icon, text, path }) => (
                  <Link
                    key={id}
                    href={path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRouteChange(path);
                      setActiveLink(id);
                    }}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium
                      transition-all duration-300 flex items-center gap-2 
                      ${
                        activeLink === id
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--accent-color)]"
                      }
                    `}
                  >
                    <Icon
                      className={`text-base ${
                        activeLink === id ? "scale-110 text-[var(--accent-color)]" : ""
                      }`}
                    />
                    <span className="inline">{text}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Right Section - GitHub + Login */}
        <div className="flex-none w-[180px] flex justify-end gap-6">
          <button className="px-6 py-3 bg-none rounded-md text-[var(--text-primary)] text-sm font-medium transition-all duration-300 hover:text-[var(--accent-color)]">
            LOGIN
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className={`flex justify-between items-center px-5 py-3 ${scrolled ? 'bg-[var(--background-end)]/80 backdrop-blur-md shadow-lg' : ''} transition-all duration-300`}>
          <Link href="#" className="text-[var(--text-primary)] font-bold text-xl">
            zerg.dev
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 text-[var(--text-primary)] p-2 rounded-md hover:bg-[var(--accent-color-transparent)] hover:text-[var(--accent-color)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fullscreen overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[var(--background-end)]/95 backdrop-blur-md flex flex-col pt-20 pb-8 px-6 overflow-y-auto">
            <nav>
              <div className="flex flex-col gap-3 mb-6">
                {navLinks.map(({ id, icon: Icon, text, path }) => (
                  <Link
                    key={id}
                    href={path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRouteChange(path);
                      setActiveLink(id);
                    }}
                    className={`px-4 py-3 rounded-lg text-base font-medium
                      transition-all duration-300 flex items-center gap-3
                      ${
                        activeLink === id
                          ? "bg-[var(--accent-color-transparent)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-color-transparent)]"
                      }
                    `}
                  >
                    <Icon className={`text-xl ${activeLink === id ? "text-[var(--accent-color)]" : ""}`} />
                    <span>{text}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-[var(--border-subtle)]">
                <button className="w-full py-2 px-4 bg-black/30 backdrop-blur-md rounded-md text-[var(--text-primary)] text-base font-medium transition-all duration-300 hover:bg-[var(--accent-color-transparent)] hover:text-[var(--accent-color)]">
                  LOGIN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
