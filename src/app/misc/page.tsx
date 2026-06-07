import { Column, Heading, Row, Text, Button, Meta, Schema } from "@once-ui-system/core";
import { baseURL, misc, person } from "@/resources";

const papers = [
  {
    title:
      "MEmilio — A high performance Modular EpideMIcs simuLatIOn software for multi-scale and comparative simulations of infectious disease dynamics",
    authors: "Julia Bicker, Carlotta Gerstein, David Kerkmann, ..., Paul Johannssen, et al.",
    year: "2026",
    link: "https://arxiv.org/abs/2602.11381",
    summary:
      "High-performance modular epidemic simulation framework unifying ODE, agent-based, and other epidemiological models in a shared C++ architecture with Python interface.",
  },
];

const contributions = [
  {
    repo: "sjoerdk/idiscore",
    pr: "Add ReplaceAndStore Operator",
    prNumber: 155,
    link: "https://github.com/sjoerdk/idiscore/pull/155",
    merged: "Feb 2026",
    summary:
      "Added ReplaceAndStore operator and BijectiveDummyGenerator to make idiscore compatible with the NeuroDaRe input pipeline — enables reversible pseudonymization of DICOM field values by replacing them with generated dummies while storing the mapping.",
  },
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
    <Column maxWidth="m" paddingX="l" gap="xl" marginBottom="xl">
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

      <Column fillWidth gap="m" paddingTop="xl">
        <Heading variant="display-strong-xl">Misc</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Papers, preprints, and open-source contributions.
        </Text>
      </Column>

      <Column fillWidth gap="l">
        <Heading as="h2" variant="display-strong-s">
          Papers &amp; Preprints
        </Heading>
        {papers.map((paper, index) => (
          <Column key={index} fillWidth gap="8">
            <Button
              href={paper.link}
              label={paper.title}
              variant="tertiary"
              size="m"
              weight="strong"
              style={{ textAlign: "left", justifyContent: "flex-start" }}
            />
            <Text variant="body-default-s" onBackground="neutral-weak">
              {paper.authors} · {paper.year}
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {paper.summary}
            </Text>
          </Column>
        ))}
      </Column>

      <Column fillWidth gap="l">
        <Heading as="h2" variant="display-strong-s">
          Open Source Contributions
        </Heading>
        {contributions.map((contrib, index) => (
          <Column key={index} fillWidth gap="8">
            <Row gap="8" vertical="center" wrap>
              <Text variant="heading-strong-l">{contrib.repo}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                · {contrib.merged}
              </Text>
            </Row>
            <Button
              href={contrib.link}
              label={`#${contrib.prNumber} — ${contrib.pr}`}
              variant="tertiary"
              size="s"
              prefixIcon="github"
            />
            <Text variant="body-default-m" onBackground="neutral-weak">
              {contrib.summary}
            </Text>
          </Column>
        ))}
      </Column>
    </Column>
  );
}
