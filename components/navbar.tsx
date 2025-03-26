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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation links (without GitHub)
  const navLinks = [
    { id: "hero", icon: FaHome, text: "Home", path: "#hero" },
    { id: "features", icon: FaCode, text: "Features", path: "#features" },
    { id: "faq", icon: FaQuestion, text: "FAQ", path: "#faq" },
    { id: "pricing", icon: FaDollarSign, text: "Pricing", path: "#pricing" },
    { id: "blog", icon: FaPaperPlane, text: "Blog", path: "#" },
    { id: "news", icon: FaExclamation, text: "News", path: "#" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", "tablet", "features", "faq", "pricing"];
    
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.35, 
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const sectionId = entry.target.getAttribute("id");
          
          if (sectionId && navLinks.some(link => link.id === sectionId)) {
            setActiveLink(sectionId);
          } else if (sectionId === "tablet") {
            setActiveLink("hero");
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
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
      <div className="hidden md:flex items-center justify-between px-8 py-2.6">
        {/* Left Section - Logo */}
        <div className="flex-none w-[180px]">
          <Link href="#" className="text-white font-bold text-xl hover:text-[#00cfff] transition-colors">
            zerg.dev
          </Link>
        </div>

        {/* Middle Section - Navigation (absolute positioning to ensure it's always centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="p-[2px] bg-gradient-to-r from-[#045a4e] via-[#093d3f] to-[#035c54] animate-gradient-x">
            <nav className="bg-[#042f3d]/90 backdrop-blur-md px-6 py-2">
              <div className="flex items-center gap-1">
                {navLinks.map(({ id, icon: Icon, text, path }) => (
                  <Link
                    key={id}
                    href={path}
                    onClick={() => setActiveLink(id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-2 
                      ${
                        activeLink === id
                          ? " text-white"
                          : "text-gray-300 hover:text-[#07d9e0]"
                      }
                    `}
                  >
                    <Icon
                      className={`text-base ${
                        activeLink === id ? "scale-110 text-[#07d9e0]" : ""
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
          <div className="p-[2px] bg-gradient-to-r from-[#045a4e] via-[#093d3f] to-[#035c54] animate-gradient-x">
            <div className="bg-[#042f3d]/90 backdrop-blur-md px-6 py-1.5">
              <span className="text-white text-sm font-medium hover:text-[#07d9e0] cursor-pointer transition-all duration-300">
                LOGIN
              </span>
            </div>
          </div>
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
                <div className="p-[2px] rounded-full bg-gradient-to-r from-[#00cfff] via-[#00b8e6] to-[#0099cc] animate-gradient-x">
                  <button className="w-full h-12 bg-[#042f3d]/90 backdrop-blur-md rounded-full px-4 text-white text-base font-medium transition-all duration-300 hover:bg-[#042f3d]/70 hover:text-[#00cfff]">
                    LOGIN
                  </button>
                </div>
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
