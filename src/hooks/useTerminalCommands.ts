// src/hooks/useTerminalCommands.ts
import { useState } from "react";

export function useTerminalCommands() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  
  const contentMap: Record<string, string> = {
    help: "Available commands:\n- ls: List files\n- cat [filename]: Display file contents\n- clear: Clear terminal",
    ls: "README.md\narchitecture.md\ndesign_patterns.md",
    clear: "",
    // Add more commands
  };
  
  const processCommand = (command: string) => {
    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);

    let output = "";
    const cmd = command.trim().toLowerCase();
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
        return;
      case cmd.startsWith("cat "):
        output = `Reading file: ${fileName}\nFile not found or access denied.`;
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setTerminalOutput([
      ...terminalOutput,
      `user@zergs:~$ ${command}`,
      output,
    ]);
  };
  
  return {
    commandHistory,
    terminalOutput,
    processCommand,
    clearOutput: () => setTerminalOutput([])
  };
}
