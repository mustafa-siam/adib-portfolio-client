"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'motion/react';

const CarouselImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400"
];

export default function ImageCarousel({
  active = true,
  startDelay = 0,
}: {
  active?: boolean;
  startDelay?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CarouselImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
      animate={
        active
          ? { opacity: 1, scale: 1, rotate: -3 }
          : { opacity: 0, scale: 0.85, rotate: 0 }
      }
      transition={{
        duration: 0.5,
        delay: active ? startDelay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      // Fixed layout height/width to look uniform on mobile viewports
      className="inline-block relative w-[5rem] h-[3.25rem] sm:w-[6.5rem] sm:h-[4.25rem] md:w-[8.5rem] md:h-[5.5rem] bg-gray-200 rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2.25rem] mx-1 sm:mx-2 md:mx-4 overflow-hidden align-middle -mt-1 sm:-mt-2 md:-mt-4 border-[1px] md:border-[2px] border-black shadow-[4px_12px_24px_rgba(0,0,0,0.35)] bg-clip-padding"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={CarouselImages[index]} className="w-full h-full object-cover" alt="" />
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
}