// src/utils/contentLoader.ts
import { fileSystem } from "./filesystem";
import React from "react";

// Define a type for content that can be either markdown text or a React component
export type Content = {
  type: "markdown" | "component";
  content: string | React.ComponentType<unknown>;
};

// Maintain a cache of loaded components to avoid unnecessary dynamic imports
const componentCache: Record<string, React.ComponentType<unknown>> = {};

// A list of available TSX pages
const availableComponents = [
  "Home",
  "About",
  "Blog",
  "Contact",
];

export const ContentLoader = {
  /**
   * Determine if the requested file is a TSX component or markdown file
   */
  isComponent(fileName: string): boolean {
    // Normalize fileName to lowercase for case-insensitive matching
    const baseName = fileName.replace(/\.(md|tsx)$/, "").toLowerCase();
  
    // Check if this is a valid component name (case-insensitive match)
    return availableComponents.some(
      (component) => component.toLowerCase() === baseName
    );
  },

  /**
   * Load content based on filename, detecting whether it's a component or markdown
   */
  async loadContent(fileName: string): Promise<Content | null> {
    console.log("Loading content:", fileName);
    if (!fileName || fileName.trim() === "") {
      fileName = "Home"; // Default to Home component
    }
    console.log("Loading content:", fileName);
  
    const baseName = fileName.replace(/\.(md|tsx)$/, "").toLowerCase();
  
    if (this.isComponent(baseName)) {
      try {
        // Find the proper case-sensitive name from availableComponents
        const properCaseName = availableComponents.find(
          (component) => component.toLowerCase() === baseName
        );
  
        if (!properCaseName) {
          throw new Error(`Component ${baseName} not found in availableComponents`);
        }
  
        // Check cache first
        if (componentCache[properCaseName]) {
          return { type: "component", content: componentCache[properCaseName] };
        }
  
        // Dynamically import the component based on its proper case-sensitive name
        const module = await import(`../pages/${properCaseName}`);
        const Component = module.default;
  
        if (!Component) {
          throw new Error(`No default export in ${properCaseName}.tsx`);
        }
  
        // Cache for future use
        componentCache[properCaseName] = Component;
  
        return { type: "component", content: Component };
      } catch (error) {
        console.error(`Error loading component ${fileName}:`, error);
        return null;
      }
    } else {
      // Load markdown content for non-component files
      return this.loadMarkdownContent(`${baseName}.md`);
    }
  },
  
  
  /**
   * Load markdown content from the filesystem
   */
  async loadMarkdownContent(filename: string): Promise<Content | null> {
    try {
      // First check in-memory filesystem
      if (fileSystem[filename]) {
        return {
          type: "markdown",
          content: fileSystem[filename]
        };
      }
      
      // Try to load from the markdown files glob import
      try {
        const markdownFiles = import.meta.glob("/src/pages/*.md", {
          query: "?raw",
          import: "default",
        });
        
        const filePath = `/src/pages/${filename}`;
        
        if (markdownFiles[filePath]) {
          const content = await markdownFiles[filePath]();
          
          if (typeof content === "string") {
            return {
              type: "markdown",
              content
            };
          }
          
          return {
            type: "markdown",
            content: JSON.stringify(content)
          };
        }
      } catch (error) {
        console.error("Error with markdown import:", error);
      }
      
      // If file not found
      return {
        type: "markdown",
        content: `# File not found\n\nThe file \`${filename}\` could not be found.`
      };
    } catch (error) {
      console.error("Error loading file:", error);
      return {
        type: "markdown",
        content: `# Error\n\nError loading file: ${filename}`
      };
    }
  }
};