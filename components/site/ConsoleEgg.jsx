"use client";

import React from "react";

/**
 * ConsoleEgg — a quiet console.log left for anyone who opens devtools.
 * Renders nothing.
 */
export function ConsoleEgg() {
  React.useEffect(() => {
    /* eslint-disable no-console */
    console.log(
      "%c> status --build\n%c✓ all systems nominal\n%c> credits\n%cBuilt by DJILLALI Mazigh · May the Code Be With You",
      "color:#34d399;font-family:monospace",
      "color:#9aa1ab;font-family:monospace",
      "color:#34d399;font-family:monospace",
      "color:#60a5fa;font-family:monospace"
    );
    /* eslint-enable no-console */
  }, []);
  return null;
}
