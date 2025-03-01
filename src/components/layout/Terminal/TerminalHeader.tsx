// src/components/Terminal/TerminalHeader.tsx
import React, { useState, useEffect } from "react";
import { generateAsciiArt } from "../../../utils/asciiArt";

interface TerminalHeaderProps {
  title: string;
  fileName: string;
  isMainTerminal?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  title,
  fileName,
  isMainTerminal = false
}) => {
  const [asciiTitle, setAsciiTitle] = useState<string>("");

  // Generate ASCII art for the title when it changes
  useEffect(() => {
    if (isMainTerminal) {
      const categoryName = title === "/" ? "" : title.toUpperCase();
      setAsciiTitle(generateAsciiArt(categoryName));
    }
  }, [title, isMainTerminal]);

  return (
    <div className="terminal-header">
      <div className="terminal-title">{fileName}</div>
      {isMainTerminal && asciiTitle && (
        <pre className="ascii-title">{asciiTitle}</pre>
      )}
    </div>
  );
};

export default TerminalHeader;
