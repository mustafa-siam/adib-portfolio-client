"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 22 },
    },
  } as const;

  const pillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.75, y: 14 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 20 },
    },
  };

  // Left side CTA card dynamic entry: slides upward while tilting into its balanced curved layout
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotate: 0,
      scale: 0.97
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: -2.2,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 45, 
        damping: 18,
        mass: 1.1
      } 
    }
  } as const;

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  } as const;

  const faqData: FAQItem[] = [
    {
      question: "What's the difference between a subscription and a custom project?",
      answer: "A subscription offers ongoing regular design updates, continuous support, and flexible request cycles perfect for growing products. Custom projects are tailored scope-specific engagements with predefined timelines and clear milestones built for specific product rollouts."
    },
    {
      question: "How fast is the turnaround?",
      answer: "Most design requests are handled within 48 to 72 hours. Complex requirements such as extensive user journeys, full interactive prototypes, or sophisticated design systems are broken into manageable milestones to ensure rapid continuous delivery."
    },
    {
      question: "How many requests can I make?",
      answer: "You can add as many design requests to your queue as you like. They will be processed one by one continuously ensuring focus, high-fidelity premium execution, and deep attention to structural details."
    },
    {
      question: "What types of design do you handle?",
      answer: "We cover user interface design (UI), user experience structure (UX), branding systems, component web layouts, responsive prototyping, and motion design tailored for clean digital ecosystems."
    },
    {
      question: "What tools do you use?",
      answer: "We specialize in Figma for UI/UX production and systems design, Framer and modern React frameworks for production animations, and Tailwind CSS structures for fluid interface code execution."
    },
  ];

  return (
    <section className="w-full px-6 pb-10 md:pb-20 overflow-hidden text-[#1A1A1A] font-sans select-none">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative mx-auto w-full max-w-3xl text-center"
        >
          {/* Eyebrow: "FAQ" flanked by thin lines matching site specs */}
          <motion.div
            variants={pillVariants}
            className="mb-4 flex items-center justify-center gap-4 text-neutral-500 sm:mb-6"
          >
            <span className="h-px w-10 bg-neutral-400/70" />
            <span className="font-serif text-lg italic tracking-wide">FAQ</span>
            <span className="h-px w-10 bg-neutral-400/70" />
          </motion.div>
          
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1A1A1A]">
              Your Questions, Answered
            </h2>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start"
        >
          {/* Left Column: Left Floating Interactive Call Card */}
          <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-start">
            <motion.div 
              variants={cardVariants} 
              className="relative w-full overflow-hidden rounded-[32px] bg-[#F2F2F2] p-8 md:p-10 shadow-2xl shadow-black/5 flex flex-col items-start origin-center will-change-transform"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-300">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                    alt="Joris van Dijk Avatar" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-[#1A1A1A]">Have more questions?</h3>
                  <p className="text-sm text-neutral-500 mt-0.5">Book a free discovery call</p>
                </div>
              </div>

              <a 
  href="#"
  className="group p-2 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0px_8px_24px_rgba(0,0,0,0.06),0px_16px_48px_rgba(0,0,0,0.04)] inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform w-full"
>
  <div className="relative w-full bg-black text-white px-6 md:px-10 py-4 md:py-[1.125rem] rounded-[2.5rem] font-normal text-sm flex items-center justify-center gap-3 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    <span className="relative z-10">Book an Appointment</span> 
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

              <p className="text-sm text-neutral-400 font-normal w-full text-center mt-4
               ">
                Or, email me at <a href="mailto:joris@hanzo.com" className="text-[#FF5C35] hover:underline transition-all">joris@hanzo.com</a>
              </p>
            </motion.div>
          </div>

          {/* Right Column: Premium Accordion Accorded List */}
          <div className="lg:col-span-7 w-full flex flex-col h-full">
            <div className="space-y-0 w-full">
              {faqData.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="w-full"
                  >
                    <motion.div 
                      variants={lineVariants}
                      className="h-[1px] w-full bg-neutral-300 origin-left"
                    />
                    
                    <button
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      className="w-full py-6 flex items-center justify-between text-left transition-all duration-300 relative z-10 focus:outline-none group"
                    >
                      <span className="text-base md:text-lg font-medium tracking-tight text-neutral-800 group-hover:text-black transition-colors duration-300 pr-4">
                        {item.question}
                      </span>
                      
                      <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                        {/* Horizontal Cross Piece */}
                        <span className="absolute h-[1.5px] w-4 bg-neutral-400 group-hover:bg-black transition-colors duration-300" />
                        {/* Vertical Cross Piece transitioning into open state */}
                        <motion.span 
                          animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="absolute h-4 w-[1.5px] bg-neutral-400 group-hover:bg-black transition-colors duration-300"
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: 'auto', 
                            opacity: 1,
                            transition: {
                              height: { type: 'spring', stiffness: 80, damping: 20 },
                              opacity: { duration: 0.25, ease: 'linear' }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { type: 'spring', stiffness: 100, damping: 22 },
                              opacity: { duration: 0.15 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pr-8 text-sm md:text-base text-neutral-500 font-normal leading-relaxed tracking-normal">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {index === faqData.length - 1 && (
                      <motion.div 
                        variants={lineVariants}
                        className="h-[1px] w-full bg-neutral-300 origin-left"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}