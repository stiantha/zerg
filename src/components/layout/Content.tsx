// src/components/layout/Content.tsx
import React from "react";
import Terminal from "../Terminal";

interface MainContentProps {
  currentCategory: string;
}

const MainContent: React.FC<MainContentProps> = ({ currentCategory }) => {
  // Format the file name properly
  const getFileName = () => {
    if (!currentCategory || currentCategory.trim() === "") {
      return "welcome.md";
    }
    return `${currentCategory.toLowerCase().replace(/\s+/g, "_")}.md`;
  };
  
  // Generate initial content based on category
  const getInitialContent = () => {
    return `\n<empty>\n\nType 'help' for more commands.`;
  };

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <div className="p-6 flex-1">
        <Terminal 
          initialContent={getInitialContent()}
          fileName={getFileName()}
          title={currentCategory || "Terminal"}
        />
      </div>
    </main>
  );
};

export default MainContent;
