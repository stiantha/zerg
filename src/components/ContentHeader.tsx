import React, { useEffect, useState } from "react";

interface HeaderProps {
  categories: {
    main: Array<{
      name: string;
      color?: string;
      subItems?: Array<{ name: string }>;
    }>;
  };
  onNavigate: (categoryName: string, subCategoryName: string) => void;
  currentCategory: string;
  currentSubCategory: string;
}

const ContentHeader: React.FC<HeaderProps> = ({ 
  categories, 
  onNavigate,
  currentCategory,
  currentSubCategory
}) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSubCategoryIndex, setCurrentSubCategoryIndex] = useState(0);

  useEffect(() => {
    const categoryIndex = categories.main.findIndex(item => item.name === currentCategory);
    setCurrentCategoryIndex(categoryIndex);

    if (categoryIndex !== -1) {
      const subCategoryIndex = categories.main[categoryIndex].subItems?.findIndex(item => item.name === currentSubCategory) ?? -1;
      setCurrentSubCategoryIndex(subCategoryIndex);
    }
  }, [currentCategory, currentSubCategory, categories]);

  const navigateToIndex = (newCategoryIndex: number, newSubCategoryIndex: number) => {
    const totalCategories = categories.main.length;
    const wrappedCategoryIndex = ((newCategoryIndex % totalCategories) + totalCategories) % totalCategories;
    
    const category = categories.main[wrappedCategoryIndex];
    const totalSubCategories = category.subItems?.length ?? 0;
    const wrappedSubCategoryIndex = totalSubCategories > 0 ? 
      ((newSubCategoryIndex % totalSubCategories) + totalSubCategories) % totalSubCategories : 
      -1;

    setCurrentCategoryIndex(wrappedCategoryIndex);
    setCurrentSubCategoryIndex(wrappedSubCategoryIndex);

    const newCategory = category.name;
    const newSubCategory = wrappedSubCategoryIndex !== -1 ? category.subItems?.[wrappedSubCategoryIndex].name ?? '' : '';
    onNavigate(newCategory, newSubCategory);
  };

  const getPreviousItem = () => {
    if (currentSubCategoryIndex > 0) {
      return categories.main[currentCategoryIndex].subItems?.[currentSubCategoryIndex - 1].name ?? "Previous";
    } else {
      const prevCategoryIndex = currentCategoryIndex > 0 ? currentCategoryIndex - 1 : categories.main.length - 1;
      const prevCategory = categories.main[prevCategoryIndex];
      return prevCategory.subItems && prevCategory.subItems.length > 0 
        ? prevCategory.subItems[prevCategory.subItems.length - 1].name 
        : prevCategory.name;
    }
  };

  const getNextItem = () => {
    const currentCategory = categories.main[currentCategoryIndex];
    if (currentSubCategoryIndex < (currentCategory.subItems?.length ?? 0) - 1) {
      return currentCategory.subItems?.[currentSubCategoryIndex + 1].name ?? "Next";
    } else {
      const nextCategoryIndex = (currentCategoryIndex + 1) % categories.main.length;
      const nextCategory = categories.main[nextCategoryIndex];
      return nextCategory.subItems && nextCategory.subItems.length > 0 
        ? nextCategory.subItems[0].name 
        : nextCategory.name;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      if (currentSubCategoryIndex > 0) {
        navigateToIndex(currentCategoryIndex, currentSubCategoryIndex - 1);
      } else {
        const prevCategoryIndex = currentCategoryIndex > 0 ? currentCategoryIndex - 1 : categories.main.length - 1;
        const prevSubCategoryIndex = categories.main[prevCategoryIndex].subItems?.length ?? 0;
        navigateToIndex(prevCategoryIndex, prevSubCategoryIndex - 1);
      }
    } else if (event.key === "ArrowRight") {
      if (currentSubCategoryIndex < (categories.main[currentCategoryIndex].subItems?.length ?? 0) - 1) {
        navigateToIndex(currentCategoryIndex, currentSubCategoryIndex + 1);
      } else {
        navigateToIndex(currentCategoryIndex + 1, 0);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCategoryIndex, currentSubCategoryIndex]);

  return (
    <header className="border-b border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-15 w-full sm:p-0 ">
      <div className="flex w-full h-10">
        <div
          className="flex-1 border-r border-dashed border-white-700 text-center cursor-pointer hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {
            if (currentSubCategoryIndex > 0) {
              navigateToIndex(currentCategoryIndex, currentSubCategoryIndex - 1);
            } else {
              const prevCategoryIndex = currentCategoryIndex > 0 ? currentCategoryIndex - 1 : categories.main.length - 1;
              const prevSubCategoryIndex = categories.main[prevCategoryIndex].subItems?.length ?? 0;
              navigateToIndex(prevCategoryIndex, prevSubCategoryIndex - 1);
            }
          }}
        >
          <span className="text-pink-400 text-lg font-medium">{`← ${getPreviousItem()}`}</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">
            {`${currentCategory} / ${currentSubCategory}`}
          </h2>
        </div>
        <div
          className="flex-1 border-l border-dashed border-white-700 text-center cursor-pointer hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center"
          onClick={() => {
            if (currentSubCategoryIndex < (categories.main[currentCategoryIndex].subItems?.length ?? 0) - 1) {
              navigateToIndex(currentCategoryIndex, currentSubCategoryIndex + 1);
            } else {
              navigateToIndex(currentCategoryIndex + 1, 0);
            }
          }}
        >
          <span className="text-pink-400 text-lg font-medium">{`${getNextItem()} →`}</span>
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;
