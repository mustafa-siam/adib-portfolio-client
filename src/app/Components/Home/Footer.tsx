"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);

  // Parallax / Scroll animations matching existing system setups
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const footerContentY = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer ref={footerRef} className="px-4 pb-4 mt-8 select-none">
      <div className="bg-[#111111] text-white rounded-[2.5rem] px-6 md:px-16 text-center relative overflow-hidden flex flex-col items-center min-h-[700px] md:min-h-[850px] z-0">
        
        {/* Clean, dynamic ray of light background glow mimicking the reference site precisely */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[5%] w-[50%] h-[160%] bg-gradient-to-b from-white/[0.04] to-transparent rotate-[28deg] blur-[80px] pointer-events-none will-change-transform" />
        </div>

        <motion.div 
          style={{ y: footerContentY }} 
          className="flex flex-col items-center pt-32 pb-12 w-full max-w-4xl mx-auto flex-1 justify-center z-10"
        >
          {/* 2 spots available pill flanked by structural hairlines */}
          <div className="mb-6 flex items-center justify-center gap-4 text-neutral-500">
            <span className="h-px w-8 bg-neutral-800" />
            <span className="font-serif text-lg italic tracking-wide text-neutral-400">2 spots available</span>
            <span className="h-px w-8 bg-neutral-800" />
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-normal tracking-tight mb-6 text-white text-center max-w-3xl lg:leading-[1.1]">
            Let's Connect
          </h2>

          <p className="text-neutral-400 mb-12 max-w-md mx-auto text-sm md:text-base font-normal leading-relaxed text-center whitespace-pre-line tracking-tight">
            Feel free to contact me if having any questions.
            I'm available for new projects or just for chatting.
          </p>

          {/* Embedded interactive Premium CTA button block incorporating sliding loop icon mask styling */}
          <a 
            href="mailto:joris@hanzo.com"
            className="group p-2 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <div className="relative bg-white text-black px-8 md:px-10 py-4 rounded-[2.5rem] font-medium text-sm flex items-center justify-center gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10">Book a free intro call</span> 
              <div className="relative z-10 w-4 h-4 flex items-center overflow-hidden">
                <svg 
                  className="absolute w-4 h-4 transition-transform duration-300 group-hover:translate-x-full" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <svg 
                  className="absolute w-4 h-4 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Bottom Footer segment featuring structured clean icons layer */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/5 text-xs font-mono tracking-tight text-neutral-500 z-10 relative mt-auto gap-6 md:gap-0">
          <div>
            <span>© Hanzo Studio, 2025</span>
          </div>
          
          <div className="flex gap-3">
            {['@', 'X', 'Ln', 'Ig'].map((social, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}