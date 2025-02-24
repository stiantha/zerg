import React, { useState} from "react";
import ContentHeader from "./ContentHeader";
import { categories } from "./Sidebar";

// Type definitions
interface CategoryContent {
  title: string;
  content: React.ReactNode;
}

interface PageContentMap {
  [key: string]: CategoryContent;
}

const MainContent = () => {
  const [currentCategory, setCurrentCategory] = useState(categories.main[0].name);
  
  // Sample content map - you can expand this with actual content for each category
  const pageContent: PageContentMap = {
    "Home": {
      title: "Welcome to ZERG.DEV",
      content: (
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Let's take a second to consider something: 2024's top three
            front-end frameworks were all launched over a decade ago.
          </p>
          {/* Your existing content */}
        </div>
      )
    },
    // Add more content for other categories as needed
  };

  const handleNavigate = (categoryName: string) => {
    setCurrentCategory(categoryName);
    // You could add more navigation logic here
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <ContentHeader 
        categories={categories} 
        onNavigate={handleNavigate}
        currentCategory={currentCategory}
      />
      
      <div className="p-4 md:p-12 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Display current category title */}
          <h1 className="text-3xl font-bold text-white mb-8">
            {pageContent[currentCategory]?.title || currentCategory}
          </h1>
          
          {/* Display category content or fallback */}
          {pageContent[currentCategory]?.content || (
            <div className="text-gray-400">
              Content for {currentCategory} coming soon...
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainContent;