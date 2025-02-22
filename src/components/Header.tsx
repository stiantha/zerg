import React, { useEffect, useState } from "react";

function Key({ children }) {
  return (
    <span
      style={{
        backgroundColor: "text-pink-400",
        padding: "2px 6px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    >
      {children}
    </span>
  );
}

interface HeaderProps {
  categories: {
    main: Array<{
      name: string;
      subItems?: Array<{ name: string }>;
    }>;
  };
  onNavigate: (categoryName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ categories, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateToIndex = (newIndex: number) => {
    const totalItems = categories.main.length;
    // Handle wrapping around
    const wrappedIndex = (newIndex + totalItems) % totalItems;
    setCurrentIndex(wrappedIndex);
    onNavigate(categories.main[wrappedIndex].name);
  };

  const getPreviousItem = () => {
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : categories.main.length - 1;
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
    <header className="border-b border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 w-full sm:p-0 ">
      <div className="w-1/2 text-center mt-2 sm:mt-0 sm:ml-4 p-2 pl-5 text-sm text-gray-400">
        <p className="font-bold mb-1 text-left pl-5 pt-2">
          <Key>1</Key> - <Key>9</Key> Select Category
        </p>
        <p className="font-bold mb-1 text-left pl-5 pt-2">
          <Key>&#8592;</Key> - <Key>&#8594;</Key> Next / Previous Category
        </p>
      </div>
      <div className="w-1/2 text-center mt-2 sm:mt-0 sm:ml-4 p-2 pl-5 text-sm text-gray-400">
      <p className="font-bold mb-1 text-left pl-10 pt-2">
          <Key>S</Key> Search
        </p>
        <p className="font-bold mb-1 text-left pl-10 pt-2">
          <Key>C</Key> Console
        </p>
      </div>

      <div className="flex w-full h-auto sm:h-full">
        <div
          className="flex-1 border-dashed sm:border-t-0 sm:border-l border-white-700 text-center cursor-pointer hover:bg-gray-700 flex items-center justify-center p-4 sm:p-2"
          onClick={() => navigateToIndex(currentIndex - 1)}
        >
          <span className="text-pink-400 text-base sm:text-lg">{`<< ${getPreviousItem()}`}</span>
        </div>
        <div
          className="flex-1 border-dashed sm:border-t-0 sm:border-l border-white-700 text-center cursor-pointer hover:bg-gray-700 flex items-center justify-center p-4 sm:p-2"
          onClick={() => navigateToIndex(currentIndex + 1)}
        >
          <span className="text-pink-400 text-base sm:text-lg">{`${getNextItem()} >>`}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
