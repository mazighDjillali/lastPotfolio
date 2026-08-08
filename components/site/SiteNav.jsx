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
 *
 * Clicking an item smooth-scrolls the page, which makes the scroll-spy fire
 * for every section that passes under the viewport band on the way — so the
 * highlight would ping-pong between the clicked target and each section it
 * flies past. To stop that, a click *locks* the active index to its target
 * and the spy is ignored until the target actually arrives (or a fallback
 * timer elapses, in case the target's band is never exactly hit).
 */
export function SiteNav() {
  const [active, setActive] = React.useState(0);
  // the index a click is scrolling toward; null when the spy is free to run
  const pendingRef = React.useRef(null);
  const unlockTimer = React.useRef(null);

  const clearLock = React.useCallback(() => {
    pendingRef.current = null;
    if (unlockTimer.current) {
      clearTimeout(unlockTimer.current);
      unlockTimer.current = null;
    }
  }, []);

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
        if (idx === -1) return;

        // a click-scroll is in progress: swallow every section it passes,
        // and only release the lock once the destination is the one in view
        if (pendingRef.current !== null) {
          if (idx === pendingRef.current) clearLock();
          return;
        }
        setActive(idx);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [clearLock]);

  React.useEffect(() => clearLock, [clearLock]); // clear the timer on unmount

  // a click: jump the highlight to the target and hold it there through the scroll
  const handleChange = (idx) => {
    setActive(idx);
    pendingRef.current = idx;
    if (unlockTimer.current) clearTimeout(unlockTimer.current);
    // fallback: release even if the target's spy band is never exactly hit
    // (e.g. a short final section), so the spy can't stay stuck
    unlockTimer.current = setTimeout(clearLock, 1000);
  };

  return <NavPill items={ITEMS} activeIndex={active} onChange={handleChange} />;
}
