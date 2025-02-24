import React, { useEffect, useState } from "react";

interface HeaderProps {
  categories: {
    main: Array<{
      name: string;
      color?: string;
      subItems?: Array<{ name: string }>;
    }>;
  };
  onNavigate: (categoryName: string) => void;
  currentCategory: string;
}

const ContentHeader: React.FC<HeaderProps> = ({ 
  categories, 
  onNavigate,
  currentCategory 
}) => {
  // Find current index based on currentCategory
  const getCurrentIndex = () => {
    return categories.main.findIndex(item => item.name === currentCategory);
  };

  const [currentIndex, setCurrentIndex] = useState(getCurrentIndex());

  useEffect(() => {
    setCurrentIndex(getCurrentIndex());
  }, [currentCategory]);

  const navigateToIndex = (newIndex: number) => {
    const totalItems = categories.main.length;
    const wrappedIndex = ((newIndex % totalItems) + totalItems) % totalItems;
    setCurrentIndex(wrappedIndex);
    onNavigate(categories.main[wrappedIndex].name);
  };

  const getPreviousItem = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.main.length - 1;
    return categories.main[prevIndex]?.name || "Previous";
  };

  const getNextItem = () => {
    const nextIndex = (currentIndex + 1) % categories.main.length;
    return categories.main[nextIndex]?.name || "Next";
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      navigateToIndex(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      navigateToIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <header className="border-b border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-10 w-full sm:p-0 ">
      <div className="flex w-full h-10">
        <div
          className="flex-1 border-r border-dashed border-white-700 text-center cursor-pointer hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center"
          onClick={() => navigateToIndex(currentIndex - 1)}
        >
          <span className="text-pink-400 text-lg font-medium">{`← ${getPreviousItem()}`}</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">
            {categories.main[currentIndex]?.name}
          </h2>
        </div>
        <div
          className="flex-1 border-l border-dashed border-white-700 text-center cursor-pointer hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center"
          onClick={() => navigateToIndex(currentIndex + 1)}
        >
          <span className="text-pink-400 text-lg font-medium">{`${getNextItem()} →`}</span>
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;