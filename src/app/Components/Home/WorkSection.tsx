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

function MarqueeColumn({
  images,
  duration,
  className = "",
}: {
  images: WorkImage[];
  duration: number;
  className?: string;
}) {
  const doubled = useMemo(() => [...images, ...images, ...images], [images]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex flex-col gap-5 w-full absolute top-0 left-0"
        animate={{ y: ["0%", "-33.33%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              className="object-cover"
              priority={i < 3}
            />
          </div>
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
      initial={{ opacity: 0, x: "-80%" }}
      whileInView={{ opacity: 1, x: "-50%" }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 50, damping: 22, mass: 1.2 }}
      className="absolute left-1/2 top-1/2 z-20 -translate-y-1/2 pointer-events-none"
    >
      <div className="relative flex items-center justify-center h-40 w-40">
        {/* Central Circular Container */}
        <button
          onClick={onClick}
          className="pointer-events-auto flex h-36 w-36 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-105 active:scale-95"
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

        {/* Bubble Pill Badge with Pointer Arrow */}
        <div className="absolute top-0 left-20 -translate-y-4 rotate-[14deg] flex items-center justify-center rounded-full bg-black border border-white/15 px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <span className="text-white text-[13px] font-bold tracking-wide whitespace-nowrap select-none">
            See Recent Work
          </span>
          {/* Subtle chat-bubble pointer pointing down-left toward the folder circle */}
          <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-black border-r border-b border-white/15 rotate-[45deg] rounded-br-[3px]" />
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-[#efefef] px-4 pb-16 sm:px-10 lg:px-16">
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[40px] border border-white/10 bg-[#161616] px-4 sm:px-8 h-[800px] sm:h-[1100px] lg:h-[1300px]"
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full">
          <div className="relative h-full pt-10">
            <MarqueeColumn images={leftImages} duration={15} />
          </div>

          <div className="relative h-full pt-10">
            <MarqueeColumn images={rightImages} duration={40} />
          </div>
        </div>

        <FloatingBadge containerRef={containerRef} onClick={() => console.log("Navigate to /work")} />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#161616] via-[#161616]/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#161616] via-[#161616]/70 to-transparent z-10" />
      </div>
    </section>
  );
}