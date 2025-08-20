// src/components/ContactUs.tsx
import React, { useState, useEffect, useRef, useMemo, useCallback, FormEvent } from "react";
import leftBackground from "../assets/missionVision/background-circle2.svg";
import rightBackground from "../assets/missionVision/background-circle.svg";

// -------- API base (same pattern as Testimonials) --------
const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:5000";

// -------- merged utils.ts (cn) --------
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// -------------------------------------

/* === Liquid Glass CTA (same as Pricing/Testimonials) === */
const ctaClasses = [
  "group relative inline-flex items-center justify-center gap-2.5",
  "px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-3.5",
  "rounded-[999px] text-sm sm:text-base md:text-lg font-semibold",
  "text-[#5b2a36] select-none overflow-hidden whitespace-nowrap max-w-full",
  "bg-[#fed5df]/90 backdrop-blur-xl ring-1 ring-white/60",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_24px_rgba(254,213,223,0.60)]",
  "transition-all duration-300 ease-out transform",
  "md:hover:scale-[1.04] hover:-translate-y-[1px] active:translate-y-0",
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_16px_40px_rgba(254,213,223,0.85)]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2",
  "disabled:opacity-60 disabled:cursor-not-allowed"
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

const CtaLabel: React.FC<{ text: string }> = ({ text }) => (
  <span className="relative z-10 inline-flex items-center gap-2.5">
    <span className="truncate">{text}</span>
  </span>
);

/* === Minimal UI bits kept (Inputs) === */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-[#e7c9d6] bg-[#faf7f7]/90 px-3.5 text-[15px] shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/50 focus-visible:border-pink-300",
        "placeholder:text-[#9b9b9b]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[96px] w-full rounded-xl border border-[#e7c9d6] bg-[#faf7f7]/90 px-3.5 py-3 text-[15px] shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/50 focus-visible:border-pink-300",
        "placeholder:text-[#9b9b9b]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

type Note = { kind: "ok" | "err" | null; text: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactUs = (): React.JSX.Element => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [areBackgroundsVisible, setAreBackgroundsVisible] = useState(false);

  // form state
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState<Note>({ kind: null, text: "" });
  const [isSending, setIsSending] = useState(false);

  const hpRef = useRef<HTMLInputElement>(null); // honeypot
  const noteRef = useRef<HTMLParagraphElement>(null);

  const isValid = useMemo(() => {
    return first.trim() && message.trim() && EMAIL_RE.test(email.trim().toLowerCase());
  }, [first, email, message]);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (isSending) return;
      if (hpRef.current?.value) return; // spam bot
      if (!isValid) {
        setNote({ kind: "err", text: "Please fill all required fields with a valid email." });
        noteRef.current?.focus();
        return;
      }

      try {
        setIsSending(true);
        const res = await fetch(`${API_BASE}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: first.trim(),
            lastName: last.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // success
        setFirst(""); setLast(""); setEmail(""); setMessage("");
        setNote({ kind: "ok", text: "Thanks! We’ve received your message and will reply soon." });
        requestAnimationFrame(() => noteRef.current?.focus());
      } catch (err) {
        console.error(err);
        setNote({ kind: "err", text: "Failed to send. Please try again." });
        noteRef.current?.focus();
      } finally {
        setIsSending(false); // <- always reset (fixes “Sending…” getting stuck)
      }
    },
    [first, last, email, message, isValid, isSending]
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAreBackgroundsVisible(true));
    const headerT = setTimeout(() => setIsHeaderVisible(true), 600);
    const cardT = setTimeout(() => setIsCardVisible(true), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(headerT);
      clearTimeout(cardT);
    };
  }, []);

  return (
    // overflow visible so decorative art and any images can bleed in/out
    <main className="relative overflow-visible bg-[#fdf8f7] pb-12">
      {/* Decorative BG (absolute; no layout height) */}
      <img
        className={cn(
            "pointer-events-none select-none absolute -top-[860px] right-0 hidden h-auto w-full max-w-[700px] object-cover lg:block transform-gpu transition-all duration-[2000ms] ease-out",
          areBackgroundsVisible ? "opacity-90 translate-x-0 translate-y-0" : "opacity-0 translate-x-8 translate-y-8"
        )}
        alt=""
        aria-hidden="true"
        src={rightBackground}
        loading="eager"
        decoding="async"
        style={{ willChange: "transform, opacity", transform: "scaleX(-1) scaleY(-1)" }}
      />
      <img
        className={cn(
          "pointer-events-none select-none absolute -top-[520px] left-0 hidden h-auto w-2/3 max-w-[700px] object-cover lg:block transform-gpu transition-all duration-[2000ms] ease-out",
          areBackgroundsVisible ? "opacity-90 translate-x-0 translate-y-0" : "opacity-0 -translate-x-8 translate-y-8"
        )}
        alt=""
        aria-hidden="true"
        src={leftBackground}
        loading="eager"
        decoding="async"
        style={{ willChange: "transform, opacity", transform: "scaleX(-1) scaleY(-1)" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full flex justify-center pt-2">
        <div className="container mx-auto max-w-[980px] px-3">
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            {/* Header */}
            <header
              className={cn(
                "mb-4 -mt-2 flex max-w-5xl flex-col items-center gap-2 text-center lg:gap-3 transform-gpu transition-all duration-[900ms] ease-out",
                isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ willChange: "transform, opacity" }}
            >
              <h1 className="[font-family:'Lexend',Helvetica] font-medium text-black text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                Got a question or just want to say hi?
              </h1>
              <p className="[font-family:'Inter',Helvetica] font-medium text-[#232323] text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
                We&apos;re all ears. Reach out with feedback, questions, or a little hello. We&apos;d love to hear from you!
              </p>
            </header>

            {/* Card — slimmer on desktop (lg+), unchanged on mobile */}
            <section className="w-full max-w-[98vw] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[520px] xl:max-w-[520px]">
              <div
                className={cn(
                  "relative overflow-visible group rounded-[26px] border border-[#efc7d7] bg-white/90 backdrop-blur-xl",
                  "transition-transform duration-300 ease-out transform-gpu",
                  isCardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  "hover:scale-[1.022]"
                )}
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}
              >
                {/* Uniform inner glow in #fedee6 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[1px] rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    boxShadow:
                      "inset 0 0 22px rgba(254,222,230,0.45), inset 0 0 44px rgba(254,222,230,0.35), inset 0 0 88px rgba(254,222,230,0.30)",
                  }}
                />

                {/* Ambient blobs (desktop only) */}
                <div className="hidden md:block absolute -top-6 -right-6 h-16 w-16 rounded-full bg-[#ffd6e8] blur-2xl opacity-60 z-0" />
                <div className="hidden md:block absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-[#ffe7f2] blur-3xl opacity-70 z-0" />

                {/* Content */}
                <div className="relative z-10 px-5 sm:px-7 md:px-8 pt-6 pb-6">
                  <div className="mb-5">
                    <h2 className="[font-family:'Lexend',Helvetica] font-semibold text-[#212121] text-[22px] sm:text-[24px] md:text-[26px]">
                      Get in Touch
                    </h2>
                    <p className="[font-family:'Inter',Helvetica] text-[#353535b2] text-[14px] sm:text-[15px] md:text-[16px] leading-[22px]">
                      You can reach out to us anytime!
                    </p>
                  </div>

                  <form className="flex flex-col gap-3 sm:gap-4 md:gap-5" onSubmit={onSubmit} noValidate>
                    {/* honeypot */}
                    <input
                      ref={hpRef}
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      className="sr-only"
                      aria-hidden="true"
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <Input placeholder="First Name *" value={first} onChange={(e) => setFirst(e.target.value)} />
                      <Input placeholder="Last Name" value={last} onChange={(e) => setLast(e.target.value)} />
                    </div>
                    <Input
                      placeholder="Your Email *"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Textarea
                      placeholder="How can we help? *"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="mt-2 sm:mt-3 flex flex-col items-center gap-3">
                      <button
                        type="submit"
                        aria-label="Submit"
                        className={`${ctaClasses} w-full`}
                        disabled={isSending || !isValid}
                        aria-busy={isSending}
                      >
                        <GlassLayers />
                        <CtaLabel text={isSending ? "Sending…" : "Submit"} />
                      </button>

                      <p
                        ref={noteRef}
                        role="status"
                        tabIndex={-1}
                        className={cn(
                          "[font-family:'Inter',Helvetica] max-w-lg text-center text-xs sm:text-sm md:text-base font-medium leading-relaxed",
                          note.kind === "ok"
                            ? "text-green-700"
                            : note.kind === "err"
                            ? "text-red-700"
                            : "text-[#232323]"
                        )}
                      >
                        {note.text ||
                          "By contacting us, you agree to our Terms of Service and Privacy Policy."}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
