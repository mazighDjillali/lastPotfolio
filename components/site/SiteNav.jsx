"use client";

import React from "react";
import { NavPill } from "../ds/navigation/NavPill.jsx";

const ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/**
 * SiteNav — the fixed NavPill wired to scroll-spy: the sliding highlight
 * springs to whichever section is currently in view.
 */
export function SiteNav() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const sections = ITEMS.map((it) => document.querySelector(it.href)).filter(Boolean);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry nearest the top of the viewport that is intersecting
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        const idx = sections.indexOf(top.target);
        if (idx !== -1) setActive(idx);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return <NavPill items={ITEMS} activeIndex={active} onChange={setActive} />;
}
