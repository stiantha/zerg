// src/utils/contentLoader.ts
import { fileSystem } from "./filesystem";
import React from "react";

// Define a type for content that can be either markdown text or a React component
export type Content = {
  type: "markdown" | "component";
  content: string | React.ComponentType<any>;
};

// Maintain a cache of loaded components to avoid unnecessary dynamic imports
const componentCache: Record<string, React.ComponentType<any>> = {};

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
    // Remove extension if present
    const baseName = fileName.replace(/\.(md|tsx)$/, "");
    
    // Check if this is a component name
    return availableComponents.includes(baseName);
  },

  /**
   * Load content based on filename, detecting whether it's a component or markdown
   */
  async loadContent(fileName: string): Promise<Content | null> {
    // Handle empty filename
    if (!fileName || fileName.trim() === "") {
      return {
        type: "markdown",
        content: "# Welcome\n\nPlease select a file to view its contents."
      };
    }

    // Remove extension if present for consistency
    const baseName = fileName.replace(/\.(md|tsx)$/, "");
    
    // Check if this is a component
    if (this.isComponent(baseName)) {
      try {
        // If already cached, return from cache
        if (componentCache[baseName]) {
          return {
            type: "component",
            content: componentCache[baseName]
          };
        }
        
        // Dynamically import the component
        const module = await import(`../pages/${baseName}.tsx`);
        const Component = module.default;
        
        // Cache for future use
        componentCache[baseName] = Component;
        
        return {
          type: "component",
          content: Component
        };
      } catch (error) {
        console.error(`Error loading component ${baseName}:`, error);
        return {
          type: "markdown",
          content: `# Error\n\nFailed to load component: ${baseName}`
        };
      }
    } else {
      // It's a markdown file
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