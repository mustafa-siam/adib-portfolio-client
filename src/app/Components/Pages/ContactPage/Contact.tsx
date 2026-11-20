"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "motion/react";
import { ArrowLeft, ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";
const EMAIL = "ishraqaladib@gmail.com";
const EASE = [0.22, 1, 0.36, 1] as const;

const FONT_STACK =
  'var(--font-inter), Inter, "Helvetica Neue", Helvetica, Arial, sans-serif';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const STEPS = [
  {
    n: "01",
    title: "You send the brief",
    text: "Share the goal, the style and what needs delivering. Rough is fine.",
  },
  {
    n: "02",
    title: "I reply within 24 hours",
    text: "A personal answer with questions, ideas and a clear way forward.",
  },
  {
    n: "03",
    title: "We shape the plan",
    text: "Scope, timeline and price agreed before any work begins.",
  },
];

export default function ContactPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-[#F1F1EF] to-[#E8E8E6] px-4 pb-24 pt-28 text-neutral-900 selection:bg-neutral-900 selection:text-white sm:px-6 sm:pt-32 lg:px-8"
      style={{ fontFamily: FONT_STACK }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => router.back()}
          className="group mb-10 inline-flex cursor-pointer items-center rounded-full border border-neutral-200/60 bg-white/80 p-1 shadow-[0px_4px_16px_rgba(0,0,0,0.03)] backdrop-blur-md transition-transform hover:scale-[1.02] active:scale-[0.98] sm:mb-14"
        >
          <div className="relative flex items-center gap-2.5 overflow-hidden rounded-full bg-neutral-900 py-2 pl-4 pr-5 text-xs font-medium text-white sm:text-sm">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-3.5 w-3.5 items-center overflow-hidden">
              <ArrowLeft
                className="absolute h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-full"
                strokeWidth={2}
              />
              <ArrowLeft
                className="absolute h-3.5 w-3.5 translate-x-full transition-transform duration-300 group-hover:translate-x-0"
                strokeWidth={2}
              />
            </div>
            <span className="relative z-10 tracking-tight">Back</span>
          </div>
        </motion.button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: intro */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-[13px] text-neutral-700 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open for new projects
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[2.6rem] font-bold leading-[1.04] tracking-[-0.045em] text-neutral-900 sm:text-6xl"
            >
              Let&apos;s make your story move.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg"
            >
              Tell me about your product, your idea or your footage. I&apos;ll
              help turn it into clear, compelling motion with a human touch.
            </motion.p>

            {/* Quick facts */}
            <motion.ul
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 text-[15px] text-neutral-700"
            >
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white">
                  <Clock className="h-4 w-4" />
                </span>
                Replies within 24 hours
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white">
                  <MapPin className="h-4 w-4" />
                </span>
                Based in Bangladesh · Working worldwide
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white">
                  <Mail className="h-4 w-4" />
                </span>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-1 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                >
                  {EMAIL}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            </motion.ul>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="lg:col-span-7"
          >
            <ContactForm/>
          </motion.div>
        </div>
      </div>
    </main>
  );
}