// One colour per high-level category. The filter tags and the category tags
// on each project card use the same colours (defined as --cat-* in site.css).
export type CategoryKey = "software" | "cybersecurity" | "math" | "medicine";

export const CATEGORY_KEYS: Record<string, CategoryKey> = {
  Software: "software",
  Cybersecurity: "cybersecurity",
  Math: "math",
  Medicine: "medicine",
};
