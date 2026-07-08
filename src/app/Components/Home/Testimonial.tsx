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
    quote: "Working with Joris was a game-changer. He instantly understood our vision and translated it into a sleek, intuitive product. The process felt effortless, and the results exceeded our expectations.",
    author: "Sophie Lemaire",
    role: "Product Lead at Loomi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    quote: "Joris brings clarity to chaos. His design work is not only beautiful but deeply strategic. He helped us rebrand from the ground up, and our audience response has been incredible.",
    author: "Milan Bakker",
    role: "Founder of Drifted Studio",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
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
    <section className="w-full bg-[#efefef] pb-40 px-6 sm:px-12 lg:px-20 text-neutral-950 font-sans antialiased">
      {/* Top clean layout border layout separating process from testimonials */}
      <div className="relative max-w-7xl mx-auto ">
        
        {/* Asymmetric Responsive Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-0 relative">
          
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

          {/* RIGHT TESTIMONIAL BLOCK (Dropped significantly lower to align perfectly below left side) */}
          <div className="flex flex-col justify-between md:pl-14 lg:pl-20 pt-12 md:pt-[200px]">
            <div className="relative w-full">
              <div className="absolute right-0 top-1 text-neutral-500 text-4xl font-serif font-bold select-none pointer-events-none leading-none">
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
                className="w-[70px] h-[70px] rounded-full object-cover grayscale border border-neutral-300/40"
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