/**
 * Generate a URL-friendly slug from a title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .substring(0, 60); // Limit length
};

/**
 * Create a full blog URL path with slug and full ID
 * Format: /blog/full-uuid-my-post-title
 */
export const createBlogPath = (id: string, title: string): string => {
  const slug = generateSlug(title);
  return `/blog/${id}-${slug}`;
};

/**
 * Extract the UUID from a slug URL parameter
 * Format expected: full-uuid-slug-text
 * UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (36 chars)
 */
export const extractIdFromSlug = (slugWithId: string): string => {
  // If it's a full UUID (old format), return as-is
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(slugWithId)) {
    return slugWithId;
  }
  
  // Extract UUID from the beginning of the slug (first 36 characters)
  const potentialUuid = slugWithId.substring(0, 36);
  if (uuidRegex.test(potentialUuid)) {
    return potentialUuid;
  }
  
  // Fallback: try to find UUID pattern anywhere in the string
  const uuidMatch = slugWithId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (uuidMatch) {
    return uuidMatch[0];
  }
  
  // Last resort: return the original (will likely fail but provides debugging info)
  return slugWithId;
};