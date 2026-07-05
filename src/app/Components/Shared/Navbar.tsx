"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const NAV_LINKS = [
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-6.6L4.8 22H1.6l8.1-9.3L1 2h7.1l4.9 6.1L18.9 2Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 p-6">
      <div className="mx-auto flex max-w-7xl items-start justify-between">
        {/* Logo */}
        <motion.a
          href="#top"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="pointer-events-auto rounded-full bg-white px-6 py-3 text-base font-semibold tracking-tight text-black shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
        >
          Hanzo
        </motion.a>

        {/* Menu toggle + dropdown */}
        <div className="pointer-events-auto relative">
          <motion.button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
          >
            <svg
  viewBox="0 0 24 24"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.4"
  strokeLinecap="round"
>
  {/* Top line */}
  <motion.g
    animate={
      isOpen
        ? { rotate: 45, y: 4 }
        : { rotate: 0, y: 0 }
    }
    transition={{
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }}
    style={{ transformOrigin: "12px 8px" }}
  >
    <line x1="3" y1="8" x2="21" y2="8" />
  </motion.g>

  {/* Bottom line */}
  <motion.g
    animate={
      isOpen
        ? { rotate: -45, y: -4 }
        : { rotate: 0, y: 0 }
    }
    transition={{
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }}
    style={{ transformOrigin: "12px 16px" }}
  >
    <line x1="3" y1="16" x2="21" y2="16" />
  </motion.g>
</svg>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-16 w-72 origin-top-right rounded-3xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
              >
                <ul className="flex flex-col gap-5 text-lg text-black">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        className="transition-opacity hover:opacity-60"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + NAV_LINKS.length * 0.04, duration: 0.25 }}
                  >
                    <a
                      href="#get-template"
                      className="font-medium text-orange-600 transition-opacity hover:opacity-70"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Template
                    </a>
                  </motion.li>
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-7 flex items-center gap-3"
                >
                  {SOCIALS.map(({ icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:bg-black hover:text-white"
                    >
                      {icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}