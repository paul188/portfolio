// One colour per high-level category. The filter tags and the category tags
// on each project card use the same colours (defined as --cat-* in site.css).
export type CategoryKey = "ai" | "cybersecurity" | "math" | "medicine";

export const CATEGORY_KEYS: Record<string, CategoryKey> = {
  AI: "ai",
  Medicine: "medicine",
  Cybersecurity: "cybersecurity",
  Math: "math",
};
