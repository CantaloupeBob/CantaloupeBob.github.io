import type { ReactNode, ComponentType } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WorkMeta {
  slug: string;
  title: string;
  description: ReactNode;
  year?: string;
  externalLink?: string;
}

export interface WritingMeta {
  slug: string;
  title: string;
  description: ReactNode;
  date?: string;
}

// ─── Work registry ───────────────────────────────────────────────────────────
// Add an entry when you create a new file under src/content/work/.
// slug must match the filename exactly (without .tsx).

export const workItems: WorkMeta[] = [
  {
    slug: "makero",
    title: "Makero",
    description: "Perpetual trading with prediction market based signals.",
    externalLink: "https://makero.xyz/",
  },
  {
    slug: "allo-exposure",
    title: "Allo Exposure",
    description: (
      <>
        One shot into a basket of{" "}
        <a
          href="https://kinetiq.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kinetiq
        </a>{" "}
        ecosystem tokens.
      </>
    ),
  },
];

// ─── Writing registry ─────────────────────────────────────────────────────────
// Add an entry when you create a new file under src/content/writing/.

export const writingItems: WritingMeta[] = [
  {
    slug: "on-simplicity",
    title: "On the aesthetics of simplicity",
    description: "Why removing things is often harder than adding them.",
  },
  {
    slug: "building-small-things",
    title: "What I've learned from building small things",
    description: "Constraints as a creative force.",
  },
];

// ─── Component maps ───────────────────────────────────────────────────────────
// Eagerly bundled — all article components load with the app.
// For a portfolio this is the right tradeoff: instant navigation, no flicker.

const rawWork = import.meta.glob<{ default: ComponentType }>(
  "./work/**/*.tsx",
  { eager: true },
);
const rawWriting = import.meta.glob<{ default: ComponentType }>(
  "./writing/**/*.tsx",
  { eager: true },
);

// Works for both flat files (./work/project-two.tsx → 'project-two')
// and subdirectory files (./work/makero/makero.tsx → 'makero').
const toSlug = (path: string): string =>
  path.split("/").pop()!.replace(".tsx", "");

export const workComponents: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(rawWork).map(([path, mod]) => [toSlug(path), mod.default]),
);

export const writingComponents: Record<string, ComponentType> =
  Object.fromEntries(
    Object.entries(rawWriting).map(([path, mod]) => [
      toSlug(path),
      mod.default,
    ]),
  );
