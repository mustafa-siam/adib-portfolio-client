"use client";

import { motion } from "motion/react";
import React from "react";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  initialRotate: number;
  hoverRotate: number;
  yClass: string;
};

const processSteps: ProcessStep[] = [
  {
    number: "1",
    title: "Subscribe",
    description: "Choose a plan and request as many designs as you need.",
    initialRotate: -3,
    hoverRotate: -0.5,
    yClass: "md:translate-y-4",
  },
  {
    number: "2",
    title: "Request",
    description: "Choose a plan and request as many designs as you need.",
    initialRotate: 3.5,
    hoverRotate: 1,
    yClass: "md:-translate-y-12 z-10", 
  },
  {
    number: "3",
    title: "Get Your Designs",
    description: "Choose a plan and request as many designs as you need.",
    initialRotate: -2,
    hoverRotate: -4,
    yClass: "md:translate-y-12",
  },
];

export default function ProcessSection() {
  return (
    <section className="w-full px-4 py-2 sm:px-8 lg:px-16 text-neutral-950">
      <div className="mx-auto max-w-6xl">
        
        {/* --- HEADER BLOCK --- */}
        <div className="text-center mb-24 md:mb-36">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-neutral-500 text-lg sm:text-xl tracking-wide mb-3"
          >
            Our Process, Explained
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900"
          >
            Here's how it works
          </motion.h2>
        </div>

        {/* --- PROCESS CARDS GRID --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4 lg:gap-8 items-center justify-center max-w-5xl mx-auto">
          
          {/* ========================================== */}
          {/* DESKTOP CONNECTORS (Hidden on Mobile)     */}
          {/* ========================================== */}
          
          {/* Desktop Line 1: Card 1 -> Card 2 */}
          <div className="hidden md:block absolute top-[-10%] left-[23%] w-[18%] h-32 pointer-events-none z-20">
            <svg width="100%" height="100%" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M10 80C40 30 100 15 150 25" 
                stroke="#ff5c35" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
              />
              <motion.circle 
                cx="10" cy="80" r="4" fill="#ff5c35"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              />
              <motion.circle 
                cx="150" cy="25" r="4" fill="#ff5c35"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3 }}
              />
            </svg>
          </div>

          {/* Desktop Line 2: Card 2 -> Card 3 */}
          <div className="hidden md:block absolute top-[15%] left-[56%] w-[18%] h-36 pointer-events-none z-20">
            <svg width="100%" height="100%" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M10 20C45 45 55 95 75 95C95 95 100 45 80 45C60 45 85 85 150 65" 
                stroke="#ff5c35" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1], delay: 0.6 }}
              />
              <motion.circle 
                cx="150" cy="65" r="4" fill="#ff5c35"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.0 }}
              />
            </svg>
          </div>


          {/* ========================================== */}
          {/* CARDS MAP + MOBILE SIDE CONNECTOR TRACKS   */}
          {/* ========================================== */}
          {processSteps.map((step, index) => (
            <div key={step.number} className="relative w-full flex flex-col items-center">
              
              <motion.div
                className={`w-full max-w-[310px] sm:max-w-[340px] relative z-10 ${step.yClass}`}
                initial={{ opacity: 0, y: 45, rotate: step.initialRotate * 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: step.initialRotate }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 55, damping: 14, delay: index * 0.15 }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.035,
                    rotate: step.hoverRotate,
                    y: -10,
                    boxShadow: "0 35px 60px -15px rgba(0,0,0,0.06)"
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 16 }}
                  className="bg-white rounded-[32px] p-9 min-h-[340px] sm:min-h-[350px] flex flex-col justify-between shadow-[0_15px_40px_-10px_rgba(0,0,0,0.03)] border border-neutral-200/40 cursor-pointer"
                >
                  <div className="text-5xl sm:text-6xl font-light tracking-tighter text-neutral-900 select-none">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-neutral-500 font-medium tracking-normal">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* MOBILE CONNECTOR 1: Runs from Card 1 Down to Card 2 along the right margin */}
              {index === 0 && (
                <div className="block md:hidden absolute right-[-10px] top-12 w-20 h-[410px] pointer-events-none z-30 overflow-visible">
                  <svg width="100%" height="100%" viewBox="0 0 80 410" fill="none" className="overflow-visible">
                    <motion.path 
                      d="M 15 15 C 75 75, 85 320, 20 395" 
                      stroke="#ff5c35" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                    />
                    <motion.circle 
                      cx="15" cy="15" r="4.5" fill="#ff5c35"
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    />
                    <motion.circle 
                      cx="20" cy="395" r="4.5" fill="#ff5c35"
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }}
                    />
                  </svg>
                </div>
              )}

              {/* MOBILE CONNECTOR 2: Runs from Card 2 Down to Card 3 featuring the cursive loop layout */}
              {index === 1 && (
                <div className="block md:hidden absolute right-[-15px] top-[260px] w-24 h-[410px] pointer-events-none z-30 overflow-visible">
                  <svg width="100%" height="100%" viewBox="0 0 96 410" fill="none" className="overflow-visible">
                    <motion.path 
                      d="M 15 15 C 80 65, 85 240, 85 270 C 85 315, 40 315, 52 275 C 65 230, 95 295, 12 390" 
                      stroke="#ff5c35" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                    />
                    <motion.circle 
                      cx="15" cy="15" r="4.5" fill="#ff5c35"
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                    />
                    <motion.circle 
                      cx="12" cy="390" r="4.5" fill="#ff5c35"
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }}
                    />
                  </svg>
                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}