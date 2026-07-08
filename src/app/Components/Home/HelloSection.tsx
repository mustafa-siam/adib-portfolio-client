"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

/**
 * HelloHero
 * A recreation of the floating-pill "Hello" section from hanzo.framer.website
 * Stack: Next.js (App Router, client component) + Tailwind CSS + Framer Motion
 *
 * Usage:
 * import HelloHero from "@/components/HelloHero";
 * export default function Page() { return <HelloHero />; }
 */

type Pill = {
  label: string;
  icon: ReactNode;
  iconBg: string; // tailwind bg class for the icon chip
  side: "left" | "right";
  // absolute position, tuned to mirror the reference layout (desktop only).
  top: string;
  offset: string;
  delay: number; // stagger delay
  float: number; // seconds for the idle float loop (adds organic variety)
};

const icons = {
  grid: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
    </svg>
  ),
  square: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  bolt: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" />
    </svg>
  ),
  layers: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 8l10 5 10-5-10-5z" fill="currentColor" />
      <path d="M2 16l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const pills: Pill[] = [
  { label: "Design systems", icon: icons.grid, iconBg: "bg-orange-500", side: "left", top: "20%", offset: "-14%", delay: 0.1, float: 4.2 },
  { label: "UI/UX", icon: icons.square, iconBg: "bg-neutral-800", side: "left", top: "48%", offset: "-4%", delay: 0.25, float: 5.1 },
  { label: "Research", icon: icons.search, iconBg: "bg-sky-500", side: "left", top: "76%", offset: "-10%", delay: 0.4, float: 4.6 },
  { label: "Animation", icon: icons.bolt, iconBg: "bg-emerald-500", side: "right", top: "18%", offset: "-12%", delay: 0.18, float: 4.8 },
  { label: "Prototyping", icon: icons.layers, iconBg: "bg-pink-500", side: "right", top: "46%", offset: "-2%", delay: 0.32, float: 5.4 },
  { label: "Strategy", icon: icons.spark, iconBg: "bg-amber-400", side: "right", top: "74%", offset: "-8%", delay: 0.46, float: 4.4 },
];

// Order for the mobile 2-column grid: left/right pairs row by row
const mobilePills: Pill[] = [pills[0], pills[3], pills[1], pills[4], pills[2], pills[5]];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.75, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

// Word-by-word headline animation -------------------------------------

const headlineSegments: { text: string; className: string }[] = [
  { text: "We help startups and enterprise to establish an", className: "text-neutral-900" },
  { text: "emotional connection", className: "text-neutral-400" },
  { text: "between their products and", className: "text-neutral-900" },
  { text: "happy engaged customers", className: "text-neutral-400" },
];

const headlineWords = headlineSegments.flatMap((segment) =>
  segment.text.split(" ").map((word) => ({ word, className: segment.className }))
);

// Reusable Pill Component for Mobile
function PillItem({ pill }: { pill: Pill }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white pl-2 pr-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${pill.iconBg}`}
      >
        {pill.icon}
      </span>
      <span className="text-[14px] font-medium text-neutral-700 whitespace-nowrap">
        {pill.label}
      </span>
    </div>
  );
}

const headlineContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HelloSection() {
  return (
    <section
      className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-[#efefef] px-6 py-10 sm:min-h-[640px] sm:py-24"
      style={{ backgroundColor: "#efefef" }}
    >
      {/* soft diagonal light sweep, mirrors the reference background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(255,255,255,0.9), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-3xl text-center"
      >
        {/* Eyebrow: "Hello!" flanked by hairlines */}
        <motion.div
          variants={pillVariants}
          className="mb-4 flex items-center justify-center gap-4 text-neutral-500 sm:mb-6"
        >
          <span className="h-px w-10 bg-neutral-400/70" />
          <span className="font-serif text-lg italic tracking-wide">Hello!</span>
          <span className="h-px w-10 bg-neutral-400/70" />
        </motion.div>

        {/* Headline with mixed emphasis, words animate in one by one on scroll */}
        <motion.h1
          variants={headlineContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="text-balance text-2xl font-medium leading-snug sm:text-4xl md:text-[2.75rem]"
        >
          {headlineWords.map((item, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block ${item.className}`}
              style={{ marginRight: "0.28em" }}
            >
              {item.word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Desktop / tablet: floating capability pills positioned absolutely */}
        {pills.map((pill) => (
          <motion.div
            key={pill.label}
            variants={pillVariants}
            className="absolute hidden sm:block"
            style={{ top: pill.top, [pill.side]: pill.offset } as React.CSSProperties}
          >
            <motion.div
              className="flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.15)]"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: pill.float,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pill.delay,
              }}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${pill.iconBg}`}
              >
                {pill.icon}
              </span>
              <span className="text-sm font-medium text-neutral-800">{pill.label}</span>
            </motion.div>
          </motion.div>
        ))}

        {/* Mobile only: dynamically floated, absolute staggered layout matching Hanzo style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-10 h-[220px] sm:hidden"
        >
          {/* Left Top - Design Systems */}
          <motion.div variants={pillVariants} className="absolute left-0 top-0">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <PillItem pill={mobilePills[0]} />
            </motion.div>
          </motion.div>

          {/* Right Top - Animation */}
          <motion.div variants={pillVariants} className="absolute right-0 top-3">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <PillItem pill={mobilePills[1]} />
            </motion.div>
          </motion.div>

          {/* Left Middle - UI/UX (Positioned further right ahead of left top/bottom) */}
          <motion.div variants={pillVariants} className="absolute left-12 top-[76px]">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <PillItem pill={mobilePills[2]} />
            </motion.div>
          </motion.div>

          {/* Right Middle - Prototyping */}
          <motion.div variants={pillVariants} className="absolute right-6 top-[92px]">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <PillItem pill={mobilePills[3]} />
            </motion.div>
          </motion.div>

          {/* Left Bottom - Research */}
          <motion.div variants={pillVariants} className="absolute left-2 bottom-0">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
            >
              <PillItem pill={mobilePills[4]} />
            </motion.div>
          </motion.div>

          {/* Right Bottom - Strategy */}
          <motion.div variants={pillVariants} className="absolute right-1 bottom-2">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <PillItem pill={mobilePills[5]} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}