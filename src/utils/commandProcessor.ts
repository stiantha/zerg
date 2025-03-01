// src/components/Terminal/utils/CommandProcessor.ts
interface CommandResult {
    output: string;
    shouldClear: boolean;
  }
  
  export const processCommand = (
    command: string, 
    fileSystem: Record<string, string>
  ): CommandResult => {
    const cmdParts = command.trim().split(/\s+/);
    const cmd = cmdParts[0].toLowerCase();
    const args = cmdParts.slice(1);
    
    const commands: Record<string, string> = {
      help: "Available commands:\n- ls: List files\n- cat [filename]: Display file contents\n- clear: Clear terminal\n- pwd: Print working directory\n- cd [dir]: Change directory",
      ls: "README.md\narchitecture.md\ndesign_patterns.md",
      pwd: "/home/user",
    };
  
    switch (cmd) {
      case "help":
        return { output: commands.help, shouldClear: false };
      case "ls":
        return { output: commands.ls, shouldClear: false };
      case "clear":
        return { output: "", shouldClear: true };
      case "pwd":
        return { output: commands.pwd, shouldClear: false };
      case "cd":
        return { 
          output: `Directory changed to: ${args[0] || "~"}`, 
          shouldClear: false 
        };
      case "cat":
        if (args.length === 0) {
          return { output: "Usage: cat <filename>", shouldClear: false };
        } else {
          const filename = args[0];
          if (fileSystem[filename]) {
            return { output: fileSystem[filename], shouldClear: false };
          } else {
            return { 
              output: `cat: ${filename}: No such file or directory`, 
              shouldClear: false 
            };
          }
        }
      default:
        return { 
          output: `Command not found: ${cmd}`, 
          shouldClear: false 
        };
    }
  };
  