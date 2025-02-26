import figlet, { Fonts } from 'figlet';

// Load the custom font
async function loadCustomFont() {
  try {
    const response = await fetch('/assets/fonts/phm-blocky.flf');
    const fontData = await response.text();
    figlet.parseFont('phm-blocky', fontData);
    console.log('Custom font loaded successfully');
  } catch (error) {
    console.error('Error loading custom font:', error);
  }
}

// Call this function before using the font
loadCustomFont();

export const generateAsciiArt = (text: string, fontName: Fonts = 'Block'): string => {
  try {
    // Try the custom font first
    return figlet.textSync(text, fontName);
  } catch (error) {
    console.error(`Error generating ASCII art with font '${fontName}':`, error);
    // Fall back to block font
    try {
      return figlet.textSync(text, 'block' as Fonts);
    } catch {
      return text;
    }
  }
};
