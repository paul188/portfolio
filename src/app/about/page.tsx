import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const hasLanguages = Boolean(person.languages && person.languages.length > 0);
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: "Languages",
      display: hasLanguages,
      items: [],
    },
  ];
  return (
    <Column className="site-container">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <div className={styles.layout}>
        {about.avatar.display && (
          <Column className={styles.aside} gap="m" horizontal="center">
            <Avatar src={person.avatar} size="xl" />
            {about.tableOfContent.display && (
              <TableOfContents structure={structure} about={about} />
            )}
          </Column>
        )}
        <Column className={styles.main}>
          <Column
            id={about.intro.title}
            fillWidth
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Schedule a call</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <h1 className={`page-title ${styles.textAlign}`}>{person.name}</h1>
            <p className={`page-lede ${styles.textAlign}`} style={{ marginTop: "0.5rem" }}>
              {person.role}
            </p>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                      .filter((item) => item.essential)
                      .map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl" style={{ lineHeight: 1.6 }}>
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" className="about-section" id={about.work.title} variant="display-strong-xs" marginBottom="m">
                {about.work.title}
              </Heading>
              <div className={styles.timeline}>
                {about.work.experiences.map((experience, index) => (
                  <React.Fragment key={`${experience.company}-${experience.role}-${index}`}>
                  <div className={styles.timelineDate}>
                    <span className={styles.timelineDot} aria-hidden="true" />
                    {experience.timeframe}
                  </div>
                  <Column className={styles.timelineBody} fillWidth>
                    <Text as="h3" className="about-entry" id={experience.company} variant="heading-strong-l" marginBottom="4">
                      {experience.company}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-medium" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            style={{ lineHeight: 1.6 }}
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Column key={index} gap="8">
                            <Row
                              border="neutral-medium"
                              radius="m"
                              minWidth={image.width}
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Row>
                            <Text variant="body-default-s" onBackground="neutral-medium">
                              {image.alt}
                            </Text>
                          </Column>
                        ))}
                      </Row>
                    )}
                  </Column>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" className="about-section" id={about.studies.title} variant="display-strong-xs" marginBottom="m">
                {about.studies.title}
              </Heading>
              <div className={styles.timeline}>
                {about.studies.institutions.map((institution, index) => (
                  <React.Fragment key={`${institution.name}-${index}`}>
                  <div className={styles.timelineDate}>
                    <span className={styles.timelineDot} aria-hidden="true" />
                    {institution.timeframe}
                  </div>
                  <Column className={styles.timelineBody} fillWidth gap="4">
                    <Text as="h3" className="about-entry" id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-medium">
                      {institution.description}
                    </Text>
                  </Column>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                className="about-section"
                id={about.technical.title}
                variant="display-strong-xs"
                marginBottom="m"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text as="h3" className="about-entry" id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-medium" style={{ lineHeight: 1.6 }}>
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
          {hasLanguages && (
            <>
              <Heading as="h2" className="about-section" id="Languages" variant="display-strong-xs" marginTop="40" marginBottom="m">
                Languages
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-medium">
                {person.languages?.join(", ")}
              </Text>
            </>
          )}
        </Column>
      </div>
    </Column>
  );
}