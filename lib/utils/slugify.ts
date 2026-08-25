export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove non-word characters
    .replace(/[\s_-]+/g, '-')   // collapse whitespace/underscores into a single dash
    .replace(/^-+|-+$/g, '')    // trim leading/trailing dashes
}