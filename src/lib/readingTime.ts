/**
 * Calculate estimated reading time for text content.
 * Assumes average reading speed of 200 words per minute.
 */
export function calculateReadingTime(text: string): number {
  if (!text) return 1
  // Strip HTML tags if present
  const plainText = text.replace(/<[^>]+>/g, '')
  // Count words (split by whitespace)
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(wordCount / 200)
  return Math.max(1, minutes)
}
