import blockCharacters from '../utils/blockCharacters';

/**
 * Generates ASCII art in the style of "Claude Code" for any text input
 * 
 * @param text - The text to convert to ASCII art
 * @param options - Configuration options
 * @returns The ASCII art representation of the input text
 */
export function generateClaudeAscii(
  text: string, 
  options: {
    charSpacing?: number;
    lineSpacing?: number;
    scale?: number;
  } = {}
): string {

  const { 
    charSpacing = 2,
    lineSpacing = 0,
    scale = 1
  } = options;
  
  const upperText = text.toUpperCase();
  
  let result: string[] = [];
  for (let i = 0; i < 7; i++) {
    result.push('');
  }
  
  if (lineSpacing > 0) {
    for (let i = 0; i < lineSpacing; i++) {
      result.push('');
    }
  }
  

  for (const char of upperText) {

    const charTemplate = blockCharacters[char] || blockCharacters[' '];
    
    for (let i = 0; i < 7; i++) {
      result[i] += charTemplate[i] || '';
    }
    
    if (charSpacing > 0) {
      const spacing = ' '.repeat(charSpacing);
      for (let i = 0; i < 7; i++) {
        result[i] += spacing;
      }
    }
  }
  
  if (scale > 1) {
    const scaledResult: string[] = [];
    for (const line of result) {
      for (let i = 0; i < scale; i++) {
        scaledResult.push(line);
      }
    }
    result = scaledResult;
  }
  
  return result.join('\n');
}