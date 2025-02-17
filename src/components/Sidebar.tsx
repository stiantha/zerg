import { useState } from "react";
import { Mail, ChevronDown, ChevronRight } from "lucide-react";

interface CategoryItem {
  name: string;
  active?: boolean;
  highlight?: boolean;
  color?: string;
  subItems?: CategoryItem[];
}

interface Categories {
  [key: string]: CategoryItem[];
}

const categories: Categories = {
  main: [
    { name: "Introduction", active: true },
    { name: "T-shirt", highlight: true },
    { name: "Demographics", color: "text-blue-400" },
    { name: "Features", color: "text-pink-400" },
    {
      name: "Libraries",
      color: "text-blue-400",
      subItems: [{ name: "React" }, { name: "Vue" }, { name: "Angular" }],
    },
    { name: "Other Tools", color: "text-blue-400" },
    { name: "Usage", color: "text-blue-400" },
    { name: "Resources", color: "text-blue-400" },
    { name: "Awards", color: "text-blue-400" },
    { name: "Conclusion", color: "text-blue-400" },
    { name: "Metadata", color: "text-blue-400" },
    { name: "About", color: "text-blue-400" },
  ],
};

const Sidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <aside className="sidebar w-64 h-screen border-r border-dashed border-gray-700 flex flex-col fixed top-0 left-0 z-20 bg-neutral-900 sm:w-48 md:w-64">
      <div className="sidebar p-5 border-b border-dashed border-gray-700">
      <div className="text-xl text-center font-light tracking-wider">zerg.dev</div>
      </div>

      <nav className="sidebar p-4 pt-6 space-y-3 overflow-y-auto text-sm sm:text-xs md:text-sm">
        {categories.main.map((item) => (
          <div key={item.name}>
            <button
              className="flex items-center justify-between w-full text-gray-300 hover:text-white"
              onClick={() => item.subItems && toggleCategory(item.name)}
            >
              <span className="text-sm sm:text-xs md:text-sm">{item.name}</span>
              {item.subItems &&
                (expandedCategories[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
            </button>
            {item.subItems && expandedCategories[item.name] && (
              <div className="ml-4 space-y-2">
                {item.subItems.map((subItem) => (
                  <div key={subItem.name} className="cursor-pointer text-gray-400 hover:text-white text-sm sm:text-xs md:text-sm">
                    {subItem.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-3.5 border-t border-dashed border-gray-700 mt-auto">
        <button className="text-gray-400 hover:text-white">
          <Mail size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
