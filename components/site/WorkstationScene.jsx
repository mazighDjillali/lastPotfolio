"use client";

import React from "react";

/**
 * WorkstationScene — the hero set-piece, staged as a studio: three large
 * displays up top, and below them a desk with an all-in-one, a seated figure
 * working on a laptop, and a camera rig.
 *
 * The tech logos ride a dome-shaped arc floating above the displays, each
 * drifting on its own offset so the row breathes rather than marching. They
 * live inside the one SVG so the whole rig scales as a single unit. Subtle
 * mouse parallax tilts it.
 */

/* Logo artwork, drawn on a 0 0 24 24 canvas and dropped into the racks as
   nested <svg> elements so each one scales with the scene. */
const ICONS = {
  python: (
    <>
      <path
        d="M11.9 2c-3.2 0-5 1.2-5 3v2.6h5.4v1H4.6C2.6 8.6 2 10.4 2 12s.6 3.4 2.6 3.4H7v-2.2c0-1.9 1.7-3.4 3.6-3.4h4c1.6 0 2.9-1.3 2.9-2.9V5c0-1.8-2.3-3-5.6-3z"
        fill="#4b8bbe"
      />
      <path
        d="M12.1 22c3.2 0 5-1.2 5-3v-2.6h-5.4v-1h7.7c2 0 2.6-1.8 2.6-3.4s-.6-3.4-2.6-3.4H17v2.2c0 1.9-1.7 3.4-3.6 3.4h-4c-1.6 0-2.9 1.3-2.9 2.9V19c0 1.8 2.3 3 5.6 3z"
        fill="#ffd43b"
      />
      <circle cx="9.4" cy="4.8" r="0.9" fill="#fff" />
      <circle cx="14.6" cy="19.2" r="0.9" fill="#0a0d12" />
    </>
  ),
  opencv: (
    <g fill="none" strokeWidth="2.6">
      <circle cx="12" cy="6.6" r="4" stroke="#f25c5c" />
      <circle cx="6.8" cy="16.4" r="4" stroke="#6bd06b" />
      <circle cx="17.2" cy="16.4" r="4" stroke="#5c8df2" />
    </g>
  ),
  tensorflow: (
    <>
      <path d="M12 1.5 2.8 6.8v4.6l5.7-2.3v2.9l-3.4 1.4v4.2l3.4-1.4v3.4l3.5 2.9V1.5z" fill="#ff8f00" />
      <path d="M12 1.5l9.2 5.3v4.6l-5.7-2.3v3l3.4 1.3v4.3l-3.4-1.4v4.2L12 22.5V1.5z" fill="#ffa726" />
    </>
  ),
  react: (
    <g fill="none" stroke="#61dafb" strokeWidth="1.2">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#61dafb" stroke="none" />
    </g>
  ),
  nextjs: (
    <>
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <text x="12" y="16.2" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="11" fill="#0a0d12">
        N
      </text>
    </>
  ),
  docker: (
    <g fill="#2496ed">
      <rect x="3" y="12.5" width="16" height="4.5" rx="2.2" />
      <rect x="5.5" y="9" width="3" height="3" rx="0.5" />
      <rect x="9.5" y="9" width="3" height="3" rx="0.5" />
      <rect x="13.5" y="9" width="3" height="3" rx="0.5" />
      <rect x="9.5" y="5" width="3" height="3" rx="0.5" />
      <path d="M19 13.5q3-.5 3-2.5-1.5.6-2.6 0-.3 1.5-.4 2.5z" />
    </g>
  ),
};

/* The floating arc. Six logos on a dome above the displays: x walks evenly
   across the span, y rides a half-sine so the middle pair sits highest. The
   bottom of every badge clears the centre display (its top edge is y=98). */
const ARC_KEYS = ["python", "opencv", "tensorflow", "react", "nextjs", "docker"];
const ARC_R = 26;

const ARC = ARC_KEYS.map((key, i) => {
  const t = i / (ARC_KEYS.length - 1);
  return {
    key,
    cx: 150 + t * 620,
    cy: 110 - 52 * Math.sin(Math.PI * t),
    /* stagger the drift so no two badges rise together */
    delay: `${(i * 0.45).toFixed(2)}s`,
  };
});

function FloatingLogo({ cx, cy, logo, delay }) {
  return (
    <g className="ws-float" style={{ animationDelay: delay, transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={ARC_R} fill="#0e1218" stroke="rgba(255,255,255,0.12)" />
      <circle cx={cx} cy={cy} r={ARC_R} fill="url(#ws-sheen)" />
      <svg x={cx - 12} y={cy - 12} width="24" height="24" viewBox="0 0 24 24">
        {logo}
      </svg>
    </g>
  );
}

/* the "Ar / Ux / Dj"-style corner chip and the stacked bars under it —
   the motif that makes each display read as a running app */
/* coords are arithmetic here, so coerce — a string prop would silently
   concatenate and fling the child off-canvas */
function ScreenChip({ x, y, size = 38, label, tint }) {
  x = Number(x);
  y = Number(y);
  size = Number(size);
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx="8" fill="rgba(8,11,15,0.7)" stroke={tint} strokeWidth="1.5" />
      <text
        x={x + size / 2}
        y={y + size / 2 + 6}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="700"
        fontSize="16"
        fill={tint}
      >
        {label}
      </text>
    </g>
  );
}

function StackBars({ x, y, w }) {
  x = Number(x);
  y = Number(y);
  w = Number(w);
  return (
    <g fill="rgba(255,255,255,0.85)">
      <rect x={x} y={y} width={w} height="8" rx="4" />
      <rect x={x} y={y + 12} width={w} height="8" rx="4" />
      <rect x={x} y={y + 24} width={w} height="8" rx="4" />
    </g>
  );
}

export function WorkstationScene() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const reduced = React.useRef(false);

  React.useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const onMove = (e) => {
    if (reduced.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px * 5, y: py * -4 });
  };

  return (
    <div
      className="workstation"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        position: "relative",
        transform: `perspective(1400px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 400ms var(--ease-out)",
      }}
    >
      <svg
        viewBox="0 0 920 640"
        role="img"
        aria-label="Illustration: a studio — an arc of Python, OpenCV, TensorFlow, React, Next.js and Docker logos floating above three displays showing code, a terminal and a computer-vision feed, over a desk where a figure works on a laptop next to a camera rig"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <radialGradient id="ws-glow-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(96,165,250,0.20)" />
            <stop offset="55%" stopColor="rgba(96,165,250,0.06)" />
            <stop offset="100%" stopColor="rgba(96,165,250,0)" />
          </radialGradient>
          <radialGradient id="ws-glow-emerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(52,211,153,0.14)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0)" />
          </radialGradient>
          <pattern id="ws-scan" width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="3" height="1" fill="rgba(255,255,255,0.05)" />
          </pattern>
          <linearGradient id="ws-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1117" />
            <stop offset="100%" stopColor="#090c10" />
          </linearGradient>
          {/* brushed-metal display housing */}
          <linearGradient id="ws-bezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4048" />
            <stop offset="45%" stopColor="#2b313a" />
            <stop offset="100%" stopColor="#1d222a" />
          </linearGradient>
          {/* raking glass reflection across a panel */}
          <linearGradient id="ws-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.012)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* the all-in-one's bright desktop */}
          <linearGradient id="ws-desktop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="100%" stopColor="#dfe6ef" />
          </linearGradient>
          <linearGradient id="ws-hello" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <radialGradient id="ws-orb" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#15181d" />
          </radialGradient>
        </defs>

        {/* ambient wash thrown by the displays */}
        <ellipse cx="460" cy="240" rx="380" ry="210" fill="url(#ws-glow-blue)" />
        <ellipse cx="726" cy="262" rx="180" ry="130" fill="url(#ws-glow-emerald)" />

        {/* ---- floating arc of tech logos ---- */}
        {ARC.map((a) => (
          <FloatingLogo key={a.key} cx={a.cx} cy={a.cy} logo={ICONS[a.key]} delay={a.delay} />
        ))}

        {/* ---- left display: code editor ---- */}
        <g>
          <rect x="108" y="178" width="234" height="168" rx="13" fill="url(#ws-bezel)" stroke="rgba(255,255,255,0.09)" />
          <rect x="121" y="190" width="208" height="144" rx="6" fill="url(#ws-screen)" stroke="rgba(0,0,0,0.55)" />
          <g strokeWidth="4" strokeLinecap="round">
            <line x1="133" y1="208" x2="196" y2="208" stroke="#60a5fa" strokeOpacity="0.85" />
            <line x1="204" y1="208" x2="244" y2="208" stroke="rgba(255,255,255,0.28)" />
            <line x1="145" y1="224" x2="214" y2="224" stroke="rgba(255,255,255,0.22)" />
            <line x1="222" y1="224" x2="262" y2="224" stroke="#34d399" strokeOpacity="0.75" />
            <line x1="145" y1="240" x2="186" y2="240" stroke="#34d399" strokeOpacity="0.6" />
            <line x1="194" y1="240" x2="256" y2="240" stroke="rgba(255,255,255,0.18)" />
            <line x1="145" y1="256" x2="238" y2="256" stroke="rgba(255,255,255,0.25)" />
            <line x1="133" y1="272" x2="178" y2="272" stroke="#60a5fa" strokeOpacity="0.7" />
            <line x1="186" y1="272" x2="248" y2="272" stroke="rgba(255,255,255,0.2)" />
            <line x1="145" y1="288" x2="206" y2="288" stroke="rgba(255,255,255,0.15)" />
            <line x1="145" y1="304" x2="190" y2="304" stroke="#34d399" strokeOpacity="0.5" />
            <line x1="133" y1="320" x2="172" y2="320" stroke="rgba(255,255,255,0.22)" />
          </g>
          <ScreenChip x={281} y={200} label="Py" tint="#60a5fa" />
          <StackBars x={277} y={288} w={44} />
          <rect x="121" y="190" width="208" height="144" rx="6" fill="url(#ws-scan)" opacity="0.5" />
          <rect x="121" y="190" width="208" height="144" rx="6" fill="url(#ws-sheen)" />
        </g>

        {/* ---- centre display: terminal ---- */}
        <g>
          <rect x="352" y="98" width="272" height="204" rx="14" fill="url(#ws-bezel)" stroke="rgba(255,255,255,0.11)" />
          <rect x="366" y="111" width="244" height="178" rx="7" fill="url(#ws-screen)" stroke="rgba(0,0,0,0.55)" />
          <rect x="366" y="111" width="244" height="26" rx="7" fill="rgba(255,255,255,0.06)" />
          <rect x="366" y="128" width="244" height="9" fill="rgba(255,255,255,0.06)" />
          <circle cx="382" cy="124" r="4" fill="#f87171" />
          <circle cx="395" cy="124" r="4" fill="#60a5fa" />
          <circle cx="408" cy="124" r="4" fill="#34d399" />
          <text x="420" y="128" fontFamily="var(--font-mono)" fontSize="10" fill="rgba(255,255,255,0.4)">
            dmazigh@console:~
          </text>
          <g fontFamily="var(--font-mono)" fontSize="11">
            <text x="382" y="160" fill="#34d399">&gt; <tspan fill="rgba(255,255,255,0.8)">whoami</tspan></text>
            <text x="382" y="178" fill="rgba(255,255,255,0.45)">ai-engineer · vision · full-stack</text>
            <text x="382" y="196" fill="#34d399">&gt; <tspan fill="rgba(255,255,255,0.8)">status --build</tspan></text>
            <text x="382" y="214" fill="rgba(255,255,255,0.45)">✓ all systems nominal</text>
            <text x="382" y="232" fill="#34d399">&gt; <tspan fill="rgba(255,255,255,0.8)">uptime --career</tspan></text>
            <text x="382" y="250" fill="rgba(255,255,255,0.45)">shipping since 2021 · Algiers</text>
          </g>
          <rect className="ws-cursor" x="382" y="258" width="7" height="3" fill="#34d399" />
          <rect x="366" y="111" width="244" height="178" rx="7" fill="url(#ws-scan)" opacity="0.45" />
          <rect x="366" y="111" width="244" height="178" rx="7" fill="url(#ws-sheen)" />
        </g>

        {/* ---- right display: vision feed ---- */}
        <g>
          <rect x="634" y="178" width="226" height="168" rx="13" fill="url(#ws-bezel)" stroke="rgba(255,255,255,0.09)" />
          <rect x="647" y="190" width="200" height="144" rx="6" fill="url(#ws-screen)" stroke="rgba(0,0,0,0.55)" />
          <circle cx="722" cy="248" r="26" fill="#141a21" stroke="rgba(255,255,255,0.1)" />
          <path d="M690 296 q32 -22 64 0 v10 h-64 z" fill="#141a21" stroke="rgba(255,255,255,0.08)" />
          <g stroke="#34d399" strokeWidth="2" fill="none" strokeOpacity="0.9">
            <path d="M678 214 h-12 v12 M766 214 h12 v12 M678 292 h-12 v-12 M766 292 h12 v-12" />
          </g>
          <g fill="#34d399">
            <circle cx="712" cy="243" r="2" />
            <circle cx="732" cy="243" r="2" />
            <circle cx="722" cy="255" r="2" />
            <circle cx="722" cy="264" r="2" />
          </g>
          <circle cx="661" cy="204" r="4" fill="#f87171">
            <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="671" y="208" fontFamily="var(--font-mono)" fontSize="10" fill="rgba(255,255,255,0.55)">REC</text>
          <text x="659" y="322" fontFamily="var(--font-mono)" fontSize="10" fill="#34d399">liveness ✓</text>
          <ScreenChip x={799} y={200} label="Cv" tint="#34d399" />
          <StackBars x={795} y={288} w={44} />
          <rect x="647" y="190" width="200" height="144" rx="6" fill="url(#ws-scan)" opacity="0.5" />
          <rect x="647" y="190" width="200" height="144" rx="6" fill="url(#ws-sheen)" />
        </g>

        {/* ---- desk ---- */}
        <rect x="288" y="462" width="364" height="13" rx="3" fill="#242932" stroke="rgba(255,255,255,0.08)" />
        <rect x="294" y="475" width="352" height="5" fill="#14171c" />
        <rect x="300" y="480" width="10" height="104" rx="3" fill="#1a1e24" />
        <rect x="630" y="480" width="10" height="104" rx="3" fill="#1a1e24" />

        {/* all-in-one on the desk */}
        <g>
          <rect x="390" y="336" width="178" height="104" rx="9" fill="#dfe4ea" />
          <rect x="397" y="343" width="164" height="82" rx="4" fill="url(#ws-desktop)" />
          <text
            x="479"
            y="398"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontStyle="italic"
            fontWeight="600"
            fontSize="40"
            fill="url(#ws-hello)"
          >
            hello
          </text>
          <rect x="471" y="440" width="16" height="16" fill="#c6ccd4" />
          <ellipse cx="479" cy="458" rx="32" ry="5" fill="#c6ccd4" />
        </g>

        {/* keyboard */}
        <rect x="402" y="464" width="146" height="7" rx="2.5" fill="#e4e8ed" />

        {/* pen cup */}
        <g>
          <path d="M576 428 v14 M581 424 v18 M586 430 v12" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M581 424 v18" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="571" y="440" width="20" height="23" rx="3" fill="#1e232a" stroke="rgba(255,255,255,0.1)" />
        </g>

        {/* ---- seated figure ---- */}
        <g>
          {/* stool */}
          <rect x="292" y="500" width="68" height="9" rx="4" fill="#1a1e24" />
          <rect x="300" y="509" width="7" height="76" rx="3" fill="#15181d" />
          <rect x="346" y="509" width="7" height="76" rx="3" fill="#15181d" />

          {/* legs — far one first so the near one overlaps it */}
          <path d="M314 484 q34 4 42 20 q8 16 6 42" fill="none" stroke="#141619" strokeWidth="24" strokeLinecap="round" />
          <path d="M318 488 q34 4 44 22 q8 16 6 42" fill="none" stroke="#1c2026" strokeWidth="26" strokeLinecap="round" />
          <path d="M350 562 h20 q16 0 18 10 v6 h-38 z" fill="#f0f1f3" />

          {/* neck, then sweater over it */}
          <rect x="328" y="398" width="16" height="16" fill="#c08f68" />
          <path d="M306 412 q22 -14 46 -4 q14 6 15 24 l4 58 q-32 14 -66 2 l-3 -54 q0 -20 4 -26 z" fill="#1f4a35" />

          {/* laptop on the lap */}
          <path d="M330 452 l40 -6 l10 30 l-42 6 z" fill="#4b515a" />
          <path d="M335 457 l31 -5 l8 22 l-33 5 z" fill="#5a616b" />
          <path d="M324 480 l52 -8 l18 8 l-54 10 z" fill="#666d77" />

          {/* arm reaching down to the keys */}
          <path d="M356 428 q24 14 24 38 q0 12 -10 18" fill="none" stroke="#245640" strokeWidth="19" strokeLinecap="round" />
          <circle cx="369" cy="486" r="7" fill="#d8a67e" />

          {/* head */}
          <circle cx="336" cy="386" r="21" fill="#d8a67e" />
          <path d="M315 386 q0 -23 21 -23 q21 0 21 23 q-2 -9 -8 -12 q-16 5 -30 -1 q-4 4 -4 13 z" fill="#16181b" />
          <path d="M313 384 q0 -27 23 -27 q23 0 23 27" fill="none" stroke="#0f1114" strokeWidth="5.5" strokeLinecap="round" />
          <rect x="309" y="378" width="11" height="19" rx="5.5" fill="#0f1114" />
          <rect x="352" y="378" width="11" height="19" rx="5.5" fill="#0f1114" />
        </g>

        {/* ---- camera rig on a side table ---- */}
        <g>
          <rect x="672" y="488" width="104" height="9" rx="3" fill="#242932" stroke="rgba(255,255,255,0.08)" />
          <rect x="680" y="497" width="8" height="88" rx="3" fill="#1a1e24" />
          <rect x="760" y="497" width="8" height="88" rx="3" fill="#1a1e24" />
          <rect x="712" y="456" width="14" height="7" rx="2" fill="#15191f" />
          <rect x="704" y="462" width="42" height="26" rx="6" fill="#1a1e24" stroke="rgba(255,255,255,0.1)" />
          <circle cx="725" cy="475" r="9" fill="#0c1014" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="725" cy="475" r="4" fill="#132018" />
          <circle cx="740" cy="468" r="2" fill="#f87171" />
        </g>

        {/* ---- floor plant, balancing the camera rig on the right ---- */}
        <g>
          <path d="M226 526 q-24 -30 -14 -62" fill="none" stroke="#26644c" strokeWidth="4" strokeLinecap="round" />
          <path d="M228 526 q6 -36 30 -50" fill="none" stroke="#2c7a5b" strokeWidth="4" strokeLinecap="round" />
          <path d="M224 526 q-30 -10 -40 -36" fill="none" stroke="#225944" strokeWidth="4" strokeLinecap="round" />
          <path d="M212 464 q-22 -4 -26 -26 q24 0 26 26 z" fill="#2c7a5b" />
          <path d="M226 470 q-8 -26 8 -44 q14 22 -8 44 z" fill="#2f8562" />
          <path d="M258 476 q16 -16 8 -36 q-20 12 -8 36 z" fill="#34926d" />
          <path d="M184 490 q-20 -10 -18 -30 q20 8 18 30 z" fill="#26644c" />
          <rect x="194" y="524" width="64" height="11" rx="4" fill="#2a3038" />
          <path d="M199 535 h54 l-8 52 h-38 z" fill="#1e232a" stroke="rgba(255,255,255,0.08)" />
        </g>

        {/* orb on the floor */}
        <circle cx="662" cy="596" r="18" fill="url(#ws-orb)" />

        {/* floor shadow */}
        <ellipse cx="460" cy="616" rx="330" ry="9" fill="rgba(255,255,255,0.028)" />
      </svg>
    </div>
  );
}
