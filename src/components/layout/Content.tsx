// src/components/layout/Content.tsx
import React, { useState } from "react";
import Terminal from "../Terminal";

interface MainContentProps {
  currentCategory: string;
}

const MainContent: React.FC<MainContentProps> = ({ currentCategory }) => {
  const [commandOutput, setCommandOutput] = useState<string[]>([]);
  
  // Format the file name properly
  const getFileName = () => {
    if (!currentCategory || currentCategory.trim() === "") {
      return "welcome.md";
    }
    return `${currentCategory.toLowerCase().replace(/\s+/g, "_")}.md`;
  };
  
  // Generate initial content based on category
  const getInitialContent = () => {
    return `\n<empty>`;
  };

  // Handle commands from input terminal
  const handleCommand = (command: string) => {
    // Update the main terminal with command results
    setCommandOutput(prev => [...prev, command]);
  };

  return (
    <main className="flex flex-col h-screen">
      <div className="p-4 flex flex-col h-[93%]">
        {/* Main terminal (current) for display only - takes 70% of height */}
        <div className="flex-grow h-[70%] mb-1">
          <Terminal 
            initialContent={getInitialContent()}
            fileName={getFileName()}
            title={currentCategory || "Terminal"}
            isMainTerminal={true}
            showInputField={false}
            commandOutput={commandOutput}
          />
        </div>
        
        {/* Two smaller terminals in a row - takes 30% of height */}
        <div className="flex gap-1 h-[30%]">
          {/* Left terminal for user input */}
          <div className="w-2/3 h-full">
            <Terminal 
              initialContent="Enter commands here to control the main terminal"
              fileName="input.md"
              title="User Input"
              isMainTerminal={false}
              isInputTerminal={true}
              showInputField={true}
              onCommandEntered={handleCommand}
            />
          </div>
          
          {/* Right terminal for side data */}
          <div className="w-1/3 h-full">
            <Terminal 
              initialContent=""
              fileName="metrics.md"
              title="System Metrics"
              isMainTerminal={false}
              isMetricsTerminal={true}
              showInputField={false}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
