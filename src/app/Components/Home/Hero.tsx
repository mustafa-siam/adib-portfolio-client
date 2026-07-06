"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { ArrowRight } from "lucide-react";

const AnimatedText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            y: 55,
            scale: 0.9,
            filter: "blur(14px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.75,
            delay: index * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  const [startAnimation, setStartAnimation] = useState(false);

  const capsuleImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80",
  ];

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setStartAnimation(true);
      }, 180);
    });
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const fadeBlur: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.97,
      filter: "blur(16px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 20,
      },
    },
  };

  const badgeVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotate: -14,
      y: 40,
      filter: "blur(18px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: -5,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 210,
        damping: 16,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#efefef] min-h-screen pt-32">
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
        className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-white/80 blur-[140px]"
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
        className="absolute right-[-250px] top-0 h-[700px] w-[700px] rounded-full bg-white/70 blur-[170px]"
      />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,.95) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,.65) 100%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            variants={fadeBlur}
            className="mb-12 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-[0_15px_40px_rgba(0,0,0,.08)] border border-white"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-70 animate-ping" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <p className="text-[17px] font-medium tracking-[-.02em] text-neutral-800">
              Booking Open — 2 Spots Left
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-col items-center text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5">
              <AnimatedText
                text="Ultimate"
                className="text-5xl sm:text-7xl font-medium tracking-[-0.065em] leading-[0.92] text-[#111]"
              />

              <motion.div
                variants={badgeVariant}
                animate={{
                  y: [0, -6, 0],
                  rotate: [-4, -6, -4],
                  scale: [1, 1.015, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative h-[62px] w-[110px] md:h-[82px] md:w-[148px] overflow-hidden rounded-[22px] border border-black/10 shadow-[0_25px_45px_rgba(0,0,0,.28)] bg-neutral-900 origin-center"
              >
                <motion.div
                  animate={{
                    x: [
                      "0%",
                      "0%",
                      "-12.5%",
                      "-12.5%",
                      "-25%",
                      "-25%",
                      "-37.5%",
                      "-37.5%",
                      "-50%",
                      "-50%",
                      "-62.5%",
                      "-62.5%",
                      "-75%"
                    ]
                  }}
                  transition={{
                    times: [
                      0, 0.13, 0.16, 0.30, 0.33, 0.46, 0.50, 0.63, 0.66, 0.80, 0.83, 0.96, 1.0
                    ],
                    ease: [
                      "linear", "easeInOut",
                      "linear", "easeInOut",
                      "linear", "easeInOut",
                      "linear", "easeInOut",
                      "linear", "easeInOut",
                      "linear", "easeInOut"
                    ],
                    duration: 15,
                    repeat: Infinity,
                  }}
                  className="flex h-full w-[400%]"
                >
                  {[...capsuleImages, capsuleImages[0]].map((src, idx) => (
                    <div 
                      key={idx} 
                      className="relative h-full w-[110px] md:w-[148px] shrink-0"
                    >
                      <Image
                        fill
                        unoptimized
                        src={src}
                        alt="Carousel presentation"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <AnimatedText
                text="Saas Animation"
                className="text-5xl sm:text-7xl font-medium tracking-[-0.065em] leading-[0.92] text-[#8A8A8A]"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5">
              <AnimatedText
                text="for"
                className="text-5xl sm:text-8xl font-normal tracking-[-0.065em] leading-[0.92] text-[#8A8A8A]"
              />

            <motion.div
  variants={{
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotate: 14,
      y: 40,
      filter: "blur(18px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 5,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 210,
        damping: 16,
      },
    },
  }}
  animate={{
    y: [0, 6, 0],
    rotate: [5, 7, 5],
    scale: [1, 1.015, 1],
  }}
  transition={{
    duration: 5.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative flex h-[62px] w-[120px] md:h-[82px] md:w-[165px] overflow-hidden rounded-[24px] border border-black bg-[#1d1d1d] shadow-[0_22px_40px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.08)] origin-center"
>
  <motion.div
    animate={{
      x: ["0%", "-25%", "-50%", "-75%"],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.33, 0.66, 1],
    }}
    className="flex h-full w-[400%]"
  >
    {["Framer", "Webflow", "Figma", "Framer"].map((item, index) => (
      <div
        key={index}
        className="flex h-full w-[120px] md:w-[165px] shrink-0 items-center justify-center"
      >
        <span className="text-[18px] md:text-[24px] font-medium tracking-tight text-[#636363]">
          {item}
        </span>
      </div>
    ))}
  </motion.div>
</motion.div>
              <AnimatedText
                text="Solid"
                className="text-5xl sm:text-8xl font-medium tracking-[-0.065em] leading-[0.92] text-[#111]"
              />

              <AnimatedText
                text="Products"
                className="text-5xl sm:text-8xl font-medium tracking-[-0.065em] leading-[0.92] text-[#111]"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: 35,
              filter: "blur(14px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.9,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 max-w-[620px] text-center text-[18px] leading-[1.7] tracking-[-0.02em] text-[#707070]"
          >
            Helping WordPress Plugins and SaaS products to shape their Digital Space.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col sm:flex-row items-center sm:items-end gap-8 md:gap-10 mt-4 md:mt-8 mb-16"
          >
            <a href="#pricing" className="group p-2 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-[0px_8px_24px_rgba(0,0,0,0.06),0px_16px_48px_rgba(0,0,0,0.04)] inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <div className="relative bg-black text-white px-8 md:px-10 py-4 md:py-[1.125rem] rounded-[2.5rem] font-sf font-normal text-xl md:text-[1.35rem] flex items-center gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10">Contact Me</span> 
                <div className="relative z-10 w-6 h-6 md:w-6 md:h-6 flex items-center overflow-hidden">
                  <ArrowRight className="absolute w-6 h-6 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-full" strokeWidth={1.5} />
                  <ArrowRight className="absolute w-6 h-6 md:w-6 md:h-6 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" strokeWidth={1.5} />
                </div>
              </div>
            </a>
            
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="flex -space-x-3">
                {[
                  "https://i.pravatar.cc/100?img=11",
                  "https://i.pravatar.cc/100?img=32",
                  "https://i.pravatar.cc/100?img=33",
                  "https://i.pravatar.cc/100?img=12",
                  "https://i.pravatar.cc/100?img=13"
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-[2px] md:border-[2px] border-white bg-gray-300 overflow-hidden shadow-sm">
                     <img src={src} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
              <div className="text-gray-500 font-sf text-sm font-normal tracking-tight sm:pl-1">
                Trusted by founders
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}