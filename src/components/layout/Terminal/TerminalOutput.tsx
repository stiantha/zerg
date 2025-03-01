// src/components/Terminal/TerminalOutput.tsx
import React from "react";

interface TerminalOutputProps {
  output: string[];
  isMainTerminal?: boolean;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  output,
  isMainTerminal = false
}) => {
  return (
    <div className={`terminal-output ${isMainTerminal ? 'main-terminal-output' : ''}`}>
      {output.map((line, index) => (
        <div key={index} className="terminal-line">
          {line}
        </div>
      ))}
    </div>
  );
};

export default TerminalOutput;
