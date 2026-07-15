"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import { useMemo, useRef } from "react";

type WorkImage = {
  src: string;
  alt: string;
};

const leftImages: WorkImage[] = [
  { src: "https://picsum.photos/seed/hanzo-l1/600/800", alt: "Project screenshot 1" },
  { src: "https://picsum.photos/seed/hanzo-l2/600/800", alt: "Project screenshot 2" },
  { src: "https://picsum.photos/seed/hanzo-l3/600/800", alt: "Project screenshot 3" },
  { src: "https://picsum.photos/seed/hanzo-l4/600/800", alt: "Project screenshot 4" },
  { src: "https://picsum.photos/seed/hanzo-l5/600/800", alt: "Project screenshot 5" },
];

const rightImages: WorkImage[] = [
  { src: "https://picsum.photos/seed/hanzo-r1/600/800", alt: "Project screenshot 6" },
  { src: "https://picsum.photos/seed/hanzo-r2/600/800", alt: "Project screenshot 7" },
  { src: "https://picsum.photos/seed/hanzo-r3/600/800", alt: "Project screenshot 8" },
  { src: "https://picsum.photos/seed/hanzo-r4/600/800", alt: "Project screenshot 9" },
  { src: "https://picsum.photos/seed/hanzo-r5/600/800", alt: "Project screenshot 10" },
];
const handleScrollToRecentWork = () => {
    const target = document.getElementById("recent-work");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
function AutoMarqueeColumn({
  images,
  duration = 25,
}: {
  images: WorkImage[];
  duration?: number;
}) {
  const tripledImages = useMemo(() => [...images, ...images, ...images], [images]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        animate={{ y: ["0%", "-33.33%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex flex-col gap-5 pt-10 absolute left-0 w-full"
      >
        {tripledImages.map((img, i) => (
          <motion.div
            key={`${img.src}-${i}`}
            whileHover={{
              scale: 1.03,
              rotate: 0.5,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative h-[380px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-xl flex-shrink-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i < 3}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function FloatingBadge({ containerRef, onClick }: { containerRef: React.RefObject<HTMLDivElement | null>, onClick?: () => void }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const smoothY = useSpring(rawY, { stiffness: 80, damping: 28 });

  return (
    <motion.div
      style={{ y: smoothY }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div className="relative flex items-center justify-center h-40 w-40">
        {/* ADDED cursor-pointer HERE */}
        <button
          onClick={onClick}
          className="pointer-events-auto cursor-pointer flex h-36 w-36 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* "See Recent Work" Pill */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: 14 }}
          whileInView={{ opacity: 1, x: 0, rotate: 14 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            delay: 1.0,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-0 left-20 -translate-y-4 flex items-center justify-center rounded-full bg-black border border-white/15 px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <span className="text-white text-[13px] font-bold tracking-wide whitespace-nowrap select-none">
            See Recent Work
          </span>
          <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-black border-r border-b border-white/15 rotate-[45deg] rounded-br-[3px]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-2 px-4 sm:px-10 lg:px-16">
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[40px] border-white/95 border-8 bg-[#161616] px-4 sm:px-8 h-[800px] sm:h-[1100px] lg:h-[1300px]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 h-full">
          {/* Left Column */}
          <div className="relative h-full">
            <AutoMarqueeColumn
              images={leftImages}
              duration={35} 
            />
          </div>

          {/* Right Column */}
          <div className="relative h-full hidden md:block">
            <AutoMarqueeColumn
              images={rightImages}
              duration={28} 
            />
          </div>
        </div>

        {/* Floating Badge */}
        <FloatingBadge containerRef={containerRef} onClick={handleScrollToRecentWork} />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#161616] via-[#161616]/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#161616] via-[#161616]/70 to-transparent z-10" />
      </div>
    </section>
  );
}