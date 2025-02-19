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
    {
      name: "Introduction",
      color: "text-pink-400",
      subItems: [
        { name: "Purpose" },
        { name: "Scope" },
        { name: "Background" }
      ]
    },
    {
      name: "T-shirt",
      color: "text-pink-400",
      subItems: [
        { name: "Design" },
        { name: "Materials" },
        { name: "Sizing" }
      ]
    },
    {
      name: "Demographics",
      color: "text-pink-400",
      subItems: [
        { name: "Age Groups" },
        { name: "Gender" },
        { name: "Location" }
      ]
    },
    {
      name: "Features",
      color: "text-pink-400",
      subItems: [
        { name: "Comfort" },
        { name: "Durability" },
        { name: "Style" }
      ]
    },
    {
      name: "Libraries",
      color: "text-pink-400",
      subItems: [
        { name: "React" },
        { name: "Vue" },
        { name: "Angular" }
      ]
    },
    {
      name: "Other Tools",
      color: "text-pink-400",
      subItems: [
        { name: "Version Control" },
        { name: "Build Tools" },
        { name: "Testing Frameworks" }
      ]
    },
    {
      name: "Usage",
      color: "text-pink-400",
      subItems: [
        { name: "Installation" },
        { name: "Configuration" },
        { name: "Best Practices" }
      ]
    },
    {
      name: "Resources",
      color: "text-pink-400",
      subItems: [
        { name: "Documentation" },
        { name: "Tutorials" },
        { name: "Community" }
      ]
    },
    {
      name: "Awards",
      color: "text-pink-400",
      subItems: [
        { name: "Industry Recognition" },
        { name: "User Choice" },
        { name: "Innovation" }
      ]
    },
    {
      name: "Conclusion",
      color: "text-pink-400",
      subItems: [
        { name: "Summary" },
        { name: "Future Directions" },
        { name: "Call to Action" }
      ]
    },
    {
      name: "Metadata",
      color: "text-pink-400",
      subItems: [
        { name: "Version" },
        { name: "Last Updated" },
        { name: "Contributors" }
      ]
    },
    {
      name: "About",
      color: "text-pink-400",
      subItems: [
        { name: "Company" },
        { name: "Team" },
        { name: "Contact" }
      ]
    },
  ],
};


const Sidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <aside className="h-screen w-64 border-r border-dashed border-white-700 bg-neutral-900 flex flex-col">
      {/* Sidebar Header */}
      <div className="sidebar-header flex items-center justify-center h-20 px-6 border-b border-dashed border-white-700 flex-shrink-0">
        <div className="text-xl font-light tracking-wider">title</div>
      </div>
      {/* Sidebar Content */}

      <nav className="flex-grow overflow-y-auto p-4 pt-6 space-y-3 text-sm sm:text-xs md:text-sm">
  {categories.main.map((item) => (
    <div key={item.name}>
      <div
        className={`flex items-center justify-between w-full cursor-pointer
                    ${item.active 
                      ? 'text-white bg-neutral-800' 
                      : 'text-gray-300 hover:text-white hover:bg-neutral-800'}
                    transition-colors duration-200 ease-in-out rounded px-2 py-1`}
        onClick={() => item.subItems && toggleCategory(item.name)}
      >
        <span className={`text-sm sm:text-xs md:text-sm ${item.color || ''}`}>
          {item.name}
        </span>
        {item.subItems && (
          expandedCategories[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        )}
      </div>
      {item.subItems && expandedCategories[item.name] && (
        <div className="ml-4 mt-2 space-y-2">
          {item.subItems.map((subItem) => (
            <div
              key={subItem.name}
              className="cursor-pointer text-gray-400 hover:text-white hover:bg-neutral-800
                         transition-colors duration-200 ease-in-out rounded px-2 py-1
                         text-sm sm:text-xs md:text-sm"
            >
              {subItem.name}
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</nav>


      {/* Sidebar Footer */}
      <div className="sidebar-footer flex items-center justify-start h-20 px-6 border-t border-dashed border-white-700 flex-shrink-0">
        <button className="text-gray-400 hover:text-white">
          <Mail size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
