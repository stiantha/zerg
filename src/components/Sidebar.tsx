import React, { useEffect } from "react";
import { Mail, ChevronDown, ChevronRight } from "lucide-react";
import { categories } from "../data/categories";

interface SidebarProps {
  expandedCategory: string | null;
  setExpandedCategory: (category: string | null) => void;
  selectedSubcategory: string | null;
  onSelectCategory: (category: string) => void;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  expandedCategory,
  setExpandedCategory,
  selectedSubcategory,
  onSelectCategory,
  setIsSidebarOpen,
}) => {
  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);

    // If the category has subcategories, select the first one
    const categoryData = categories.main.find((c) => c.name === category);
    if (categoryData?.subItems?.length) {
      onSelectCategory(categoryData.subItems[0].name);
    } else {
      onSelectCategory(category);
    }
  };

  const handleSubItemClick = (subItem: string) => {
    onSelectCategory(subItem);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (/^[1-9]$/.test(key)) {
      const index = parseInt(key, 10) - 1;
      if (categories.main[index]) {
        toggleCategory(categories.main[index].name);
        setIsSidebarOpen(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedCategory]);

  return (
    <aside className="h-screen w-70 border-r border-dashed border-white-700 flex flex-col m-0">
      {/* Sidebar Header */}
      <div className="sidebar-header flex items-center justify-center h-15 border-b border-dashed border-white-700 flex-shrink-0">
        <div className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-white">
          ZERG.DEV
        </div>
      </div>

      {/* Navigation Wrapper */}
      <div className="flex-grow relative">
        {/* Sidebar Content */}
        <nav
          className="absolute inset-0 overflow-y-auto space-y-3 text-sm sm:text-xs md:text-sm scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-transparent hover:scrollbar-thumb-pink-500 px-2 pt-6"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgb(82 82 82) transparent",
          }}
        >
          {categories.main.map((item, index) => (
            <div key={item.name}>
<div
  className={`flex items-center w-full cursor-pointer
  ${
    item.name === expandedCategory || item.name === selectedSubcategory
      ? "bg-black-700"
      : "hover:bg-gray-700"
  }
  transition-colors duration-200 ease-in-out rounded px-2 py-1`}
  onClick={() => toggleCategory(item.name)}
>
  {/* Left container for index and name */}
  <div className="flex-grow flex items-center">
    <span className="text-pink-400 mr-2">{index + 1}.</span>
    <span
      className={`text-sm sm:text-xs md:text-sm ${
        item.name === expandedCategory || item.name === selectedSubcategory
          ? "text-white"
          : item.color || "text-gray-300"
      } hover:text-white`}
    >
      {item.name}
    </span>
  </div>

                {/* Right container for chevron with fixed width */}
                {item.subItems && (
                  <div className="w-6 flex justify-center">
                    {expandedCategory === item.name ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                )}
              </div>
              {item.subItems && expandedCategory === item.name && (
                <div className="ml-8 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subItem.name}
                      className={`cursor-pointer ${
                        subItem.name === selectedSubcategory
                          ? "text-white bg-black-900"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      } transition-colors duration-200 ease-in-out rounded px-2 py-1
            text-sm sm:text-xs md:text-sm flex items-center`}
                      onClick={() => handleSubItemClick(subItem.name)}
                    >
                      <span className="text-pink-400 mr-2">
                        {index + 1}.{subIndex + 1}
                      </span>
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer flex items-center justify-start h-13 px-3 border-t border-dashed border-white-700 flex-shrink-0">
        <button className="text-gray-400 hover:text-white color-background-color">
          <Mail size={25} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
// eslint-disable-next-line react-refresh/only-export-components
export { categories };
