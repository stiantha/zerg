// types.ts
export interface CategoryItem {
  name: string;
  active?: boolean;
  highlight?: boolean;
  color?: string;
  subItems?: CategoryItem[];
}

// types/index.ts
export interface Categories {
  pages: Array<{
    name: string;
    keybind: string;
  }>;
  main: Array<{
    name: string;
    color?: string;
    subItems?: Array<{ name: string }>;
  }>;
}
