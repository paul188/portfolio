import Image from "next/image";
import { Button, Column, Schema, Meta } from "@once-ui-system/core";
import { home, about, person, social, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const github = social.find((item) => item.name === "GitHub");

  return (
    <Column className="site-container" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <section className="hero">
        <Image
          className="hero-avatar"
          src={person.avatar}
          alt={`Portrait of ${person.name}`}
          width={176}
          height={176}
          priority
        />
        <div className="hero-text">
          <h1 className="hero-title">{home.headline}</h1>
          <p className="hero-lede">{home.subline}</p>
          <div className="hero-actions">
            <Button href={about.path} variant="primary" size="l" arrowIcon>
              More about me
            </Button>
            {github && (
              <Button href={github.link} variant="secondary" size="l" prefixIcon={github.icon}>
                GitHub
              </Button>
            )}
          </div>
        </div>
      </section>
      <Column as="section" fillWidth>
        <h2 className="section-title">Projects</h2>
        <Projects filterable featured="neurodare" />
      </Column>
    </Column>
  );
}
