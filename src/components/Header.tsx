"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes, person, about, blog, work, misc, gallery } from "@/resources";
import styles from "./Header.module.scss";

const navItems = [about, work, misc, blog, gallery].filter(
  (item) => routes[item.path as keyof typeof routes],
);

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.name}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          {person.name}
        </Link>
        <nav className={styles.nav} aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={styles.link}
              aria-current={pathname.startsWith(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
