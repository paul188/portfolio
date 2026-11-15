"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components";
import styles from "./Projects.module.scss";
import { CATEGORY_KEYS } from "./categories";

export interface ProjectCardData {
  slug: string;
  href: string;
  images: string[];
  title: string;
  description: string;
  hasCaseStudy: boolean;
  link: string;
  website: string;
  tags: string[];
  categories: string[];
}

// Fixed display order for the high-level category filter
const CATEGORY_ORDER = ["Software", "Cybersecurity", "Math", "Medicine"];

const ALL = "all";

export function ProjectsBrowser({
  cards,
  filterable = false,
}: {
  cards: ProjectCardData[];
  filterable?: boolean;
}) {
  const [selected, setSelected] = useState(ALL);

  // Only show buttons for categories that actually appear on a project,
  // kept in a stable order so the bar can't go stale as projects change.
  const categories = useMemo(() => {
    const present = new Set<string>();
    cards.forEach((card) => card.categories?.forEach((cat) => present.add(cat)));
    return CATEGORY_ORDER.filter((cat) => present.has(cat));
  }, [cards]);

  const visible =
    selected === ALL ? cards : cards.filter((card) => card.categories?.includes(selected));

  const buttons = [
    { value: ALL, label: "All" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <div className={styles.browser}>
      {filterable && (
        <div className={styles.filters} role="group" aria-label="Filter projects by field">
          {buttons.map((button) => (
            <button
              key={button.value}
              type="button"
              className={styles.chip}
              data-category={CATEGORY_KEYS[button.value]}
              aria-pressed={selected === button.value}
              onClick={() => setSelected(button.value)}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
      {visible.length > 0 ? (
        <ul className={styles.list}>
          {visible.map((card, index) => (
            <li key={card.slug}>
              <ProjectCard
                priority={index < 2}
                href={card.href}
                images={card.images}
                title={card.title}
                description={card.description}
                hasCaseStudy={card.hasCaseStudy}
                link={card.link}
                website={card.website}
                tags={card.tags}
                categories={CATEGORY_ORDER.filter((cat) => card.categories?.includes(cat))}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No projects in this category yet.</p>
      )}
    </div>
  );
}
