"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

type Pill = {
  label: string;
  icon: ReactNode;
  iconBg: string;
  side: "left" | "right";
  top: string;
  offset: string;
  delay: number;
  float: number;
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
  { label: "Design systems", icon: icons.grid, iconBg: "bg-orange-500", side: "left", top: "32%", offset: "-22%", delay: 0.05, float: 4.2 },
  { label: "UI/UX", icon: icons.square, iconBg: "bg-neutral-800", side: "left", top: "58%", offset: "-14%", delay: 0.15, float: 5.1 },
  { label: "Research", icon: icons.search, iconBg: "bg-sky-500", side: "left", top: "84%", offset: "-18%", delay: 0.25, float: 4.6 },
  { label: "Animation", icon: icons.bolt, iconBg: "bg-emerald-500", side: "right", top: "30%", offset: "-20%", delay: 0.1, float: 4.8 },
  { label: "Prototyping", icon: icons.layers, iconBg: "bg-pink-500", side: "right", top: "56%", offset: "-12%", delay: 0.2, float: 5.4 },
  { label: "Strategy", icon: icons.spark, iconBg: "bg-amber-400", side: "right", top: "82%", offset: "-16%", delay: 0.3, float: 4.4 },
];

const mobilePills: Pill[] = [pills[0], pills[3], pills[1], pills[4], pills[2], pills[5]];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.02, delayChildren: 0.05 },
  },
};

const pillContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.7 },
  },
};

const pillVariants = (side: "left" | "right"): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -80,
    x: side === "left" ? -140 : 140,
    rotate: side === "left" ? -6 : 6,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1, 
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const fallbackPillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.75, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20, delay: 0.1 },
  },
};

const headlineSegments = [
  { text: "We help startups and enterprise to establish an", className: "text-neutral-900" },
  { text: "emotional connection", className: "text-neutral-500" },
  { text: "between their products and", className: "text-neutral-900" },
  { text: "happy engaged customers", className: "text-neutral-500" },
];

const headlineWords = headlineSegments.flatMap((segment) =>
  segment.text.split(" ").map((word) => ({ word, className: segment.className }))
);

function PillItem({ pill }: { pill: Pill }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white pl-2 pr-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.14)] border border-neutral-200/20">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${pill.iconBg}`}>
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
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.215, 0.610, 0.355, 1.000] },
  },
};

export default function HelloSection() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden px-6 pt-8 pb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto w-full max-w-3xl text-center"
      >
        <motion.div
          variants={fallbackPillVariants}
          className="sm:mb-20 mb-14 flex items-center justify-center gap-4 text-neutral-500 "
        >
          <span className="h-px w-10 bg-neutral-400/40" />
          <span className="font-serif text-lg italic tracking-wide">Hello!</span>
          <span className="h-px w-10 bg-neutral-400/40" />
        </motion.div>

        <motion.h1
          variants={headlineContainerVariants}
          className="text-balance text-2xl font-medium leading-snug sm:text-4xl md:text-[2.75rem] px-4"
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

        {/* Desktop pill layout wrapper linked to delayed stagger execution */}
        <motion.div variants={pillContainerVariants} className="absolute inset-0 pointer-events-none hidden sm:block">
          {pills.map((pill) => (
            <motion.div
              key={pill.label}
              variants={pillVariants(pill.side)}
              className="absolute pointer-events-auto"
              style={{ top: pill.top, [pill.side]: pill.offset } as React.CSSProperties}
            >
              <motion.div
                className="flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)] border border-neutral-200/20"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: pill.float,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pill.delay + 1.8,
                }}
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${pill.iconBg}`}>
                  {pill.icon}
                </span>
                <span className="text-sm font-medium text-neutral-800">{pill.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile premium fly-in pill grid with delayed wrapper execution */}
        <motion.div
          variants={pillContainerVariants}
          className="relative mt-12 h-[240px] sm:hidden"
        >
          <motion.div variants={pillVariants("left")} className="absolute left-0 top-0">
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
              <PillItem pill={mobilePills[0]} />
            </motion.div>
          </motion.div>

          <motion.div variants={pillVariants("right")} className="absolute right-0 top-3">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
              <PillItem pill={mobilePills[1]} />
            </motion.div>
          </motion.div>

          <motion.div variants={pillVariants("left")} className="absolute left-4 top-[84px]">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}>
              <PillItem pill={mobilePills[2]} />
            </motion.div>
          </motion.div>

          <motion.div variants={pillVariants("right")} className="absolute right-2 top-[98px]">
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}>
              <PillItem pill={mobilePills[3]} />
            </motion.div>
          </motion.div>

          <motion.div variants={pillVariants("left")} className="absolute left-0 bottom-0">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.9, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}>
              <PillItem pill={mobilePills[4]} />
            </motion.div>
          </motion.div>

          <motion.div variants={pillVariants("right")} className="absolute right-0 bottom-2">
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}>
              <PillItem pill={mobilePills[5]} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}