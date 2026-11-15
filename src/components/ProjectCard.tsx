import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.scss";
import { CATEGORY_KEYS } from "./work/categories";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  hasCaseStudy: boolean;
  link: string;
  tags?: string[];
  categories?: string[];
  website?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority,
  images = [],
  title,
  description,
  hasCaseStudy,
  link,
  tags = [],
  categories = [],
  website = "",
}) => {
  const image = images[0];
  const topics = tags.filter((label) => !categories.includes(label));

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <h3 className={styles.title}>
          {hasCaseStudy ? <Link href={href}>{title}</Link> : title}
        </h3>
        {description?.trim() && <p className={styles.summary}>{description}</p>}
        {categories.length > 0 && (
          <ul className={styles.tags} aria-label="Fields">
            {categories.map((label) => (
              <li key={`category-${label}`} data-category={CATEGORY_KEYS[label]}>
                {label}
              </li>
            ))}
          </ul>
        )}
        {topics.length > 0 && (
          <ul className={styles.topics} aria-label="Topics">
            {topics.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        )}
        <div className={styles.links}>
          {hasCaseStudy && (
            <Link href={href} className={styles.link} aria-label={`View project: ${title}`}>
              View project <span aria-hidden="true">→</span>
            </Link>
          )}
          {website && (
            <a
              href={website}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Website for ${title} (opens in a new tab)`}
            >
              Website <span aria-hidden="true">↗</span>
            </a>
          )}
          {link && (
            <a
              href={link}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Source code for ${title} (opens in a new tab)`}
            >
              Source code <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
      {image && (
        <Link href={href} className={styles.thumb} tabIndex={-1} aria-hidden="true">
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </Link>
      )}
    </article>
  );
};
