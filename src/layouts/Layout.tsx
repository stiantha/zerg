import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Header from "../components/Header.tsx";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/Content";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-background-color text-gray-300 font-mono">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 flex items-center border-b border-dashed border-gray-700 px-4 bg-neutral-900 z-40">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-gray-300 hover:text-white"
        >
          <Menu size={24} />
        </button>
        <div className="ml-4 text-pink-500">{expandedCategory || "Menu"}</div>
      </div>

      {/* Desktop Header */}
      <div
        className="hidden md:block"
        style={{
          marginLeft: isSidebarOpen ? "17.6rem" : "0",
          width: `calc(100% - ${isSidebarOpen ? "18rem" : "0"})`, // Dynamic width
        }}
      >
        <Header />
      </div>

      <div className="flex relative pt-20 md:pt-0">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 fixed top-0 left-0 h-full z-30 md:translate-x-0`}
        >
          <Sidebar
            expandedCategory={expandedCategory}
            setExpandedCategory={setExpandedCategory}
          />
        </div>

        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-background-color opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div
          className="flex-grow transition-all duration-300"
          style={{ marginLeft: isSidebarOpen ? "17.6rem" : "0" }}
        >
          <MainContent />
        </div>
      </div>

      {/* Footer */}
      <div
        className="hidden md:block"
        style={{ marginLeft: isSidebarOpen ? "17.6rem" : "0" }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
