"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ImageCarousel from "../common/Imagecarusol";
import LogoCarousel from "../common/Logocarusol";

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
          duration: 0.45,
          delay: active ? delay : 0,
          ease: [0.25, 1, 0.5, 1],
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
      }, 60);
    });
  }, []);

  // ---- Accelerated timeline adjustments ----
  const IMAGE_CAROUSEL_DELAY = 0.05;
  const LOGO_CAROUSEL_DELAY = 0.08;

  const WORD_GAP = 0.15;
  const WORDS_START = 0.2;

  const ULTIMATE_DELAY = WORDS_START + WORD_GAP * 0; 
  const SAAS_DELAY = WORDS_START + WORD_GAP * 1; 
  const ANIMATION_DELAY = WORDS_START + WORD_GAP * 2; 
  const FOR_DELAY = WORDS_START + WORD_GAP * 3; 
  const SOLID_DELAY = WORDS_START + WORD_GAP * 4; 
  const PRODUCTS_DELAY = WORDS_START + WORD_GAP * 5; 

  const PILL_DELAY = WORDS_START; 
  const SUBTITLE_DELAY = PRODUCTS_DELAY + 0.25; 
  const BUTTONS_DELAY = PRODUCTS_DELAY + 0.35; 

  return (
    <section className="relative overflow-hidden w-full pt-28 md:pt-40 flex items-center justify-center">
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

      <div className="absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center w-full">
          
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
              duration: 0.4,
              delay: startAnimation ? PILL_DELAY : 0,
              ease: [0.25, 1, 0.5, 1],
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
          <h1 className="flex flex-col items-center justify-center gap-y-3 md:gap-y-6 w-full select-none text-center">
            
            {/* --- MOBILE ONLY VIEWS --- */}
            {/* Mobile Line 1 */}
            <div className="flex md:hidden flex-row flex-nowrap items-center justify-center gap-x-1.5 w-full px-2">
              <AnimatedWord
                text="Ultimate"
                active={startAnimation}
                delay={ULTIMATE_DELAY}
                className="text-3xl sm:text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
              <AnimatedWord
                text="Saas"
                active={startAnimation}
                delay={SAAS_DELAY}
                className="text-3xl sm:text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
              <div className="inline-flex items-center align-middle ml-0.5 shrink-0">
                <ImageCarousel active={startAnimation} startDelay={IMAGE_CAROUSEL_DELAY} />
              </div>
            </div>

            {/* Mobile Line 2 */}
            <div className="flex md:hidden flex-row flex-nowrap items-center justify-center gap-x-1.5 w-full px-2">
              <AnimatedWord
                text="Animation"
                active={startAnimation}
                delay={ANIMATION_DELAY}
                className="text-3xl sm:text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#8A8A8A]"
              />
              <AnimatedWord
                text="for"
                active={startAnimation}
                delay={FOR_DELAY}
                className="text-3xl sm:text-4xl font-normal tracking-[-0.05em] leading-[1.1] text-[#8A8A8A]"
              />
              <div className="inline-flex items-center align-middle ml-0.5 shrink-0 mt-2">
                <LogoCarousel active={startAnimation} startDelay={LOGO_CAROUSEL_DELAY} />
              </div>
            </div>

            {/* Mobile Line 3 */}
            <div className="flex md:hidden flex-row flex-nowrap items-center justify-center gap-x-1.5 w-full px-2">
              <AnimatedWord
                text="Solid"
                active={startAnimation}
                delay={SOLID_DELAY}
                className="text-3xl sm:text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
              <AnimatedWord
                text="Products"
                active={startAnimation}
                delay={PRODUCTS_DELAY}
                className="text-3xl sm:text-4xl font-medium tracking-[-0.05em] leading-[1.1] text-[#111]"
              />
            </div>

            {/* --- DESKTOP TWO-LINE VIEW --- */}
            {/* Desktop Row 1 */}
            <div className="hidden md:flex flex-row items-center justify-center gap-x-3 lg:gap-x-4 max-w-5xl">
              <AnimatedWord
                text="Ultimate"
                active={startAnimation}
                delay={ULTIMATE_DELAY}
                className="text-5xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
              <AnimatedWord
                text="Saas"
                active={startAnimation}
                delay={SAAS_DELAY}
                className="text-5xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
              <div className="inline-flex items-center align-middle shrink-0 mx-1">
                <ImageCarousel active={startAnimation} startDelay={IMAGE_CAROUSEL_DELAY} />
              </div>
              <AnimatedWord
                text="Animation"
                active={startAnimation}
                delay={ANIMATION_DELAY}
                className="text-5xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#8A8A8A]"
              />
            </div>

            {/* Desktop Row 2 */}
            <div className="hidden md:flex flex-row items-center justify-center gap-x-3 lg:gap-x-4 max-w-5xl">
              <AnimatedWord
                text="for"
                active={startAnimation}
                delay={FOR_DELAY}
                className="text-5xl md:text-7xl lg:text-[85px] font-normal tracking-[-0.05em] leading-[0.95] text-[#8A8A8A]"
              />
              <div className="inline-flex items-center align-middle shrink-0 mx-1">
                <LogoCarousel active={startAnimation} startDelay={LOGO_CAROUSEL_DELAY} />
              </div>
              <AnimatedWord
                text="Solid"
                active={startAnimation}
                delay={SOLID_DELAY}
                className="text-5xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
              <AnimatedWord
                text="Products"
                active={startAnimation}
                delay={PRODUCTS_DELAY}
                className="text-5xl md:text-7xl lg:text-[85px] font-medium tracking-[-0.05em] leading-[0.95] text-[#111]"
              />
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
              delay: startAnimation ? SUBTITLE_DELAY : 0,
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="mt-8 md:mt-12 max-w-[620px] text-center text-base sm:text-[18px] leading-[1.6] sm:leading-[1.7] tracking-[-0.02em] text-[#555] px-4"
          >
            Helping WordPress Plugins and SaaS products to shape their Digital Space.
          </motion.p>

          {/* Call To Actions Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1],
              delay: startAnimation ? BUTTONS_DELAY : 0,
            }}
            className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-10 mt-8 md:mt-10 mb-8 w-full px-2"
          >
            {/* Contact Button */}
            <a href="#pricing" className="group p-1 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0px_8px_24px_rgba(0,0,0,0.06)] inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform border border-neutral-200/40 shrink-0">
              <div className="relative bg-black text-white px-4 sm:px-8 py-2.5  rounded-[2.5rem] font-normal text-sm sm:text-base md:text-xl flex items-center gap-2 sm:gap-3 overflow-hidden">
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