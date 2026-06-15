"use client";

import { useMemo, useState } from "react";
import { Column, Flex, SegmentedControl, Text } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

export interface ProjectCardData {
  slug: string;
  href: string;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  tags: string[];
  categories: string[];
}

// Fixed display order for the high-level category filter
const CATEGORY_ORDER = ["Software", "Cybersecurity", "Math", "Medicine"];

const ALL = "all";

export function ProjectsBrowser({ cards }: { cards: ProjectCardData[] }) {
  const [selected, setSelected] = useState(ALL);

  // Only show buttons for categories that actually appear on a project,
  // kept in a stable order so the bar can't go stale as projects change.
  const categories = useMemo(() => {
    const present = new Set<string>();
    cards.forEach((card) => card.categories?.forEach((cat) => present.add(cat)));
    return CATEGORY_ORDER.filter((cat) => present.has(cat));
  }, [cards]);

  const visible =
    selected === ALL
      ? cards
      : cards.filter((card) => card.categories?.includes(selected));

  const buttons = [
    { value: ALL, label: "All" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <Column fillWidth gap="l">
      <Flex fillWidth horizontal="center" paddingX="l">
        <SegmentedControl
          buttons={buttons}
          selected={selected}
          onToggle={(value) => setSelected(value)}
        />
      </Flex>
      {visible.length > 0 ? (
        <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
          {visible.map((card, index) => (
            <ProjectCard
              key={card.slug}
              priority={index < 2}
              href={card.href}
              images={card.images}
              title={card.title}
              content={card.content}
              description={card.description}
              avatars={card.avatars}
              link={card.link}
              tags={card.tags}
            />
          ))}
        </Column>
      ) : (
        <Flex fillWidth horizontal="center" paddingY="xl">
          <Text onBackground="neutral-weak">No projects in this category yet.</Text>
        </Flex>
      )}
    </Column>
  );
}
