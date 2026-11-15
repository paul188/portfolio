import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import "@/resources/site.css";
import "katex/dist/katex.min.css";

import classNames from "classnames";

import { Column, Flex, Meta } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { baseURL, fonts, style, dataStyle, home } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <meta name="color-scheme" content="only light" />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Light theme only: apply the style tokens from the config.
                const root = document.documentElement;
                const config = ${JSON.stringify({
                  theme: "light",
                  brand: style.brand,
                  accent: style.accent,
                  neutral: style.neutral,
                  solid: style.solid,
                  "solid-style": style.solidStyle,
                  border: style.border,
                  surface: style.surface,
                  transition: style.transition,
                  scaling: style.scaling,
                  "viz-style": dataStyle.variant,
                })};
                Object.entries(config).forEach(([key, value]) => {
                  root.setAttribute('data-' + key, value);
                });
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <Header />
          <Flex as="main" zIndex={0} fillWidth paddingX="l" paddingY="xl" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
