// src/components/FAQ.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ---------- Types ---------- */
type FaqItem = { question: string; answer: string };
type Props = {
  multiOpen?: boolean;
  onAsk?: () => void;
  askHref?: string;
};
type FaqWithIds = FaqItem & { slug: string; headerId: string; panelId: string };

/* ---------- Data ---------- */
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

/* ---------- Utils ---------- */
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

/* ---------- Liquid Glass CTA (no emoji) ---------- */
const ctaClasses = [
  "group relative inline-flex items-center justify-center gap-2.5",
  "px-6 py-3.5 sm:px-8 rounded-[999px] text-base sm:text-lg font-semibold",
  "text-[#5b2a36] select-none overflow-hidden whitespace-nowrap",
  "bg-[#fed5df]/90 backdrop-blur-xl ring-1 ring-white/60",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_24px_rgba(254,213,223,0.60)]",
  "transition-all duration-300 ease-out transform",
  "md:hover:scale-[1.04] hover:-translate-y-[1px] active:translate-y-0",
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_16px_40px_rgba(254,213,223,0.85)]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2"
].join(" ");

const GlassLayers = () => (
  <>
    <span
      className="pointer-events-none absolute inset-[1px] rounded-[999px] opacity-80"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.22) 35%, rgba(255,255,255,0.10) 60%, rgba(255,255,255,0.06) 100%)",
      }}
    />
    <span className="pointer-events-none absolute -top-4 left-6 h-10 w-24 rounded-full bg-white/60 blur-2xl opacity-70 transform-gpu transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-1" />
    <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/30 blur-md opacity-0 group-hover:opacity-70 group-hover:translate-x-[220%] transition-all duration-700 ease-out" />
  </>
);

const CtaLabel = ({ text = "Ask a Question" }: { text?: string }) => (
  <span className="relative z-10 inline-flex items-center gap-2.5">
    <span>{text}</span>
  </span>
);

/* ---------- Row ---------- */
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ layout: { duration: reduce ? 0 : 0.18, ease: "easeOut" }, ...baseTransition }}
      className={[
        "relative rounded-[20px] border border-[#efc7d7] bg-white/90 backdrop-blur-xl",
        "transition-[box-shadow,transform] duration-150 ease-out will-change-transform",
        open ? "shadow-none" : "hover:scale-[1.01]"
      ].join(" ")}
    >
      {/* uniform inner glow ring (#fedee6) — on hover OR when open */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-[1px] rounded-[18px] transition-opacity duration-150 ${
          open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          boxShadow:
            "inset 0 0 22px rgba(254,222,230,0.45), inset 0 0 44px rgba(254,222,230,0.35), inset 0 0 88px rgba(254,222,230,0.28)",
        }}
      />

      <h3 className="m-0">
        <button
          type="button"
          id={faq.headerId}
          aria-controls={faq.panelId}
          aria-expanded={open}
          onClick={() => toggle(index)}
          className={[
            "relative z-10 w-full text-left flex justify-between items-center",
            // tighter padding
            "px-4 py-3 sm:px-6 sm:py-4 min-h-[44px]",
            "font-['Lexend'] font-semibold text-black text-base sm:text-lg",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2",
          ].join(" ")}
        >
          <span className="pr-3">{faq.question}</span>
          <motion.svg
            className="shrink-0 w-5 h-5 text-[#9b5469]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
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
            transition={{ duration: reduce ? 0 : 0.16, ease: "easeOut" }}
            // tighter content padding
            className="relative z-10 px-4 pb-3 pt-1.5 sm:px-6 sm:pb-4"
          >
            <p className="font-['Inter'] text-[#2b2b2b] leading-relaxed text-sm sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
},
(prev, next) =>
  prev.open === next.open &&
  prev.faq.question === next.faq.question &&
  prev.faq.answer === next.faq.answer &&
  prev.faq.slug === next.faq.slug
);

/* ---------- Component ---------- */
const FAQ: React.FC<Props> = React.memo(function FAQ({ multiOpen = false, onAsk, askHref }) {
  const reduce = !!useReducedMotion();

  const items: FaqWithIds[] = useMemo(() => {
    return faqs.map((f) => {
      const slug = slugify(f.question);
      return { ...f, slug, headerId: `faq-header-${slug}`, panelId: `faq-panel-${slug}` };
    });
  }, []);

  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set());
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (x) =>
        x.question.toLowerCase().includes(q) ||
        x.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

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
    () => ({ duration: reduce ? 0 : 0.22, ease: "easeOut" as const }),
    [reduce]
  );

  return (
    <motion.section
      className="w-full pt-2 pb-12 px-3 sm:pt-6 sm:pb-14 sm:px-6 md:px-16 bg-[#fdf8f7] overflow-visible"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title + subtitle (black theme) */}
        <motion.h2
          className="text-center font-['Lexend'] text-black text-[30px] sm:text-[40px] md:text-[48px] font-light leading-tight mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: reduce ? 0 : 0.02, duration: reduce ? 0 : 0.22, ease: "easeOut" }}
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          className="text-center font-['Inter'] text-black text-[15px] sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: reduce ? 0 : 0.04, duration: reduce ? 0 : 0.2, ease: "easeOut" }}
        >
          Quick answers to the things people ask us the most.
        </motion.p>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs…"
            aria-label="Search FAQs"
            className="w-full h-11 rounded-[18px] border border-[#e7c9d6] bg-white/90 backdrop-blur-sm px-4 text-[15px]
                       focus:outline-none focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300 placeholder:text-[#9b9b9b]"
          />
        </div>

        {/* Tighter spacing between FAQ items */}
        <div className="space-y-1.5 sm:space-y-2">
          {filtered.map((faq, index) => (
            <div key={faq.slug} className="group">
              <FaqRow
                faq={faq}
                index={index}
                open={isOpen(index)}
                toggle={toggle}
                baseTransition={baseTransition}
                reduce={reduce}
              />
            </div>
          ))}

        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-7 sm:mt-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: reduce ? 0 : 0.08, ...baseTransition }}
        >
          {typeof onAsk === "function" ? (
            <button type="button" onClick={onAsk} aria-label="Ask a Question" className={ctaClasses}>
              <GlassLayers />
              <CtaLabel />
            </button>
          ) : askHref ? (
            <a href={askHref} aria-label="Ask a Question" className={ctaClasses}>
              <GlassLayers />
              <CtaLabel />
            </a>
          ) : (
            <button type="button" aria-label="Ask a Question" className={ctaClasses}>
              <GlassLayers />
              <CtaLabel />
            </button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
});

export default FAQ;
