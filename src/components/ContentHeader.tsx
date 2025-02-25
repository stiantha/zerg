import React, { useEffect, useState, useCallback } from "react";

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
  currentSubCategory: string;
}

const ContentHeader: React.FC<HeaderProps> = ({
  categories,
  onNavigate,
  currentSubCategory,
}) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSubCategoryIndex, setCurrentSubCategoryIndex] = useState(0);

  useEffect(() => {
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
  }, [currentSubCategory, categories]);

  const navigateToIndex = useCallback(
    (newCategoryIndex: number, newSubCategoryIndex: number) => {
      const totalCategories = categories.main.length;
      const wrappedCategoryIndex =
        ((newCategoryIndex % totalCategories) + totalCategories) %
        totalCategories;

      const category = categories.main[wrappedCategoryIndex];
      const totalSubCategories = category.subItems?.length ?? 0;

      if (totalSubCategories === 0) {
        // If the category has no subcategories, move to the next category that has subcategories
        let nextCatIndex = wrappedCategoryIndex;
        let foundSubcategories = false;

        // Look through all categories (maximum one full loop)
        for (let i = 0; i < totalCategories; i++) {
          nextCatIndex = (nextCatIndex + 1) % totalCategories;
          if (categories.main[nextCatIndex].subItems?.length) {
            foundSubcategories = true;
            break;
          }
        }

        if (foundSubcategories) {
          setCurrentCategoryIndex(nextCatIndex);
          setCurrentSubCategoryIndex(0);
          const newSubCategory =
            categories.main[nextCatIndex].subItems?.[0].name ?? "";
          onNavigate(newSubCategory);
        }
        return;
      }

      const wrappedSubCategoryIndex =
        totalSubCategories > 0
          ? ((newSubCategoryIndex % totalSubCategories) + totalSubCategories) %
            totalSubCategories
          : 0;

      setCurrentCategoryIndex(wrappedCategoryIndex);
      setCurrentSubCategoryIndex(wrappedSubCategoryIndex);

      const newSubCategory =
        category.subItems?.[wrappedSubCategoryIndex].name ?? "";
      onNavigate(newSubCategory);
    },
    [
      categories,
      setCurrentCategoryIndex,
      setCurrentSubCategoryIndex,
      onNavigate,
    ]
  );

  const getPreviousItem = () => {
    if (currentSubCategoryIndex > 0) {
      return (
        categories.main[currentCategoryIndex].subItems?.[
          currentSubCategoryIndex - 1
        ].name ?? "Previous"
      );
    } else {
      // Find the previous category that has subcategories
      let prevCategoryIndex = currentCategoryIndex;
      let prevCategory;

      do {
        prevCategoryIndex =
          prevCategoryIndex > 0
            ? prevCategoryIndex - 1
            : categories.main.length - 1;
        prevCategory = categories.main[prevCategoryIndex];
      } while (
        prevCategoryIndex !== currentCategoryIndex &&
        !prevCategory.subItems?.length
      );

      return prevCategory.subItems && prevCategory.subItems.length > 0
        ? prevCategory.subItems[prevCategory.subItems.length - 1].name
        : "Previous";
    }
  };

  const getNextItem = () => {
    const currentCategory = categories.main[currentCategoryIndex];
    if (currentSubCategoryIndex < (currentCategory.subItems?.length ?? 0) - 1) {
      return (
        currentCategory.subItems?.[currentSubCategoryIndex + 1].name ?? "Next"
      );
    } else {
      // Find the next category that has subcategories
      let nextCategoryIndex = currentCategoryIndex;
      let nextCategory;

      do {
        nextCategoryIndex = (nextCategoryIndex + 1) % categories.main.length;
        nextCategory = categories.main[nextCategoryIndex];
      } while (
        nextCategoryIndex !== currentCategoryIndex &&
        !nextCategory.subItems?.length
      );

      return nextCategory.subItems && nextCategory.subItems.length > 0
        ? nextCategory.subItems[0].name
        : "Next";
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        if (currentSubCategoryIndex > 0) {
          navigateToIndex(currentCategoryIndex, currentSubCategoryIndex - 1);
        } else {
          let prevCategoryIndex = currentCategoryIndex;
          let foundCategory = false;

          for (let i = 0; i < categories.main.length; i++) {
            prevCategoryIndex =
              prevCategoryIndex > 0
                ? prevCategoryIndex - 1
                : categories.main.length - 1;
            if (categories.main[prevCategoryIndex].subItems?.length) {
              foundCategory = true;
              break;
            }
          }

          if (foundCategory) {
            const prevSubCategoryIndex =
              (categories.main[prevCategoryIndex].subItems?.length ?? 1) - 1;
            navigateToIndex(prevCategoryIndex, prevSubCategoryIndex);
          }
        }
      } else if (event.key === "ArrowRight") {
        if (
          currentSubCategoryIndex <
          (categories.main[currentCategoryIndex].subItems?.length ?? 0) - 1
        ) {
          navigateToIndex(currentCategoryIndex, currentSubCategoryIndex + 1);
        } else {
          let nextCategoryIndex = currentCategoryIndex;
          let foundCategory = false;

          for (let i = 0; i < categories.main.length; i++) {
            nextCategoryIndex =
              (nextCategoryIndex + 1) % categories.main.length;
            if (categories.main[nextCategoryIndex].subItems?.length) {
              foundCategory = true;
              break;
            }
          }

          if (foundCategory) {
            navigateToIndex(nextCategoryIndex, 0);
          }
        }
      }
    },
    [currentCategoryIndex, currentSubCategoryIndex, categories, navigateToIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Get the current category name based on which category contains the current subcategory
  const getCurrentCategoryName = () => {
    const category = categories.main.find((cat) =>
      cat.subItems?.some((sub) => sub.name === currentSubCategory)
    );
    return category?.name || "Category";
  };

  return (
    <header className="border-b border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-15 w-full">
      <div className="flex w-full h-10">
        {/* Previous Button */}
        <div
          className="flex-1 border-r border-dashed border-white text-center cursor-pointer transition-colors duration-200 flex items-center justify-center min-h-[40px] whitespace-nowrap hover:text-white select-none text-pink-400 [&:hover]:border-white-700"
          onClick={() => {
            if (currentSubCategoryIndex > 0) {
              navigateToIndex(
                currentCategoryIndex,
                currentSubCategoryIndex - 1
              );
            } else {
              let prevCategoryIndex = currentCategoryIndex;
              let foundCategory = false;
              for (let i = 0; i < categories.main.length; i++) {
                prevCategoryIndex =
                  prevCategoryIndex > 0
                    ? prevCategoryIndex - 1
                    : categories.main.length - 1;
                if (categories.main[prevCategoryIndex].subItems?.length) {
                  foundCategory = true;
                  break;
                }
              }
              if (foundCategory) {
                const prevSubCategoryIndex =
                  (categories.main[prevCategoryIndex].subItems?.length ?? 1) -
                  1;
                navigateToIndex(prevCategoryIndex, prevSubCategoryIndex);
              }
            }
          }}
        >
          <span className=" text-lg font-medium ">{`← ${getPreviousItem()}`}</span>
        </div>

        {/* Center Title */}
        <div className="flex-1 flex items-center text-left justify-center min-h-[40px] px-4">
          <h2 className="text-white text-lg font-bold text-center whitespace-nowrap">
            {`${getCurrentCategoryName()} | ${currentSubCategory}`}
          </h2>
        </div>

        {/* Next Button */}
        <div
          className="flex-1 border-l border-dashed border-white text-center cursor-pointer transition-colors duration-200 flex items-center justify-center min-h-[40px] whitespace-nowrap hover:text-white select-none text-pink-400 hover:border-white-700"
          onClick={() => {
            if (
              currentSubCategoryIndex <
              (categories.main[currentCategoryIndex].subItems?.length ?? 0) - 1
            ) {
              navigateToIndex(
                currentCategoryIndex,
                currentSubCategoryIndex + 1
              );
            } else {
              let nextCategoryIndex = currentCategoryIndex;
              let foundCategory = false;
              for (let i = 0; i < categories.main.length; i++) {
                nextCategoryIndex =
                  (nextCategoryIndex + 1) % categories.main.length;
                if (categories.main[nextCategoryIndex].subItems?.length) {
                  foundCategory = true;
                  break;
                }
              }
              if (foundCategory) {
                navigateToIndex(nextCategoryIndex, 0);
              }
            }
          }}
        >
          <span className=" text-lg font-medium hover:text-white">{`${getNextItem()} →`}</span>
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;
