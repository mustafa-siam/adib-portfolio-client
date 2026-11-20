
"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  Variants,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

const EMAIL = "ishraqaladib@gmail.com";

/**
 * TUNING KNOB: portrait size + position inside the card.
 * - w-[..%]      -> bigger number = bigger person
 * - bottom-[-..%] -> more negative = person sits lower (more of the chest is cropped)
 * (mobile -> sm -> lg)
 */
const PORTRAIT_POSITION =
  "bottom-[26%] w-[125%] md:bottom-[-12%] md:w-[112%] lg:bottom-[-13%] lg:w-[92%]";

const FONT_STACK =
  'var(--font-inter), Inter, "Helvetica Neue", Helvetica, Arial, sans-serif';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const lineUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const HEADLINE = [
  "Bringing products",
  "to life through motion",
  "and visual storytelling.",
];

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse parallax (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  const portraitX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const portraitY = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const textX = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const textY = useTransform(sy, [-0.5, 0.5], [5, -5]);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scrollPortraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const scrollTextY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scrollTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0.2]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const b = cardRef.current?.getBoundingClientRect();
    if (!b) return;

    mx.set((e.clientX - b.left) / b.width - 0.5);
    my.set((e.clientY - b.top) / b.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      className="w-full px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: FONT_STACK }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto h-[720px] w-full max-w-7xl select-none overflow-hidden rounded-[28px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:h-[620px] lg:h-[680px]"
      >
        {/* Portrait */}
        <div
          className={`pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 ${PORTRAIT_POSITION}`}
        >
          <motion.div style={{ y: scrollPortraitY }}>
            <motion.div
              initial={{
                opacity: 0,
                y: 70,
                scale: 1.06,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
              style={{ x: portraitX, y: portraitY }}
            >
              <Image
                src="/banner_img.png"
                alt="Ishraq Al Adib"
                width={0}
                height={0}
                sizes="(max-width: 768px) 125vw, 70vw"
                priority
                draggable={false}
                style={{ width: "100%", height: "auto" }}
                className="max-w-none"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile only: white fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[62%] bg-gradient-to-t from-white via-white/95 to-transparent md:hidden" />

        {/* Left: role + headline */}
        <motion.div
          style={{ y: scrollTextY, opacity: scrollTextOpacity }}
          className="absolute bottom-[200px] left-6 right-6 z-10 md:right-auto md:bottom-10 md:left-10 md:max-w-[60%] lg:bottom-14 lg:left-14"
        >
          <motion.div style={{ x: textX, y: textY }}>
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div
                variants={fadeUp}
                className="mb-3 flex items-center gap-2 text-xs text-neutral-600 md:mb-4 md:text-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span>Motion Designer</span>
              </motion.div>

              <h1 className="text-[1.6rem] font-bold leading-[1.08] tracking-[-0.045em] text-neutral-900 min-[400px]:text-[1.85rem] md:text-[2.1rem] lg:text-[2.75rem] xl:text-[3.5rem]">
                {HEADLINE.map((line) => (
                  <span
                    key={line}
                    className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
                  >
                    <motion.span variants={lineUp} className="block">
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: intro + CTA */}
        <motion.div
          style={{ y: scrollTextY, opacity: scrollTextOpacity }}
          className="absolute bottom-6 left-6 right-6 z-10 md:bottom-10 md:left-auto md:right-10 md:max-w-[260px] lg:bottom-14 lg:right-20 lg:max-w-[300px]"
        >
          <motion.div style={{ x: textX, y: textY }}>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs leading-relaxed text-neutral-800 md:text-sm"
              >
                I&apos;m Ishraq, a motion designer helping SaaS products and
                WordPress plugins turn complex ideas into clear, compelling
                stories. A human touch for a digital world.
              </motion.p>

              <motion.a
                variants={fadeUp}
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ishraqaladib@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative mt-5 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative z-10">Email me</span>

                <span className="relative z-10 flex h-4 w-4 items-center overflow-hidden">
                  <ArrowUpRight
                    className="absolute h-4 w-4 transition-transform duration-300 group-hover:-translate-y-full group-hover:translate-x-full"
                    strokeWidth={1.75}
                  />
                  <ArrowUpRight
                    className="absolute h-4 w-4 -translate-x-full translate-y-full transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                    strokeWidth={1.75}
                  />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
