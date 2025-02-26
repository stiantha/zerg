// hooks/useKeyboardShortcuts.ts
import { useEffect } from 'react';

interface KeyBindingOptions {
  preventDefault?: boolean;
  ignoreInputs?: boolean;
  ignoreTerminal?: boolean;
  alwaysActiveKeys?: string[]; // Keys that should work even in terminal
}

export function useKeyboardShortcuts(
  keyBindings: Record<string, () => void>,
  options: KeyBindingOptions = {}
) {
  const { 
    preventDefault = false, 
    ignoreInputs = true, 
    ignoreTerminal = true,
    alwaysActiveKeys = [] 
  } = options;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      // Check if this is a key that should always be active
      const isAlwaysActiveKey = alwaysActiveKeys.includes(key);
      
      // Skip if focus is in an input element (except for always active keys)
      if (!isAlwaysActiveKey && ignoreInputs && document.activeElement?.tagName === 'INPUT') {
        // Special case for terminal
        if (ignoreTerminal && document.activeElement.closest('.terminal-container')) {
          return;
        }
        
        // For other inputs, still ignore
        if (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA') {
          return;
        }
      }
      
      // Execute the corresponding function if key is bound
      if (key in keyBindings) {
        if (preventDefault) {
          event.preventDefault();
        }
        keyBindings[key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyBindings, preventDefault, ignoreInputs, ignoreTerminal, alwaysActiveKeys]);
}
