// src/components/Terminal/TerminalInput.tsx
import React, { useRef, useEffect } from "react";
import { useKeyboardShortcuts } from "../../../hooks/useKeyboardShortcuts";

interface TerminalInputProps {
  currentCommand: string;
  setCurrentCommand: React.Dispatch<React.SetStateAction<string>>;
  historyIndex: number;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
  commandHistory: string[];
  handleCommandSubmit: (command: string) => void;
  isMainTerminal?: boolean;
  isInputTerminal?: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  currentCommand,
  setCurrentCommand,
  historyIndex,
  setHistoryIndex,
  commandHistory,
  handleCommandSubmit,
  isMainTerminal = false,
  isInputTerminal = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current && (isMainTerminal || isInputTerminal)) {
      inputRef.current.focus();
    }
  }, [isMainTerminal, isInputTerminal]);

  useKeyboardShortcuts(
    {
      'arrowup': () => {
        if (commandHistory.length > 0 && inputRef.current === document.activeElement) {
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      },
      'arrowdown': () => {
        if (inputRef.current === document.activeElement) {
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
          } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setCurrentCommand('');
          }
        }
      },
      'tab': () => {
        if (inputRef.current === document.activeElement && currentCommand) {
          // Simple tab completion
          const commands = ['help', 'ls', 'cat', 'clear', 'pwd', 'cd'];
          const files = ['README.md', 'architecture.md', 'design_patterns.md'];
          
          if (currentCommand.startsWith('cat ')) {
            const partial = currentCommand.substring(4).trim();
            const matches = files.filter(file => file.startsWith(partial));
            if (matches.length === 1) {
              setCurrentCommand(`cat ${matches[0]}`);
            }
          } else {
            const matches = commands.filter(cmd => cmd.startsWith(currentCommand));
            if (matches.length === 1) {
              setCurrentCommand(matches[0]);
            }
          }
        }
      }
    },
    {
      preventDefault: true,
      ignoreInputs: false,
      ignoreTerminal: false,
      alwaysActiveKeys: []
    }
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter key
    if (e.key === "Enter") {
      handleCommandSubmit(currentCommand);
      setCurrentCommand("");
    }
    
    // Handle Ctrl+C
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      handleCommandSubmit(currentCommand + " (^C)");
      setCurrentCommand('');
      setHistoryIndex(-1);
    }
    
    // Handle Ctrl+L (clear screen)
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      handleCommandSubmit("clear");
    }
    
    // Tab is handled by the useKeyboardShortcuts hook
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div className="terminal-input-container">
      <span className="terminal-prompt">user@zergs:~$</span>
      <input
        ref={inputRef}
        type="text"
        className="terminal-input"
        value={currentCommand}
        onChange={(e) => setCurrentCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={isMainTerminal || isInputTerminal}
      />
    </div>
  );
};

export default TerminalInput;
