// src/components/Hero.tsx
import React, { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import woman1 from "../assets/hero/woman1.png";
import woman2 from "../assets/hero/woman2.png";
import cloud from "../assets/hero/cloud.svg";

// --- Static styles moved out to avoid re-creation on each render ---
const cloudBLDesktopStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "-350px",
  left: "-170px",
  width: "60vw",
  height: "auto",
  opacity: 0.8,
  transform: "rotate(-155deg) translateZ(0) scaleX(1) scaleY(-1)",
  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
  pointerEvents: "none",
  userSelect: "none",
};

const cloudBLMobileStyle: React.CSSProperties = {
  position: "absolute",
  top: "390px",
  left: "-90px",
  width: "120vw",
  height: "auto",
  opacity: 0.9,
  transform: "rotate(25deg) scaleX(-1) scaleY(1)",
  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
  pointerEvents: "none",
  userSelect: "none",
  zIndex: 1,
};

const cloudTRDesktopStyle: React.CSSProperties = {
  position: "absolute",
  top: "-350px",
  right: "-310px",
  width: "60vw",
  height: "auto",
  opacity: 0.8,
  transform: "rotate(15deg) translateZ(0) scaleX(1) scaleY(-1)",
  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
  pointerEvents: "none",
  userSelect: "none",
};

const cloudTRMobileStyle: React.CSSProperties = {
  position: "absolute",
  top: "-100px",
  right: "-80px",
  width: "110vw",
  height: "auto",
  opacity: 0.9,
  transform: "rotate(25deg) scaleX(1) scaleY(-1)",
  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
  pointerEvents: "none",
  userSelect: "none",
  zIndex: 1,
};

const woman1Style: React.CSSProperties = {
  maxWidth: "260px",
  width: "100%",
  marginTop: "44px",
};

const woman2Style: React.CSSProperties = {
  maxWidth: "260px",
  width: "120%",
  marginTop: "0vh",
  marginLeft: "-20%",
};

// --- Helper to build variants honoring reduced motion ---
const buildVariants = (reduced: boolean) => {
  const noAnim = { opacity: 1, x: 0, y: 0, scale: 1 };
  return {
    containerInitial: reduced ? noAnim : { opacity: 0, y: 60 },
    containerAnimate: reduced ? noAnim : { opacity: 1, y: 0 },
    h1Initial: reduced ? noAnim : { opacity: 0, y: 40 },
    h1Animate: reduced ? noAnim : { opacity: 1, y: 0 },
    h2Initial: reduced ? noAnim : { opacity: 0, y: 20 },
    h2Animate: reduced ? noAnim : { opacity: 1, y: 0 },
    p1Initial: reduced ? noAnim : { opacity: 0, y: 30 },
    p1Animate: reduced ? noAnim : { opacity: 1, y: 0 },
    p2Initial: reduced ? noAnim : { opacity: 0, y: 30 },
    p2Animate: reduced ? noAnim : { opacity: 1, y: 0 },
    rowInitial: reduced ? noAnim : { opacity: 0, scale: 0.8 },
    rowAnimate: reduced ? noAnim : { opacity: 1, scale: 1 },
    w1Initial: reduced ? noAnim : { x: -40, opacity: 0 },
    w1Animate: reduced ? noAnim : { x: 0, opacity: 1 },
    w2Initial: reduced ? noAnim : { x: 40, opacity: 0 },
    w2Animate: reduced ? noAnim : { x: 0, opacity: 1 },
  };
};

// --- Static transition timings (unchanged visuals) ---
const t = {
  container: { delay: 0.6, duration: 1.1, ease: "easeOut" as const },
  h1: { delay: 0.8, duration: 1.0, ease: "easeOut" as const },
  h2: { delay: 1.0, duration: 1.0, ease: "easeOut" as const },
  p1: { delay: 1.0, duration: 0.8, ease: "easeOut" as const },
  p2: { delay: 1.2, duration: 0.8, ease: "easeOut" as const },
  row: { delay: 1.4, duration: 1.0, ease: "easeOut" as const },
  w1: { delay: 1.6, duration: 0.8, ease: "easeOut" as const },
  w2: { delay: 1.7, duration: 0.8, ease: "easeOut" as const },
};

const HeroComponent: React.FC = () => {
  // Honor user prefers-reduced-motion for perf + accessibility without visual change in normal mode
  // useReducedMotion can return boolean or string depending on framer-motion version
  const reducedMotionRaw = useReducedMotion();
  const reducedMotion = typeof reducedMotionRaw === "boolean" ? reducedMotionRaw : reducedMotionRaw === "reduce";
  const v = useMemo(() => buildVariants(reducedMotion), [reducedMotion]);

  return (
    <>
      {/* Cloud bottom left (desktop) */}
      <img
        src={cloud}
        alt=""
        aria-hidden="true"
        className="hidden sm:block select-none pointer-events-none"
        style={cloudBLDesktopStyle}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      {/* Cloud bottom left (mobile) */}
      <img
        src={cloud}
        alt=""
        aria-hidden="true"
        className="block sm:hidden select-none pointer-events-none"
        style={cloudBLMobileStyle}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      {/* Cloud top right (desktop) */}
      <img
        src={cloud}
        alt=""
        aria-hidden="true"
        className="hidden sm:block select-none pointer-events-none"
        style={cloudTRDesktopStyle}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      {/* Cloud top right (mobile) */}
      <img
        src={cloud}
        alt=""
        aria-hidden="true"
        className="block sm:hidden select-none pointer-events-none"
        style={cloudTRMobileStyle}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      <section
        id="home"
        aria-labelledby="hero-title"
        className="relative w-full flex items-center justify-center px-6 md:px-16 pb-24 hero-section-desktop"
        style={{ overflow: "hidden", contain: "content", willChange: "transform" }}
      >
        <motion.div
          className="text-center max-w-4xl z-10 py-12 sm:py-16 mt-[-10px] sm:mt-0"
          initial={v.containerInitial}
          animate={v.containerAnimate}
          transition={t.container}
        >
          <motion.h1
            id="hero-title"
            className="font-inter font-semibold leading-[120%] text-gray-800 text-[clamp(30px,7vw,56px)] -mt-6"
            initial={v.h1Initial}
            animate={v.h1Animate}
            transition={t.h1}
          >
            Empower <span className="font-bold text-[#fc9ac3]">Her,</span>
          </motion.h1>

          <motion.h2
            className="font-inter font-normal leading-[1.05] text-gray-800 mt-1 sm:mt-2 text-[clamp(34px,9vw,60px)] whitespace-nowrap"
            initial={v.h2Initial}
            animate={v.h2Animate}
            transition={t.h2}
          >
            <span className="mr-[0.08em]">One</span>
            <span className="font-extrabold text-[#fc9ac3] mx-[0.08em]">Cycle</span>
            <span className="ml-[0.08em]">At a Time</span>
          </motion.h2>

          <motion.p
            className="mt-4 sm:mt-8 text-md md:text-lg font-semibold italic text-gray-700"
            initial={v.p1Initial}
            animate={v.p1Animate}
            transition={t.p1}
          >
            Know your cycle. Own your rhythm.
          </motion.p>

          <motion.p
            className="mt-2 sm:mt-3 text-sm md:text-base text-gray-600 max-w-xl mx-auto"
            initial={v.p2Initial}
            animate={v.p2Animate}
            transition={t.p2}
          >
            Track periods, moods, and symptoms effortlessly with Aangan. Get smart insights, gentle guidance, and feel supported every step of the way.
          </motion.p>

          <motion.div
            className="mt-6 sm:mt-10 flex justify-center items-end gap-0 sm:gap-10"
            initial={v.rowInitial}
            animate={v.rowAnimate}
            transition={t.row}
            style={{ willChange: "transform" }}
          >
            <motion.img
              src={woman1}
              alt="Woman using phone"
              className="h-40 sm:h-48 md:h-64 lg:h-72 object-contain transform-gpu will-change-transform"
              style={woman1Style}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              initial={v.w1Initial}
              animate={v.w1Animate}
              transition={t.w1}
              sizes="(max-width: 1024px) 40vw, 260px"
            />
            <motion.img
              src={woman2}
              alt="Woman waving"
              className="-ml-3 sm:-ml-24 lg:-ml-32 h-40 sm:h-48 md:h-64 lg:h-72 object-contain transform-gpu will-change-transform"
              style={woman2Style}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              initial={v.w2Initial}
              animate={v.w2Animate}
              transition={t.w2}
              sizes="(max-width: 1024px) 40vw, 260px"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

const Hero = memo(HeroComponent);
export default Hero;
