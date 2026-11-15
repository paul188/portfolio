import { getPosts } from "@/utils/utils";
import { ProjectsBrowser } from "@/components/work/ProjectsBrowser";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  /** Slug of the project that leads the list regardless of date */
  featured?: string;
  filterable?: boolean;
}

export function Projects({ range, exclude, featured, filterable }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  // Pin the featured project to the front so it leads regardless of date
  if (featured) {
    const featuredIndex = sortedProjects.findIndex((post) => post.slug === featured);
    if (featuredIndex > 0) {
      const [featuredPost] = sortedProjects.splice(featuredIndex, 1);
      sortedProjects.unshift(featuredPost);
    }
  }

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  const cards = displayedProjects.map((post) => ({
    slug: post.slug,
    href: `/work/${post.slug}`,
    images: post.metadata.images,
    title: post.metadata.title,
    description: post.metadata.summary,
    hasCaseStudy: Boolean(post.content?.trim()),
    link: post.metadata.link || "",
    website: post.metadata.website || "",
    tags: post.metadata.tags || [],
    categories: post.metadata.categories || [],
  }));

  return <ProjectsBrowser cards={cards} filterable={filterable} />;
}
