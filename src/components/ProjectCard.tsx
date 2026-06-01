"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

type ColorScheme = "neutral" | "brand" | "accent" | "info" | "danger" | "warning" | "success";

const TAG_COLORS: Record<string, ColorScheme> = {
  // Languages & algorithms
  "C/C++":                          "accent",
  "algorithmic":                    "accent",
  "scientific computing":           "info",
  // AI / data
  "LLM":                            "brand",
  "RAG":                            "brand",
  "semistructured data":            "info",
  // Security
  "Cybersecurity":                  "danger",
  "Encryption":                     "danger",
  "Defensive Cybersecurity":        "danger",
  "Vulnerability Assessment":       "warning",
  // Platform / infrastructure
  "Cloud Platform for medical data":"warning",
  // Research
  "Research":                       "success",
  // ML / CV
  "Machine Learning":               "brand",
  "Computer Vision":                "accent",
  "Simulation":                     "info",
  "Pytorch":                        "warning",
};

function tagColor(label: string): ColorScheme {
  return TAG_COLORS[label] ?? "neutral";
}

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  tags?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  tags = [],
}) => {
  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            {tags.length > 0 && (
              <Row gap="8" wrap>
                {tags.map((label) => (
                  <Tag key={label} variant={tagColor(label)} size="s" label={label} />
                ))}
              </Row>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
