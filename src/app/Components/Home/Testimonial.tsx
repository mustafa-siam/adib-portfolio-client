"use client";

import { Quote } from "lucide-react";
import { motion, Variants } from "motion/react";
import React from "react";

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

const testimonials: TestimonialItem[] = [
  {
    quote: "With only 48 hours to create a 2 minute explainer video for the EBL Undergrad Startup Challenge 2025, Adib took full charge of the creative direction and post production. He edited the entire video overnight, helping Zagle.ai secure 2nd Place in the competition.He quickly understands a brand's vision and gives his all to every project. I highly recommend working with him.",
    author: "Fahim Ahmed Nafis",
    role: "Founder & CEO, Zagle.ai",
    avatar: "/fahim.jpeg",
  },
  {
    quote: "Building Aurum Concierge from the ground up was a big task, but Ishraq and his team made the process seamless. They brought my vision to life with outstanding branding and a professional website, delivering everything quickly with excellent communication. Their dedication made it an easy decision to continue working with them for marketing consultancy. I highly recommend their team.",
    author: "Damarys Arroyo",
    role: "Aurum Concierge",
    avatar: "/aurrum.jpeg",
  },
];

// Explicitly type variants using the library's Variants interface
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025, // Staggers the arrival of each individual word
    },
  },
};

const wordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 6 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.215, 0.61, 0.355, 1] as const // Fixed the TypeScript type error using 'as const'
    } 
  },
};

export default function TestimonialSection() {
  return (
    <section className="w-full px-6  text-neutral-950 font-sans antialiased">
      <div className="relative max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          
          {/* Visible Center Vertical Divider Line matching image_cadac6.jpg */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gray-400" />

          {/* LEFT TESTIMONIAL BLOCK (Aligned to top) */}
          <div className="flex flex-col md:pr-14 lg:pr-20 pb-6 md:pb-0">
            <div className="relative w-full">
              {/* Clean right-aligned light grey quote mark glyph */}
              <div className="absolute right-0 top-1 text-neutral-500 text-4xl font-serif font-bold select-none pointer-events-none leading-none">
                 <Quote></Quote>
              </div>
              
              <motion.h3 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-[21px] sm:text-2xl leading-[1.55] text-neutral-900 font-medium tracking-tight pr-8 flex flex-wrap"
              >
                {testimonials[0].quote.split(" ").map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="inline-block mr-[6px] mb-[2px]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h3>
            </div>

            {/* User Profile Info Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-4 mt-10"
            >
              <img 
                src={testimonials[0].avatar} 
                alt={testimonials[0].author} 
                className="w-[70px] h-[70px] rounded-full object-cover grayscale border border-neutral-300/40"
              />
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-neutral-900 leading-tight tracking-tight">
                  {testimonials[0].author}
                </h4>
                <p className="text-[14px] text-neutral-400 font-medium mt-0.5 tracking-wide">
                  {testimonials[0].role}
                </p>
              </div>
            </motion.div>
          </div>
            <hr className="mt-6 md:hidden block" />
          {/* RIGHT TESTIMONIAL BLOCK (Dropped significantly lower to align perfectly below left side) */}
          <div className="flex flex-col justify-between md:pl-14 lg:pl-20 pt-12 md:pt-32">
            <div className="relative w-full">
              <div className="absolute right-0 top-1 text-neutral-500 text-2xl font-serif font-bold select-none pointer-events-none leading-none tracking-tighter">
                <Quote></Quote>
              </div>
              
              <motion.h3 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-[21px] sm:text-[23px] leading-[1.55] text-neutral-900 font-medium tracking-tight pr-8 flex flex-wrap"
              >
                {testimonials[1].quote.split(" ").map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="inline-block mr-[6px] mb-[2px]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h3>
            </div>

            {/* User Profile Info Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-4 mt-10"
            >
              <img 
                src={testimonials[1].avatar} 
                alt={testimonials[1].author} 
                className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full object-cover grayscale border border-neutral-300/40"
              />
              <div className="flex flex-col">
                <h4 className="text-base font-bold text-neutral-900 leading-tight tracking-tight">
                  {testimonials[1].author}
                </h4>
                <p className="text-[14px] text-neutral-400 font-medium mt-0.5 tracking-wide">
                  {testimonials[1].role}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}