"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, Variants } from "motion/react";
import PortfolioCard from "../../common/PortfolioCard";
import type { CaseStudy } from "../../data/case-studies";
import { useGetProjectsQuery } from "@/redux/features/projects/api/projectApi";

const CURSOR_EASE = 0.14;
const SKELETON_COUNT = 4;

/**
 * Adapter: backend Project -> the CaseStudy shape PortfolioCard expects.
 * Adjust the field names if your Project type differs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCaseStudy = (p: any): CaseStudy => ({
  ...p,
  id: p._id ?? p.id,
  slug: p.slug,
  title: p.title,
  category: p.category ?? "",
  tags: p.tags ?? [],
  poster: p.poster ?? p.thumbnail ?? p.image ?? "",
  summary: p.summary ?? p.description ?? "",
  overview: p.overview ?? { heading: "", description: "", stats: [] },
  process: p.process ?? { heading: "", description: "", steps: [], image: "" },
});

function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[16/10] w-full rounded-3xl bg-neutral-200" />
      <div className="mt-4 h-5 w-2/3 rounded bg-neutral-200" />
      <div className="mt-2 h-4 w-1/3 rounded bg-neutral-200" />
    </div>
  );
}

export default function AllWorks() {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);

  const target = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Dynamic data
  const { data, isLoading, isError, refetch } = useGetProjectsQuery();

  const projects: CaseStudy[] = useMemo(
    () => (data ?? []).map(toCaseStudy),
    [data]
  );

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const pillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.75, y: 14 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 20, duration: 0.6, delay: 0.2 },
    },
  };

  useEffect(() => {
    const tick = () => {
      rendered.current.x += (target.current.x - rendered.current.x) * CURSOR_EASE;
      rendered.current.y += (target.current.y - rendered.current.y) * CURSOR_EASE;

      const bubble = bubbleRef.current;
      if (bubble) {
        bubble.style.transform = `translate(${rendered.current.x + 6}px, ${
          rendered.current.y - 20}px) translateY(-50%) scale(${cursorVisible ? 1 : 0.5})`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cursorVisible]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    const bounds = gridRef.current?.getBoundingClientRect();
    if (!bounds) return;
    target.current = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  };

  const handleCardEnter = (id: string): void => {
    setHoveredId(id);
    setCursorVisible(true);
  };

  const handleCardLeave = (): void => {
    setCursorVisible(false);
    setHoveredId(null);
  };

  return (
    <section className="w-full px-6 sm:px-12 pt-32 pb-24 select-none min-h-screen bg-neutral-50/50">
      <div className="mx-auto max-w-7xl">

        <div className="w-full flex justify-start mb-10 sm:mb-14">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => router.back()}
            className="group p-1 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0px_4px_16px_rgba(0,0,0,0.03)] inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform border border-neutral-200/40 cursor-pointer text-neutral-800"
          >
            <div className="bg-neutral-900 text-white pl-4 pr-5 py-2 rounded-[2.5rem] font-normal text-xs sm:text-sm flex items-center gap-2.5 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative w-3.5 h-3.5 flex items-center overflow-hidden">
                <ArrowLeft className="absolute w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-full" strokeWidth={2} />
                <ArrowLeft className="absolute w-3.5 h-3.5 translate-x-full transition-transform duration-300 group-hover:translate-x-0" strokeWidth={2} />
              </div>
              <span className="relative z-10 font-medium tracking-tight font-sans">Return to Studio</span>
            </div>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:mb-24 mb-16 items-end">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="md:col-span-7 flex flex-col items-start text-left"
          >
            <motion.div
              variants={pillVariants}
              className="flex items-center gap-3 text-neutral-400 mb-4"
            >
              <span className="font-serif text-lg italic tracking-wide text-neutral-500">Selected Index</span>
              <span className="h-px w-8 bg-neutral-400/30" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900"
            >
              Case Studies
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5 md:pl-6 text-left"
          >
            <p className="text-neutral-500 text-base sm:text-lg font-light leading-relaxed tracking-tight">
              A detailed catalog of digital infrastructure, tailored operational interfaces, and high-end software products built from zero.
            </p>
          </motion.div>
        </div>

        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="relative grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-24 sm:grid-cols-2"
          style={{ perspective: 1200 }}
        >
          {isLoading &&
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}

          {isError && !isLoading && (
            <div className="col-span-full text-center text-neutral-500">
              <p>Couldn&apos;t load projects.</p>
              <button
                onClick={() => refetch()}
                className="mt-3 rounded-full bg-black px-5 py-2 text-sm text-white"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !isError && projects.length === 0 && (
            <p className="col-span-full text-center text-neutral-500">
              No projects yet.
            </p>
          )}

          {projects.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={index}
              isHovered={hoveredId === item.id}
              onEnter={() => handleCardEnter(item.id)}
              onLeave={handleCardLeave}
              onOpen={() => router.push(`/work/${item.slug}`)}
            />
          ))}

          <div
            ref={bubbleRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity duration-200 shadow-[0_10px_25px_rgba(0,0,0,0.3)] hidden md:flex"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          >
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </div>
        </div>
      </div>
    </section>
  );
}