import React, { useEffect, useState } from 'react';

const CircledOne: React.FC = () => (
  <span
    className="circled-one"
    role="img"
    aria-label="key one"
    aria-hidden="false"
    style={{ fontWeight: 'bold' }}
  >
    ①
  </span>
);

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
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.main.length - 1;
    return categories.main[prevIndex]?.name || 'Previous';
  };

  const getNextItem = () => {
    const nextIndex = (currentIndex + 1) % categories.main.length;
    return categories.main[nextIndex]?.name || 'Next';
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      navigateToIndex(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      navigateToIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <header className="border-b border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 w-full z-10 p-2 sm:p-0">
      <div className="text-xl font-light tracking-wider mb-2 sm:mb-0"></div>
      <div className="w-full text-center mt-2 sm:mt-0 sm:ml-4 p-2 text-sm text-gray-400">
        <p>Keybinds: Press <CircledOne /> to select a category | Use arrow keys for previous & next category</p>
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