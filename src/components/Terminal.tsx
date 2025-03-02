import React, { useState, useEffect, useRef } from "react";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { fileSystem } from "../utils/filesystem";
import ReactMarkdown from "react-markdown";
const markdownFiles = import.meta.glob("/public/pages/*.md", { as: "raw" });

interface TerminalProps {
  initialContent: string;
  fileName: string;
  title: React.ReactNode;
  showInputField?: boolean;
  onCommandEntered?: (command: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({
  initialContent,
  fileName,
  title,
  showInputField = true,
  onCommandEntered,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setContent] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [terminalOutput, setTerminalOutput] = useState<{type: 'text' | 'markdown', content: string}[]>([]);
  const [inputPlaceholder, setInputPlaceholder] = useState<string>("");
  const fullContentRef = useRef<string>("");
  const [currentFile, setCurrentFile] = useState<{name: string, content: string} | null>(null);

  // Initialize terminal content
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
    }, 5);

    return () => clearInterval(typingInterval);
  }, [initialContent]);

  // Auto-load the file when fileName changes
  useEffect(() => {
    if (fileName && !isTyping) {
      loadFile(fileName);
      setInputPlaceholder(`cat ${fileName}`);
    }
  }, [fileName, isTyping]);

  // Set placeholder text (e.g., when navigating to a file)
  useEffect(() => {
    if (fileName) {
      setInputPlaceholder(`cat ${fileName}`);

      // Clear placeholder when user starts typing or after a timeout
      const timer = setTimeout(() => {
        setInputPlaceholder("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [fileName]);

  const focusInput = () => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Function to load a file
  const loadFile = async (filename: string) => {
    try {
      const content = await fetchMarkdownFile(filename);
      if (content) {
        setCurrentFile({
          name: filename,
          content: content
        });
      } else {
        setCurrentFile(null);
        setTerminalOutput([{type: 'text', content: `Empty ... for now (;´༎ຶД༎ຶ\`)`}]);
      }
    } catch (error) {
      console.error("Error loading file:", error);
      setCurrentFile(null);
      setTerminalOutput([{type: 'text', content: `Error reading file: ${filename}`}]);
    }
  };

  // In the fetchMarkdownFile function
  const fetchMarkdownFile = async (filename: string) => {
    console.log(`Attempting to fetch: ${filename}`);
    console.log(`Available in fileSystem:`, Object.keys(fileSystem));
    console.log(`Available markdown files:`, Object.keys(markdownFiles));

    // First, check if the file exists in the fileSystem object
    if (fileSystem[filename]) {
      console.log(`Found ${filename} in fileSystem`);
      return fileSystem[filename];
    }

    // Try to load using import.meta.glob
    const filePath = `/public/pages/${filename}`; // Update the path to match your log
    console.log(`Looking for ${filePath} in markdownFiles`);
    
    try {
      if (markdownFiles[filePath]) {
        console.log(`Found ${filePath} in markdownFiles`);
        const content = await markdownFiles[filePath]();
        console.log(`Content loaded:`, content ? "Yes" : "No");
        
        // Make sure content is a string
        if (typeof content === 'string') {
          return content;
        } else if (content && typeof content === 'object') {
          // If it's an object, try to extract text from it
          console.log("Content is an object:", content);
          // If it's a Response object or has a text method
          if (content.text && typeof content.text === 'function') {
            return await content.text();
          }
          // If it has a toString method
          return JSON.stringify(content);
        }
        return String(content || "");
      }
      // If we get here, the file wasn't found in either location
      console.log(`File not found in either location: ${filename}`);
      return `Be nothin here mon`;
    } catch (error) {
      console.error("Error loading file:", error);
      return `Error loading file: ${filename}`;
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
      arrowup: () => {
        if (
          commandHistory.length > 0 &&
          inputRef.current === document.activeElement
        ) {
          const newIndex =
            historyIndex < commandHistory.length - 1
              ? historyIndex + 1
              : historyIndex;
          setHistoryIndex(newIndex);
          setCurrentCommand(
            commandHistory[commandHistory.length - 1 - newIndex]
          );
        }
      },
      arrowdown: () => {
        if (inputRef.current === document.activeElement) {
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentCommand(
              commandHistory[commandHistory.length - 1 - newIndex]
            );
          } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setCurrentCommand("");
          }
        }
      },
      tab: () => {
        if (inputRef.current === document.activeElement && currentCommand) {
          // Simple tab completion
          const commands = ["help", "ls", "cat", "clear", "pwd", "cd"];
          const files = ["README.md", "architecture.md", "design_patterns.md"];

          if (currentCommand.startsWith("cat ")) {
            const partial = currentCommand.substring(4).trim();
            const matches = files.filter((file) => file.startsWith(partial));
            if (matches.length === 1) {
              setCurrentCommand(`cat ${matches[0]}`);
            }
          } else {
            const matches = commands.filter((cmd) =>
              cmd.startsWith(currentCommand)
            );
            if (matches.length === 1) {
              setCurrentCommand(matches[0]);
            }
          }
        }
      },
    },
    {
      preventDefault: true,
      ignoreInputs: false,
      ignoreTerminal: false,
      alwaysActiveKeys: [],
    }
  );

  // Handle command input
  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newHistory = [currentCommand, ...commandHistory].slice(0, 50);
      setCommandHistory(newHistory);
      setHistoryIndex(-1);

      // Store the command for processing
      const command = currentCommand;
      setCurrentCommand("");

      // Process command logic
      let output = "";
      const cmdParts = command.trim().split(/\s+/);
      const cmd = cmdParts[0].toLowerCase();
      const args = cmdParts.slice(1);

      switch (cmd) {
        case "help":
          output = commands.help;
          setTerminalOutput([{type: 'text', content: output}]);
          setCurrentFile(null);
          break;
        case "ls":
          output = commands.ls;
          setTerminalOutput([{type: 'text', content: output}]);
          setCurrentFile(null);
          break;
        case "clear":
          setTerminalOutput([]);
          setCurrentFile(null);
          break;
        case "pwd":
          output = commands.pwd;
          setTerminalOutput([{type: 'text', content: output}]);
          setCurrentFile(null);
          break;
        // Inside the handleCommand function, modify the "cat" case:
        case "cat":
          if (args.length === 0) {
            output = "Usage: cat <filename>";
            setTerminalOutput([{type: 'text', content: output}]);
            setCurrentFile(null);
          } else {
            const filename = args[0];

            // Show a loading indicator
            setTerminalOutput([{type: 'text', content: `Loading ${filename}...`}]);
            
            // Load the file
            loadFile(filename);

            if (onCommandEntered) {
              onCommandEntered(command);
            }
            return; // Important to return here to prevent further processing
          }
          break;

        case "cd":
          output = `Directory changed to: ${args[0] || "~"}`;
          setInputPlaceholder(`cd ${args[0] || "~"}`);
          setTerminalOutput([{type: 'text', content: output}]);
          setCurrentFile(null);
          break;
        default:
          output = `Command not found: ${cmd}`;
          setTerminalOutput([{type: 'text', content: output}]);
          setCurrentFile(null);
      }

      if (onCommandEntered) {
        onCommandEntered(command);
      }

      setCurrentCommand("");
    }
  };

  // Handle special keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Clear placeholder when user starts typing
    if (inputPlaceholder && currentCommand === "") {
      setInputPlaceholder("");
    }

    // Handle Enter key
    if (e.key === "Enter") {
      handleCommand(e);
    }

    // Handle Ctrl+C
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setTerminalOutput([
        {type: 'text', content: `user@zerg:~$ ${currentCommand}`},
        {type: 'text', content: "^C"}
      ]);
      setCurrentFile(null);
      setCurrentCommand("");
      setHistoryIndex(-1);
    }

    // Handle Ctrl+L (clear screen)
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setTerminalOutput([]);
      setCurrentFile(null);
    }

    // Tab is handled by the useKeyboardShortcuts hook
    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <div className="font-mono h-full flex flex-col">
      {/* Terminal header */}
      <div className="rounded-t-md p-2 flex items-center">
        <div className="flex-1 text-white items-center justify-center text-center text-sm font-bold px-2">
          {title}
        </div>
      </div>

      {/* Terminal content */}
      <div
        className="p-4 rounded-b-md border border-transparent text-green-400 overflow-y-auto terminal-container flex-grow"
        onClick={focusInput}
      >
        {/* Display terminal output from commands */}
        <div className="mb-4">
          {!isTyping && terminalOutput.length > 0 ? (
            terminalOutput.map((output, index) => (
              <div key={index} className="mb-2">
                {output.type === 'text' ? (
                  <div className="whitespace-pre-wrap break-words">
                    {output.content !== undefined && output.content !== null ? output.content : "[empty line]"}
                  </div>
                ) : (
                  <div className="markdown-content text-white">
                    <ReactMarkdown>{output.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">
              {terminalOutput.length === 0 && !currentFile ? "No output to display" : ""}
            </div>
          )}
        </div>

        {/* Command input with placeholder support */}
        {!isTyping && showInputField && (
          <div className="flex items-center">
            <span className="text-pink-500 mr-2">user@zerg:~$</span>
            <div className="relative flex-grow">
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-white w-full caret-transparent"
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
              <span
                className="absolute left-0 text-white whitespace-pre"
                style={{ pointerEvents: "none" }}
              >
                {currentCommand || (
                  <span className="text-white italic">{inputPlaceholder}</span>
                )}
                <span className="animate-pulse bg-white opacity-70">|</span>
              </span>
            </div>
          </div>
        )}

        {/* File content display - SEPARATE SECTION BELOW COMMAND INPUT */}
        {currentFile && (
          <div className="mt-6">
           {/*  <div className="text-pink-400 mb-2">File: {currentFile.name}</div> */}
            <div className="markdown-content text-white">
              <ReactMarkdown>{currentFile.content}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Simple content display */}
        {!isTyping && initialContent && terminalOutput.length === 0 && !currentFile && (
          <div className="text-white">
            <ReactMarkdown>{initialContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;