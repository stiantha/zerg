// src/components/Terminal/Terminal.tsx
import React, { useState, useEffect, useRef } from "react";
import { generateAsciiArt } from "../utils/asciiArt";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

interface TerminalProps {
  initialContent: string;
  fileName: string;
  title: string;
  isMainTerminal?: boolean;
  isInputTerminal?: boolean;
  isMetricsTerminal?: boolean;
  isStatsTerminal?: boolean;
  showInputField?: boolean;
  commandOutput?: string[];
  onCommandEntered?: (command: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({
  initialContent,
  fileName,
  title,
  isMainTerminal = false,
  isInputTerminal = false,
  isMetricsTerminal = false,
  isStatsTerminal = false,
  showInputField = true,

  onCommandEntered,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setContent] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const fullContentRef = useRef<string>("");
  const [asciiTitle, setAsciiTitle] = useState<string>("");
  // Virtual filesystem
  const fileSystem = {
    "README.md": "# Project Documentation\nWelcome to the project documentation.",
    "architecture.md": "## System Architecture\nThis document describes the system architecture.",
    "design_patterns.md": "## Design Patterns\nThis document outlines the design patterns used."
  };

  // Generate ASCII art for the title when it changes
  useEffect(() => {
    if (isMainTerminal) {
      const categoryName = title === "/" ? "" : title.toUpperCase();
      setAsciiTitle(generateAsciiArt(categoryName));
    }
  }, [title, isMainTerminal]);


  // Simulate terminal typing effect
  useEffect(() => {
    setIsTyping(true);
    setContent("");
    setTerminalOutput([]);

    fullContentRef.current = initialContent;

    let index = 0;
    const typingInterval = setInterval(
      () => {
        if (index < fullContentRef.current.length) {
          setContent(fullContentRef.current.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      },
      isMainTerminal ? 10 : 5
    );

    return () => clearInterval(typingInterval);
  }, [initialContent, asciiTitle, isMainTerminal]);

  const focusInput = () => {
    if (!isTyping && inputRef.current && (isMainTerminal || isInputTerminal)) {
      inputRef.current.focus();
    }
  };

  const commands: Record<string, string> = {
    help: "Available commands:\n- ls: List files\n- cat [filename]: Display file contents\n- clear: Clear terminal\n- pwd: Print working directory\n- cd [dir]: Change directory",
    ls: "README.md\narchitecture.md\ndesign_patterns.md",
    clear: "",
    pwd: "/home/user",
  };
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

  // Handle command input
  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newHistory = [currentCommand, ...commandHistory].slice(0, 50); // Limit history size
      setCommandHistory(newHistory);
      setHistoryIndex(-1);

      // Process command logic
      let output = "";
      const cmdParts = currentCommand.trim().split(/\s+/);
      const cmd = cmdParts[0].toLowerCase();
      const args = cmdParts.slice(1);

      switch (cmd) {
        case "help":
          output = commands.help;
          break;
        case "ls":
          output = commands.ls;
          break;
        case "clear":
          setTerminalOutput([]);
          break;
        case "pwd":
          output = commands.pwd;
          break;
        case "cd":
          output = `Directory changed to: ${args[0] || "~"}`;
          break;
        case "cat":
          if (args.length === 0) {
            output = "Usage: cat <filename>";
          } else {
            const filename = args[0];
            if (fileSystem[filename]) {
              output = fileSystem[filename];
            } else {
              output = `cat: ${filename}: No such file or directory`;
            }
          }
          break;
        default:
          output = `Command not found: ${cmd}`;
      }

      if (cmd !== "clear") {
        setTerminalOutput([
          ...terminalOutput,
          `user@zergs:~$ ${currentCommand}`,
          output,
        ]);
      }

      // Call the onCommandEntered callback if provided
      if (onCommandEntered) {
        onCommandEntered(currentCommand);
      }

      setCurrentCommand("");
    }
  };

  // Handle special keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter key
    if (e.key === "Enter") {
      handleCommand(e);
    }
    
    // Handle Ctrl+C
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setTerminalOutput([
        ...terminalOutput,
        `user@zergs:~$ ${currentCommand}`,
        "^C"
      ]);
      setCurrentCommand('');
      setHistoryIndex(-1);
    }
    
    // Handle Ctrl+L (clear screen)
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setTerminalOutput([]);
    }
    
    // Tab is handled by the useKeyboardShortcuts hook
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };


  return (
    <div className="font-mono h-full flex flex-col">
      {/* Terminal header - Linux style, bg-[#0d0e0f] */}
      <div className="rounded-t-md p-2 flex items-center">
        <div className="flex-1 text-white items-center justify-center text-center text-sm font-bold px-2">
          {title}
        </div>
      </div>

      {/* Terminal content bg-[#14181b] */}
      <div
        className="p-4 rounded-b-md border border-transparent text-green-400 overflow-y-auto terminal-container flex-grow"
        onClick={focusInput}
      >
        {/* Only show file info in main terminal */}
        {isMainTerminal && (
          <div className="flex">
            <span className="text-pink-500 mr-2">user@zergs:~$</span>
            <span className="text-white">cat {fileName}</span>
          </div>
        )}

        {/* ASCII art only in main terminal */}
        {isMainTerminal && (
          <div className="mt-4 whitespace-pre">
            <div
              className="text-green-500 font-bold text-2xl whitespace-pre leading-tight tracking-tight"
              style={{
                transform: "scale(1, 1.2)",
                transformOrigin: "left top",
              }}
            >
              {asciiTitle}
            </div>
            <div className="text-white">
              {initialContent}
              {isTyping && <span className="animate-pulse">▋</span>}
            </div>
          </div>
        )}

        {/* Metrics terminal content */}
        {isMetricsTerminal && !isTyping && renderMetricsContent()}

        {/* Stats terminal content */}
        {isStatsTerminal && !isTyping && renderStatsContent()}

        {/* Input terminal is focused on command input */}
        {isInputTerminal && !isTyping && (
          <p className="mt-1">Type 'help' for more commands.</p>
        )}

        {/* Display terminal output from commands */}
        {!isTyping &&
          terminalOutput.map((line, index) => (
            <div
              key={index}
              className={`mt-2 ${
                line.startsWith("user@zergs") ? "flex" : "ml-8"
              }`}
            >
              {line.startsWith("user@zergs") ? (
                <>
                  <span className="text-pink-500 mr-2">user@zergs:~$</span>
                  <span className="text-white">{line.substring(1)}</span>
                </>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}

        {/* Command input - only when showInputField is true */}
        {!isTyping && showInputField && (
          <div className="mt-4 flex items-center">
            <span className="text-pink-500 mr-2">user@zerg.dev:~$</span>
            <div className="relative flex-grow">
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-white w-full caret-transparent"
                autoFocus={isInputTerminal}
                onBlur={(e) => {
                  if (
                    e.relatedTarget === null &&
                    e.currentTarget
                      .closest(".terminal-container")
                      ?.contains(document.activeElement)
                  ) {
                    e.target.focus();
                  }
                }}
              />
              <span 
                className="absolute left-0 text-white whitespace-pre"
                style={{ pointerEvents: 'none' }}
              >
                {currentCommand}
                <span className="animate-pulse bg-white opacity-70">|</span>
              </span>
            </div>
          </div>
        )}

        {/* Simple content for non-main terminals if not input or metrics */}
        {!isMainTerminal &&
          !isInputTerminal &&
          !isMetricsTerminal &&
          !isTyping && <div className="text-white">{initialContent}</div>}
      </div>
    </div>
  );
};

export default Terminal;
