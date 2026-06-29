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
    .replace(/^-|-$/g, "") // Trim leading/trailing hyphens
    .substring(0, 80); // Limit length
};

/**
 * Create a clean blog URL path using just the slug.
 * Format: /blog/my-post-title
 *
 * The `id` parameter is kept in the signature for backward compatibility
 * with existing callers, but is no longer part of the URL.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createBlogPath = (_id: string, title: string): string => {
  return `/blog/${generateSlug(title)}`;
};

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const UUID_ANYWHERE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/**
 * Best-effort extraction of a UUID from a legacy slug-with-id URL.
 * Returns null when the param is a plain slug (no embedded UUID).
 */
export const extractIdFromSlug = (slugWithId: string): string | null => {
  if (!slugWithId) return null;
  if (UUID_REGEX.test(slugWithId)) return slugWithId;
  const match = slugWithId.match(UUID_ANYWHERE);
  return match ? match[0] : null;
};

export const isUuidLike = (value: string): boolean => UUID_REGEX.test(value);
