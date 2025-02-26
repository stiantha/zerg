import React from "react";
import { Menu } from "lucide-react";

interface MobileHeaderProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  title: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  isSidebarOpen, 
  setSidebarOpen, 
  title 
}) => (
  <div className="md:hidden fixed top-0 left-0 right-0 h-20 flex items-center border-b border-dashed border-gray-700 px-4 bg-neutral-900 z-40">
    <button
      onClick={() => setSidebarOpen(!isSidebarOpen)}
      className="text-gray-300 hover:text-white"
    >
      <Menu size={24} />
    </button>
    <div className="ml-4 text-pink-500">{title || "Menu"}</div>
  </div>
);

export default MobileHeader;
