import React from "react";
import Sidebar, { categories } from "../components/layout/Sidebar";
import ContentHeader from "../components/layout/ContentHeader";
import MainContent from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import MobileHeader from "../components/layout/MobileHeader";
import { useNavigation } from "../hooks/useNavigation";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";

const Layout: React.FC = () => {
  const { 
    expandedCategory, 
    setExpandedCategory,
    selectedSubcategory, 
    selectedPage,
    handleSelectPage,
    handleSubcategoryClick,
    handleNavigate
  } = useNavigation();
  
  const { isSidebarOpen, setSidebarOpen, isMobile } = useResponsiveLayout();

  return (
    <div className="min-h-screen min-w-screen bg-background-color text-gray-300 font-mono">
      {/* Mobile Header */}
      <MobileHeader 
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        title={selectedSubcategory || selectedPage || "Menu"}
      />

      {/* Desktop Header */}
      <div
        className="hidden md:block"
        style={{
          marginLeft: isSidebarOpen ? "17.6rem" : "0",
          width: `calc(100% - ${isSidebarOpen ? "17.6rem" : "0"})`,
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
