import { IconButton } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>
          © {currentYear} {person.name}
          {/* The template is licensed CC BY-NC 4.0: the credit and link must stay unless you hold a Once UI Pro license. */}
          <span className={styles.credit}>
            Built on the{" "}
            <a href="https://once-ui.com/products/magic-portfolio">Magic Portfolio</a> template by
            Once UI
          </span>
        </p>
        <div className={styles.social}>
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="l"
                  variant="ghost"
                />
              ),
          )}
        </div>
      </div>
    </footer>
  );
};
