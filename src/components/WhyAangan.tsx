import React, { useEffect, useRef, useState } from "react";

import cloudImg from "../assets/hero/cloud.png";

// Scene 1
import womanImg from "../assets/whyAangan/storypt1/woman.png";
import bubble2Img from "../assets/whyAangan/storypt1/bubble1.png";
import bubble1Img from "../assets/whyAangan/storypt1/bubble2.png";
import bubble4Img from "../assets/whyAangan/storypt1/bubble3.png";
import bubble3Img from "../assets/whyAangan/storypt1/bubble4.png";

// Scene 2
import secondBubble1Img from "../assets/whyAangan/storypt2/secondBubble1.png";
import secondBubble2Img from "../assets/whyAangan/storypt2/secondBubble2.png";
import secondBubble3Img from "../assets/whyAangan/storypt2/secondBubble3.png";
import handPhoneImg from "../assets/whyAangan/storypt2/handPhone.png";
import secondBubble4Img from "../assets/whyAangan/storypt2/secondBubble4.png";

// Scene 3
import woman2Img from "../assets/whyAangan/storypt3/woman2.png";
import lastBubble1Img from "../assets/whyAangan/storypt3/lastBubble1.png";
import lastBubble2Img from "../assets/whyAangan/storypt3/lastBubble2.png";
import lastBubble3Img from "../assets/whyAangan/storypt3/lastBubble3.png";
import lastBubble4Img from "../assets/whyAangan/storypt3/lastBubble4.png";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
const map01 = (x: number, a: number, b: number) => Math.max(0, Math.min(1, (x - a) / (b - a)));

type Item = {
  id: string;
  src: string;
  style: React.CSSProperties;
  start: number;
  span: number;
  scene: 0 | 1 | 2;
  z: number;
};

type SceneEl = {
  src: string;
  desktop: React.CSSProperties;
  mobile?: React.CSSProperties;
};

type CloudPos = {
  // Use strings like "-80%", "10vh", "12vw" etc.
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string; // e.g., "75%", "120vw"
  zIndex?: number; // optional per-cloud control
  opacity?: number; // optional
};

const WhyAangan: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // timeline
  const progress = useRef(0);
  const target = useRef(0);
  const raf = useRef<number | null>(null);

  // dynamic navbar height
  const [offsetPx, setOffsetPx] = useState<number>(42);

  // scroll capture length
  const PIN_VH = 340;
  const EASE = 0.12;

  // gutter
  const [isMobile, setIsMobile] = useState(false);
  const BOTTOM_GUTTER = isMobile ? 40 : 70;

  // timeline slices
  const S1_START = 0.0, S1_END = 1 / 3;
  const S2_START = 1 / 3, S2_END = 2 / 3;
  const S3_START = 2 / 3, S3_END = 1.0;

  const HEAD = 0.06, TAIL = 0.06;

  // Hysteresis
  const ENTER_PAD = 72;
  const EXIT_PAD = 56;

  // Pin state
  const isPinned = useRef(false);
  const lastRegion = useRef<"above" | "within" | "below">("above");

  // Velocity tracking
  const lastY = useRef<number>(0);
  const lastT = useRef<number>(performance.now());

  // UI
  const hintRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const [uiPinned, setUiPinned] = useState(false);

  // hint position
  const [hintTop, setHintTop] = useState<number>(offsetPx + (isMobile ? 72 : 84));
  const measureHintTop = () => {
    const base = offsetPx;
    const titleH = titleRef.current?.offsetHeight ?? (isMobile ? 36 : 44);
    const gap = isMobile ? 24 : 28;
    setHintTop(base + titleH + gap);
  };
  useEffect(() => {
    measureHintTop();
    const onResize = () => measureHintTop();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMobile, offsetPx]);

  // mobile mq
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply);
    };
  }, []);

  // Detect fixed navbar height
  const getNavOffset = () => {
    const explicit = document.querySelector<HTMLElement>("#navbar, [data-navbar]");
    if (explicit) return explicit.getBoundingClientRect().height || 0;
    const candidates = Array.from(document.querySelectorAll<HTMLElement>("header, nav"));
    for (const el of candidates) {
      const cs = getComputedStyle(el);
      if (cs.position === "fixed" && (cs.top === "0px" || cs.top === "0")) {
        return el.getBoundingClientRect().height || 0;
      }
    }
    return 42;
  };

  // layouts
  const s1Desktop: SceneEl[] = [
    { src: womanImg, desktop: { position: "relative", display: "block", margin: "160px auto 0", maxWidth: 450 } },
    { src: bubble1Img, desktop: { position: "absolute", right: "15%", top: "20%", maxWidth: 400 } },
    { src: bubble2Img, desktop: { position: "absolute", left: "13%", top: "20%", maxWidth: 400 } },
    { src: bubble3Img, desktop: { position: "absolute", left: "15%", top: "55%", maxWidth: 400 } },
    { src: bubble4Img, desktop: { position: "absolute", right: "15%", top: "55%", maxWidth: 400 } },
  ];
  const s2Desktop: SceneEl[] = [
    { src: secondBubble1Img, desktop: { position: "absolute", left: "17%", top: "4%", maxWidth: 500 } },
    { src: secondBubble2Img, desktop: { position: "absolute", left: "18%", top: "31%", maxWidth: 500 } },
    { src: secondBubble3Img, desktop: { position: "absolute", right: "18%", top: "36%", maxWidth: 500 } },
    { src: handPhoneImg, desktop: { position: "absolute", left: "47%", top: "50%", transform: "translate(-50%, -50%)", maxWidth: 548 } },
    { src: secondBubble4Img, desktop: { position: "absolute", right: "29%", top: "16%", maxWidth: 400 } },
  ];
  const s3Desktop: SceneEl[] = [
    { src: woman2Img, desktop: { position: "absolute", left: "35%", top: "8%", maxWidth: 500 } },
    { src: lastBubble1Img, desktop: { position: "absolute", right: "10%", top: "12%", maxWidth: 500 } },
    { src: lastBubble2Img, desktop: { position: "absolute", right: "10%", top: "53%", maxWidth: 500 } },
    { src: lastBubble3Img, desktop: { position: "absolute", left: "10%", top: "12%", maxWidth: 500 } },
    { src: lastBubble4Img, desktop: { position: "absolute", left: "10%", top: "53%", maxWidth: 500 } },
  ];

  // MOBILE — explicit width sizing
  const s1Mobile: SceneEl[] = [
    { src: womanImg, desktop: {}, mobile: { position: "relative", display: "block", margin: "160px auto 0", width: "75vw", height: "auto" } },
    { src: bubble1Img, desktop: {}, mobile: { position: "absolute", right: "0vw", top: "11vh", width: "50vw", height: "auto" } },
    { src: bubble2Img, desktop: {}, mobile: { position: "absolute", left: "0vw", top: "11vh", width: "50vw", height: "auto" } },
    { src: bubble3Img, desktop: {}, mobile: { position: "absolute", left: "0vw", top: "56vh", width: "50vw", height: "auto" } },
    { src: bubble4Img, desktop: {}, mobile: { position: "absolute", right: "0vw", top: "53vh", width: "50vw", height: "auto" } },
  ];
  const s2Mobile: SceneEl[] = [
    { src: secondBubble2Img, desktop: {}, mobile: { position: "absolute", left: "-11vw", top: "-3vh", width: "75vw", height: "auto" } },
    { src: secondBubble3Img, desktop: {}, mobile: { position: "absolute", left: "-12vw", top: "40vh", width: "75vw", height: "auto" } },
    { src: handPhoneImg, desktop: {}, mobile: { position: "absolute", left: "50%", top: "43vh", transform: "translate(-50%, -50%)", width: "80vw", height: "auto" } },
    { src: secondBubble4Img, desktop: {}, mobile: { position: "absolute", right: "-11vw", top: "8vh", width: "70vw", height: "auto" } },
  ];
  const s3Mobile: SceneEl[] = [
    { src: woman2Img, desktop: {}, mobile: { position: "absolute", left: "48%", top: "8vh", transform: "translateX(-50%)", width: "77vw", height: "auto" } },
    { src: lastBubble1Img, desktop: {}, mobile: { position: "absolute", right: "10vw", top: "8vh", width: "48vw", height: "auto" } },
    { src: lastBubble2Img, desktop: {}, mobile: { position: "absolute", right: "6vw", top: "62vh", width: "48vw", height: "auto" } },
    { src: lastBubble3Img, desktop: {}, mobile: { position: "absolute", left: "6vw", top: "22vh", width: "48vw", height: "auto" } },
    { src: lastBubble4Img, desktop: {}, mobile: { position: "absolute", left: "6vw", top: "48vh", width: "48vw", height: "auto" } },
  ];

  // ===== CLOUD CONTROLS =====
  // Edit these arrays to control cloud positions/sizes independently for desktop and mobile.
  const CLOUDS_DESKTOP: CloudPos[] = [
    { top: "-80%", right: "-30%", width: "75%", zIndex: 1, opacity: 0.9 },
    { top: "-80%", right: "-30%", width: "85%", zIndex: 1, opacity: 0.8 },
    { bottom: "-50%", left: "-30%", width: "75%", zIndex: 1, opacity: 0.9 },
    { bottom: "-50%", left: "-30%", width: "80%", zIndex: 1, opacity: 0.85 },
  ];

  const CLOUDS_MOBILE: CloudPos[] = [
    // Larger widths (vw) so clouds cover edges on small screens
    { top: "-25vh", right: "-45vw", width: "160vw", zIndex: 1, opacity: 0.9 },
    { top: "-35vh", right: "-25vw", width: "135vw", zIndex: 1, opacity: 0.75 },
    { top: "-35vh", right: "-25vw", width: "135vw", zIndex: 1, opacity: 0.75 },
    { top: "-35vh", right: "-25vw", width: "135vw", zIndex: 1, opacity: 0.75 },
    { top: "-25vh", right: "-38vw", width: "135vw", zIndex: 1, opacity: 0.75 },
    { bottom: "-20vh", left: "-30vw", width: "205vw", zIndex: 1, opacity: 0.9 },
    { bottom: "-12vh", left: "-20vw", width: "140vw", zIndex: 1, opacity: 0.8 },
    { bottom: "-20vh", left: "-20vw", width: "140vw", zIndex: 1, opacity: 0.8 },
    { bottom: "-18vh", right: "-20vw", width: "140vw", zIndex: 1, opacity: 0.8 },
    { bottom: "-13vh", right: "-20vw", width: "140vw", zIndex: 1, opacity: 0.8 },
    { bottom: "-16vh", right: "-20vw", width: "140vw", zIndex: 1, opacity: 0.8 },
    { bottom: "-20vh", right: "-10vw", width: "140vw", zIndex: 1, opacity: 0.8 },


  ];
  // ===========================

  const items: Item[] = [];
  const pushScene = (scene: 0 | 1 | 2, a: number, b: number, arr: SceneEl[]) => {
    const innerStart = HEAD;
    const innerEnd = scene === 2 ? 1 : 1 - TAIL;
    const innerRange = innerEnd - innerStart;
    const n = arr.length;
    const slot = innerRange / n;
    const fade = Math.min(1, slot * 0.9);

    arr.forEach((el, i) => {
      const startNorm = innerStart + i * slot;
      const style = isMobile ? (el.mobile || el.desktop) : el.desktop;
      items.push({
        id: `wa-item-${scene}-${i}`,
        src: el.src,
        style: { ...style },
        start: a + startNorm * (b - a),
        span: fade * (b - a),
        scene,
        z: 2 + items.length,
      });
    });
  };
  pushScene(0, S1_START, S1_END, isMobile ? s1Mobile : s1Desktop);
  pushScene(1, S2_START, S2_END, isMobile ? s2Mobile : s2Desktop);
  pushScene(2, S3_START, S3_END, isMobile ? s3Mobile : s3Desktop);

  const startLoop = () => {
    if (raf.current != null) return;
    const tick = () => {
      const p = progress.current;
      const t = clamp01(target.current);
      const next = Math.abs(t - p) < 0.0002 ? t : lerp(p, t, EASE);
      progress.current = next;
      render(next);
      if (Math.abs(t - next) > 0.00015) raf.current = requestAnimationFrame(tick);
      else raf.current = null;
    };
    raf.current = requestAnimationFrame(tick);
  };

  const sceneAlpha = (p: number, a: number, b: number, hasTail: boolean) => {
    const headA = a, headB = a + HEAD * (b - a);
    const tailB = b, tailA = hasTail ? b - TAIL * (b - a) : b;
    const head = smooth(map01(p, headA, headB));
    const tail = hasTail ? (1 - smooth(map01(p, tailA, tailB))) : 1;
    return Math.min(head, tail);
  };

  const setProgressHeightInstant = (pct: number) => {
    const el = progressFillRef.current;
    if (!el) return;
    const prev = el.style.transition;
    el.style.transition = "none";
    el.style.height = `${pct}%`;
    void el.offsetHeight;
    el.style.transition = prev || "height 60ms linear";
  };

  const render = (p: number) => {
    const host = pinRef.current!;
    if (!host) return;

    const s1A = sceneAlpha(p, S1_START, S1_END, true);
    const s2A = sceneAlpha(p, S2_START, S2_END, true);
    const s3A = sceneAlpha(p, S3_START, S3_END, false);

    items.forEach((it) => {
      const node = host.querySelector<HTMLImageElement>(`#${it.id}`);
      if (!node) return;
      const itemA = smooth(map01(p, it.start, it.start + it.span));
      const env = it.scene === 0 ? s1A : it.scene === 1 ? s2A : s3A;
      const a = itemA * env;

      node.style.opacity = `${a}`;
      node.style.filter = `blur(${(1 - a) * 8}px)`;
      const base = (it.style.transform as string) || "";
      node.style.transform = `${base} translateY(${(1 - a) * 20}px) translateZ(0)`;
      node.style.visibility = a > 0.001 ? "visible" : "hidden";
      node.style.zIndex = String(it.z);
      node.style.willChange = "transform, opacity, filter";
      if ((it.style as any).width) {
        node.style.width = String((it.style as any).width);
        node.style.height = "auto";
      }
    });

    if (progressFillRef.current) {
      progressFillRef.current.style.height = `${clamp01(p) * 100}%`;
    }

    if (hintRef.current) {
      const shouldShow = p < 0.995 && p > 0.001 && uiPinned;
      hintRef.current.style.opacity = shouldShow ? "1" : "0";
    }
  };

  const applyFixed = (pin: HTMLDivElement, pinHeight: number) => {
    if (pin.style.position === "fixed" && pin.style.height === `${pinHeight}px`) return;
    pin.style.position = "fixed";
    pin.style.top = `${offsetPx}px`;
    pin.style.left = "0";
    pin.style.right = "0";
    pin.style.width = "100vw";
    pin.style.height = `${pinHeight}px`;
    pin.style.transform = "";
    pin.style.transition = "";
  };

  const applyAbsoluteAt = (pin: HTMLDivElement, pinHeight: number, topPx: number) => {
    const tp = Math.round(topPx);
    if (pin.style.position === "absolute" && pin.style.top === `${tp}px` && pin.style.height === `${pinHeight}px`) return;
    pin.style.position = "absolute";
    pin.style.top = `${tp}px`;
    pin.style.left = "0";
    pin.style.right = "0";
    pin.style.width = "100vw";
    pin.style.height = `${pinHeight}px`;
    pin.style.transform = "";
    pin.style.transition = "";
  };

  const recompute = () => {
    const outer = sectionRef.current;
    const pin = pinRef.current;
    if (!outer || !pin) return;

    const now = performance.now();
    const pageYf = window.scrollY || window.pageYOffset;
    const pageY = Math.round(pageYf);

    const dt = Math.max(1, now - lastT.current);
    const sectionTop = outer.offsetTop;
    const viewportH = window.innerHeight;

    const pinHeight = Math.max(viewportH - offsetPx, 1);

    const scrollLenBase = Math.max(outer.offsetHeight - pinHeight, 1);

    const pinStart = Math.round(sectionTop - offsetPx);
    const pinEnd = pinStart + scrollLenBase;

    const raw = (pageY - pinStart) / scrollLenBase;
    const rawClamped = clamp01(raw);
    target.current = rawClamped;
    setProgressHeightInstant(rawClamped * 100);
    render(rawClamped);
    startLoop();

    const padEnterTop = pinStart + ENTER_PAD;
    const padEnterBot = pinEnd - ENTER_PAD;
    const padExitTop = pinStart + EXIT_PAD;
    const padExitBot = pinEnd - EXIT_PAD;

    let region: "above" | "within" | "below";
    if ((!isPinned.current && pageY < padEnterTop) || (isPinned.current && pageY < padExitTop)) {
      region = "above";
    } else if ((!isPinned.current && pageY >= padEnterBot) || (isPinned.current && pageY >= padExitBot)) {
      region = "below";
    } else {
      region = "within";
    }

    if (region === "above") {
      applyAbsoluteAt(pin, pinHeight, offsetPx);
      isPinned.current = false;
      setUiPinned(false);
      lastRegion.current = region;
      lastY.current = pageY;
      lastT.current = now;
      return;
    }
    if (region === "below") {
      const anchorTop = scrollLenBase - BOTTOM_GUTTER + offsetPx;
      applyAbsoluteAt(pin, pinHeight, anchorTop);
      isPinned.current = false;
      setUiPinned(false);
      lastRegion.current = region;
      lastY.current = pageY;
      lastT.current = now;
      return;
    }

    if (!isPinned.current) {
      applyFixed(pin, pinHeight);
      isPinned.current = true;
      setUiPinned(true);
    } else {
      applyFixed(pin, pinHeight);
      setUiPinned(true);
    }

    lastRegion.current = region;
    lastY.current = pageY;
    lastT.current = now;
  };

  // Track navbar height
  useEffect(() => {
    const apply = () => setOffsetPx(getNavOffset());
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("scroll", apply, { passive: true });
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("scroll", apply);
    };
  }, []);

  useEffect(() => {
    const applyHeights = () => {
      const outer = sectionRef.current;
      if (!outer) return;
      outer.style.height = `calc(${PIN_VH}vh + ${offsetPx}px + ${BOTTOM_GUTTER}px)`;
    };

    applyHeights();
    render(0);

    const onScroll = () => recompute();
    const onResize = () => { applyHeights(); recompute(); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const RO: typeof ResizeObserver | undefined = (window as any).ResizeObserver;
    let ro: ResizeObserver | null = null;
    if (RO) {
      ro = new RO(() => onResize());
      if (sectionRef.current) ro.observe(sectionRef.current);
      ro.observe(document.body);
    }

    lastY.current = window.scrollY || window.pageYOffset;
    lastT.current = performance.now();

    setTimeout(recompute, 0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, [isMobile, offsetPx, BOTTOM_GUTTER]);

  const progressBarRight = isMobile ? 10 : 24;
  const progressBarWidth = 6;
  const progressBarGap = isMobile ? 12 : 16;

  const cloudsToRender = isMobile ? CLOUDS_MOBILE : CLOUDS_DESKTOP;

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", width: "100vw", margin: 0, padding: 0, background: "transparent" }}
    >
      <style>{`
        @keyframes wa-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes wa-pulse { 0%{opacity:.25} 50%{opacity:1} 100%{opacity:.25} }
        @keyframes wa-chevron { 0%{transform:translateY(0);opacity:.8} 50%{transform:translateY(4px);opacity:1} 100%{transform:translateY(0);opacity:.8} }
      `}</style>

      <div
        ref={pinRef}
        style={{
          position: "absolute",
          top: `${offsetPx}px`,
          left: 0,
          right: 0,
          width: "100vw",
          height: `calc(100vh - ${offsetPx}px)`,
          overflow: "visible",
          background: "transparent",
          willChange: "transform",
        }}
      >
        {/* Clouds (now also on mobile). Control via CLOUDS_DESKTOP / CLOUDS_MOBILE */}
        {cloudsToRender.map((pos, idx) => (
          <img
            key={idx}
            src={cloudImg}
            alt=""
            style={{
              position: "absolute",
              ...(pos.top ? { top: pos.top } : {}),
              ...(pos.bottom ? { bottom: pos.bottom } : {}),
              ...(pos.left ? { left: pos.left } : {}),
              ...(pos.right ? { right: pos.right } : {}),
              width: pos.width,
              zIndex: pos.zIndex ?? 1,
              opacity: pos.opacity ?? 1,
              pointerEvents: "none",
            }}
          />
        ))}

        <h2
          ref={titleRef}
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            margin: isMobile ? "12px 16px 8px" : "16px",
            fontSize: isMobile ? "clamp(22px, 6vw, 30px)" : "2.5rem",
            lineHeight: 1.1,
          }}
        >
          Why <span style={{ color: "#fc9ac3" }}>Aangan?</span>
        </h2>

        {items.map((it) => (
          <img
            key={it.id}
            id={it.id}
            src={it.src}
            alt=""
            style={{
              ...it.style,
              opacity: 0,
              filter: "blur(8px)",
              transform: (it.style.transform as string) || "translateY(20px) translateZ(0)",
              transition: "none",
              pointerEvents: "none",
              visibility: "hidden",
              willChange: "transform, opacity, filter",
            }}
          />
        ))}

        {/* Progress bar */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: progressBarRight,
            top: isMobile ? 80 : 110,
            height: isMobile ? "60vh" : "64vh",
            width: 6,
            background: "rgba(255,255,255,0.35)",
            borderRadius: 999,
            zIndex: 20,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
            opacity: uiPinned ? 1 : 0,
            transition: "opacity 150ms ease",
            pointerEvents: "none",
          }}
        >
          <div
            ref={progressFillRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "0%",
              background: "linear-gradient(180deg, #ff8fbd, #ff5fa2)",
              borderRadius: 999,
              transition: "height 60ms linear",
            }}
          />
          <div style={{ position: "absolute", left: "50%", top: "33.33%", transform: "translateX(-50%)", width: 10, height: 2, background: "rgba(0,0,0,0.15)", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: "50%", top: "66.66%", transform: "translateX(-50%)", width: 10, height: 2, background: "rgba(0,0,0,0.15)", borderRadius: 2 }} />
        </div>

        {uiPinned && (
          <div
            ref={hintRef}
            role="status"
            aria-label="Keep scrolling"
            style={{
              position: "absolute",
              right: `${progressBarRight + progressBarWidth + progressBarGap}px`,
              top: hintTop,
              transform: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: isMobile ? "6px 12px" : "8px 16px",
              background: "linear-gradient(135deg, rgba(255,243,250,0.9), rgba(255,255,255,0.9))",
              border: "1px solid rgba(255,95,162,0.35)",
              borderRadius: 999,
              boxShadow: "0 6px 20px rgba(255,95,162,0.18)",
              backdropFilter: "blur(8px)",
              zIndex: 30,
              transition: "opacity 120ms ease",
              opacity: 0,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            <div
              aria-hidden
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#ff8fbd,#ff5fa2)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 2px 8px rgba(255,95,162,0.45)",
              }}
            >
              <span style={{ fontSize: 14, color: "white", lineHeight: 1, animation: "wa-chevron 1s infinite" }}>⬇</span>
            </div>
            <div style={{ fontSize: isMobile ? 12 : 13, letterSpacing: 0.6, fontWeight: 700, color: "#ff5fa2" }}>
              KEEP SCROLLING
            </div>
            <div aria-hidden style={{ fontSize: 11, color: "#7b7b7b", fontWeight: 600, letterSpacing: 0.4, animation: "wa-pulse 1.6s infinite" }}>
              to reveal the story
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyAangan;
