import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import { Meta, Schema, Column, Media } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { ScrollToHash, CustomMDX } from "@/components";
import { slugify } from "@/components/mdx";
import styles from "./page.module.scss";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  // Second-level headings of the case study, for the "On this page" list.
  const sections = post.content
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, "").trim())
    .map((title) => ({ title, id: slugify(title) }));

  return (
    <Column className="site-container">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <div className={styles.layout}>
        <div className={styles.main}>
          <header className={styles.header}>
            <Link href="/work" className={styles.back}>
              <span aria-hidden="true">←</span> All projects
            </Link>
            <h1 className="page-title">{post.metadata.title}</h1>
            <p className={styles.meta}>
              {post.metadata.team?.map((member) => `${member.name}, ${member.role}`).join("; ")}
              {post.metadata.team && post.metadata.publishedAt && <span aria-hidden="true"> · </span>}
              {post.metadata.publishedAt && (
                <time dateTime={post.metadata.publishedAt}>
                  {formatDate(post.metadata.publishedAt)}
                </time>
              )}
            </p>
            {(post.metadata.website || post.metadata.link) && (
              <p className={styles.links}>
                {post.metadata.website && (
                  <a href={post.metadata.website} className={styles.link} target="_blank" rel="noopener noreferrer">
                    Website <span aria-hidden="true">↗</span>
                  </a>
                )}
                {post.metadata.link && (
                  <a href={post.metadata.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                    Source code <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            )}
          </header>
          {post.metadata.images.length > 0 && (
            <Media
              priority
              radius="m"
              border="neutral-alpha-weak"
              alt={post.metadata.title}
              src={post.metadata.images[0]}
              marginBottom="16"
            />
          )}
          <article className="prose">
            <CustomMDX source={post.content} />
          </article>
        </div>
        {sections.length > 2 && (
          <nav className={styles.toc} aria-label="On this page">
            <p className={styles.tocTitle}>On this page</p>
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <ScrollToHash />
    </Column>
  );
}
