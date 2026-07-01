/**
 * Markdown to HTML Converter Utility
 * 
 * This utility converts existing Markdown blog posts to HTML format
 * for use with the new TipTap rich text editor.
 * 
 * Usage: Run this once to migrate existing content
 */

// Simple Markdown to HTML converter
export function markdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  let html = markdown
  let headingIndex = 0
  
  // Convert headings (# H1, ## H2, ### H3, etc.) with IDs
  html = html.replace(/^### (.*$)/gim, () => `<h3 id="heading-${headingIndex++}">$1</h3>`)
  html = html.replace(/^## (.*$)/gim, () => `<h2 id="heading-${headingIndex++}">$1</h2>`)
  html = html.replace(/^# (.*$)/gim, () => `<h1 id="heading-${headingIndex++}">$1</h1>`)
  
  // Convert images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />')
  
  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
  
  // Convert bold **text** or __text__
  html = html.replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
  html = html.replace(/__([^_]+)__/gim, '<strong>$1</strong>')
  
  // Convert italic *text* or _text_
  html = html.replace(/\*([^*]+)\*/gim, '<em>$1</em>')
  html = html.replace(/_([^_]+)_/gim, '<em>$1</em>')
  
  // Convert blockquotes > text
  html = html.replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>')
  
  // Convert bullet lists - item
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/gim, '<ul>$&</ul>')
  
  // Convert numbered lists 1. item
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
  
  // Convert paragraphs (double newlines)
  html = html.replace(/\n\n/g, '</p><p>')
  
  // Wrap in paragraphs if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`
  }
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p>\s*<\/p>/g, '')
  
  return html.trim()
}

// Example usage:
// const markdownContent = `# My Blog Post
// 
// This is **bold** and this is *italic*.
// 
// ## Section 2
// 
// - Item 1
// - Item 2
// 
// ![Image](https://example.com/image.jpg)`
// 
// const htmlContent = markdownToHtml(markdownContent)
// console.log(htmlContent)
