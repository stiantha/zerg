import React, { useEffect, useState } from "react";
import Terminal from "../components/Terminal";
import AsciiArt from "../components/asciiArt";
import { ContentLoader, Content } from "../utils/contentLoader";

interface MainContentProps {
  currentCategory: string;
}

const MainContent: React.FC<MainContentProps> = ({ currentCategory }) => {
  const [content, setContent] = useState<Content | null>(null);

  // Load content dynamically based on the current category
  useEffect(() => {
    const loadContent = async () => {
      const fileName = currentCategory.trim();
      const loadedContent = await ContentLoader.loadContent(fileName);
      setContent(loadedContent);
    };
    loadContent();
  }, [currentCategory]);

  // Render logic for React components
  if (content?.type === "component" && typeof content.content === "function") {
    const Component = content.content as React.ComponentType;
    return (
      <main className="flex flex-col h-screen">
        <div className="p-4 flex flex-col h-[93%]">
          <div className="flex-grow h-[100%] mb-1">
            <Component />
          </div>
        </div>
      </main>
    );
  }

  // Render logic for markdown files or terminal fallback
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

  const handleCommandEntered = (command: string) => {
    console.log("Command entered:", command);
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
