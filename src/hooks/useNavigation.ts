// hooks/useNavigation.ts
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { categories } from "../layouts/Sidebar";

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>("Home");
  
  // Extract category and subcategory from URL
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(part => part);
    
    if (pathParts.length === 2 && pathParts[0] !== 'page') {
      const [categoryPath, subcategoryPath] = pathParts;
      const categoryName = decodeURIComponent(categoryPath);
      const subcategoryName = decodeURIComponent(subcategoryPath);
      
      const category = categories.main.find(cat => {
        const normalizedCatName = cat.name.toLowerCase().replace(/\s+/g, '_');
        return normalizedCatName === categoryName;
      });
      
      if (category) {
        setExpandedCategory(category.name);
        
        const subcategory = category.subItems?.find(sub => {
          const normalizedSubName = sub.name.toLowerCase().replace(/\s+/g, '_');
          return normalizedSubName === subcategoryName;
        });
        
        if (subcategory) {
          setSelectedSubcategory(subcategory.name);
        }
      }
    } else if (pathParts.length === 2 && pathParts[0] === 'page') {
      const pageName = decodeURIComponent(pathParts[1]);
      const foundPage = categories.pages.find(p => 
        p.name.toLowerCase().replace(/\s+/g, '_') === pageName
      );
      
      if (foundPage) {
        setSelectedPage(foundPage.name);
        setSelectedSubcategory(null);
        setExpandedCategory(null);
      }
    }
  }, [location.pathname]);

  // Find parent category of a subcategory
  const findParentCategory = (subcategoryName: string) => {
    for (const category of categories.main) {
      if (category.subItems?.some(sub => sub.name === subcategoryName)) {
        return category.name;
      }
    }
    return null;
  };

  const handleSelectPage = (page: string) => {
    setSelectedPage(page);
    setSelectedSubcategory(null);
    setExpandedCategory(null);
    
    const normalizedPageName = page.toLowerCase().replace(/\s+/g, '_');
    navigate(`/page/${normalizedPageName}`);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    const parentCategoryName = findParentCategory(subcategoryName);
    
    if (parentCategoryName) {
      const normalizedCategoryName = parentCategoryName.toLowerCase().replace(/\s+/g, '_');
      const normalizedSubcategoryName = subcategoryName.toLowerCase().replace(/\s+/g, '_');
      
      setSelectedSubcategory(subcategoryName);
      setExpandedCategory(parentCategoryName);
      setSelectedPage(null);
      
      navigate(`/${normalizedCategoryName}/${normalizedSubcategoryName}`);
    }
  };

  const handleNavigate = (itemName: string, isPage = false) => {
    if (isPage) {
      handleSelectPage(itemName);
    } else {
      handleSubcategoryClick(itemName);
    }
  };

  return {
    expandedCategory,
    setExpandedCategory,
    selectedSubcategory,
    selectedPage,
    handleSelectPage,
    handleSubcategoryClick,
    handleNavigate
  };
}
