import React, { useState, useEffect, useRef, useCallback } from "react";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import ReactMarkdown from "react-markdown";
import { ContentLoader, Content } from "../utils/contentLoader";

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
  const [terminalOutput, setTerminalOutput] = useState<
    { type: "text" | "markdown"; content: string }[]
  >([]);
  const [inputPlaceholder, setInputPlaceholder] = useState<string>("");
  const fullContentRef = useRef<string>("");
  const [currentFile, setCurrentFile] = useState<{
    name: string;
    content: string;
  } | null>(null);
  const [currentComponent, setCurrentComponent] = useState<React.ComponentType<unknown> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const loadFile = useCallback(
    async (filename: string) => {
      try {
        setLoading(true);
        setTerminalOutput([
          { type: "text", content: `Loading ${filename}...` },
        ]);
        
        console.log(`Terminal requesting content: ${filename}`);
        
        const content = await ContentLoader.loadContent(filename);
        
        if (!content) {
          setTerminalOutput([
            { type: "text", content: `File or component not found: ${filename}` },
          ]);
          setLoading(false);
          return;
        }
        
        if (content.type === "markdown") {
          console.log(`Loaded markdown for ${filename}`);
          setCurrentFile({
            name: filename,
            content: content.content as string,
          });
          setCurrentComponent(null);
        } else {
          console.log(`Loaded component for ${filename}`);
          setCurrentComponent(content.content as React.ComponentType<unknown>);
          setCurrentFile(null);
          setTerminalOutput([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading file:", error);
        setCurrentFile(null);
        setCurrentComponent(null);
        setTerminalOutput([
          { type: "text", content: `Error loading file or component: ${filename}` },
          { type: "text", content: `Details: ${error instanceof Error ? error.message : String(error)}` }
        ]);
        setLoading(false);
      }
    },
    [setTerminalOutput]
  );
  

  useEffect(() => {
    if (fileName && !isTyping) {
      console.log(`Initial load file triggered for: ${fileName}`);
      loadFile(fileName);
      setInputPlaceholder(`cat ${fileName}`);
    }
  }, [fileName, isTyping, loadFile]);

  useEffect(() => {
    if (fileName) {
      setInputPlaceholder(`cat ${fileName}`);

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

  const commands: Record<string, string> = {
    help: "Available commands:\n- ls: List files\n- cat [filename]: Display file contents\n- clear: Clear terminal\n- pwd: Print working directory\n- cd [dir]: Change directory",
    ls: "README.md\nhome\nabout\nblog\ncontact\narchitecture.md\ndesign_patterns.md\njavascript.md\npython.md",
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
          const commands = ["help", "ls", "cat", "clear", "pwd", "cd"];
          const files = [
            "README.md", 
            "home",
            "about",
            "blog",
            "contact",
            "architecture.md", 
            "design_patterns.md",
            "javascript.md",
            "python.md"
          ];

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

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newHistory = [currentCommand, ...commandHistory].slice(0, 50);
      setCommandHistory(newHistory);
      setHistoryIndex(-1);

      const command = currentCommand;
      setCurrentCommand("");

      let output = "";
      const cmdParts = command.trim().split(/\s+/);
      const cmd = cmdParts[0].toLowerCase();
      const args = cmdParts.slice(1);

      switch (cmd) {
        case "help":
          output = commands.help;
          setTerminalOutput([{ type: "text", content: output }]);
          setCurrentFile(null);
          setCurrentComponent(null);
          break;
        case "ls":
          output = commands.ls;
          setTerminalOutput([{ type: "text", content: output }]);
          setCurrentFile(null);
          setCurrentComponent(null);
          break;
        case "clear":
          setTerminalOutput([]);
          setCurrentFile(null);
          setCurrentComponent(null);
          break;
        case "pwd":
          output = commands.pwd;
          setTerminalOutput([{ type: "text", content: output }]);
          setCurrentFile(null);
          setCurrentComponent(null);
          break;
        case "cat":
          if (args.length === 0) {
            output = "Usage: cat <filename>";
            setTerminalOutput([{ type: "text", content: output }]);
            setCurrentFile(null);
            setCurrentComponent(null);
          } else {
            const filename = args[0];
            console.log(`Cat command triggered for: ${filename}`);
            loadFile(filename);

            if (onCommandEntered) {
              onCommandEntered(command);
            }
            return;
          }
          break;

        case "cd":
          output = `Directory changed to: ${args[0] || "~"}`;
          setInputPlaceholder(`cd ${args[0] || "~"}`);
          setTerminalOutput([{ type: "text", content: output }]);
          setCurrentFile(null);
          setCurrentComponent(null);
          break;
        default:
          output = `Command not found: ${cmd}`;
          setTerminalOutput([{ type: "text", content: output }]);
          setCurrentFile(null);
          setCurrentComponent(null);
      }

      if (onCommandEntered) {
        onCommandEntered(command);
      }

      setCurrentCommand("");
    }
  };

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
        { type: "text", content: `user@zerg:~$ ${currentCommand}` },
        { type: "text", content: "^C" },
      ]);
      setCurrentFile(null);
      setCurrentComponent(null);
      setCurrentCommand("");
      setHistoryIndex(-1);
    }

    // Handle Ctrl+L (clear screen)
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setTerminalOutput([]);
      setCurrentFile(null);
      setCurrentComponent(null);
    }

    if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  // Force create a component key for re-mounting components when needed
  const componentKey = currentComponent ? currentComponent.name || 'component' : 'no-component';

  return (
    <div className="font-mono h-full flex flex-col">
      {/* Terminal header */}
      <div className="rounded-t-md p-2 flex items-center">
        <div className="mt-5 flex-1 text-white justify-center text-center text-sm font-bold px-2">
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
                {output.type === "text" ? (
                  <div className="whitespace-pre-wrap break-words">
                    {output.content !== undefined && output.content !== null
                      ? output.content
                      : "[empty line]"}
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
              {terminalOutput.length === 0 && !currentFile && !currentComponent && !loading
                ? "No output to display"
                : ""}
            </div>
          )}
        </div>

        {/* Command input with placeholder support */}
        {!isTyping && showInputField && (
          <div className="flex items-center">
            <span className="text-teal-500 mr-2">user@zerg:~$</span>
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

        {/* Display loading indicator */}
        {loading && (
          <div className="text-yellow-400 mt-4">
            Loading content... Please wait...
          </div>
        )}

        {/* Display React Component */}
{currentComponent && !loading && (
  <div className="mt-6 component-container text-white" key={componentKey}>
    {React.createElement(currentComponent)}
  </div>
)}

        {/* File content display - SEPARATE SECTION BELOW COMMAND INPUT */}
        {currentFile && !currentComponent && !loading && (
          <div className="mt-6">
            <div className="markdown-content text-white">
              <ReactMarkdown>{currentFile.content}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Simple content display */}
        {!isTyping &&
          initialContent &&
          terminalOutput.length === 0 &&
          !currentFile &&
          !currentComponent &&
          !loading && (
            <div className="text-white">
              <ReactMarkdown>{initialContent}</ReactMarkdown>
            </div>
          )}
      </div>
    </div>
  );
};

export default Terminal;