import type { ReactNode, ComponentType } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StuffMeta {
  slug: string;
  title: string;
  description: ReactNode;
  year?: string;
  externalLink?: string;
}

export interface WorkMeta {
  slug: string;
  title: string;
  description: ReactNode;
}

// Add an entry when you create a new file under src/content/work/.
// slug must match the filename exactly (without .tsx).

export const stuffItems: StuffMeta[] = [
  {
    slug: "makero",
    title: "Makero",
    description: "Perpetual trading with prediction market based signals",
    externalLink: "https://makero.xyz/",
  },
  {
    slug: "allo-exposure",
    title: "Allo Exposure",
    externalLink: "http://alloexposure.xyz/",
    description: <>One shot into a basket of Kinetiq ecosystem tokens</>,
  },
];

export const workItems: WorkMeta[] = [
  {
    slug: "protocol-a",
    title: "Protocol A",
    description: "Onchain intent based prime brokerage",
  },
  {
    slug: "protocol-b",
    title: "Protocol B",
    description: "Fixed term non-liquidatable lending",
  },
];

// ─── Component maps ───────────────────────────────────────────────────────────
// Eagerly bundled — all article components load with the app.
// For a portfolio this is the right tradeoff: instant navigation, no flicker.

const rawStuff = import.meta.glob<{ default: ComponentType }>(
  "./stuff/**/*.tsx",
  { eager: true },
);

const rawWork = import.meta.glob<{ default: ComponentType }>(
  "./work/**/*.tsx",
  { eager: true },
);

// Works for both flat files (./stuff/project-two.tsx → 'project-two')
// and subdirectory files (./stuff/makero/makero.tsx → 'makero').
const toSlug = (path: string): string =>
  path.split("/").pop()!.replace(".tsx", "");

export const stuffComponents: Record<string, ComponentType> =
  Object.fromEntries(
    Object.entries(rawStuff).map(([path, mod]) => [toSlug(path), mod.default]),
  );

export const workComponents: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(rawWork).map(([path, mod]) => [toSlug(path), mod.default]),
);
