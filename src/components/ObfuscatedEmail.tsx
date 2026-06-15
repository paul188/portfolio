"use client";
import { useEffect, useState } from "react";

export function ObfuscatedEmail() {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const u = "pauljoh";
    const d = "gmx.de";
    setHref(`mailto:${u}@${d}`);
  }, []);

  if (!href) return null;

  return (
    <a href={href} style={{ color: "inherit" }}>
      {href.replace("mailto:", "")}
    </a>
  );
}
