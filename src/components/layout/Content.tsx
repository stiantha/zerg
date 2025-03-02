// src/components/layout/Content.tsx
import React, { useState } from "react";
import Terminal from "../Terminal";
import AsciiArt from "../../components/asciiArt";
interface MainContentProps {
  currentCategory: string;
}

const MainContent: React.FC<MainContentProps> = ({ currentCategory }) => {
  const [commandOutput] = useState<string[]>([]);

  // Format the file name properly
  const getFileName = () => {
    if (!currentCategory || currentCategory.trim() === "") {
      return "welcome.md";
    }
    return `${currentCategory.toLowerCase().replace(/\s+/g, "_")}.md`;
  };

  const getInitialContent = () => {
    return `\n<empty>`;
  };

  const getTitle = () => {
    return (
      <AsciiArt
      text={currentCategory}
      fontSize="0.3em"
      />
    )
  };


  return (
    <main className="flex flex-col h-screen">
      <div className="p-4 flex flex-col h-[93%]">
        {/* Main terminal (current) for display only - takes 70% of height */}
        <div className="flex-grow h-[100%] mb-1">
          <Terminal
            initialContent={getInitialContent()}
            fileName={getFileName()}
            title={getTitle()}
            isMainTerminal={true}
            isInputTerminal={true}
            showInputField={true}
            commandOutput={commandOutput}
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
