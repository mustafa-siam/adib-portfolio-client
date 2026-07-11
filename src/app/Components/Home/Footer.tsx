"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);

  // Same animation as previous footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // EXACT same animation as previous footer
  const footerContentY = useTransform(
    scrollYProgress,
    [0, 1],
    [-400, 0]
  );

  return (
    <footer ref={footerRef} className="px-4 pb-4 select-none">
      <div className="bg-[#111111] text-white rounded-[2.5rem] px-6 md:px-16 text-center relative overflow-hidden flex flex-col items-center min-h-[700px] md:min-h-[850px] z-0">

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[5%] w-[50%] h-[160%] bg-gradient-to-b from-white/[0.04] to-transparent rotate-[28deg] blur-[80px] pointer-events-none will-change-transform" />
        </div>

        {/* SAME animation as previous footer */}
        <motion.div
          style={{ y: footerContentY }}
          className="flex flex-col items-center pt-32 pb-12 w-full max-w-4xl mx-auto flex-1 justify-center z-10"
        >
          {/* Top Label */}
          <div className="mb-6 flex items-center justify-center gap-4 text-neutral-500">
            <span className="h-px w-8 bg-neutral-800" />
            <span className="font-serif text-lg italic tracking-wide text-neutral-400">
              2 spots available
            </span>
            <span className="h-px w-8 bg-neutral-800" />
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-normal tracking-tight mb-6 text-white text-center max-w-3xl lg:leading-[1.1]">
            Let's Connect
          </h2>

          <p className="text-neutral-400 mb-12 max-w-md mx-auto text-sm md:text-base font-normal leading-relaxed text-center whitespace-pre-line tracking-tight">
            Feel free to contact me if having any questions.
            {"\n"}
            I'm available for new projects or just for chatting.
          </p>

          {/* CTA */}
          <a
            href="mailto:joris@hanzo.com"
            className="group p-2 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <div className="relative bg-white text-black px-8 md:px-10 py-4 rounded-[2.5rem] font-medium text-sm flex items-center justify-center gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="relative z-10">
                Book a free intro call
              </span>

              <div className="relative z-10 w-4 h-4 flex items-center overflow-hidden">
                <svg
                  className="absolute w-4 h-4 transition-transform duration-300 group-hover:translate-x-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>

                <svg
                  className="absolute w-4 h-4 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Bottom Footer */}
<div className="relative z-10 w-full px-2 md:px-0 pb-12 mt-auto">
  <div className="flex flex-col md:flex-row items-center justify-between">

    {/* Left */}
    <div className="flex flex-col items-start gap-3">
      <div className="w-36 h-px bg-white/15" />

      <span className="text-[15px] text-neutral-300 tracking-tight">
        © Hanzo Studio, 2025
      </span>
    </div>

    {/* Right */}
    <div className="flex items-center gap-5 mt-10 md:mt-0">
      {["@", "X", "Ln", "Ig"].map((social) => (
        <a
          key={social}
          href="#"
          className="
            group
            w-11
            h-11
            rounded-full
            border
            border-white/15
            flex
            items-center
            justify-center
            text-[13px]
            font-medium
            text-neutral-400
            transition-all
            duration-300
            hover:border-white/40
            hover:text-white
            hover:bg-white/[0.03]
          "
        >
          {social}
        </a>
      ))}
    </div>

  </div>
</div>
      </div>
    </footer>
  );
}