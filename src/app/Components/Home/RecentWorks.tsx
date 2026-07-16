"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PortfolioCard from "../common/PortfolioCard"; // Replaced with PortfolioCard
import { motion, Variants } from "motion/react";

export type CaseStudy = {
  id: string;
  title: string;
  tags: string[];
  poster: string;
  videoUrl?: string; // Added optional videoUrl support
  href: string;
};

const CASE_STUDIES: CaseStudy[] = [
   {
    id: "strida",
    title: "Strida",
    tags: ["portfolio", "sidebar"],
    poster: "/vedio.jpeg",
    videoUrl: "https://youtu.be/wa_1jCRZb24?si=o7epuxxhdbrLKIza", // Added placeholder video
    href: "/work/strida",
  },
  {
    id: "bravo",
    title: "Bravo",
    tags: ["UI/UX", "App"],
    poster: "/vedio1.jpeg",
    videoUrl: "https://youtu.be/4GFq-MGiemw?si=Se_ZLLoXPGAXBjTX", // Added placeholder video
    href: "/work/bravo",
  },
  {
    id: "quattro",
    title: "Quattro",
    tags: ["branding", "web"],
    poster: "/vedio2.jpeg",
    videoUrl: "https://youtu.be/-oeIg7eQ6us?si=KGmmaShV1xYBi9HM", // Added placeholder video
    href: "/work/quattro",
  },
  {
    id: "nitro",
    title: "Nitro",
    tags: ["product", "landing"],
    poster: "/vedio3.jpeg",
    videoUrl: "https://youtu.be/tU5MbLX5R70?si=UGJVUAaReMRbEfXx", // Added placeholder video
    href: "/work/nitro",
  },
];

const CURSOR_EASE = 0.14;

export default function RecentWork() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);

  const target = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const fallbackPillVariants: Variants = {
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
    <section id="recent-work" ref={sectionRef} className="w-full px-6 select-none">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center sm:mb-24 mb-16"
      >
        <motion.div
          variants={fallbackPillVariants}
          className="flex items-center justify-center gap-4 text-neutral-500 mb-3"
        >
          <span className="h-px w-10 bg-neutral-400/40" />
          <span className="font-serif text-lg italic tracking-wide">Our Projects</span>
          <span className="h-px w-10 bg-neutral-400/40" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900"
        >
          Recent Work
        </motion.h2>
      </motion.div>

      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-20 sm:grid-cols-2"
        style={{ perspective: 1200 }}
      >
        {CASE_STUDIES.map((item, index) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={index}
            isHovered={hoveredId === item.id}
            onEnter={() => handleCardEnter(item.id)}
            onLeave={handleCardLeave}
            onOpen={() => router.push(item.href)}
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

      <div className="flex items-center justify-center mt-12 sm:mt-20 w-full">
        <Link 
          href="/work" 
          className="group p-1 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0px_8px_24px_rgba(0,0,0,0.06)] inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform border border-neutral-200/40 shrink-0"
        >
          <div className="relative bg-black text-white px-5 sm:px-8 py-2.5 rounded-[2.5rem] font-normal text-sm sm:text-base md:text-xl flex items-center gap-2 sm:gap-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10 whitespace-nowrap">See All Projects</span>
            <div className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center overflow-hidden">
              <ArrowRight className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-full" strokeWidth={1.5} />
              <ArrowRight className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" strokeWidth={1.5} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}