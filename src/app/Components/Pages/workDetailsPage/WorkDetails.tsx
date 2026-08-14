"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { motion, Variants } from "motion/react";
import { ArrowLeft, ArrowUpRight, Play, CheckCircle2, Sparkles, Layers, Video } from "lucide-react";
import { CASE_STUDIES } from "@/app/Components/data/case-studies";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function CaseStudyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const videoId = getYouTubeId(study.videoUrl);

  return (
    <main className="min-h-screen bg-[#FBFBFB] text-neutral-900 pt-16 sm:pt-24 pb-32 selection:bg-neutral-900 selection:text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Navigation / Return Button */}
        <div className="w-full flex justify-start mb-8 sm:mb-12 mt-12">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => router.back()}
            className="group p-1 bg-white/80 backdrop-blur-md rounded-full shadow-[0px_4px_16px_rgba(0,0,0,0.03)] inline-flex items-center hover:scale-[1.02] active:scale-[0.98] transition-all border border-neutral-200/60 cursor-pointer text-neutral-800"
          >
            <div className="bg-neutral-900 text-white pl-4 pr-5 py-2.5 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2.5 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative w-4 h-4 flex items-center overflow-hidden">
                <ArrowLeft className="absolute w-4 h-4 transition-transform duration-300 group-hover:-translate-x-full" strokeWidth={2} />
                <ArrowLeft className="absolute w-4 h-4 translate-x-full transition-transform duration-300 group-hover:translate-x-0" strokeWidth={2} />
              </div>
              <span className="relative z-10 tracking-tight font-sans">Return to Studio</span>
            </div>
          </motion.button>
        </div>

        {/* Hero Header */}
        <section className="text-center flex flex-col items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08]"
            >
              {study.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl leading-relaxed font-normal"
            >
              {study.summary}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
              {study.liveLink && (
                <a
                  href={study.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm"
                >
                  View Live Project <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-neutral-200/80 text-neutral-900 hover:bg-neutral-50 transition-all shadow-xs"
              >
                Start a Project <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Media / Video Card */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 relative w-full overflow-hidden rounded-3xl bg-neutral-950 shadow-2xl border border-neutral-800/50 aspect-[16/9] group"
          >
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1`}
                className="absolute inset-0 h-full w-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={study.title}
              />
            ) : (
              <Image
                src={study.poster}
                alt={study.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              />
            )}
          </motion.div>
        </section>

        {/* Overview Section */}
        <section className="mt-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Overview & Impact
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
              {study.overview.heading}
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {study.overview.description}
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          {study.overview.stats.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="mt-14 grid gap-5 grid-cols-2 lg:grid-cols-4"
            >
              {study.overview.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white border border-neutral-200/80 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-xs hover:border-neutral-300 transition-colors"
                >
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">
                    {stat.value}
                  </span>
                  <span className="mt-3 text-xs sm:text-sm text-neutral-500 font-medium leading-snug">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Process & Execution Section */}
        <section className="mt-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Process Details */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-7 bg-white border border-neutral-200/80 rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  Editorial Process
                </span>
                <h3 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                  {study.process.heading}
                </h3>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  {study.process.description}
                </p>

                {/* Steps List */}
                <div className="mt-10 space-y-6">
                  {study.process.steps.map((step) => (
                    <div key={step.number} className="flex gap-5 items-start group">
                      <span className="flex-none w-8 h-8 rounded-full bg-neutral-100 text-neutral-900 font-semibold text-xs flex items-center justify-center border border-neutral-200 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                        {step.number}
                      </span>
                      <div>
                        <h4 className="text-base font-semibold text-neutral-900">
                          {step.title}
                        </h4>
                        <p className="text-sm text-neutral-500 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Process Highlight Image / Visual */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-5 relative min-h-[380px] rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-lg group"
            >
              <Image
                src={study.process.image}
                alt="Process highlight visual"
                fill
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white/90">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">Editing Highlights</span>
                <p className="text-sm font-medium">Precision pacing, seamless motion graphics & custom sound design.</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonial Section */}
        {study.testimonial && (
          <section className="mt-28 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center relative overflow-hidden shadow-2xl"
            >
              <blockquote className="text-2xl sm:text-4xl font-semibold tracking-tight max-w-3xl leading-snug text-neutral-100">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-800 border-2 border-neutral-700">
                  <Image
                    src={study.testimonial.avatar}
                    alt={study.testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold text-white leading-none">
                    {study.testimonial.author}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1 leading-none">
                    {study.testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-28 max-w-4xl mx-auto text-center" id="contact">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-neutral-200/80 rounded-3xl p-10 sm:p-16 flex flex-col items-center shadow-xs"
          >
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              2 spots available for this month
            </div>

            <h2 className="mt-6 text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight max-w-xl">
              Want your video to feel this polished?
            </h2>

            <p className="mt-4 text-base text-neutral-500 max-w-lg leading-relaxed">
              Send your raw footage or rough concept. I will help shape the storyline, rhythm, visual effects, and sound design.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Book a Call
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}