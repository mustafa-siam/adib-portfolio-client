"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export type CaseStudy = {
  id: string;
  title: string;
  tags: string[];
  poster: string;
  videoUrl?: string;
  href: string;
};

interface PortfolioCardProps {
  item: CaseStudy;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onOpen: () => void;
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
}

export default function PortfolioCard({
  item,
  index,
  isHovered,
  onEnter,
  onLeave,
  onOpen,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobileInView, setIsMobileInView] = useState(false);

  const videoId = getYouTubeId(item.videoUrl);
  const shouldPlay = isHovered || isMobileInView;

  // Handles auto-playing on mobile touch views
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMobileInView(entry.isIntersecting);
      },
      { root: null, rootMargin: "-25% 0px -25% 0px", threshold: 0.6 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group w-full flex flex-col"
    >
      {/* Media Frame Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_15px_35px_rgba(0,0,0,0.04)] select-none">
        
        {/* Cover Poster Image */}
        <Image
          src={item.poster}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 45vw"
          className={`object-cover z-10 transition-all duration-500 pointer-events-none ${
            shouldPlay && videoId ? "opacity-0 scale-[1.04]" : "opacity-100 scale-100"
          }`}
          priority={index < 2}
        />

        {/* Dynamic Native YouTube Iframe */}
        {shouldPlay && videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1`}
            className="absolute inset-0 h-full w-full object-cover z-0"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}
      </div>

      {/* Meta Text Row - Fully aligned on one line */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-1">
        <div>
<span className="text-xl font-medium tracking-tight text-neutral-900 whitespace-nowrap">
            {item.title}
          </span>
        </div>
         
        {/* Right Side: Tags Container */}
        <div className="flex flex-wrap gap-1.5 justify-end">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200/60 bg-white/50 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-neutral-500 tracking-tight whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
           <div className="">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpen();
            }}
            className="text-xs font-semibold text-neutral-400 tracking-wide uppercase inline-flex items-center gap-0.5 hover:text-neutral-950 transition-colors duration-300 cursor-pointer group/btn h-fit self-center"
          >
            See Details 
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}