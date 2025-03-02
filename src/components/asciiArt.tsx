import React from 'react';
import { generateClaudeAscii } from '../hooks/useGenerateAsciiArt';

interface AsciiArtProps {
  text: string;
  color?: string;
  charSpacing?: number;
  lineSpacing?: number;
  scale?: number;
  fontSize?: string;
  className?: string;
}

const AsciiArt: React.FC<AsciiArtProps> = ({ 
  text,
  color = '#FFC0CB',
  charSpacing = 5,
  lineSpacing = 5,
  fontSize, 
  scale = 1,
  className = ''
}) => {
  return (
    <div 
      className={`ascii-art ${className}`}
      style={{ 
        color,
        transformOrigin: "left top",
        fontSize: fontSize || "clamp(0.5rem, 0.3rem + 0.5vw, 1rem)",
        letterSpacing: `${charSpacing * 0.1}em`,
        lineHeight: `${1 + lineSpacing * 0.1}`,
        transform: `scale(${scale})`,
        whiteSpace: "pre",
        overflowX: "auto"
      }}
    >
      {generateClaudeAscii(text, { charSpacing, lineSpacing, scale })}
    </div>
  );
};

export default AsciiArt;
