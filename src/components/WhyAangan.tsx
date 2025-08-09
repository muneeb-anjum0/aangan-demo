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

const WhyAangan: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // progress state
  const progress = useRef(0);
  const target = useRef(0);
  const raf = useRef<number | null>(null);

  // lock state
  const lockedRef = useRef(false);
  const lockScrollYRef = useRef(0);
  const unlockArmedRef = useRef(true);

  // pass-through re-lock control
  const relockArmedRef = useRef(true);
  const passDirRef = useRef<"none" | "down" | "up">("none");

  // thresholds
  const TARGET_MIN = -0.05, TARGET_MAX = 1.05;
  const WHEEL_SENS = 0.00055, TOUCH_SENS = 0.0016, KEYSTEP = 0.05, EASE = 0.12;

  // snap window / exit distance
  const SNAP_RANGE = 24;
  const SNAP_EXIT  = 140;

  // scene windows
  const S1_START = 0.0, S1_END = 1 / 3;
  const S2_START = 1 / 3, S2_END = 2 / 3;
  const S3_START = 2 / 3, S3_END = 1.0;

  // envelopes
  const HEAD = 0.06, TAIL = 0.06;

  // detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply);
    };
  }, []);

  // ===== LAYOUTS =====
  // Desktop values remain your originals.
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
    { src: handPhoneImg,     desktop: { position: "absolute", left: "47%", top: "50%", transform: "translate(-50%, -50%)", maxWidth: 548 } },
    { src: secondBubble4Img, desktop: { position: "absolute", right: "29%", top: "16%", maxWidth: 400 } },
  ];
  const s3Desktop: SceneEl[] = [
    { src: woman2Img,     desktop: { position: "absolute", left: "35%", top: "8%", maxWidth: 500 } },
    { src: lastBubble1Img,desktop: { position: "absolute", right: "10%", top: "12%", maxWidth: 500 } },
    { src: lastBubble2Img,desktop: { position: "absolute", right: "10%", top: "53%", maxWidth: 500 } },
    { src: lastBubble3Img,desktop: { position: "absolute", left: "10%", top: "12%", maxWidth: 500 } },
    { src: lastBubble4Img,desktop: { position: "absolute", left: "10%", top: "53%", maxWidth: 500 } },
  ];

  // Mobile: smaller, centered, and spaced to fill viewport without borders.
  const s1Mobile: SceneEl[] = [
    { src: womanImg,  desktop: {}, mobile: { position: "relative", display: "block", margin: "88px auto 0", maxWidth: "36vw" } },
    { src: bubble1Img,desktop: {}, mobile: { position: "absolute", left: "6vw",  top: "11vh", maxWidth: "44vw" } },
    { src: bubble2Img,desktop: {}, mobile: { position: "absolute", right:"6vw",  top: "26vh", maxWidth: "44vw" } },
    { src: bubble3Img,desktop: {}, mobile: { position: "absolute", left: "6vw",  top: "56vh", maxWidth: "44vw" } },
    { src: bubble4Img,desktop: {}, mobile: { position: "absolute", right:"6vw",  top: "71vh", maxWidth: "44vw" } },
  ];
  const s2Mobile: SceneEl[] = [
    { src: secondBubble1Img, desktop: {}, mobile: { position: "absolute", left: "6vw",  top: "6vh",  maxWidth: "46vw" } },
    { src: secondBubble2Img, desktop: {}, mobile: { position: "absolute", left: "6vw",  top: "34vh", maxWidth: "46vw" } },
    { src: secondBubble3Img, desktop: {}, mobile: { position: "absolute", right:"6vw",  top: "52vh", maxWidth: "46vw" } },
    { src: handPhoneImg,     desktop: {}, mobile: { position: "absolute", left: "50%",  top: "79vh", transform: "translate(-50%, -50%)", maxWidth: "36vw" } },
    { src: secondBubble4Img, desktop: {}, mobile: { position: "absolute", right:"6vw",  top: "20vh", maxWidth: "40vw" } },
  ];
  const s3Mobile: SceneEl[] = [
    { src: woman2Img,      desktop: {}, mobile: { position: "absolute", left: "50%", top: "8vh", transform: "translateX(-50%)", maxWidth: "36vw" } },
    { src: lastBubble1Img, desktop: {}, mobile: { position: "absolute", right:"6vw", top: "22vh", maxWidth: "46vw" } },
    { src: lastBubble2Img, desktop: {}, mobile: { position: "absolute", right:"6vw", top: "62vh", maxWidth: "46vw" } },
    { src: lastBubble3Img, desktop: {}, mobile: { position: "absolute", left: "6vw", top: "22vh", maxWidth: "46vw" } },
    { src: lastBubble4Img, desktop: {}, mobile: { position: "absolute", left: "6vw", top: "62vh", maxWidth: "46vw" } },
  ];

  // Build items from chosen layout set
  const items: Item[] = [];
  const pushScene = (scene: 0 | 1 | 2, a: number, b: number, arr: SceneEl[]) => {
    const innerStart = HEAD;
    const innerEnd   = scene === 2 ? 1 : 1 - TAIL;
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
        span:  fade * (b - a),
        scene,
        z: 2 + items.length,
      });
    });
  };
  pushScene(0, S1_START, S1_END, isMobile ? s1Mobile : s1Desktop);
  pushScene(1, S2_START, S2_END, isMobile ? s2Mobile : s2Desktop);
  pushScene(2, S3_START, S3_END, isMobile ? s3Mobile : s3Desktop);

  const lastItem = items[items.length - 1];
  const lastAppear = lastItem.start + lastItem.span;

  // lock / unlock body
  const lockBody = () => {
    if (lockedRef.current) return;
    lockedRef.current = true;

    const sectionTop = sectionRef.current
      ? window.scrollY + sectionRef.current.getBoundingClientRect().top
      : window.scrollY;

    window.scrollTo(0, sectionTop);

    lockScrollYRef.current = sectionTop;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockScrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  };

  const unlockBody = () => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    const y = -parseInt(document.body.style.top || "0", 10) || 0;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, y);
  };

  // initial lock only if already at top
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (Math.abs(el.getBoundingClientRect().top) < SNAP_RANGE) lockBody();
    return () => unlockBody();
  }, []);

  // re-render when switching mobile/desktop
  useEffect(() => { render(progress.current); }, [isMobile]);

  // re-lock when section hits top (unless pass-through is active)
  useEffect(() => {
    const onScroll = () => {
      if (lockedRef.current) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      if (!relockArmedRef.current) {
        if (passDirRef.current === "down") {
          if (rect.top <= -SNAP_EXIT || rect.top > SNAP_RANGE) {
            relockArmedRef.current = true;
            passDirRef.current = "none";
          }
        } else if (passDirRef.current === "up") {
          const vh = window.innerHeight || 0;
          if (rect.bottom >= vh + SNAP_EXIT || rect.top < -SNAP_RANGE) {
            relockArmedRef.current = true;
            passDirRef.current = "none";
          }
        }
        return;
      }

      if (rect.top >= -SNAP_RANGE && rect.top <= SNAP_RANGE) {
        lockBody();
        unlockArmedRef.current = false;
        startLoop();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // inputs when locked
  useEffect(() => {
    let lastTouchY = 0;
    const clampT = (v: number) => Math.max(TARGET_MIN, Math.min(TARGET_MAX, v));
    const endSnap = () => { if (target.current > 0.985) target.current = 1; };
    const startSnap = () => { if (target.current < 0.015) target.current = 0; };

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      target.current = clampT(target.current + e.deltaY * WHEEL_SENS);
      endSnap(); startSnap(); startLoop();
    };
    const onTouchStart = (e: TouchEvent) => { if (lockedRef.current) lastTouchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      target.current = clampT(target.current + (lastTouchY - y) * TOUCH_SENS);
      lastTouchY = y; endSnap(); startSnap(); startLoop();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (!lockedRef.current) return;
      const fwd = ["PageDown", "ArrowDown", " "], back = ["PageUp", "ArrowUp"];
      if (fwd.includes(e.key)) { e.preventDefault(); target.current = clampT(target.current + KEYSTEP); }
      if (back.includes(e.key)) { e.preventDefault(); target.current = clampT(target.current - KEYSTEP); }
      endSnap(); startSnap(); startLoop();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const startLoop = () => {
    if (raf.current != null) return;
    const tick = () => {
      const p = progress.current;
      const t = clamp01(target.current);
      const next = Math.abs(t - p) < 0.0002 ? t : lerp(p, t, EASE);
      progress.current = next;
      render(next);
      if (Math.abs(t - next) > 0.00015) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = null;
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  // scene envelope
  const sceneAlpha = (p: number, a: number, b: number, hasTail: boolean) => {
    const headA = a, headB = a + HEAD * (b - a);
    const tailB = b, tailA = hasTail ? b - TAIL * (b - a) : b;
    const head = smooth(map01(p, headA, headB));
    const tail = hasTail ? (1 - smooth(map01(p, tailA, tailB))) : 1;
    return Math.min(head, tail);
  };

  const render = (p: number) => {
    const host = sectionRef.current!;
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
      node.style.transform = `${base} translateY(${(1 - a) * 20}px)`;
      node.style.visibility = a > 0.001 ? "visible" : "hidden";
      node.style.zIndex = String(it.z);
    });

    // Finish (down) → unlock, allow momentum
    if (lockedRef.current && unlockArmedRef.current && (p >= lastAppear || p >= 0.99)) {
      unlockBody();
      relockArmedRef.current = false;
      passDirRef.current = "down";
    }

    // Start (up) → unlock, allow momentum
    if (lockedRef.current && unlockArmedRef.current && (p <= 0.01)) {
      unlockBody();
      relockArmedRef.current = false;
      passDirRef.current = "up";
    }

    // Re-arm unlock permission once away from edges
    if (!unlockArmedRef.current && (p < lastAppear - 0.02) && (p > 0.02)) {
      unlockArmedRef.current = true;
    }
  };

  useEffect(() => { render(0); }, []);

  const cloudPositions = [
    // dial clouds back on mobile to reduce clutter
    ...(isMobile ? [] : [
      { top: "-80%", right: "-30%", width: "75%" },
      { top: "-80%", right: "-30%", width: "85%" },
      { bottom: "-50%", left: "-30%", width: "75%" },
      { bottom: "-50%", left: "-30%", width: "80%" },
    ]),
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "transparent",
        position: "relative",
        width: "100vw",
        overflow: "visible", // allow clouds to overflow upward
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "visible", // allow clouds to overflow upward
          background: "transparent",
          width: "100vw",
        }}
      >
        {cloudPositions.map((pos, idx) => (
          <img key={idx} src={cloudImg} alt=""
            style={{
              position: "absolute",
              ...(pos as any).top ? { top: (pos as any).top } : {},
              ...(pos as any).bottom ? { bottom: (pos as any).bottom } : {},
              ...(pos as any).left ? { left: (pos as any).left } : {},
              ...(pos as any).right ? { right: (pos as any).right } : {},
              width: (pos as any).width,
              zIndex: 1, // ensure clouds are above background but below main content
              pointerEvents: "none"
            }} />
        ))}

        <h2
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            margin: isMobile ? "20px 16px 8px" : "32px",
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
              transform: (it.style.transform as string) || "translateY(20px)",
              transition: "none",
              pointerEvents: "none",
              visibility: "hidden",
            }}
          />
        ))}

        {/* tiny tails so momentum carries into adjacent sections */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1 }} />
      </div>
    </section>
  );
};

export default WhyAangan;
