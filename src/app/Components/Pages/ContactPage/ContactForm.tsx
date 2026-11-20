"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, Variants } from "motion/react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Loader2,
  Plus,
  X,
} from "lucide-react";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const FONT_STACK =
  'var(--font-inter), Inter, "Helvetica Neue", Helvetica, Arial, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = ["Motion design", "Video editing", "A bit of both"];

const BUDGETS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const TIMELINES = [
  "As soon as possible",
  "Within 2 weeks",
  "Within a month",
  "1 – 3 months",
  "Flexible",
];

type FormState = {
  name: string;
  email: string;
  services: string[];
  message: string;
  budget: string;
  timeline: string;
  link: string;
  company: string; // honeypot – real users never see/fill this
};

type Errors = Partial<Record<"name" | "email" | "message" | "link", string>>;

const INITIAL: FormState = {
  name: "",
  email: "",
  services: [],
  message: "",
  budget: "",
  timeline: "",
  link: "",
  company: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputBase =
  "w-full rounded-[20px] border bg-[#F6F6F4] px-5 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:border-neutral-400 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]";

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

function Label({
  children,
  hint,
  htmlFor,
}: {
  children: React.ReactNode;
  hint?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block text-[15px] text-neutral-800"
    >
      {children}
      {hint && (
        <span className="ml-2 text-[13px] text-neutral-400">{hint}</span>
      )}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 text-[13px] text-red-500"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [showLink, setShowLink] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please tell me your name.";
    if (!EMAIL_RE.test(form.email.trim()))
      e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      e.message = "A couple of sentences about the project helps a lot.";
    if (showLink && form.link.trim() && !/^https?:\/\/\S+\.\S+/.test(form.link.trim()))
      e.link = "Please enter a full link starting with http(s)://";
    return e;
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === "sending") return;

    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
    if (form.company) {
      setStatus("sent");
      return;
    }

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setServerError(
        "Email service isn't configured yet. Add the EmailJS keys to .env.local."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          reply_to: form.email.trim(),
          services: form.services.length
            ? form.services.join(", ")
            : "Not specified",
          message: form.message.trim(),
          budget: form.budget || "Not specified",
          timeline: form.timeline || "Not specified",
          reference_link: form.link.trim() || "None provided",
          submitted_at: new Date().toLocaleString("en-GB", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "Asia/Dhaka",
          }),
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
    } catch {
      setServerError(
        "Something went wrong while sending. Please try again, or email me directly."
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setForm(INITIAL);
    setErrors({});
    setShowLink(false);
    setStatus("idle");
    setServerError("");
  };

  return (
    <div
      className="relative overflow-hidden rounded-[36px] border border-white bg-[#FBFBFA] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] sm:p-10 lg:p-[3.75rem]"
      style={{ fontFamily: FONT_STACK }}
    >
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex min-h-[520px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-white shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
            >
              <Check className="h-9 w-9" strokeWidth={2.2} />
            </motion.div>
            <h3 className="mt-8 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Inquiry sent. Thank you!
            </h3>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-neutral-500">
              Your message is in my inbox. I&apos;ll read it carefully and reply
              to <span className="text-neutral-800">{form.email || "you"}</span>{" "}
              within 24 hours.
            </p>
            <button
              onClick={reset}
              className="mt-8 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100"
            >
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            variants={listVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-9"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {/* Name + Email */}
            <motion.div
              variants={fieldVariants}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
            >
              <div>
                <Label htmlFor="name">Your name *</Label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={`${inputBase} h-[48px] sm:h-[50px] ${
                    errors.name ? "border-red-300" : "border-neutral-200"
                  }`}
                />
                <FieldError message={errors.name} />
              </div>
              <div>
                <Label htmlFor="email">Email address *</Label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`${inputBase} h-[48px] sm:h-[50px] ${
                    errors.email ? "border-red-300" : "border-neutral-200"
                  }`}
                />
                <FieldError message={errors.email} />
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={fieldVariants}>
              <Label hint="Select any">What can I help you with?</Label>
              <div className="flex flex-wrap gap-3">
                {SERVICES.map((s) => {
                  const active = form.services.includes(s);
                  return (
                    <motion.button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      whileTap={{ scale: 0.95 }}
                      aria-pressed={active}
                      className={`flex h-[48px] items-center gap-2 rounded-full border px-6 text-[15px] transition-colors duration-200 ${
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-transparent text-neutral-600 hover:border-neutral-400 hover:bg-white"
                      }`}
                    >
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.span
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 16, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <Check className="h-4 w-4" strokeWidth={2.4} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {s}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fieldVariants}>
              <Label htmlFor="message">Tell me about your project *</Label>
              <textarea
                id="message"
                rows={5}
                placeholder="What are you creating? Share the goal, style, and what you need delivered."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={`${inputBase} min-h-[130px] resize-y rounded-[22px] py-4 leading-relaxed sm:min-h-[150px] ${
                  errors.message ? "border-red-300" : "border-neutral-200"
                }`}
              />
              <FieldError message={errors.message} />
            </motion.div>

            {/* Budget + Timeline */}
            <motion.div
              variants={fieldVariants}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
            >
              <div>
                <Label htmlFor="budget" hint="USD · optional">
                  Project budget
                </Label>
                <div className="relative">
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    className={`${inputBase} h-[48px] cursor-pointer appearance-none border-neutral-200 pr-12 sm:h-[50px] ${
                      form.budget ? "text-neutral-900" : "text-neutral-800"
                    }`}
                  >
                    <option value="">Select a range</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-700" />
                </div>
              </div>
              <div>
                <Label htmlFor="timeline" hint="Optional">
                  When do you need it?
                </Label>
                <div className="relative">
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className={`${inputBase} h-[48px] cursor-pointer appearance-none border-neutral-200 pr-12 sm:h-[50px]`}
                  >
                    <option value="">Select a timeline</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-700" />
                </div>
              </div>
            </motion.div>

            {/* Reference link */}
            <motion.div variants={fieldVariants} className="-mt-3">
              <AnimatePresence initial={false} mode="wait">
                {showLink ? (
                  <motion.div
                    key="link-input"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="url"
                        placeholder="https://drive.google.com/… or a Figma / YouTube link"
                        value={form.link}
                        onChange={(e) => update("link", e.target.value)}
                        autoFocus
                        className={`${inputBase} h-[48px] ${
                          errors.link ? "border-red-300" : "border-neutral-200"
                        }`}
                      />
                      <button
                        type="button"
                        aria-label="Remove link"
                        onClick={() => {
                          setShowLink(false);
                          update("link", "");
                        }}
                        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <FieldError message={errors.link} />
                  </motion.div>
                ) : (
                  <motion.button
                    key="link-btn"
                    type="button"
                    onClick={() => setShowLink(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group flex items-center gap-3 text-[15px] text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    <Plus
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                      strokeWidth={2}
                    />
                    Add a reference or project link
                    <span className="text-[13px] text-neutral-400">
                      Optional
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fieldVariants}>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="group relative w-full rounded-full bg-neutral-200/60 p-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.10)] disabled:cursor-not-allowed disabled:opacity-80"
              >
                <span className="relative flex h-[56px] w-full items-center justify-between overflow-hidden rounded-full bg-[#111] px-7 text-[16px] font-medium text-white sm:h-[62px]">
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10">
                    {status === "sending"
                      ? "Sending…"
                      : "Send project inquiry"}
                  </span>
                  <span className="relative z-10 flex h-6 w-6 items-center overflow-hidden">
                    {status === "sending" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <ArrowUpRight
                          className="absolute h-6 w-6 transition-transform duration-300 group-hover:-translate-y-full group-hover:translate-x-full"
                          strokeWidth={1.5}
                        />
                        <ArrowUpRight
                          className="absolute h-6 w-6 -translate-x-full translate-y-full transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                          strokeWidth={1.5}
                        />
                      </>
                    )}
                  </span>
                </span>
              </motion.button>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] text-red-600"
                  >
                    {serverError}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="mt-5 text-center text-[14px] text-neutral-500">
                A little detail is enough to get the conversation started.
              </p>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}