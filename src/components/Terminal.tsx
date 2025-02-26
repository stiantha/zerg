// src/components/Terminal/Terminal.tsx
import React, { useState, useEffect, useRef } from "react";
import { generateAsciiArt } from "../utils/asciiArt";
interface TerminalProps {
  initialContent: string;
  fileName: string;
  title: string;
}

const Terminal: React.FC<TerminalProps> = ({
  initialContent,
  fileName,
  title,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setContent] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const fullContentRef = useRef<string>("");
  const [asciiTitle, setAsciiTitle] = useState<string>("");

  // Generate ASCII art for the title when it changes
  useEffect(() => {
    const categoryName = title === "Terminal" ? "" : title.toUpperCase();
    // Try one of these fonts for a more blocky look
    setAsciiTitle(generateAsciiArt(categoryName));
  }, [title]);

  // Simulate terminal typing effect
  useEffect(() => {
    setIsTyping(true);
    setContent("");
    setTerminalOutput([]);

    fullContentRef.current = initialContent;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullContentRef.current.length) {
        setContent(fullContentRef.current.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 10); // Speed up typing for ASCII art

    return () => clearInterval(typingInterval);
  }, [initialContent, asciiTitle]);
  const focusInput = () => {
    if (!isTyping && inputRef.current) {
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
  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newHistory = [...commandHistory, currentCommand];
      setCommandHistory(newHistory);

      // Process command logic
      let output = "";
      const cmd = currentCommand.trim().toLowerCase();
      const fileName = cmd.substring(4).trim();

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
          output = `Reading file: ${fileName}\nFile not found or access denied.`;
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

      setCurrentCommand("");
    }
  };

  // Simulate terminal typing effect
  useEffect(() => {
    setIsTyping(true);
    setContent("");
    setTerminalOutput([]);

    // Store the full content in a ref to avoid state update issues
    fullContentRef.current = initialContent;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullContentRef.current.length) {
        setContent(fullContentRef.current.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [initialContent]);

  return (
    <div className="flex-1 font-mono">
      {/* Terminal header */}
      <div className="bg-gray-900 rounded-t-md p-2 flex items-center">
        <div className="flex space-x-2 ml-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-center flex-1 text-gray-400 text-sm">
          {title} - fish
        </div>
      </div>

      {/* Terminal content */}
      <div
        className="bg-slate-800 p-4 rounded-b-md border border-gray-700 h-full min-h-[70vh] text-green-400 overflow-auto terminal-container"
        onClick={focusInput}
      >
        <div className="flex">
          <span className="text-pink-500 mr-2">user@zergs:~$</span>
          <span className="text-white">cat {fileName}</span>
        </div>

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

        {/* Command input */}
        {!isTyping && (
          <div className="mt-4 flex">
            <span className="text-pink-500 mr-2">user@zergs:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-white w-full"
              autoFocus
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
      </div>
    </div>
  );
};

export default Terminal;
