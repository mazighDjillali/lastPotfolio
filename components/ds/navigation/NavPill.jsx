"use client";

import React from "react";

/**
 * NavPill — the brand's signature navigation: a fixed, liquid-glass capsule
 * with a sliding signal-lit highlight and a moving top bar that spring to the
 * active item. This is the base of the whole system.
 *
 * Responsive: below `MOBILE_BREAKPOINT` the row can't hold every item, so the
 * pill collapses to a compact bar (active label + hamburger) that toggles a
 * glass dropdown of the full list. The desktop row is left untouched.
 */
const MOBILE_BREAKPOINT = 720;

export function NavPill({
  items = [],
  activeIndex,
  defaultActive = 0,
  onChange,
  fixed = true,
  className = "",
  style = {},
  ...rest
}) {
  const controlled = typeof activeIndex === "number";
  const [internal, setInternal] = React.useState(defaultActive);
  const active = controlled ? activeIndex : internal;

  const listRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  const navRef = React.useRef(null);
  const [ind, setInd] = React.useState({ left: 0, width: 0, ready: false });

  // Collapse to a menu when the row no longer fits.
  const [isMobile, setIsMobile] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const apply = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setOpen(false); // never leave the menu stuck open on resize up
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const measure = React.useCallback(() => {
    if (isMobile) return; // the sliding indicator only exists in the desktop row
    const el = itemRefs.current[active];
    const list = listRef.current;
    if (!el || !list) return;
    const er = el.getBoundingClientRect();
    const lr = list.getBoundingClientRect();
    setInd({ left: er.left - lr.left, width: er.width, ready: true });
  }, [active, isMobile]);

  React.useLayoutEffect(() => { measure(); }, [measure, items]);
  React.useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Dismiss the mobile menu on outside click or Escape.
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (i, href) => {
    if (!controlled) setInternal(i);
    onChange && onChange(i, href);
    setOpen(false);
  };

  const wrap = {
    ...(fixed
      ? { position: "fixed", insetInline: 0, top: 16, zIndex: 40, display: "flex", justifyContent: "center" }
      : { display: "flex", justifyContent: "center" }),
    boxSizing: "border-box",
    paddingInline: 16, // gutters so the pill never touches the screen edge
    ...style,
  };

  const transition = "var(--dur-slow) var(--ease-spring)";

  const navStyle = {
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "48rem",
    padding: isMobile ? 6 : "8px 10px",
    borderRadius: "var(--radius-full)",
    background: "var(--glass-fill-strong)",
    border: "1px solid var(--glass-border-strong)",
    WebkitBackdropFilter: "var(--glass-backdrop-lg)",
    backdropFilter: "var(--glass-backdrop-lg)",
    boxShadow: "var(--glass-pill-shadow)",
  };

  return (
    <header aria-label="Primary" className={className} style={wrap} {...rest}>
      <nav ref={navRef} role="navigation" style={navStyle}>
        {isMobile ? (
          /* ---------- Mobile: compact bar + dropdown ---------- */
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="nav-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                width: "100%",
                padding: "8px 8px 8px 14px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--white)",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--fs-sm)",
                fontWeight: "var(--fw-semibold)",
                borderRadius: "var(--radius-full)",
              }}
            >
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {items[active]?.label ?? "Menu"}
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  flex: "0 0 auto",
                  borderRadius: "var(--radius-full)",
                  background: "var(--glass-fill)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  {open ? (
                    <>
                      <line x1="5" y1="5" x2="15" y2="15" />
                      <line x1="15" y1="5" x2="5" y2="15" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="17" y2="6" />
                      <line x1="3" y1="10" x2="17" y2="10" />
                      <line x1="3" y1="14" x2="17" y2="14" />
                    </>
                  )}
                </svg>
              </span>
            </button>

            {open && (
              <ul
                id="nav-menu"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  listStyle: "none",
                  margin: 0,
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  borderRadius: "var(--radius-2xl)",
                  background: "var(--glass-fill-strong)",
                  border: "1px solid var(--glass-border-strong)",
                  WebkitBackdropFilter: "var(--glass-backdrop-lg)",
                  backdropFilter: "var(--glass-backdrop-lg)",
                  boxShadow: "var(--glass-pill-shadow)",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  zIndex: 41,
                }}
              >
                {items.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <li key={item.href || item.label || i}>
                      <a
                        href={item.href || "#"}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => select(i, item.href)}
                        style={{
                          display: "block",
                          padding: "12px 14px",
                          fontFamily: "var(--font-sans)",
                          fontSize: "var(--fs-base)",
                          fontWeight: "var(--fw-medium)",
                          lineHeight: 1,
                          borderRadius: "var(--radius-lg)",
                          textDecoration: "none",
                          color: isActive ? "var(--white)" : "var(--text-secondary)",
                          background: isActive ? "var(--glass-fill-strong)" : "transparent",
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          /* ---------- Desktop: horizontal row with sliding indicator ---------- */
          <ul
            ref={listRef}
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {/* sliding glass highlight */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: ind.left,
                width: ind.width,
                borderRadius: "var(--radius-full)",
                background: "var(--glass-fill-strong)",
                boxShadow: "var(--glass-specular), 0 0 24px rgba(34,211,238,0.18)",
                opacity: ind.ready ? 1 : 0,
                transition: `left ${transition}, width ${transition}, opacity var(--dur-base) var(--ease-out)`,
                zIndex: 0,
              }}
            />
            {/* moving top bar */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                height: 3,
                left: ind.left + ind.width / 2 - ind.width / 4,
                width: ind.width / 2,
                borderRadius: "var(--radius-full)",
                background: "var(--white)",
                boxShadow: "var(--glow-blue-soft)",
                opacity: ind.ready ? 1 : 0,
                transition: `left ${transition}, width ${transition}, opacity var(--dur-base) var(--ease-out)`,
                zIndex: 3,
              }}
            />
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.href || item.label || i} style={{ position: "relative", zIndex: 2 }}>
                  <a
                    ref={(n) => (itemRefs.current[i] = n)}
                    href={item.href || "#"}
                    onClick={() => select(i, item.href)}
                    style={{
                      position: "relative",
                      display: "block",
                      padding: "12px 18px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--fs-sm)",
                      fontWeight: "var(--fw-medium)",
                      lineHeight: 1,
                      borderRadius: "var(--radius-full)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      color: isActive ? "var(--white)" : "var(--text-secondary)",
                      transition: "color var(--dur-base) var(--ease-out)",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}
