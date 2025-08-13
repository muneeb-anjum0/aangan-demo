// src/components/MissionVision.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { JSX, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// ---------- ONE-FILE UTILS ----------
function cn(...inputs: Array<string | number | false | null | undefined>) {
  return twMerge(clsx(inputs));
}

// ---------- ONE-FILE CARD UI ----------
const Card = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

// ---------- ASSETS ----------
import backgroundCircle from "../assets/missionVision/background-circle.svg";
import backgroundCircle2 from "../assets/missionVision/background-circle2.svg";
import backgroundDecor from "../assets/missionVision/background-decor.svg";
import muslimWomenCafe from "../assets/missionVision/img8.svg";
import happyBirds2 from "../assets/missionVision/img1.svg";
import happyBirds5 from "../assets/missionVision/img2.svg";
import happyBirds6 from "../assets/missionVision/img3.svg";
import happyBirds8 from "../assets/missionVision/img4.svg";
import happyBirds9 from "../assets/missionVision/img5.svg";
import happyBirds10 from "../assets/missionVision/img6.svg";
import happyBirds11 from "../assets/missionVision/img7.svg";

// ---------- DATA ----------
const missionCards = [
  { title: "Normalize the Conversation", image: muslimWomenCafe, bgColor: "bg-[#fa9b9b80]", borderColor: "border-[#fa9b9b]" },
  { title: "Bridge the Awareness Gap", image: happyBirds2, bgColor: "bg-[#fabf7680]", borderColor: "border-[#fabf76]" },
  { title: "Champion Desi Care", image: happyBirds5, bgColor: "bg-[#dbbfac80]", borderColor: "border-[#dbbfac]" },
  { title: "Knowledge is Self-Care", image: happyBirds6, bgColor: "bg-[#f2c5b280]", borderColor: "border-[#f2c5b2]" },
  { title: "Break Silence, Build Support", image: happyBirds8, bgColor: "bg-[#ff72ad4c]", borderColor: "border-[#ff72ad]" },
  { title: "Uplift with Empathy", image: happyBirds9, bgColor: "bg-[#d799de4f]", borderColor: "border-[#d799de]" },
  { title: "Dignity in Every Phase", image: happyBirds10, bgColor: "bg-[#f0ab6b80]", borderColor: "border-[#f0ab6b]" },
  { title: "Heal through Community", image: happyBirds11, bgColor: "bg-[#7fc1e380]", borderColor: "border-[#7fc1e3]" },
] as const;

const valuesCards = [
  {
    title: "Awareness\nThrough Knowledge",
    description:
      "We combine modern technology, cultural wisdom, and trusted medical expertise to empower women with health information that's accurate, accessible, and truly relevant to their daily lives and unique needs.",
    isMain: false,
  },
  {
    title: "Data Protection",
    description:
      "Confidentiality is non-negotiable. Any private or sensitive information you share is treated with the utmost care; never reused, never repurposed, and never shared outside of Aangan. Your trust is our responsibility, and we guard it seriously.",
    isMain: false,
  },
  {
    title: "Consent First",
    description:
      "We prioritize your comfort, safety, and privacy. Every interaction and contribution is built on formal consent—giving you complete control over your data, your choices, and how you engage with Aangan.",
    isMain: false,
  },
  {
    title: "Cultural Integrity",
    description:
      'We honor our roots by asking, "Will Phopho approve?"—a lighthearted yet sincere reminder that everything we create reflects our community and family values. From design to content, we ensure our work remains modest, halal, respectful, and deeply connected to the cultural care our elders.',
    isMain: false,
  },
  {
    title: "Kindness &\nTransparency",
    description:
      "We foster a culture of direct, respectful, and empathetic feedback. There's no room for gossip, blame, or exclusion—only open dialogue and mutual growth. We believe in real-time, solution-focused communication.",
    isMain: false,
  },
] as const;

// ---------- MOBILE MISSION LAYOUT CONTROL ----------
type Pos = {
  index: number;
  left: number | string;
  top: number | string;
  rotate?: number;
  scale?: number;
};

const mobileLayout = {
  cardWidth: 130,
  cardHeight: 170,
  canvasTopHeight: 370,
  canvasBottomHeight: 370,
  top: [
    { index: 6, left: 30, top: 0, rotate: 0, scale: 0.75 },
    { index: 0, left: 164, top: 0, rotate: 0, scale: 0.75 },
    { index: 7, left: 30, top: 170, rotate: 0, scale: 0.75 },
    { index: 3, left: 164, top: 170, rotate: 0, scale: 0.75 },
  ] as Pos[],
  bottom: [
    { index: 4, left: 30, top: 0, rotate: 0, scale: 0.75 },
    { index: 1, left: 164, top: 0, rotate: 0, scale: 0.75 },
    { index: 5, left: 30, top: 170, rotate: 0, scale: 0.75 },
    { index: 2, left: 164, top: 170, rotate: 0, scale: 0.75 },
  ] as Pos[],
} as const;

// ---------- PURE HELPERS ----------
const getCardSize = (width: number) => {
  if (width <= 768) return { width: 95, height: 125 };
  if (width <= 1024) return { width: 120, height: 160 };
  return { width: 155, height: 205 };
};

// Throttle a handler with rAF (avoids layout thrash on resize)
const useRafEvent = (handler: () => void) => {
  const frame = useRef<number | null>(null);
  return useCallback(() => {
    if (frame.current != null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      handler();
    });
  }, [handler]);
};

// ---------- MEMO CARD ----------
const MissionCard = React.memo(function MissionCard({
  cardData,
  size,
  wrapperStyle,
  viewportWidth,
}: {
  cardData: typeof missionCards[number];
  size?: { width: number; height: number };
  wrapperStyle?: React.CSSProperties;
  viewportWidth: number;
}) {
  const isMobile = viewportWidth <= 768;
  const cardSize = size ?? getCardSize(viewportWidth);

  const { padding, borderRadius, imageSize, textAreaHeight } = useMemo(() => {
    const pad = Math.max(4, Math.round(cardSize.width * 0.04));
    const br = Math.round(cardSize.width * 0.1);
    const baseImageSize = Math.round(cardSize.width * (isMobile ? 0.58 : 0.76));
    const img = baseImageSize + (isMobile ? 4 : 12);
    const tah = Math.round(cardSize.height * (isMobile ? 0.4 : 0.25));
    return { padding: pad, borderRadius: br, imageSize: img, textAreaHeight: tah };
  }, [cardSize.height, cardSize.width, isMobile]);

  return (
    <div className="transition-transform duration-300 will-change-transform group" style={wrapperStyle}>
      <Card
        className={`${cardData.bgColor} border border-solid ${cardData.borderColor} shadow-[0px_0px_4px_#00000040] hover:shadow-[0px_4px_12px_#00000020] group-hover:scale-110 transition-transform duration-300 ease-out overflow-visible`}
        style={{ width: `${cardSize.width}px`, height: `${cardSize.height}px`, borderRadius: `${borderRadius}px` }}
      >
        <CardContent className="h-full flex flex-col justify-between items-center p-0 overflow-visible" style={{ padding: `${padding}px` }}>
          <div className="flex items-center justify-center flex-1">
            <img
              alt="Illustration"
              src={cardData.image}
              loading="lazy"
              decoding="async"
              className="object-contain transition-transform duration-300 ease-out group-hover:scale-110"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                maxWidth: "100%",
                maxHeight: "100%",
                filter: "contrast(1.05) saturate(1.1)",
              }}
            />
          </div>
          <div className="flex items-center justify-center text-center w-full px-1" style={{ height: `${textAreaHeight}px` }}>
            <span
              className="text-black font-normal text-center whitespace-pre-line break-words"
              style={{
                lineHeight: 1.15,
                fontSize: isMobile ? "0.64rem" : "0.78rem",
                display: "-webkit-box",
                WebkitLineClamp: isMobile ? 3 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "visible",
                wordBreak: "break-word",
              }}
            >
              {cardData.title}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

// ---------- MOBILE VALUES DECK (HORIZONTAL SHUFFLE) ----------
function ValuesDeck({
  visible,
  viewportW,
  viewportH,
}: {
  visible: boolean;
  viewportW: number;
  viewportH: number;
}) {
  const [order, setOrder] = useState<number[]>(() => valuesCards.map((_, i) => i));
  const [animating, setAnimating] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const isMobile = viewportW <= 768;
  const deckWidth = useMemo(() => {
    if (isMobile) return Math.min(300, Math.max(200, Math.round(viewportW - 56)));
    return Math.min(360, Math.max(260, Math.round(viewportW - 48)));
  }, [viewportW, isMobile]);
  const deckHeight = useMemo(() => {
    if (isMobile) return Math.min(400, Math.max(300, Math.round(Math.min(viewportH * 0.48, viewportW * 1.0))));
    return Math.min(520, Math.max(380, Math.round(Math.min(viewportH * 0.62, viewportW * 1.2))));
  }, [viewportH, viewportW, isMobile]);

  const offsetX = 16; // horizontal spacing between cards
  const scaleStep = 0.03;

  const onAdvance = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setActiveCard(order[0]);
    setTimeout(() => {
      setOrder((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setActiveCard(null);
      setAnimating(false);
    }, 400);
  }, [animating, order]);

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`relative mx-auto transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ width: deckWidth + (order.length - 1) * offsetX, height: deckHeight }}
      >
        {order.map((cardIndex, i) => {
          const pos = i; // 0 = front
          const z = order.length - i;
          const translateX = pos * offsetX;
          const scale = 1 - pos * scaleStep;

          const isAnimatingCard = activeCard === cardIndex;

          const cardShadow =
            pos === 0
              ? { boxShadow: "inset 0 0 24px 8px #fbb6ce99, 0 8px 16px rgba(0,0,0,0.10)" }
              : { boxShadow: "0 3px 8px rgba(0,0,0,0.06)" };

          const cardBg = isMobile ? "bg-white" : "bg-white/95";

          return (
            <div
              key={`values-deck-card-${cardIndex}`}
              className="absolute top-0 will-change-transform"
              style={{
                transform: isAnimatingCard
                  ? `translateX(120%) rotate(10deg) scale(1.05)`
                  : `translateX(${translateX}px) scale(${scale})`,
                zIndex: z,
                transition: isAnimatingCard ? "transform 0.4s ease-in-out" : "transform 0.22s ease, opacity 0.22s ease",
                pointerEvents: pos === 0 ? "auto" : "none",
              }}
            >
              <button
                type="button"
                aria-label="Show next value"
                onClick={onAdvance}
                className="block w-full h-full outline-none focus:ring-2 focus:ring-rose-300 rounded-[26px]"
              >
                <Card
                  className={`relative ${cardBg} rounded-[26px]
                    !border-0 shadow-none transform-gpu [backface-visibility:hidden]
                    transition-[transform,box-shadow,background,opacity] duration-200 ease-out
                    ${pos === 0 ? "hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.12)]" : ""} 
                    ${visible ? "opacity-100" : "opacity-0"}`}
                  style={{
                    width: deckWidth,
                    height: deckHeight,
                    ...cardShadow,
                  }}
                >
                  <CardContent className="h-full p-5 flex flex-col justify-between items-center text-center">
                    <div className="flex-shrink-0">
                      <h3 className="font-['Lexend'] text-[#212121] leading-tight whitespace-pre-line mb-3 text-[18px]">
                        {valuesCards[cardIndex].title}
                      </h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <p
                        className="[font-family:'Inter',Helvetica] text-[#212121] text-[13px] leading-6 text-center"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 10,
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {valuesCards[cardIndex].description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- COMPONENT ----------
export default function MissionVision(): JSX.Element {
  const [missionVisible, setMissionVisible] = useState(false);
  const missionRef = useRef<HTMLDivElement>(null);

  const [valuesVisible, setValuesVisible] = useState(false);
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesTrackRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState<{ w: number; h: number }>(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  // rAF-throttled resize
  const onResizeRaf = useRafEvent(() => setViewport({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    window.addEventListener("resize", onResizeRaf, { passive: true });
    return () => window.removeEventListener("resize", onResizeRaf as unknown as EventListener);
  }, [onResizeRaf]);

  // IntersectionObservers (single options, set true once)
  useEffect(() => {
    const opts: IntersectionObserverInit = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
    const missionEl = missionRef.current;
    const valuesEl = valuesRef.current;

    const mo = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setMissionVisible((v) => (v ? v : true));
    }, opts);
    const vo = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setValuesVisible((v) => (v ? v : true));
    }, opts);

    missionEl && mo.observe(missionEl);
    valuesEl && vo.observe(valuesEl);

    return () => {
      missionEl && mo.unobserve(missionEl);
      valuesEl && vo.unobserve(valuesEl);
      mo.disconnect();
      vo.disconnect();
    };
  }, []);

  // Precompute mobile mission card positions
  const mobileTopCards = useMemo(() => {
    return mobileLayout.top.map((p) => ({
      key: `m-top-${p.index}`,
      data: missionCards[p.index],
      style: {
        position: "absolute" as const,
        left: p.left as number,
        top: p.top as number,
        transform: `translateZ(0)${p.rotate ? ` rotate(${p.rotate}deg)` : ""} scale(${p.scale ?? 1})`,
      },
    }));
  }, []);
  const mobileBottomCards = useMemo(() => {
    return mobileLayout.bottom.map((p) => ({
      key: `m-bot-${p.index}`,
      data: missionCards[p.index],
      style: {
        position: "absolute" as const,
        left: p.left as number,
        top: p.top as number,
        transform: `translateZ(0)${p.rotate ? ` rotate(${p.rotate}deg)` : ""} scale(${p.scale ?? 1})`,
      },
    }));
  }, []);

  // Values card size memo (DESKTOP/TABLET ONLY)
  const valueCardWidth = useMemo(() => Math.max(210, Math.min(250, Math.round(viewport.w * 0.19))), [viewport.w]);
  const valueCardHeight = useMemo(
    () => Math.max(340, Math.min(400, Math.round(Math.min(viewport.h * 0.38, viewport.w * 0.44)))),
    [viewport.h, viewport.w]
  );

  return (
    <div
      className="relative w-full bg-[#fdf8f7] flex flex-col pb-0"
      style={{
        paddingBottom: "0px",
        isolation: "isolate",
        zIndex: 2,
      }}
    >
      {/* BG circle for Mission - static */}
      <img
        className="pointer-events-none select-none absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] left-0 object-cover z-0 opacity-100"
        style={{ top: "20%" }}
        alt="Element removebg"
        src={backgroundCircle}
        loading="lazy"
        decoding="async"
      />

      {/* MISSION */}
      <section
        ref={missionRef}
        className="relative w-full h-auto md:h-[89vh] lg:h-[89vh] flex flex-col md:justify-center items-center pt-4 md:pt-0"
      >
        <img
          className="absolute w-full h-full top-0 left-0 z-10 object-cover opacity-100"
          alt="Frame"
          src={backgroundDecor}
          loading="lazy"
          decoding="async"
        />

        <div
          className={`absolute top-1/2 left-1/2 z-20 text-center hidden md:block transition-all duration-[700ms] ease-out delay-[200ms] ${
            missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
          style={{ transform: "translate(-50%, calc(-50% - 10px))" }}
        >
          <h1
            className={`font-['Lexend'] font-normal text-black text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 lg:mb-3 transition-all duration-[400ms] ease-out delay-[100ms] ${
              missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transform: "translateY(-60px)" }}
          >
            Our Mission
          </h1>

          <div
            className={`w-[250px] md:w-[290px] lg:w-[340px] mx-auto space-y-2 md:space-y-3 lg:space-y-4 px-4 md:px-0 transition-all duration-[400ms] ease-out delay-[200ms] ${
              missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <p className="[font-family:'Inter',Helvetica] font-normal text-black text-lg md:text-xl leading-6 md:leading-7 lg:leading-[30px] text-center">
              Every woman deserves care, support, and a healthy life during her menstrual journey. At Aangan, we're
              here to provide that through knowledge and a compassionate community.
            </p>
            <p className="font-['Noto_Nastaliq_Urdu'] font-normal text-black text-lg md:text-xl leading-7 md:leading-8 lg:leading-[32px] text-center [direction:rtl]">
              ماہواری کے دوران تندرستی ہر خاتون کا حق ہے۔ ہم علم اور کمینٹی سپورٹ کے ذریعے خواتین کوصحت بخش زندگی گزارنے کے قابل
              بنانے کے لئے کوشاں ہیں۔
            </p>
          </div>
        </div>

        {/* Mission Cards */}
        <div
          className={`md:absolute md:inset-0 z-30 transition-all duration-[900ms] ease-out delay-[200ms] ${
            missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {/* MOBILE */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-4 py-3 px-3">
              {/* Top cluster */}
              <div className="relative w-full" style={{ height: mobileLayout.canvasTopHeight }}>
                {mobileTopCards.map((c) => (
                  <MissionCard
                    key={c.key}
                    cardData={c.data}
                    size={{ width: mobileLayout.cardWidth, height: mobileLayout.cardHeight }}
                    wrapperStyle={c.style}
                    viewportWidth={viewport.w}
                  />
                ))}
              </div>

              {/* Text block */}
              <div className="flex-shrink-0 px-3 py-1 flex flex-col items-center justify-center">
                <div
                  className={`text-center transition-all duration-[700ms] ease-out delay-[100ms] ${
                    missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  }`}
                >
                  <h1 className="font-['Lexend'] font-semibold text-black text-xl xs:text-2xl mb-3" style={{ lineHeight: "1.2" }}>
                    Our Mission
                  </h1>
                  <div className="w-full max-w-xs mx-auto space-y-3">
                    <p className="[font-family:'Inter',Helvetica] font-normal text-black text-base xs:text-lg leading-6 text-center">
                      Every woman deserves care, support, and a healthy life during her menstrual journey. At Aangan,
                      we're here to provide that through knowledge and a compassionate community.
                    </p>
                    <p className="font-['Noto_Nastaliq_Urdu'] font-normal text-black text-base xs:text-lg leading-6 text-center [direction:rtl]">
                      ماہواری کے دوران تندرستی ہر خاتون کا حق ہے۔ ہم علم اور کمینٹی سپورٹ کے ذریعے خواتین کوصحت بخش زندگی گزارنے
                      کے قابل بنانے کے لئے کوشاں ہیں۔
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom cluster */}
              <div className="relative w-full" style={{ height: mobileLayout.canvasBottomHeight }}>
                {mobileBottomCards.map((c) => (
                  <MissionCard
                    key={c.key}
                    cardData={c.data}
                    size={{ width: mobileLayout.cardWidth, height: mobileLayout.cardHeight }}
                    wrapperStyle={c.style}
                    viewportWidth={viewport.w}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tablet */}
          <div className="hidden md:block lg:hidden">
            {/* LEFT */}
            <div className="absolute top-[76px] left-14 transform translate-x-[180px]">
              <MissionCard cardData={missionCards[6]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute bottom-[155px] left-22 transform translate-x-[180px]">
              <MissionCard cardData={missionCards[0]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[calc(54%_-_40px)] left-2 transform -translate-y-1/2 translate-x-[170px]">
              <MissionCard cardData={missionCards[7]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[48%] left=[240px] transform -translate-y-1/2 translate-x-[150px]">
              <MissionCard cardData={missionCards[3]} viewportWidth={viewport.w} />
            </div>
            {/* RIGHT */}
            <div className="absolute top-[52%] right-40 transform -translate-y-1/2 -translate-x-[170px]">
              <MissionCard cardData={missionCards[2]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[102px] right-14 transform -translate-x-[160px]">
              <MissionCard cardData={missionCards[4]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute bottom-[80px] right-22 transform -translate-x-[190px]">
              <MissionCard cardData={missionCards[1]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[calc(50%-40px)] right-2 transform -translate-y-1/2 -translate-x-[150px]">
              <MissionCard cardData={missionCards[5]} viewportWidth={viewport.w} />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block">
            {/* LEFT */}
            <div className="absolute left-28 transform translate-x-[160px] top-[84px]">
              <MissionCard cardData={missionCards[6]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute bottom-[155px] left-36 transform translate-x-[150px]">
              <MissionCard cardData={missionCards[0]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[calc(60%_-_90px)] -left-12 transform -translate-y-1/2 translate-x-[160px]">
              <MissionCard cardData={missionCards[7]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[44%] left-[330px] transform -translate-y-1/2 translate-x-[120px]">
              <MissionCard cardData={missionCards[3]} viewportWidth={viewport.w} />
            </div>
            {/* RIGHT */}
            <div className="absolute top-[84px] right-28 transform -translate-x-[160px]">
              <MissionCard cardData={missionCards[4]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute bottom-[160px] right-36 transform -translate-x-[150px]">
              <MissionCard cardData={missionCards[1]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[44%] right-[calc(10rem+126px)] transform -translate-y-1/2 -translate-x-[160px]">
              <MissionCard cardData={missionCards[2]} viewportWidth={viewport.w} />
            </div>
            <div className="absolute top-[calc(58%+20px-112px)] -right-1 transform -translate-y-1/2 -translate-x-[120px]">
              <MissionCard cardData={missionCards[5]} viewportWidth={viewport.w} />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section
        ref={valuesRef}
        className="relative w-full h-auto flex flex-col items-center overflow-visible pb-0 mt-[50px] isolate border-none shadow-none bg-transparent"
        style={{ overflow: "visible" }}
      >
        <img
          className="pointer-events-none select-none absolute right-0 bottom-[-120px] w-[420px] h-[420px] md:w-[680px] md:h-[680px] object-cover z-0 opacity-100"
          style={{ right: 0 }}
          alt="Background Circle 2"
          src={backgroundCircle2}
          loading="lazy"
          decoding="async"
        />

        <div
          className={`relative z-10 max-w-5xl mx-auto px-4 text-center pt-6 pb-4 lg:pb-6 -mt-[30px] transition-all duration-400 ease-in delay-50 ${
            valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className={`font-['Lexend'] font-normal text-black text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-5 transition-all duration-400 ease-in delay-100 ${
              valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Aangan Values
          </h2>
          <p
            className={`[font-family:'Inter',Helvetica] text-[#212121] text-sm md:text-base lg:text-lg leading-6 md:leading-7 max-w-3xl mx-auto transition-all duration-400 ease-in delay-150 ${
              valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            At Aangan, we nurture a vision rooted in empathy, dignity, and desi values—where every woman feels seen,
            supported, and in control of her health.
          </p>
        </div>

        {/* MOBILE: DECK OF CARDS */}
        <div
          className={`block md:hidden relative z-30 w-full max-w-[1600px] mx-auto px-3 transition-all duration-300 delay-[200ms] ${
            valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } mb-0`}
        >
          <ValuesDeck visible={valuesVisible} viewportW={viewport.w} viewportH={viewport.h} />
        </div>

        {/* TABLET/DESKTOP: UNCHANGED GRID */}
        <div
          className={`hidden md:block relative z-30 w-full max-w-[1600px] mx-auto px-4 lg:px-6 transition-all duration-300 delay-[200ms] ${
            valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } overflow-visible mb-0`}
          style={{ overflow: "visible" }}
        >
          <div
            ref={valuesTrackRef}
            role="region"
            aria-label="Aangan Values grid"
            tabIndex={0}
            className="flex flex-wrap justify-center gap-6 md:gap-7 lg:gap-8 pt-2 pb-14"
            style={{
              minHeight: "400px",
              marginBottom: 0,
              paddingBottom: 56,
              width: "100%",
            }}
          >
            {valuesCards.map((card, i) => (
              <div
                key={`value-card-${i}`}
                className="group flex-shrink-0 transition-transform duration-300 will-change-transform hover:scale-110 hover:-translate-y-2 hover:z-30"
                style={{ width: `min(100%, ${valueCardWidth}px)`, maxWidth: "320px", minWidth: "220px" }}
              >
                <Card
                  className={`relative bg-white/95 rounded-[26px] md:rounded-[28px] lg:rounded-[30px]
                  !border-0 shadow-none transform-gpu [backface-visibility:hidden] will-change-transform
                  cursor-pointer group-hover:!opacity-100 group-hover:bg-white/80
                  group-hover:shadow=[inset_2px_2px_16px_#fddde5,inset_-2px_-2px_16px_#fee2e1,0_8px_16px_rgba(0,0,0,0.08)]
                  group-hover:[filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.08))]
                  transition-[opacity,transform] ease-in ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{
                    width: `min(100%, ${valueCardWidth}px)`,
                    height: `${valueCardHeight}px`,
                    transitionDelay: valuesVisible ? `${200 + i * 40}ms` : "0ms",
                    transitionDuration: valuesVisible ? "120ms" : "60ms",
                    transitionTimingFunction: "ease-in",
                    transform: "translateZ(0)",
                    outline: "1px solid transparent",
                    marginTop: "40px",
                    zIndex: 60,
                    flex: "1 1 260px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CardContent className="h-full p-5 md:p-6 flex flex-col justify-between items-center text-center overflow-visible will-change-transform">
                    <div className="flex-shrink-0">
                      <h3 className={`font-['Lexend'] text-[#212121] leading-tight whitespace-pre-line mb-3 md:mb-4 text-[18px] md:text-[20px]`}>
                        {card.title}
                      </h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center overflow-visible" style={{ overflow: "visible" }}>
                      <p
                        className="[font-family:'Inter',Helvetica] text-[#212121] text-[12.5px] md:text-sm leading-6 text-center overflow-visiblea"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: viewport.h < 720 ? 9 : 10,
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
