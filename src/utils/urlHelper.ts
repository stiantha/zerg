export function normalizeForUrl(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '_');
  }
  