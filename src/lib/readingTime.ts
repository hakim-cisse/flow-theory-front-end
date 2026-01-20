/**
 * Calculate estimated reading time based on word count
 * Average reading speed is approximately 200-250 words per minute
 * Using 200 wpm for a more comfortable reading pace
 */

const WORDS_PER_MINUTE = 200;

/**
 * Extract plain text from TipTap JSON content
 */
const extractTextFromTipTap = (content: unknown): string => {
  if (!content || typeof content !== 'object') return '';
  
  const node = content as { type?: string; text?: string; content?: unknown[] };
  
  if (node.type === 'text' && node.text) {
    return node.text;
  }
  
  if (Array.isArray(node.content)) {
    return node.content.map(extractTextFromTipTap).join(' ');
  }
  
  return '';
};

/**
 * Calculate reading time from TipTap JSON content
 * @param content - TipTap JSON content (as string or object)
 * @returns Reading time in minutes (minimum 1 minute)
 */
export const calculateReadingTime = (content: string | unknown): number => {
  let text = '';
  
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      text = extractTextFromTipTap(parsed);
    } catch {
      // If not valid JSON, treat as plain text/HTML
      text = content.replace(/<[^>]*>/g, ' ');
    }
  } else {
    text = extractTextFromTipTap(content);
  }
  
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  return Math.max(1, minutes);
};

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export const formatReadingTime = (minutes: number): string => {
  return `${minutes} min read`;
};
