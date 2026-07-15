"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LogoCarousel({
  active = true,
  startDelay = 0,
}: {
  active?: boolean;
  startDelay?: number;
}) {
  const [index, setIndex] = useState(0);

  // Note: Using "text-white" for contrast against the "bg-[#222]" background. 
  // Change "text-white" to "text-[#444]" if you use a light background instead.
  const logos = [
    <div key="jp" className="font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter text-[#444] italic">ロゴ</div>,
    <div key="fig" className="font-black text-lg sm:text-2xl md:text-3xl tracking-tighter text-[#444] flex items-center justify-center italic pr-1">LOGO<span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-normal align-text-bottom ml-1 uppercase">ipsum&reg;</span></div>,
    <div key="loq" className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-normal text-[#444] flex items-center justify-center">LOQO</div>,
    <div key="inf" className="text-4xl sm:text-5xl md:text-6xl font-light text-[#444] flex items-center justify-center pt-1">&infin;</div>,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
      animate={
        active
          ? { opacity: 1, scale: 1, rotate: 3 }
          : { opacity: 0, scale: 0.85, rotate: 0 }
      }
      transition={{
        duration: 0.5,
        delay: active ? startDelay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      // Updated mobile dimensions: increased from w-[4rem] h-[2.5rem] to w-[5rem] h-[3.25rem] for better legibility
      className="inline-block relative w-[5rem] h-[3.25rem] sm:w-[6.5rem] sm:h-[4.25rem] md:w-[8.5rem] md:h-[5.5rem] bg-[#222] rounded-[1.1rem] sm:rounded-[1.6rem] md:rounded-[2.25rem] mx-1 sm:mx-2 md:mx-4 overflow-hidden align-middle -mt-1.5 sm:-mt-2 md:-mt-4 border-[1px] md:border-[2px] border-black shadow-[4px_12px_24px_rgba(0,0,0,0.35)] bg-clip-padding"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 flex items-center justify-center w-full h-full"
        >
          {logos[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}