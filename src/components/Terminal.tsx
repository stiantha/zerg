// src/components/Terminal/Terminal.tsx
import React, { useState, useEffect, useRef } from "react";
import { generateAsciiArt } from "../utils/asciiArt";

interface TerminalProps {
  initialContent: string;
  fileName: string;
  title: string;
  isMainTerminal?: boolean;
  isInputTerminal?: boolean;
  isMetricsTerminal?: boolean;
  isStatsTerminal?: boolean; // Add this new prop
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
  showInputField = true, // Changed from "boolean" to true
  commandOutput = [], // Changed semicolon to comma
  onCommandEntered, // Removed semicolon
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setContent] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const fullContentRef = useRef<string>("");
  const [asciiTitle, setAsciiTitle] = useState<string>("");
  const [metrics, setMetrics] = useState({
    network: "0 KB/s",
    cpu: "2%",
    memory: "124 MB",
  });

  // Render stats content for the stats terminal
const renderStatsContent = () => {
  return (
    <div className="mt-2">
      <div className="text-green-700">Last Commit: 11 hours ago</div>
      <div className="text-teal-700">Last Deploy: 18 hours ago</div>
      <div className="text-green-500">Code Lines : 3,245</div>
    </div>
  );
};


  // Generate ASCII art for the title when it changes
  useEffect(() => {
    if (isMainTerminal) {
      const categoryName = title === "Terminal" ? "" : title.toUpperCase();
      setAsciiTitle(generateAsciiArt(categoryName));
    }
  }, [title, isMainTerminal]);

  // Update metrics periodically if this is the metrics terminal
  useEffect(() => {
    if (isMetricsTerminal) {
      const interval = setInterval(() => {
        setMetrics({
          network: `${Math.floor(Math.random() * 100)} KB/s`,
          cpu: `${Math.floor(Math.random() * 10)}%`,
          memory: `${124 + Math.floor(Math.random() * 50)} MB`,
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isMetricsTerminal]);

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
    ); // Speed up typing for smaller terminals

    return () => clearInterval(typingInterval);
  }, [initialContent, asciiTitle, isMainTerminal]);

  const focusInput = () => {
    if (!isTyping && inputRef.current && (isMainTerminal || isInputTerminal)) {
      inputRef.current.focus();
    }
  };

  const contentMap: Record<string, string> = {
    help: "Available commands:\n- ls: List files\n- cat [filename]: Display file contents\n- clear: Clear terminal",
    ls: "README.md\narchitecture.md\ndesign_patterns.md",
    clear: "",
    // Add more commands
  };

  // Handle command input
  // Handle command input
  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newHistory = [...commandHistory, currentCommand];
      setCommandHistory(newHistory);

      // Process command logic
      let output = "";
      const cmd = currentCommand.trim().toLowerCase();
      const cmdFileName = cmd.substring(4).trim();

      switch (true) {
        case cmd === "help":
          output = contentMap.help;
          break;
        case cmd === "ls":
          output = contentMap.ls;
          break;
        case cmd === "clear":
          setTerminalOutput([]);
          break;
        case cmd.startsWith("cat "):
          output = `Reading file: ${cmdFileName}\nFile not found or access denied.`;
          break;
        default:
          output = `Command not found: ${currentCommand}`;
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

  // Render metrics content for the metrics terminal
  const renderMetricsContent = () => {
    return (
      <div className="mt-2">
        <div className="text-yellow-400">
          Network Traffic: {metrics.network}
        </div>
        <div className="text-blue-400">CPU Load: {metrics.cpu}</div>
        <div className="text-purple-400">Memory Usage: {metrics.memory}</div>
      </div>
    );
  };

  return (
    <div className="font-mono h-full flex flex-col">
      {/* Terminal header - Linux style */}
      <div className="bg-[#0d0e0f] rounded-t-md p-2 flex items-center">
        <div className="flex-1 text-white items-center justify-center text-center text-sm font-bold px-2">
          {title}
        </div>
      </div>

      {/* Terminal content */}
      <div
        className="bg-[#14181b] p-4 rounded-b-md border border-gray-900 text-green-400 overflow-y-auto terminal-container flex-grow"
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
                  <span className="text-white">{line.substring(12)}</span>
                </>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}

        {/* Command input - only when showInputField is true */}
        {!isTyping && showInputField && (
          <div className="mt-4 flex">
            <span className="text-pink-500 mr-2">user@zergs:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-white w-full"
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
