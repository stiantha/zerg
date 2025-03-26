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
  FaEnvelope, 
  FaBars,
  FaNewspaper,
  FaQuestion,
  FaMoneyBill,
  FaTimes
} from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Navigation links (without GitHub)
  const navLinks = [
    { id: "home", icon: FaHome, text: "Home", path: "#" },
    { id: "features", icon: FaCode, text: "Features", path: "#features" },
    { id: "faq", icon: FaQuestion, text: "FAQ", path: "#faq" },
    { id: "pricing", icon: FaMoneyBill, text: "Pricing", path: "#pricing" },
    { id: "blog", icon: FaLaptopCode, text: "Blog", path: "#" },
    { id: "news", icon: FaNewspaper, text: "News", path: "#" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        {/* Left Section - Logo */}
        <div className="flex-none w-[180px]">
          <Link href="#" className="text-white font-bold text-xl hover:text-[#00cfff] transition-colors">
            zerg.dev
          </Link>
        </div>

        {/* Middle Section - Navigation (absolute positioning to ensure it's always centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="p-[2px] rounded-full bg-gradient-to-r from-[#00cfff] via-[#00b8e6] to-[#0099cc] animate-gradient-x">
            <nav className="bg-[#042f3d]/90 backdrop-blur-md rounded-full px-6 py-2">
              <div className="flex items-center gap-1">
                {navLinks.map(({ id, icon: Icon, text, path }) => (
                  <Link
                    key={id}
                    href={path}
                    onClick={() => setActiveLink(id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-2
                      hover:bg-white/10 
                      ${
                        activeLink === id
                          ? "bg-white/15 text-white"
                          : "text-gray-300 hover:text-[#00cfff]"
                      }
                    `}
                  >
                    <Icon
                      className={`text-base ${
                        activeLink === id ? "scale-110" : ""
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
        <div className="flex-none w-[180px] flex items-center justify-end gap-6">
          <Link 
            href="#" 
            className="text-white hover:text-[#00cfff] transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <button className="relative box-border inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-0 bg-gradient-to-r from-sky-500 to-blue-600 px-4 font-mono leading-none text-white no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,rgba(58,65,111,0.5)_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#3c4fe0_0_-3px_0_inset] focus:shadow-[#3c4fe0_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#3c4fe0_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#3c4fe0_0_3px_7px_inset]" role="button">
            LOGIN
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className={`flex justify-between items-center px-4 py-3 `}>
          <Link href="#" className="text-white font-bold text-xl">
            zerg.dev
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fullscreen overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#021a24]/95 backdrop-blur-md flex flex-col pt-20 pb-8 px-6 overflow-y-auto">
            <nav>
              <div className="flex flex-col gap-3 mb-6">
                {navLinks.map(({ id, icon: Icon, text, path }) => (
                  <Link
                    key={id}
                    href={path}
                    onClick={() => {
                      setActiveLink(id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg text-base font-medium
                      transition-all duration-300 flex items-center gap-3
                      ${
                        activeLink === id
                          ? "bg-white/15 text-white"
                          : "text-gray-300 hover:text-[#00cfff] hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon className={`text-xl ${activeLink === id ? "text-[#00cfff]" : ""}`} />
                    <span>{text}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-white/10">
                <button className="w-full relative box-border inline-flex h-14 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-0 bg-gradient-to-r from-sky-500 to-blue-600 px-4 font-mono text-base leading-none text-white no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,rgba(58,65,111,0.5)_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#3c4fe0_0_-3px_0_inset] focus:shadow-[#3c4fe0_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#3c4fe0_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#3c4fe0_0_3px_7px_inset]" role="button">
                  LOGIN
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </header>
  );
}
