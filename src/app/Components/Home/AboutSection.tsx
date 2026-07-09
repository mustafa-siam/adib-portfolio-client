"use client"
import { motion, Variants } from 'motion/react';

export default function AboutSection() {
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

  // The image animates from a straight upward movement into its signature curved tilt as it enters the viewport
  const imageCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotate: 0,
      scale: 0.96
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: -1.8,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 45, 
        damping: 18,
        mass: 1.2
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

  const descriptionText = "Joris van Dijk is a Dutch designer known for his minimalist, expressive digital work. He helps startups and studios create clean interfaces and strong branding. Based in Utrecht, he blends function with emotion — and often spends his free time cycling or exploring generative art.";
  const words = descriptionText.split(" ");

  const textContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  } as const;

  const wordVariants = {
    hidden: { 
      opacity: 0.15,
      y: 2
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: 'easeOut'
      } 
    },
  } as const;

  const experienceData = [
    { role: 'Freelance Practice', company: 'Hanzo Co.', period: '2011 — Now' },
    { role: 'Design Lead', company: 'Google', period: '2024 — Now' },
    { role: 'Senior Designer', company: 'PayPal', period: '2019 — 2024' },
    { role: 'Product Designer', company: 'Meta', period: '2016 — 2019' },
  ];

  return (
    <section className="bg-[#EBEBEB] text-[#1A1A1A] font-sans min-h-screen w-full py-28 px-6 md:px-12 lg:px-20 overflow-hidden flex flex-col justify-center select-none">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative mx-auto w-full max-w-3xl text-center"
        >
          {/* Eyebrow: "Hello!" flanked by hairlines */}
          <motion.div
            variants={pillVariants}
            className="mb-4 flex items-center justify-center gap-4 text-neutral-500 sm:mb-6"
          >
            <span className="h-px w-10 bg-neutral-400/70" />
            <span className="font-serif text-lg italic tracking-wide">About</span>
            <span className="h-px w-10 bg-neutral-400/70" />
          </motion.div>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-400">
              Pushing boundaries{' '}
              <span className="text-[#1A1A1A] font-medium">since 2011</span>
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
          <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-start">
            <motion.div 
              variants={imageCardVariants} 
              className="relative w-full overflow-hidden rounded-[36px] bg-[#DCDCDC] shadow-2xl shadow-black/5 aspect-[4/3] lg:aspect-[10/11] origin-center will-change-transform"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                alt="Joris van Dijk"
                className="w-full h-full object-cover grayscale brightness-95 contrast-[1.02] transition-all duration-1000 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-[36px] pointer-events-none" />
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8 flex justify-between items-start w-full px-4 rotate-[-1.8deg]">
              <div className="flex gap-4 text-neutral-400 text-sm">
                <a href="#" className="hover:text-black transition-colors duration-300">Instagram</a>
                <a href="#" className="hover:text-black transition-colors duration-300">LinkedIn</a>
                <a href="#" className="hover:text-black transition-colors duration-300">X</a>
              </div>
              <div className="text-right">
                <h4 className="font-semibold text-sm tracking-wide text-[#1A1A1A]">Joris van Dijk</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Hanzo Studio, Founder</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 w-full flex flex-col justify-between h-full pt-4">
            <motion.div 
              variants={textContainerVariants}
              className="flex flex-wrap gap-x-[6px] gap-y-1 text-xl md:text-2xl lg:text-[26px] font-normal leading-relaxed text-neutral-800 max-w-2xl tracking-tight"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <div className="mt-20 lg:mt-28 space-y-0 w-full border-l border-neutral-300 pl-6 md:pl-8">
              {experienceData.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="group relative"
                >
                  <motion.div 
                    variants={lineVariants}
                    className="h-[1px] w-full bg-neutral-300 origin-left"
                  />
                  
                  <div className="py-6 flex items-center justify-between transition-all duration-300 group-hover:px-2 relative z-10">
                    <span className="text-sm font-medium tracking-wide text-neutral-800 group-hover:text-black transition-colors duration-300">
                      {item.role}
                    </span>
                    <span className="text-sm text-neutral-500 absolute left-1/2 -translate-x-1/2 hidden md:inline group-hover:text-black transition-colors duration-300">
                      {item.company}
                    </span>
                    <span className="text-sm font-mono text-neutral-400 group-hover:text-black transition-colors duration-300">
                      {item.period}
                    </span>
                  </div>
                  
                  {index === experienceData.length - 1 && (
                    <motion.div 
                      variants={lineVariants}
                      className="h-[1px] w-full bg-neutral-300 origin-left"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}