import React from "react";
import Terminal from "../components/Terminal";
import AsciiArt from "../components/asciiArt";

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

  const getInitialContent = () => {
    return "";
  };

  const getTitle = () => {
    return (
      <AsciiArt
        text={currentCategory || "Welcome"}
        fontSize="0.3em"
      />
    );
  };

  // Handle command execution
  const handleCommandEntered = (command: string) => {
    console.log("Command entered:", command);
    // You can add custom logic here if needed
  };

  return (
    <main className="flex flex-col h-screen">
      <div className="p-4 flex flex-col h-[93%]">
        <div className="flex-grow h-[100%] mb-1">
          <Terminal
            initialContent={getInitialContent()}
            fileName={getFileName()}
            title={getTitle()}
            showInputField={true}
            onCommandEntered={handleCommandEntered}
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;