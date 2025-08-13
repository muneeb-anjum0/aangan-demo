// src/components/WaitlistSection.tsx
import { useState, useRef, useCallback, useMemo, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import backgroundPattern from "../assets/waitlist/background-pattern.png";
import emailIcon from "../assets/waitlist/email-icon.svg";

type Note = { kind: "ok" | "err" | null; text: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState<Note>({ kind: null, text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const hpRef = useRef<HTMLInputElement>(null); // honeypot
  const reduceMotion = useReducedMotion();

  const bgStyle = useMemo(
    () => ({
      backgroundImage: `url(${backgroundPattern})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    } as const),
    []
  );

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLoading) return;

      // spam/honeypot
      if (hpRef.current?.value) return;

      const value = email.trim().toLowerCase();
      const isValid = EMAIL_RE.test(value);
      if (!isValid) {
        setNote({ kind: "err", text: "Please enter a valid email." });
        noteRef.current?.focus();
        return;
      }

      try {
        setIsLoading(true);
        // TODO: Replace with your API call
        // await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email: value }) });

        setEmail("");
        inputRef.current?.blur();
        setNote({ kind: "ok", text: "Thanks! You’re on the list." });
        requestAnimationFrame(() => noteRef.current?.focus());
      } catch {
        setNote({ kind: "err", text: "Something went wrong. Please try again." });
        noteRef.current?.focus();
      } finally {
        setIsLoading(false);
      }
    },
    [email, isLoading]
  );

  return (
    <motion.section
      className="relative w-full overflow-x-hidden"
      initial={reduceMotion ? undefined : { opacity: 0, y: 60 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduceMotion ? undefined : { duration: 0.9, ease: "easeOut" }}
    >
      <div className="relative w-full bg-[#ff9bc5]" style={bgStyle}>
        <div className="absolute inset-0 pointer-events-none bg-white/0 sm:bg-white/0" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-6 px-4 sm:px-6 py-16 sm:py-24 min-h-[380px] sm:min-h-[420px]">
          <h2 className="text-[1.15rem] sm:text-2xl lg:text-3xl font-medium text-center text-black leading-tight">
            Join the Waitlist!
          </h2>

          <p className="text-[0.95rem] sm:text-base text-center text-black max-w-[90vw] sm:max-w-2xl">
            Join over 100,000 women already tracking their health with Aangan.
            Be a part of a community that supports, understands, and empowers you.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-[95vw] sm:max-w-md" noValidate>
            <label htmlFor="waitlist-email" className="sr-only">
              Enter your email to join the waitlist
            </label>

            {/* Honeypot */}
            <input
              ref={hpRef}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            <div className="flex items-stretch rounded-md border border-neutral-700 bg-white/95 backdrop-blur-sm shadow-sm focus-within:ring-2 focus-within:ring-black/30">
              <input
                ref={inputRef}
                id="waitlist-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email to join the waitlist"
                value={email}
                onChange={onEmailChange}
                className="flex-1 bg-transparent outline-none px-3 text-[16px] placeholder-neutral-500 text-neutral-800 h-12 sm:h-12"
                aria-invalid={note.kind === "err" || undefined}
                aria-describedby="waitlist-note"
                enterKeyHint="go"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 h-12 border-l border-neutral-700 bg-transparent hover:bg-black/5 transition focus:outline-none focus:ring-2 focus:ring-black/40 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {!isLoading ? (
                  <>
                    <img
                      className="w-5 h-5 select-none pointer-events-none"
                      alt=""
                      src={emailIcon}
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>Join</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                      <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    <span>Sending…</span>
                  </>
                )}
              </button>
            </div>

            <p
              id="waitlist-note"
              ref={noteRef}
              role="status"
              aria-live="polite"
              tabIndex={-1}
              className={`mt-2 text-xs text-center px-2 ${
                note.kind === "err"
                  ? "text-red-700"
                  : note.kind === "ok"
                  ? "text-green-700"
                  : "text-black/80"
              }`}
            >
              {note.text || "No spam. Unsubscribe anytime."}
            </p>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default WaitlistSection;
