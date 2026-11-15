import Image from "next/image";
import { Column, Text, Meta, Schema } from "@once-ui-system/core";
import { baseURL, misc, person } from "@/resources";

type Entry = {
  title: string;
  link: string;
  meta: string;
  summary: string;
  image?: { src: string; alt: string; width: number; height: number };
};

const awards: Entry[] = [
  {
    title: "3rd place, Impact Pitch Night 2026",
    link: "https://www.monenda.de",
    meta: "Monenda, DIGITALHUB Bonn, 3 November 2026",
    summary:
      "Third place out of 30 teams with Monenda. Monenda lets GP practices send personal heat warnings to their at-risk patients when an official heat warning is issued.",
    image: {
      src: "/images/award/trophy.svg",
      alt: "Impact Pitch Night 2026 trophy engraved “3. Platz” (3rd place)",
      width: 240,
      height: 382,
    },
  },
];

const papers: Entry[] = [
  {
    title:
      "MEmilio: a high performance Modular EpideMIcs simuLatIOn software for multi-scale and comparative simulations of infectious disease dynamics",
    link: "https://doi.org/10.1038/s41598-026-66481-6",
    meta: "J. Bicker, C. Gerstein, D. Kerkmann, …, P. Johannssen, …, M. J. Kühn. Scientific Reports 16, 26950 (2026)",
    summary:
      "An epidemic simulation framework that runs equation-based and agent-based models on one C++ core with a Python interface.",
  },
];

const contributions: Entry[] = [
  {
    title: "sjoerdk/idiscore #155: Add ReplaceAndStore operator",
    link: "https://github.com/sjoerdk/idiscore/pull/155",
    meta: "Merged February 2026",
    summary:
      "Reversible pseudonymisation for medical-imaging files: identifying fields are replaced with generated dummy values and the mapping is stored. Built for the NeuroDaRe upload pipeline.",
  },
];

const sections = [
  { title: "Awards", entries: awards },
  { title: "Publications", entries: papers },
  { title: "Open Source Contributions", entries: contributions },
];

export async function generateMetadata() {
  return Meta.generate({
    title: misc.title,
    description: misc.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(misc.title)}`,
    path: misc.path,
  });
}

export default function MiscPage() {
  return (
    <Column className="site-container" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={misc.title}
        description={misc.description}
        path={misc.path}
        image={`/api/og/generate?title=${encodeURIComponent(misc.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${misc.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <header>
        <h1 className="page-title">{misc.label}</h1>
        <p className="page-lede">Awards, publications, and open-source contributions.</p>
      </header>

      {sections.map((section) => (
        <Column
          key={section.title}
          as="section"
          fillWidth
          gap="m"
          style={{ maxWidth: "var(--prose-width)" }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            {section.title}
          </h2>
          {section.entries.map((entry) => (
            <div key={entry.link} className="misc-entry">
              {entry.image && (
                <Image
                  className="misc-entry-image"
                  src={entry.image.src}
                  alt={entry.image.alt}
                  width={entry.image.width}
                  height={entry.image.height}
                />
              )}
              <Column fillWidth gap="4">
              <Text as="h3" className="about-entry" variant="heading-strong-l">
                <a className="text-link" href={entry.link} target="_blank" rel="noopener noreferrer">
                  {entry.title}
                </a>
              </Text>
              <Text as="p" variant="body-default-m" onBackground="neutral-medium">
                {entry.meta}
              </Text>
              <Text as="p" variant="body-default-m" onBackground="neutral-strong" style={{ lineHeight: 1.6 }}>
                {entry.summary}
              </Text>
              </Column>
            </div>
          ))}
        </Column>
      ))}
    </Column>
  );
}
