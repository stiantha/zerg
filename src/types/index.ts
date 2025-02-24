// types.ts
export interface CategoryItem {
    name: string;
    active?: boolean;
    highlight?: boolean;
    color?: string;
    subItems?: CategoryItem[];
  }
  
  export interface Categories {
    [key: string]: CategoryItem[];
  }
  