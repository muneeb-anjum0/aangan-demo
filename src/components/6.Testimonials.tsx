// src/components/Testimonials.tsx
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import person1 from "../assets/testimonials/person1.jpg";
import person2 from "../assets/testimonials/person2.jpg";
import person3 from "../assets/testimonials/person3.jpg";
import person4 from "../assets/testimonials/person4.jpg";
import person5 from "../assets/testimonials/person5.jpg";
import person6 from "../assets/testimonials/person6.jpg";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// ---- constants (values unchanged; visuals identical) ----
const SPEED_DESKTOP = 40; // px/sec
const SPEED_MOBILE = 28;  // px/sec
const VIEWPORT_THRESHOLD = 0.25;
const CARD_WIDTH = 320;   // keep identical sizing
const CARD_MIN_WIDTH = 220;

type Testimonial = {
  id: number;
  rating: number;
  text: string;
  name: string;
  location: string;
  image: string;
};

const testimonialsData: Testimonial[] = [
  { id: 1, rating: 5, text: "I never thought I'd find an app that actually understands the struggles women face every month. The insights and goal reminders feel like they were made just for me. Thank you, Aangan!", name: "Zainab G.", location: "Lahore", image: person1 },
  { id: 2, rating: 5, text: "The doctor chat feature was a lifesaver. I got real answers without the stress of having to leave home. This is the kind of support we need more of.", name: "Fatima A.", location: "Karachi", image: person2 },
  { id: 3, rating: 4, text: "I've struggled with PCOS for years, but Aangan made it easier to understand my irregular spot patterns. The dashboard is clean, and the AI agent actually helped me feel heard.", name: "Meher S.", location: "Karachi", image: person3 },
  { id: 4, rating: 4, text: "Cycle predictions are finally accurate for me. The reminders are gentle, not spammy, and the tone feels culturally respectful. Love the small, thoughtful touches.", name: "Areeba K.", location: "Multan", image: person4 },
  { id: 5, rating: 5, text: "As a working mother, I barely have time for myself. Aangan's period tracking and health reminders have become my personal assistant. It's like having a health coach in my pocket!", name: "Sana M.", location: "Islamabad", image: person5 },
  { id: 6, rating: 4, text: "The symptom tracker helped me identify patterns I never noticed before. Now I can prepare for my period days and manage my energy better. Truly life-changing!", name: "Ayesha R.", location: "Faisalabad", image: person6 },
  { id: 7, rating: 5, text: "I love how the app respects our cultural values while providing modern health solutions. The privacy features give me peace of mind, and the insights are incredibly accurate.", name: "Mariam T.", location: "Peshawar", image: person1 },
];

// ---- utilities / small UI (memoized) ----
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(clsx("rounded-xl border bg-card text-card-foreground shadow", className))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={twMerge(clsx("p-6 pt-0", className))} {...props} />
);
CardContent.displayName = "CardContent";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
};

const StarRating = React.memo(({ rating }: { rating: number }) => (
  <div className="flex justify-center mb-2" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ))}
  </div>
));
StarRating.displayName = "StarRating";

// Single card, reused in both sets (prevents duplicate JSX + reduces GC)
const TestimonialCard = React.memo(function TestimonialCard({
  t,
  idx,
  animated,
}: {
  t: Testimonial;
  idx: number;
  animated?: boolean;
}) {
  return (
    <motion.div
      className="group flex-shrink-0 transition-transform duration-300 will-change-transform hover:scale-105 hover:-translate-y-2 hover:z-30 mx-3"
      style={{ width: `${CARD_WIDTH}px`, minWidth: `${CARD_MIN_WIDTH}px` }}
      initial={animated ? { opacity: 0, y: 24, scale: 0.98 } : undefined}
      whileInView={animated ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={animated ? { once: true, amount: 0.2 } : undefined}
      transition={animated ? { delay: 0.12 + idx * 0.06, duration: 0.5, ease: "easeOut" } : undefined}
    >
      <Card
        className={twMerge(
          "relative bg-white/95 rounded-[26px] md:rounded-[28px] lg:rounded-[30px] !border-0 shadow-none transform-gpu [backface-visibility:hidden] will-change-transform cursor-pointer group-hover:!opacity-100 group-hover:bg-white/80 group-hover:shadow-[inset_2px_2px_16px_#fddde5,inset_-2px_-2px_16px_#fee2e1,0_8px_16px_rgba(0,0,0,0.08)] group-hover:[filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.08))] transition-[opacity,transform] ease-in",
        )}
        style={{
          width: `${CARD_WIDTH}px`,
          minHeight: "320px",
          zIndex: 60,
          flex: `0 0 ${CARD_WIDTH}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent className="h-full p-5 md:p-6 flex flex-col justify-between items-center text-center overflow-visible will-change-transform">
          <div className="flex-shrink-0">
            <StarRating rating={t.rating} />
          </div>
          <div className="flex-1 flex items-center justify-center overflow-visible" style={{ overflow: "visible" }}>
            {/* NOTE: className preserved exactly (including original typo token to avoid visual changes) */}
            <p className="[font-family:'Inter',Helvetica] text-[#212121] text-[13.5px] md:text-sm leading-6 text-center overflow-visiblea">
              "{t.text}"
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
              <img
                src={t.image}
                alt={`Photo of ${t.name}`}
                loading="lazy"
                decoding="async"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-semibold text-gray-800 text-sm">
              {t.name} – {t.location}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// ---- main component ----
const Testimonials: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();
  const testimonials = useMemo(() => testimonialsData, []);

  // anim state refs
  const runningRef = useRef(false);
  const reqRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const firstSetWidthRef = useRef(0);
  const speedRef = useRef(0);

  // raf-throttled width measure to avoid RO storms
  const measureScheduled = useRef(false);
  const measureFirstSetWidth = useCallback(() => {
    if (measureScheduled.current) return;
    measureScheduled.current = true;
    requestAnimationFrame(() => {
      measureScheduled.current = false;
      const el = firstSetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      if (width > 0) {
        firstSetWidthRef.current = width;
        if (-offsetRef.current >= width) {
          offsetRef.current = -(((-offsetRef.current) % width));
        }
        const track = trackRef.current;
        if (track) track.style.transform = `translate3d(${Math.floor(offsetRef.current)}px,0,0)`;
      }
    });
  }, []);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastTsRef.current = null;
    reqRef.current = requestAnimationFrame(tick);
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (reqRef.current != null) cancelAnimationFrame(reqRef.current);
    reqRef.current = null;
    lastTsRef.current = null;
  }, []);

  const tick = useCallback((ts: number) => {
    if (!runningRef.current) return;
    if (lastTsRef.current == null) {
      lastTsRef.current = ts;
      reqRef.current = requestAnimationFrame(tick);
      return;
    }
    const dt = (ts - lastTsRef.current) / 1000;
    lastTsRef.current = ts;

    const firstWidth = firstSetWidthRef.current || 0;
    if (firstWidth > 0) {
      offsetRef.current -= speedRef.current * dt;
      if (-offsetRef.current >= firstWidth) {
        offsetRef.current += firstWidth;
      }
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${Math.floor(offsetRef.current)}px,0,0)`;
      }
    }
    reqRef.current = requestAnimationFrame(tick);
  }, []);

  // pointer/touch handlers (stable)
  const handlePointerEnter = useCallback(() => !reducedMotion && stop(), [reducedMotion, stop]);
  const handlePointerLeave = useCallback(() => !reducedMotion && start(), [reducedMotion, start]);
  const handleTouchStart = useCallback(() => !reducedMotion && stop(), [reducedMotion, stop]);
  const handleTouchEnd = useCallback(() => !reducedMotion && start(), [reducedMotion, start]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // compute speed without causing React re-renders
    const computeSpeed = () => {
      const isMobile = window.innerWidth <= 768;
      speedRef.current = isMobile ? SPEED_MOBILE : SPEED_DESKTOP;
    };
    computeSpeed();

    const onResize = () => {
      computeSpeed();
      measureFirstSetWidth();
    };
    window.addEventListener("resize", onResize, { passive: true });

    const ro = new ResizeObserver(() => {
      measureFirstSetWidth();
    });
    if (firstSetRef.current) ro.observe(firstSetRef.current);

    // ensure width measured after images load
    const imgs = firstSetRef.current?.querySelectorAll("img");
    const onImgLoad = () => measureFirstSetWidth();
    const imgEls: HTMLImageElement[] = [];
    imgs?.forEach((img) => {
      const el = img as HTMLImageElement;
      imgEls.push(el);
      if (!el.complete) el.addEventListener("load", onImgLoad, { once: true });
    });

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting && e.intersectionRatio >= VIEWPORT_THRESHOLD);
        if (!reducedMotion) {
          if (inView) start();
          else stop();
        }
      },
      { threshold: [VIEWPORT_THRESHOLD] }
    );
    if (wrapperRef.current) io.observe(wrapperRef.current);

    const onVis = () => {
      if (reducedMotion) return;
      if (document.visibilityState === "hidden") stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    // initial layout sync
    measureFirstSetWidth();
    if (!reducedMotion) start();

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      imgEls.forEach((el) => el.removeEventListener("load", onImgLoad));
      stop();
    };
  }, [measureFirstSetWidth, reducedMotion, start, stop]);

  return (
    <section
      className="relative w-full flex flex-col items-center pt-12 px-4 sm:px-6 md:px-16 overflow-visible"
      aria-label="User testimonials"
      style={{ minHeight: "min(100vh,700px)", zIndex: 0, background: "transparent", overflow: "visible" }}
    >
      {/* Title */}
      <div className="mx-auto max-w-3xl px-2 z-10">
        <motion.h2
          className="font-['Lexend'] text-center mb-10 leading-[1.08] tracking-tight text-black text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
        >
          <span className="font-medium">Trusted </span>
          <span className="font-light">by </span>
          <span className="font-medium ml-1">Women </span>
          <span className="font-light">Across </span>
          <span className="font-light">Pakistan</span>
        </motion.h2>
      </div>

      {/* Cards Marquee Row */}
      <div
        ref={wrapperRef}
        className="relative z-10 w-full max-w-[98vw] xl:max-w-[1800px] mx-auto overflow-visible pt-2 pb-2"
        style={{ minHeight: 360, overflow: "visible" }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex flex-nowrap will-change-transform"
          style={{ transition: "none", minWidth: "100vw" }}
        >
          <div ref={firstSetRef} className="flex flex-nowrap">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`t1-${t.id}`} t={t} idx={idx} animated />
            ))}
          </div>

          {/* Duplicate for seamless scroll */}
          <div className="flex flex-nowrap">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`t2-${t.id}`} t={t} idx={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        className="text-center max-w-7xl mx-auto px-6 md:px-16 z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <button
          className="px-8 py-3.5 rounded-xl text-white font-medium text-xl transition-all hover:opacity-90 transform hover:scale-105 flex items-center justify-center gap-2.5 mx-auto"
          style={{ backgroundColor: "#f472b6" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            aria-hidden="true"
          >
            <path
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Share Your Story
        </button>
      </motion.div>
    </section>
  );
};

export default React.memo(Testimonials);
