// src/components/FAQ.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type FaqItem = { question: string; answer: string };
type Props = {
  multiOpen?: boolean;
  onAsk?: () => void;
  askHref?: string;
};

const faqs: FaqItem[] = [
  {
    question: "Is Aangan free to use?",
    answer:
      "Yes! Aangan offers free access to core features like period tracking, symptom logging, and basic health insights. You can also upgrade to Premium for doctor access and personalized care tools.",
  },
  {
    question: "How accurate are the cycle predictions?",
    answer:
      "Aangan uses your past period data, symptoms, and lifestyle logs to improve prediction accuracy over time. The more you track, the smarter it gets!",
  },
  {
    question: "Can I talk to a real doctor through the app?",
    answer:
      "Absolutely. With a Premium plan, you can view verified doctor profiles, check their availability, and book appointments — either online or in-person.",
  },
  {
    question: "What are desi remedies, and are they doctor-approved?",
    answer:
      "Desi remedies are natural, culturally rooted wellness tips — like herbal teas or food-based solutions. We curate them with input from doctors and herbalists to ensure safety and effectiveness.",
  },
  {
    question: "I'm a teenager. Is this app right for me?",
    answer:
      "Yes! Aangan is designed for all age groups — including teens just starting their period journey. It's easy to use, private, and supportive.",
  },
  {
    question: "Is my health data private?",
    answer:
      "100%. Your data is stored securely and is never shared without your permission. You're always in control of your information.",
  },
];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

const FaqRow = React.memo(function FaqRow({
  faq,
  index,
  open,
  toggle,
  baseTransition,
  reduce,
}: {
  faq: FaqWithIds;
  index: number;
  open: boolean;
  toggle: (i: number) => void;
  baseTransition: { duration: number; ease: "easeOut" };
  reduce: boolean;
}) {
  return (
    <motion.div
      key={faq.slug}
      layout="position"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ layout: { duration: reduce ? 0 : 0.2, ease: "easeOut" }, ...baseTransition }}
      className={[
        "border rounded-lg sm:rounded-xl overflow-hidden bg-white transition-shadow",
        open ? "border-gray-200 shadow-md" : "border-gray-100 shadow-sm hover:shadow-md",
      ].join(" ")}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={faq.headerId}
          aria-controls={faq.panelId}
          aria-expanded={open}
          onClick={() => toggle(index)}
          className={[
            "w-full text-left flex justify-between items-center",
            "px-3 py-3 sm:px-6 sm:py-5 min-h-[44px]",
            "font-semibold text-gray-900 text-base sm:text-lg",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2",
            "transition-colors",
          ].join(" ")}
        >
          <span className="pr-2">{faq.question}</span>
          <motion.svg
            className="shrink-0 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={faq.panelId}
            role="region"
            aria-labelledby={faq.headerId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
            className="px-3 pb-3 pt-1 sm:px-6 sm:pb-5 bg-rose-50/60 border-t border-rose-100"
          >
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
},
// Only re-render a row if its open state or its FAQ content changes
(prev, next) =>
  prev.open === next.open &&
  prev.faq.question === next.faq.question &&
  prev.faq.answer === next.faq.answer &&
  prev.faq.slug === next.faq.slug
);

type FaqWithIds = FaqItem & { slug: string; headerId: string; panelId: string };

const FAQ: React.FC<Props> = React.memo(function FAQ({ multiOpen = false, onAsk, askHref }) {
  const reduce = !!useReducedMotion();

  const items: FaqWithIds[] = useMemo(() => {
    return faqs.map((f) => {
      const slug = slugify(f.question);
      return {
        ...f,
        slug,
        headerId: `faq-header-${slug}`,
        panelId: `faq-panel-${slug}`,
      };
    });
  }, []);

  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set());
  const isOpen = useCallback((idx: number) => openSet.has(idx), [openSet]);

  const clearHash = useCallback(() => {
    if (typeof window !== "undefined") {
      const { pathname, search } = window.location;
      history.replaceState(null, "", `${pathname}${search}`);
    }
  }, []);

  const setHash = useCallback(
    (slug?: string) => {
      if (typeof window === "undefined") return;
      if (!slug) return void clearHash();
      history.replaceState(null, "", `#${slug}`);
    },
    [clearHash]
  );

  const openBySlug = useCallback(
    (hash: string) => {
      const target = hash.startsWith("#") ? hash.slice(1) : hash;
      const idx = items.findIndex((x) => x.slug === target);
      if (idx >= 0) {
        setOpenSet((prev) => {
          const next = new Set(prev);
          if (multiOpen) next.add(idx);
          else {
            next.clear();
            next.add(idx);
          }
          return next;
        });
      }
    },
    [items, multiOpen]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) openBySlug(window.location.hash);
    const onHashChange = () => openBySlug(window.location.hash);
    window.addEventListener("hashchange", onHashChange, { passive: true });
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [openBySlug]);

  const toggle = useCallback(
    (index: number) => {
      setOpenSet((prev) => {
        const next = new Set(prev);
        if (next.has(index)) next.delete(index);
        else {
          if (!multiOpen) next.clear();
          next.add(index);
        }
        // update hash based on the first (lowest) open index for stability
        if (next.size === 0) setHash(undefined);
        else {
          const first = Math.min(...Array.from(next));
          setHash(items[first].slug);
        }
        return next;
      });
    },
    [items, multiOpen, setHash]
  );

  const baseTransition = useMemo(
    () => ({ duration: reduce ? 0 : 0.25, ease: "easeOut" as const }),
    [reduce]
  );

  return (
    <motion.section
      className="w-full pt-2 pb-6 px-2 sm:pt-6 sm:pb-16 sm:px-6 md:px-16 bg-[#fdf8f7]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center text-2xl sm:text-4xl md:text-5xl font-sans mb-2 sm:mb-4 text-gray-800 font-medium tracking-tight leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: reduce ? 0 : 0.05, duration: reduce ? 0 : 0.3, ease: "easeOut" }}
        >
          <span className="font-light">Frequently </span>
          <span className="font-medium">Asked </span>
          <span className="font-extralight text-pink-400">Questions</span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-6 sm:mb-12 max-w-2xl mx-auto text-base sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: reduce ? 0 : 0.1, duration: reduce ? 0 : 0.25, ease: "easeOut" }}
        >
          These are some of the most common questions from our community.
        </motion.p>

        <div className="space-y-0">
          {items.map((faq, index) => (
            <FaqRow
              key={faq.slug}
              faq={faq}
              index={index}
              open={isOpen(index)}
              toggle={toggle}
              baseTransition={baseTransition}
              reduce={reduce}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: reduce ? 0 : 0.18, ...baseTransition }}
        >
          {onAsk ? (
            <button
              type="button"
              onClick={onAsk}
              className="px-6 py-2 sm:px-8 sm:py-2.5 rounded-lg sm:rounded-xl text-white font-medium text-lg sm:text-xl transition-transform hover:scale-105 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 bg-[#fc9ac3] inline-flex items-center justify-center gap-2.5"
            >
              Ask a Question
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C10.3 2 8.8 2.6 7.7 3.7C6.6 4.8 6 6.3 6 8h2c0-1.1 0.4-2.1 1.2-2.8C9.9 4.4 10.9 4 12 4s2.1 0.4 2.8 1.2C15.6 5.9 16 6.9 16 8c0 1.5-1 2.5-2 3.5c-1 1-2 2-2 3.5v1h2v-1c0-0.5 1-1.5 2-2.5c1-1 2-2 2-4.5c0-1.7-0.6-3.2-1.7-4.3C15.2 2.6 13.7 2 12 2z" />
                <circle cx="13" cy="20" r="1.5" />
              </svg>
            </button>
          ) : askHref ? (
            <a
              href={askHref}
              className="px-6 py-2 sm:px-8 sm:py-2.5 rounded-lg sm:rounded-xl text-white font-medium text-lg sm:text-xl transition-transform hover:scale-105 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 bg-[#fc9ac3] inline-flex items-center justify-center gap-2.5"
            >
              Ask a Question
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C10.3 2 8.8 2.6 7.7 3.7C6.6 4.8 6 6.3 6 8h2c0-1.1 0.4-2.1 1.2-2.8C9.9 4.4 10.9 4 12 4s2.1 0.4 2.8 1.2C15.6 5.9 16 6.9 16 8c0 1.5-1 2.5-2 3.5c-1 1-2 2-2 3.5v1h2v-1c0-0.5 1-1.5 2-2.5c1-1 2-2 2-4.5c0-1.7-0.6-3.2-1.7-4.3C15.2 2.6 13.7 2 12 2z" />
                <circle cx="13" cy="20" r="1.5" />
              </svg>
            </a>
          ) : (
            <button
              type="button"
              className="px-6 py-2 sm:px-8 sm:py-2.5 rounded-lg sm:rounded-xl text-white font-medium text-lg sm:text-xl transition-transform hover:scale-105 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 bg-[#fc9ac3] inline-flex items-center justify-center gap-2.5"
            >
              Ask a Question
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C10.3 2 8.8 2.6 7.7 3.7C6.6 4.8 6 6.3 6 8h2c0-1.1 0.4-2.1 1.2-2.8C9.9 4.4 10.9 4 12 4s2.1 0.4 2.8 1.2C15.6 5.9 16 6.9 16 8c0 1.5-1 2.5-2 3.5c-1 1-2 2-2 3.5v1h2v-1c0-0.5 1-1.5 2-2.5c1-1 2-2 2-4.5c0-1.7-0.6-3.2-1.7-4.3C15.2 2.6 13.7 2 12 2z" />
                <circle cx="13" cy="20" r="1.5" />
              </svg>
            </button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
});

export default FAQ;
