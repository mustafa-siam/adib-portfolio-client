"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ImageCarousel from "../ui/Imagecarusol";
import LogoCarousel from "../ui/Logocarusol";

// True 3D word reveal — rotates up from below (rotateX) with real perspective depth.
const AnimatedWord = ({
  text,
  className = "",
  active,
  delay = 0,
}: {
  text: string;
  className?: string;
  active: boolean;
  delay?: number;
}) => {
  return (
    <span
      style={{ perspective: "800px", display: "inline-block" }}
      className="overflow-hidden"
    >
      <motion.span
        initial={{ opacity: 0, rotateX: 90, y: 40 }}
        animate={
          active
            ? { opacity: 1, rotateX: 0, y: 0 }
            : { opacity: 0, rotateX: 90, y: 40 }
        }
        transition={{
          duration: 0.6,
          delay: active ? delay : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>
    </span>
  );
};

export default function Hero() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setStartAnimation(true);
      }, 180);
    });
  }, []);

  // ---- Sequenced timeline ----
  const IMAGE_CAROUSEL_DELAY = 0.1;
  const LOGO_CAROUSEL_DELAY = 0.15;

  const WORD_GAP = 0.45;
  const WORDS_START = 1.0;

  const ULTIMATE_DELAY = WORDS_START + WORD_GAP * 0; 
  const SAAS_DELAY = WORDS_START + WORD_GAP * 1; 
  const ANIMATION_DELAY = WORDS_START + WORD_GAP * 2; 
  const FOR_DELAY = WORDS_START + WORD_GAP * 3; 
  const SOLID_DELAY = WORDS_START + WORD_GAP * 4; 
  const PRODUCTS_DELAY = WORDS_START + WORD_GAP * 5; 

  const PILL_DELAY = PRODUCTS_DELAY + 0.6; 
  const SUBTITLE_DELAY = PRODUCTS_DELAY + 0.8; 
  const BUTTONS_DELAY = PRODUCTS_DELAY + 1.0; 

  return (
    <section className="relative overflow-hidden w-full pt-28  md:pt-40 flex items-center justify-center">
      {/* Background Gradients */}
      <motion.div
        animate={{
          x: [-80, 80, -80],
          y: [-30, 20, -30],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full pointer-events-none"
      />

      <motion.div
        animate={{
          x: [60, -60, 60],
          y: [40, -40, 40],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-[-250px] top-0 h-[700px] w-[700px] rounded-full pointer-events-none"
      />

      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center w-full">
          
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: startAnimation ? PILL_DELAY : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 md:mb-12 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_15px_40px_rgba(0,0,0,.08)] border border-neutral-200/50"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-70 animate-ping" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <p className="text-sm sm:text-[17px] font-medium tracking-[-.02em] text-neutral-800">
              Booking Open — 2 Spots Left
            </p>
          </motion.div>

          {/* Heading Section */}
          <h1 className="flex flex-col items-center justify-center gap-y-3 md:gap-y-5 w-full select-none text-center">
            
            {/* --- MOBILE ONLY VIEWS --- */}
            
            {/* Mobile Line 1: Ultimate Saas [Image Carousel] */}
            <div className="flex md:hidden flex-row flex-wrap items-center justify-center gap-x-2 w-full px-2">
              <AnimatedWord
                text="Ultimate"
                active={startAnimation}
                delay={ULTIMATE_DELAY}
                className="text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
              <AnimatedWord
                text="Saas"
                active={startAnimation}
                delay={SAAS_DELAY}
                className="text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
              <div className="inline-flex items-center align-middle ml-1">
                <ImageCarousel active={startAnimation} startDelay={IMAGE_CAROUSEL_DELAY} />
              </div>
            </div>

            {/* Mobile Line 2: Animation for [Logo Carousel] */}
            <div className="flex md:hidden flex-row flex-wrap items-center justify-center gap-x-2 w-full px-2">
              <AnimatedWord
                text="Animation"
                active={startAnimation}
                delay={ANIMATION_DELAY}
                className="text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#8A8A8A]"
              />
              <AnimatedWord
                text="for"
                active={startAnimation}
                delay={FOR_DELAY}
                className="text-4xl font-normal tracking-[-0.05em] leading-[1.1] text-[#8A8A8A]"
              />
              <div className="inline-flex items-center align-middle ml-1">
                <LogoCarousel active={startAnimation} startDelay={LOGO_CAROUSEL_DELAY} />
              </div>
            </div>

            {/* Mobile Line 3: Solid Products */}
            <div className="flex md:hidden flex-row flex-wrap items-center justify-center gap-x-2 w-full px-2">
              <AnimatedWord
                text="Solid"
                active={startAnimation}
                delay={SOLID_DELAY}
                className="text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
              <AnimatedWord
                text="Products"
                active={startAnimation}
                delay={PRODUCTS_DELAY}
                className="text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
            </div>

            {/* --- DESKTOP ONLY VIEWS (Your original exact flow) --- */}
            
            {/* Desktop Row 1 */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 max-w-5xl">
              <AnimatedWord
                text="Ultimate"
                active={startAnimation}
                delay={ULTIMATE_DELAY}
                className="sm:text-6xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
              <AnimatedWord
                text="Saas"
                active={startAnimation}
                delay={SAAS_DELAY}
                className="pr-1 sm:text-6xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
              <ImageCarousel active={startAnimation} startDelay={IMAGE_CAROUSEL_DELAY} />
              <AnimatedWord
                text="Animation"
                active={startAnimation}
                delay={ANIMATION_DELAY}
                className="sm:text-6xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#8A8A8A]"
              />
            </div>

            {/* Desktop Row 2 */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 max-w-5xl">
              <AnimatedWord
                text="for"
                active={startAnimation}
                delay={FOR_DELAY}
                className="sm:text-6xl md:text-7xl lg:text-[85px] font-normal tracking-[-0.05em] leading-[0.95] text-[#8A8A8A]"
              />
              <LogoCarousel active={startAnimation} startDelay={LOGO_CAROUSEL_DELAY} />
              <AnimatedWord
                text="Solid"
                active={startAnimation}
                delay={SOLID_DELAY}
                className="sm:text-6xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
              <AnimatedWord
                text="Products"
                active={startAnimation}
                delay={PRODUCTS_DELAY}
                className="sm:text-6xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: startAnimation ? SUBTITLE_DELAY : 0,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 md:mt-12 max-w-[620px] text-center text-base sm:text-[18px] leading-[1.6] sm:leading-[1.7] tracking-[-0.02em] text-[#555] px-4"
          >
            Helping WordPress Plugins and SaaS products to shape their Digital Space.
          </motion.p>

          {/* Call To Actions Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: startAnimation ? BUTTONS_DELAY : 0,
            }}
            className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-10 mt-8 md:mt-10 mb-8 w-full px-2"
          >
            {/* Contact Button */}
            <a href="#pricing" className="group p-1 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0px_8px_24px_rgba(0,0,0,0.06)] inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform border border-neutral-200/40 shrink-0">
              <div className="relative bg-black text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-[2.5rem] font-normal text-sm sm:text-base md:text-[1.35rem] flex items-center gap-2 sm:gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10 whitespace-nowrap">Contact Me</span>
                <div className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center overflow-hidden">
                  <ArrowRight className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-full" strokeWidth={1.5} />
                  <ArrowRight className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" strokeWidth={1.5} />
                </div>
              </div>
            </a>

            {/* Social Proof / Avatars */}
            <div className="flex flex-col items-center sm:items-start justify-center gap-1 shrink-0">
              <div className="flex -space-x-2 items-center justify-center">
                {[
                  "https://i.pravatar.cc/100?img=11",
                  "https://i.pravatar.cc/100?img=32",
                  "https://i.pravatar.cc/100?img=33",
                  "https://i.pravatar.cc/100?img=12",
                  "https://i.pravatar.cc/100?img=13"
                ].map((src, i) => (
                  <div key={i} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-[2px] border-white bg-neutral-200 overflow-hidden shadow-sm shrink-0">
                     <img src={src} className="w-full h-full object-cover" alt="avatar" />
                  </div>
                ))}
              </div>
              <div className="text-neutral-600 text-[11px] sm:text-sm font-normal tracking-tight pl-0.5">
                Trusted by founders
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}