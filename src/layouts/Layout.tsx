import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar, { categories } from "../components/Sidebar";
import ContentHeader from "../components/ContentHeader";
import MainContent from "../components/Content";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>("Home"); // Default to Home

  // Extract the category and subcategory from the URL
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(part => part);
    
    // Handle paths with format /category/subcategory
    if (pathParts.length === 2 && pathParts[0] !== 'page') {
      const [categoryPath, subcategoryPath] = pathParts;
      const categoryName = decodeURIComponent(categoryPath);
      const subcategoryName = decodeURIComponent(subcategoryPath);
      
      // Find the category object that matches this path
      const category = categories.main.find(cat => {
        const normalizedCatName = cat.name.toLowerCase().replace(/\s+/g, '_');
        return normalizedCatName === categoryName;
      });
      
      if (category) {
        setExpandedCategory(category.name);
        
        // Find the subcategory that matches
        const subcategory = category.subItems?.find(sub => {
          const normalizedSubName = sub.name.toLowerCase().replace(/\s+/g, '_');
          return normalizedSubName === subcategoryName;
        });
        
        if (subcategory) {
          setSelectedSubcategory(subcategory.name);
        }
      }
    }
    // Handle paths with format /page/pageName
    else if (pathParts.length === 2 && pathParts[0] === 'page') {
      const pageName = decodeURIComponent(pathParts[1]);
      const foundPage = categories.pages.find(p => 
        p.name.toLowerCase().replace(/\s+/g, '_') === pageName
      );
      
      if (foundPage) {
        setSelectedPage(foundPage.name);
        setSelectedSubcategory(null);
        setExpandedCategory(null);
      }
    }
  }, [location.pathname]);

  const handleSelectPage = (page: string) => {
    setSelectedPage(page);
    setSelectedSubcategory(null); // Reset selected subcategory when a page is selected
    setExpandedCategory(null); // Close any expanded category
    
    // Update the URL for page navigation
    const normalizedPageName = page.toLowerCase().replace(/\s+/g, '_');
    navigate(`/page/${normalizedPageName}`);
  };

  // Find the parent category of a subcategory
  const findParentCategory = (subcategoryName: string) => {
    for (const category of categories.main) {
      if (category.subItems?.some(sub => sub.name === subcategoryName)) {
        return category.name;
      }
    }
    return null;
  };

  // Handle navigation to a subcategory - used by sidebar
  const handleSubcategoryClick = (subcategoryName: string) => {
    const parentCategoryName = findParentCategory(subcategoryName);
    
    if (parentCategoryName) {
      const normalizedCategoryName = parentCategoryName.toLowerCase().replace(/\s+/g, '_');
      const normalizedSubcategoryName = subcategoryName.toLowerCase().replace(/\s+/g, '_');
      
      setSelectedSubcategory(subcategoryName);
      setExpandedCategory(parentCategoryName);
      setSelectedPage(null);
      
      // Update the URL with the proper category/subcategory structure
      navigate(`/${normalizedCategoryName}/${normalizedSubcategoryName}`);
    }
  };

  const handleNavigate = (itemName: string, isPage = false) => {
    if (isPage) {
      handleSelectPage(itemName);
    } else {
      handleSubcategoryClick(itemName);
    }
  };

  // Check screen size for responsive layout
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
        <div className="ml-4 text-pink-500">{selectedSubcategory || selectedPage || "Menu"}</div>
      </div>

      {/* Desktop Header */}
      <div
        className="hidden md:block"
        style={{
          marginLeft: isSidebarOpen ? "17.6rem" : "0",
          width: `calc(100% - ${isSidebarOpen ? "17.6rem" : "0"})`, // Dynamic width
        }}
      >
       <ContentHeader
          categories={categories}
          onNavigate={handleNavigate}
          currentCategory={expandedCategory}
          currentSubCategory={selectedSubcategory}
          currentPage={selectedPage}
        />
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
          selectedSubcategory={selectedSubcategory}
          selectedPage={selectedPage}
          onSelectCategory={handleSubcategoryClick}
          onSelectPage={handleSelectPage}
          setIsSidebarOpen={setSidebarOpen}
        />
        </div>

        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-background-color opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div
          className="flex-grow transition-all duration-300"
          style={{ marginLeft: isSidebarOpen ? "17.6rem" : "0" }}
        >
          <MainContent currentCategory={selectedSubcategory || ''} />
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