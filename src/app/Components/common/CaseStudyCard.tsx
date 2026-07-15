"use client";

import type { CSSProperties, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

export type CaseStudy = {
  id: string;
  title: string;
  tags: string[];
  poster: string;
  href: string;
};

interface CaseStudyCardProps {
  item: CaseStudy;
  index: number;
  inView: boolean;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onOpen: () => void;
}

export default function CaseStudyCard({
  item,
  index,
  inView,
  isHovered,
  onEnter,
  onLeave,
  onOpen,
}: CaseStudyCardProps) {
  // Column-based 3D tilt: left column raises its right edge, right column
  // raises its left edge — alternating "propped up" card look.
  const isLeftColumn = index % 2 === 0;
  const tilt = isLeftColumn ? -2 : 2;

  const wrapperStyle: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView
      ? `translateY(0) rotate(${tilt}deg)`
      : `translateY(40px) rotate(${tilt}deg)`,
    transitionDelay: `${index * 140}ms`,
  };

  return (
    <Link
      href={item.href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onOpen();
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group block text-inherit no-underline transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={wrapperStyle}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#161616] shadow-[0_15px_35px_rgba(0,0,0,0.04)]">
        <Image
          src={item.poster}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 45vw"
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isHovered ? "scale-[1.04]" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
      </div>

      <div className="mt-5 flex items-center justify-between px-1">
        <span className="text-lg sm:text-xl font-medium tracking-tight text-neutral-800">
          {item.title}
        </span>
        <div className="flex gap-1.5 sm:gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200/60 bg-white/50 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-neutral-500 tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}