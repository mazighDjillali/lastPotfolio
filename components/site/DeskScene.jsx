"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  OrbitControls,
  Environment,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

// Brand palette, tracking the hero's blue -> turquoise sweep. The constant
// names are historical; only the hues moved.
const CYAN = "#60a5fa";     // blue-400, the accent
const VIOLET = "#3b82f6";   // blue-500, the deeper key light
const FUCHSIA = "#5eead4";  // turquoise, the trailing end of the title sweep
const INK = "#18181b";
const INK_DARK = "#0a0a0c";
const DESK_TOP = "#3a2d24"; // warm walnut
const DESK_TOP_DARK = "#2a2019";
const METAL = "#52525b";
const ALU = "#9ca3af"; // brushed aluminium for monitor frames

// A procedurally drawn screen texture for a monitor face.
// `variant` lets the two displays show different content for realism.
function useScreenTexture(variant) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 320;
    const ctx = c.getContext("2d");

    // dark editor bg
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, c.width, c.height);

    // aurora glow header bar
    const grad = ctx.createLinearGradient(0, 0, c.width, 0);
    grad.addColorStop(0, FUCHSIA);
    grad.addColorStop(0.5, VIOLET);
    grad.addColorStop(1, CYAN);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, 26);

    // window dots
    ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(18 + i * 22, 13, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (variant === "editor") {
      // fake code lines
      const colors = [CYAN, VIOLET, FUCHSIA, "#a1a1aa", "#93c5fd"];
      let y = 52;
      for (let i = 0; i < 11; i++) {
        const indent = (i % 4) * 22;
        const w = 80 + Math.random() * 260;
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.85;
        ctx.fillRect(28 + indent, y, w, 9);
        y += 24;
      }
      ctx.globalAlpha = 1;
    } else {
      // terminal + a little analytics chart
      ctx.font = "13px monospace";
      ctx.fillStyle = "#5eead4";
      let ty = 52;
      const lines = [
        "$ npm run build",
        "› compiled successfully",
        "› deploying to edge…",
        "✓ live in 1.2s",
      ];
      lines.forEach((l) => {
        ctx.fillText(l, 24, ty);
        ty += 22;
      });
      // bar chart
      const barColors = [CYAN, VIOLET, FUCHSIA];
      for (let i = 0; i < 8; i++) {
        const h = 30 + Math.random() * 110;
        ctx.fillStyle = barColors[i % barColors.length];
        ctx.globalAlpha = 0.8;
        ctx.fillRect(40 + i * 56, 300 - h, 34, h);
      }
      ctx.globalAlpha = 1;
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [variant]);
}

// A single thin-bezel monitor on a slim arm.
function Monitor({ variant, emissive, flip = false }) {
  const tex = useScreenTexture(variant);
  const side = flip ? -1 : 1;

  return (
    <group>
      {/* arm reaching out from the central pole */}
      <mesh castShadow position={[side * -0.42, 0.86, -0.06]}>
        <boxGeometry args={[0.84, 0.05, 0.05]} />
        <meshStandardMaterial color={INK} roughness={0.35} metalness={0.8} />
      </mesh>

      {/* thin alloy bezel (rounded) */}
      <RoundedBox
        castShadow
        args={[1.5, 0.9, 0.05]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.86, 0]}
      >
        <meshStandardMaterial color={ALU} roughness={0.3} metalness={0.9} />
      </RoundedBox>
      {/* inner black mask */}
      <mesh position={[0, 0.86, 0.027]}>
        <planeGeometry args={[1.44, 0.84]} />
        <meshStandardMaterial color={INK_DARK} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* glowing screen face */}
      <mesh position={[0, 0.86, 0.03]}>
        <planeGeometry args={[1.4, 0.8]} />
        {tex ? (
          <meshStandardMaterial
            map={tex}
            emissiveMap={tex}
            emissive={"#ffffff"}
            emissiveIntensity={0.55}
            toneMapped={false}
            roughness={0.18}
            metalness={0}
          />
        ) : (
          <meshBasicMaterial color={emissive} toneMapped={false} />
        )}
      </mesh>
      {/* subtle screen-spill light */}
      <pointLight
        position={[0, 0.86, 0.5]}
        color={emissive}
        intensity={2.2}
        distance={2.4}
        decay={2}
      />
    </group>
  );
}

// A few soft puffs that drift up from the mug and fade — a light steam wisp.
function Steam({ position = [0, 0, 0] }) {
  const group = useRef(null);
  const puffs = useMemo(
    () => [0, 1, 2].map((i) => ({ phase: i / 3, sway: Math.random() * Math.PI * 2 })),
    []
  );
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((m, i) => {
      const p = puffs[i];
      const rise = (t * 0.22 + p.phase) % 1; // 0 -> 1, then loops
      m.position.y = rise * 0.3;
      m.position.x = Math.sin(rise * 5 + p.sway) * 0.025;
      const s = 0.025 + rise * 0.05;
      m.scale.set(s, s * 1.4, s);
      // ease in near the cup, fade out toward the top
      m.material.opacity = Math.min(rise * 5, 1) * (1 - rise) * 0.28;
    });
  });
  return (
    <group ref={group} position={position}>
      {puffs.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#e8eef0" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function Desk() {
  return (
    <group>
      {/* ---------- Desk surface (rounded edges) ---------- */}
      <RoundedBox
        castShadow
        receiveShadow
        args={[3.7, 0.12, 1.62]}
        radius={0.04}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color={DESK_TOP} roughness={0.45} metalness={0.12} />
      </RoundedBox>
      {/* front fascia (slightly darker) */}
      <mesh position={[0, -0.16, 0.75]}>
        <boxGeometry args={[3.7, 0.2, 0.06]} />
        <meshStandardMaterial color={DESK_TOP_DARK} roughness={0.6} />
      </mesh>

      {/* ---------- Legs ---------- */}
      {[
        [-1.68, -0.6, 0.66],
        [1.68, -0.6, 0.66],
        [-1.68, -0.6, -0.66],
        [1.68, -0.6, -0.66],
      ].map((p, i) => (
        <mesh key={i} castShadow position={p}>
          <boxGeometry args={[0.1, 1.1, 0.1]} />
          <meshStandardMaterial color={METAL} roughness={0.35} metalness={0.8} />
        </mesh>
      ))}

      {/* ---------- Dual-monitor mount ---------- */}
      <group position={[0, 0.06, -0.3]}>
        {/* weighted base */}
        <mesh castShadow position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.26, 0.32, 0.05, 28]} />
          <meshStandardMaterial color={INK} roughness={0.45} metalness={0.7} />
        </mesh>
        {/* central pole */}
        <mesh castShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.95, 20]} />
          <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.85} />
        </mesh>

        {/* left display — toes in toward the viewer */}
        <group position={[-0.86, 0, 0.05]} rotation={[0, 0.32, 0]}>
          <Monitor variant="editor" emissive={CYAN} />
        </group>
        {/* right display — mirrored */}
        <group position={[0.86, 0, 0.05]} rotation={[0, -0.32, 0]}>
          <Monitor variant="terminal" emissive={VIOLET} flip />
        </group>
      </group>

      {/* ---------- Keyboard (centered for the dual setup) ---------- */}
      <RoundedBox
        castShadow
        args={[1.2, 0.04, 0.36]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.08, 0.5]}
      >
        <meshStandardMaterial color={INK} roughness={0.65} metalness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.105, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 0.28]} />
        <meshStandardMaterial color="#27272a" emissive={CYAN} emissiveIntensity={0.18} roughness={0.6} />
      </mesh>

      {/* ---------- Mouse ---------- */}
      <mesh castShadow position={[0.85, 0.09, 0.52]}>
        <capsuleGeometry args={[0.07, 0.06, 4, 12]} />
        <meshStandardMaterial color={INK} roughness={0.45} metalness={0.45} />
      </mesh>

      {/* ---------- Desk lamp (front-left, clear of the left screen) ---------- */}
      <group position={[-1.7, 0.06, 0.22]}>
        <mesh castShadow position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 0.05, 20]} />
          <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh castShadow position={[0, 0.32, 0]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 12]} />
          <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh castShadow position={[0.18, 0.58, 0.12]} rotation={[1.0, 0, 0.6]}>
          <coneGeometry args={[0.14, 0.22, 20, 1, true]} />
          <meshStandardMaterial color={INK} roughness={0.4} metalness={0.6} side={THREE.DoubleSide} />
        </mesh>
        {/* warm bulb glow */}
        <mesh position={[0.2, 0.5, 0.18]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={"#ffd9a0"} toneMapped={false} />
        </mesh>
        <pointLight position={[0.25, 0.45, 0.3]} color={"#ffcaa0"} intensity={6} distance={3} decay={2} />
      </group>

      {/* ---------- Coffee mug ---------- */}
      <group position={[1.25, 0.08, 0.42]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.085, 0.18, 20]} />
          <meshStandardMaterial color={"#e4e4e7"} roughness={0.4} />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.018, 10, 20]} />
          <meshStandardMaterial color={"#e4e4e7"} roughness={0.4} />
        </mesh>
        {/* coffee surface — filled up near the rim */}
        <mesh position={[0, 0.084, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.096, 24]} />
          <meshStandardMaterial
            color={"#43291b"}
            roughness={0.15}
            metalness={0.1}
            emissive={"#1a0d06"}
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* rising steam */}
        <Steam position={[0, 0.12, 0]} />
      </group>

      {/* ---------- Small plant (right back) ---------- */}
      <group position={[1.45, 0.06, -0.45]}>
        <mesh castShadow position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.16, 16]} />
          <meshStandardMaterial color={"#27272a"} roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, 0.22, 0]}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color={"#3f6f4f"} roughness={0.8} flatShading />
        </mesh>
      </group>

      {/* ---------- Chair (behind desk) ---------- */}
      <group position={[0, -0.35, 1.15]}>
        <RoundedBox castShadow args={[0.7, 0.1, 0.6]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial color={INK} roughness={0.55} metalness={0.3} />
        </RoundedBox>
        <RoundedBox castShadow args={[0.66, 1.0, 0.1]} radius={0.05} smoothness={4} position={[0, 0.55, 0.28]}>
          <meshStandardMaterial color={INK} roughness={0.55} metalness={0.3} />
        </RoundedBox>
        <mesh castShadow position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 12]} />
          <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.85} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} castShadow position={[Math.cos(a) * 0.32, -0.85, Math.sin(a) * 0.32]}>
              <boxGeometry args={[0.32, 0.06, 0.06]} />
              <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.85} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* The canvas now fills the hero, so its size follows the viewport. A fixed
   vertical FOV keeps the visible world height constant, which means a taller
   panel simply scales the desk up until it crops. Fit a fixed world box
   instead — contain, never crop — by widening the FOV as the panel changes.
   The box is the framing the old 920x640 slot produced, plus float headroom
   and a margin around it that keeps the desk comfortably off the edges. */
const FRAME_W = 6.5;
const FRAME_H = 4.7;

function FitFrame() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    // OrbitControls orbits the origin, so the distance is the position length
    const dist = camera.position.length();
    const aspect = size.width / Math.max(size.height, 1);
    const vFromHeight = 2 * Math.atan(FRAME_H / 2 / dist);
    const vFromWidth = 2 * Math.atan(FRAME_W / 2 / aspect / dist);
    camera.fov = THREE.MathUtils.clamp(
      THREE.MathUtils.radToDeg(Math.max(vFromHeight, vFromWidth)),
      20,
      80
    );
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

// Gentle continuous yaw so the desk reads as a "set piece."
function Spin({ children }) {
  const ref = useRef(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.12;
  });
  return <group ref={ref}>{children}</group>;
}

export function DeskScene({ className = "" }) {
  return (
    <div className={className}>
      <Canvas
        // "percentage" -> PCFShadowMap. The default (`shadows`) maps to
        // PCFSoftShadowMap, which three r185 deprecates and silently downgrades.
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ position: [0, 1.6, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <FitFrame />

        {/* Cinematic aurora lighting */}
        <ambientLight intensity={0.22} />
        <directionalLight
          position={[3, 6, 4]}
          intensity={1.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-4, 2, 2]} color={CYAN} intensity={26} distance={14} decay={2} />
        <pointLight position={[4, 2, -1]} color={FUCHSIA} intensity={20} distance={14} decay={2} />
        <pointLight position={[0, 4, 5]} color={VIOLET} intensity={12} distance={16} decay={2} />

        <Suspense fallback={null}>
          {/* PBR reflections on metal / screens for a more realistic surface read.
              Built in-scene from Lightformers rather than an HDRI `preset`, which
              would fetch from a CDN (blocked by CORS) and break the whole Suspense
              boundary when offline. */}
          <Environment resolution={256} environmentIntensity={0.6} frames={1}>
            {/* Broad key wash from above */}
            <Lightformer
              form="rect"
              intensity={2.2}
              color="#ffffff"
              position={[0, 5, -2]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[10, 10, 1]}
            />
            {/* Aurora rim lights, mirroring the point lights outside */}
            <Lightformer
              form="rect"
              intensity={3}
              color={CYAN}
              position={[-5, 1, 2]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[8, 4, 1]}
            />
            <Lightformer
              form="rect"
              intensity={2.4}
              color={FUCHSIA}
              position={[5, 1, -1]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[8, 4, 1]}
            />
            <Lightformer
              form="circle"
              intensity={1.6}
              color={VIOLET}
              position={[0, 2, 6]}
              rotation={[0, 0, 0]}
              scale={[6, 6, 1]}
            />
            {/* Dark floor so metals don't read washed out */}
            <Lightformer
              form="rect"
              intensity={0.4}
              color={INK_DARK}
              position={[0, -4, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[10, 10, 1]}
            />
          </Environment>

          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.08, 0.12]}>
            <Spin>
              <Desk />
            </Spin>
          </Float>
        </Suspense>

        <ContactShadows
          position={[0, -1.25, 0]}
          opacity={0.5}
          scale={9}
          blur={2.6}
          far={4}
          color="#000000"
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </div>
  );
}

export default DeskScene;
