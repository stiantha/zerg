import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";


interface HeaderProps {
  categories: {
    pages: Array<{
      name: string;
      keybind: string;
    }>;
    main: Array<{
      name: string;
      color?: string;
      subItems?: Array<{ name: string }>;
    }>;
  };
  onNavigate: (categoryName: string, isPage?: boolean) => void;
  currentCategory: string | null;
  currentSubCategory: string | null;
  currentPage: string | null;
}

const ContentHeader: React.FC<HeaderProps> = ({
  categories,
  onNavigate,
  currentSubCategory,
  currentPage,
}) => {
  const navigate = useNavigate();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSubCategoryIndex, setCurrentSubCategoryIndex] = useState(0);

  useEffect(() => {
    // Skip if we're on a page
    if (currentPage) return;
    
    // Find which category contains the current subcategory
    let foundCategoryIndex = -1;
    let foundSubCategoryIndex = -1;

    categories.main.forEach((category, catIndex) => {
      if (category.subItems) {
        const subIndex = category.subItems.findIndex(
          (sub) => sub.name === currentSubCategory
        );
        if (subIndex !== -1) {
          foundCategoryIndex = catIndex;
          foundSubCategoryIndex = subIndex;
        }
      }
    });

    if (foundCategoryIndex !== -1) {
      setCurrentCategoryIndex(foundCategoryIndex);
      setCurrentSubCategoryIndex(foundSubCategoryIndex);
    }
  }, [currentSubCategory, currentPage, categories]);

  // Helper function to normalize names for URLs
  const normalizeForUrl = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '_');
  };

  // Find parent category for a subcategory

  const navigateToPage = useCallback(
    (pageIndex: number) => {
      const totalPages = categories.pages.length;
      const wrappedPageIndex = ((pageIndex % totalPages) + totalPages) % totalPages;
      
      const pageName = categories.pages[wrappedPageIndex].name;
      
      // Update the state and route
      onNavigate(pageName, true);
      navigate(`/page/${normalizeForUrl(pageName)}`);
    },
    [categories, onNavigate, navigate]
  );

  // Find the previous category with subcategories
  const findPreviousCategoryWithSubcategories = useCallback(
    (currentIndex: number) => {
      let prevIndex = currentIndex;
      let foundCategory = false;

      for (let i = 0; i < categories.main.length; i++) {
        prevIndex = prevIndex > 0 ? prevIndex - 1 : categories.main.length - 1;
        if (categories.main[prevIndex].subItems?.length) {
          foundCategory = true;
          break;
        }
      }

      return foundCategory ? prevIndex : -1;
    },
    [categories]
  );

  const findNextCategoryWithSubcategories = useCallback(
    (currentIndex: number) => {
      let nextIndex = currentIndex;
      let foundCategory = false;

      for (let i = 0; i < categories.main.length; i++) {
        nextIndex = (nextIndex + 1) % categories.main.length;
        if (categories.main[nextIndex].subItems?.length) {
          foundCategory = true;
          break;
        }
      }

      return foundCategory ? nextIndex : -1;
    },
    [categories]
  );

  const navigateToIndex = useCallback(
    (newCategoryIndex: number, newSubCategoryIndex: number) => {
      const totalCategories = categories.main.length;
      const wrappedCategoryIndex =
        ((newCategoryIndex % totalCategories) + totalCategories) %
        totalCategories;

      const category = categories.main[wrappedCategoryIndex];
      const totalSubCategories = category.subItems?.length ?? 0;

      // If the category has no subcategories, don't navigate
      if (totalSubCategories === 0) return;

      const wrappedSubCategoryIndex =
        ((newSubCategoryIndex % totalSubCategories) + totalSubCategories) %
        totalSubCategories;

      setCurrentCategoryIndex(wrappedCategoryIndex);
      setCurrentSubCategoryIndex(wrappedSubCategoryIndex);

      const newSubCategory =
        category.subItems?.[wrappedSubCategoryIndex].name ?? "";
      
      // Update the route with category/subcategory format
      const normalizedCategoryName = normalizeForUrl(category.name);
      const normalizedSubCategoryName = normalizeForUrl(newSubCategory);
      
      // Update state and navigate
      onNavigate(newSubCategory);
      navigate(`/${normalizedCategoryName}/${normalizedSubCategoryName}`);
    },
    [categories, onNavigate, navigate]
  );

  const getPreviousItem = useCallback(() => {
    // If we're on a page
    if (currentPage) {
      const currentPageIndex = categories.pages.findIndex(p => p.name === currentPage);
      if (currentPageIndex > 0) {
        return categories.pages[currentPageIndex - 1].name;
      } else {
        // Go to the last page
        return categories.pages[categories.pages.length - 1].name;
      }
    }
    
    // If we're on a subcategory
    if (currentSubCategoryIndex > 0) {
      return (
        categories.main[currentCategoryIndex].subItems?.[
          currentSubCategoryIndex - 1
        ].name ?? "Previous"
      );
    } else {
      // Find the previous category that has subcategories
      const prevCategoryIndex = findPreviousCategoryWithSubcategories(currentCategoryIndex);
      
      if (prevCategoryIndex !== -1) {
        const prevCategory = categories.main[prevCategoryIndex];
        return prevCategory.subItems?.[prevCategory.subItems?.length - 1].name ?? "Previous";
      }
      
      return "Previous";
    }
  }, [currentPage, currentCategoryIndex, currentSubCategoryIndex, categories, findPreviousCategoryWithSubcategories]);

  const getNextItem = useCallback(() => {
    // If we're on a page
    if (currentPage) {
      const currentPageIndex = categories.pages.findIndex(p => p.name === currentPage);
      if (currentPageIndex < categories.pages.length - 1) {
        return categories.pages[currentPageIndex + 1].name;
      } else {
        // Go to the first page
        return categories.pages[0].name;
      }
    }
    
    // If we're on a subcategory
    const currentCategory = categories.main[currentCategoryIndex];
    if (currentSubCategoryIndex < (currentCategory.subItems?.length ?? 0) - 1) {
      return currentCategory.subItems?.[currentSubCategoryIndex + 1].name ?? "Next";
    } else {
      // Find the next category that has subcategories
      const nextCategoryIndex = findNextCategoryWithSubcategories(currentCategoryIndex);
      
      if (nextCategoryIndex !== -1) {
        const nextCategory = categories.main[nextCategoryIndex];
        return nextCategory.subItems?.[0].name ?? "Next";
      }
      
      return "Next";
    }
  }, [currentPage, currentCategoryIndex, currentSubCategoryIndex, categories, findNextCategoryWithSubcategories]);

  const handlePreviousNav = useCallback(() => {
    if (currentPage) {
      // If we're on a page and it's the first page, transition to categories
      const currentPageIndex = categories.pages.findIndex(p => p.name === currentPage);
      if (currentPageIndex === 0) {
        // Find the last category with subcategories and navigate to its last subcategory
        for (let i = categories.main.length - 1; i >= 0; i--) {
          if (categories.main[i].subItems?.length) {
            const lastSubCategoryIndex = (categories.main[i].subItems?.length ?? 1) - 1;
            navigateToIndex(i, lastSubCategoryIndex);
            return;
          }
        }
        // If no categories with subcategories found, wrap to the last page
        navigateToPage(categories.pages.length - 1);
      } else {
        // Otherwise navigate to previous page
        navigateToPage(currentPageIndex - 1);
      }
    } else if (currentSubCategoryIndex > 0) {
      // If not at the first subcategory, go to previous subcategory
      navigateToIndex(currentCategoryIndex, currentSubCategoryIndex - 1);
    } else {
      // Go to the last subcategory of the previous category
      const prevCategoryIndex = findPreviousCategoryWithSubcategories(currentCategoryIndex);
      
      if (prevCategoryIndex !== -1) {
        const prevCategory = categories.main[prevCategoryIndex];
        const lastSubCategoryIndex = (prevCategory.subItems?.length ?? 1) - 1;
        navigateToIndex(prevCategoryIndex, lastSubCategoryIndex);
      } else {
        // If no previous category with subcategories, wrap to the last page
        navigateToPage(categories.pages.length - 1);
      }
    }
  }, [
    currentPage, 
    currentCategoryIndex, 
    currentSubCategoryIndex, 
    categories,
    navigateToPage,
    navigateToIndex,
    findPreviousCategoryWithSubcategories
  ]);

  const handleNextNav = useCallback(() => {
    if (currentPage) {
      // If we're on a page and it's the last page, transition to categories
      const currentPageIndex = categories.pages.findIndex(p => p.name === currentPage);
      if (currentPageIndex === categories.pages.length - 1) {
        // Find the first category with subcategories and navigate to its first subcategory
        for (let i = 0; i < categories.main.length; i++) {
          if (categories.main[i].subItems?.length) {
            navigateToIndex(i, 0);
            return;
          }
        }
        // If no categories with subcategories found, wrap to the first page
        navigateToPage(0);
      } else {
        // Otherwise navigate to next page
        navigateToPage(currentPageIndex + 1);
      }
    } else if (
      currentSubCategoryIndex < 
      (categories.main[currentCategoryIndex].subItems?.length ?? 0) - 1
    ) {
      // If not at the last subcategory, go to next subcategory
      navigateToIndex(currentCategoryIndex, currentSubCategoryIndex + 1);
    } else {
      // Go to the first subcategory of the next category
      const nextCategoryIndex = findNextCategoryWithSubcategories(currentCategoryIndex);
      
      if (nextCategoryIndex !== -1) {
        navigateToIndex(nextCategoryIndex, 0);
      } else {
        // If no next category with subcategories, wrap to the first page
        navigateToPage(0);
      }
    }
  }, [
    currentPage, 
    currentCategoryIndex, 
    currentSubCategoryIndex, 
    categories,
    navigateToPage,
    navigateToIndex,
    findNextCategoryWithSubcategories
  ]);

  const keyBindings: Record<string, () => void> = {
    'arrowleft': handlePreviousNav,
    'arrowright': handleNextNav
  };
  
  // Use the keyboard shortcuts hook with arrow keys as always active
  useKeyboardShortcuts(keyBindings, {
    ignoreInputs: true,
    ignoreTerminal: true,
    alwaysActiveKeys: ['arrowleft', 'arrowright'],
    preventDefault: true
  });
  // Get the current title based on whether we're viewing a page or subcategory
  const getCurrentTitle = () => {
    if (currentPage) {
      return currentPage;
    }
    
    const category = categories.main.find((cat) =>
      cat.subItems?.some((sub) => sub.name === currentSubCategory)
    );
    return `${category?.name || "Category"}`;
  };

  return (
    <header className="border-b border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-15 w-full">
      <div className="flex w-full h-10">
        {/* Previous Button */}
        <div
          className="flex-1 border-r border-dashed border-white text-center cursor-pointer transition-colors duration-200 flex items-center justify-center min-h-[40px] whitespace-nowrap hover:text-white select-none text-pink-400 [&:hover]:border-white-700"
          onClick={handlePreviousNav}
        >
          <span className="text-lg font-medium">{`← ${getPreviousItem()}`}</span>
        </div>

        {/* Center Title */}
        <div className="flex-1 flex items-center text-left justify-center min-h-[40px] px-4">
          <h2 className="text-white text-lg font-bold text-center whitespace-nowrap">
            {getCurrentTitle()}
          </h2>
        </div>

        {/* Next Button */}
        <div
          className="flex-1 border-l border-dashed border-white text-center cursor-pointer transition-colors duration-200 flex items-center justify-center min-h-[40px] whitespace-nowrap hover:text-white select-none text-pink-400 hover:border-white-700"
          onClick={handleNextNav}
        >
          <span className="text-lg font-medium hover:text-white">{`${getNextItem()} →`}</span>
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;