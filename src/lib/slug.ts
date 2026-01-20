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
 * Create a full blog URL path with slug and ID
 * Format: /blog/my-post-title-abc123
 */
export const createBlogPath = (id: string, title: string): string => {
  const slug = generateSlug(title);
  const shortId = id.split("-")[0]; // Use first segment of UUID
  return `/blog/${slug}-${shortId}`;
};

/**
 * Extract the ID from a slug-id URL parameter
 * Handles both old format (just ID) and new format (slug-shortId)
 */
export const extractIdFromSlug = (slugWithId: string): string => {
  // If it's a full UUID (old format), return as-is
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(slugWithId)) {
    return slugWithId;
  }
  
  // Extract the short ID from the end of the slug
  const parts = slugWithId.split("-");
  return parts[parts.length - 1];
};
