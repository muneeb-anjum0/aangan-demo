// src/components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import logoMark from "../assets/navbar/aangan-logo-mark.svg";
import textLogo from "../assets/navbar/aangan-text-logo.png";

type NavItem = { label: string; href: string };
const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "#pricing" },
  { label: "About us", href: "#about-us" },
];

const toId = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(toId("Home"));

  // Scroll to section with offset for fixed navbar
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const nav = navRef.current;
    if (el) {
      const navHeight = nav ? nav.offsetHeight : 0;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  // refs to prevent redundant state updates
  const scrolledRef = useRef<boolean>(false);
  const activeRef = useRef<string>(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  // ----- PERF: shadow/bg toggle (IO w/ rAF fallback) -----
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const apply = (v: boolean) => {
      if (scrolledRef.current !== v) {
        scrolledRef.current = v;
        setScrolled(v);
      }
    };

    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position: static; height: 1px; width: 1px; pointer-events:none; opacity:0;";
    el.parentElement?.insertBefore(sentinel, el.nextSibling);

    const computeRootMargin = () => `-${el.offsetHeight}px 0px 0px 0px`;

    let io: IntersectionObserver | null = null;
    const makeObserver = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => apply(!entries[0].isIntersecting),
        { root: null, rootMargin: computeRootMargin(), threshold: 0 }
      );
      io.observe(sentinel);
    };

    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => makeObserver());
      ro.observe(el);
    }

    if ("IntersectionObserver" in window) {
      makeObserver();
    } else {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { apply(window.scrollY > 8); ticking = false; });
      };
      onScroll();
      (window as Window).addEventListener("scroll", onScroll, { passive: true });
      (el as any).__cleanupScroll = () => (window as Window).removeEventListener("scroll", onScroll);
    }

    return () => {
      io?.disconnect();
      ro?.disconnect();
      sentinel.remove();
      (el as any).__cleanupScroll?.();
    };
  }, []);

  // ----- Mobile scroll lock + focus trap + Esc to close -----
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = { position: style.position, top: style.top, width: style.width };
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";
    firstLinkRef.current?.focus();

    const keyHandler = (e: KeyboardEvent) => {
      if (!menuRef.current) return;
      if (e.key === "Escape") {
        setMenuOpen(false);
        setTimeout(() => burgerRef.current?.focus(), 0);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute("disabled"));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (current === first || !menuRef.current.contains(current)) { last.focus(); e.preventDefault(); }
      } else {
        if (current === last || !menuRef.current.contains(current)) { first.focus(); e.preventDefault(); }
      }
    };

    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
      style.position = prev.position; style.top = prev.top; style.width = prev.width;
      const y = prev.top ? -parseInt(prev.top, 10) : 0;
      window.scrollTo(0, y);
      burgerRef.current?.focus();
    };
  }, [menuOpen]);

  // ----- Active section highlighting -----
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        const id = visible?.target?.id;
        if (id && id !== activeRef.current) { activeRef.current = id; setActive(id); }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.5] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // ----- Initialize active from hash -----
  useEffect(() => {
    const setFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id && id !== activeRef.current) { activeRef.current = id; setActive(id); }
    };
    setFromHash();
    const onHash = () => { setFromHash(); setMenuOpen(false); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // ----- Maintain body padding equal to nav height -----
  useEffect(() => {
    const applyPad = () => {
      if (!navRef.current) return;
      const h = navRef.current.offsetHeight;
      if (document.documentElement.style.getPropertyValue("--nav-h") !== `${h}px`) {
        document.body.style.paddingTop = `${h}px`;
        document.documentElement.style.setProperty("--nav-h", `${h}px`);
      }
    };
    applyPad();
    const ro =
      typeof window !== "undefined" && "ResizeObserver" in window
        ? new (window as any).ResizeObserver(() => requestAnimationFrame(applyPad))
        : null;

    if (ro && navRef.current) ro.observe(navRef.current);
    const onResize = () => requestAnimationFrame(applyPad);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.paddingTop = "";
      document.documentElement.style.removeProperty("--nav-h");
      window.removeEventListener("resize", onResize);
      if (ro && navRef.current) ro.unobserve(navRef.current);
    };
  }, []);

  // ---- Liquid Glass "Join the Waitlist" (darker pink) — SLIGHTLY BIGGER ----
  const waitlistCtaClasses = [
    "group relative inline-flex items-center justify-center gap-2",
    "px-5 py-2.5 rounded-[999px] text-sm md:text-base font-semibold tracking-tight",
    "text-[#5b2a36] select-none overflow-hidden",
    "bg-[#f9b2c5]/90 backdrop-blur-xl ring-1 ring-white/60",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_6px_14px_rgba(249,178,197,0.55)]",
    "transition-all duration-300 ease-out transform",
    "md:hover:scale-[1.03] hover:-translate-y-[1px] active:translate-y-0",
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_12px_24px_rgba(249,178,197,0.72)]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2",
  ].join(" ");

  const WaitlistGlassLayers = () => (
    <>
      <span
        className="pointer-events-none absolute inset-[1px] rounded-[999px] opacity-80"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.08) 65%, rgba(255,255,255,0.05) 100%)",
        }}
      />
      <span className="pointer-events-none absolute -top-2.5 left-4 h-7 w-18 rounded-full bg-white/60 blur-2xl opacity-70 transform-gpu transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-0.5" />
      <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/4 rotate-12 bg-white/30 blur-md opacity-0 group-hover:opacity-70 group-hover:translate-x-[200%] transition-all duration-700 ease-out" />
    </>
  );

  const WaitlistLabel = () => (
    <span className="relative z-10 inline-flex items-center gap-2">
      <span>Join the Waitlist</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    </span>
  );

  return (
    <>
      <nav
        id="navbar"
        data-navbar
        ref={navRef}
        role="navigation"
        aria-label="Primary"
        className={[
          "fixed top-0 left-0 w-full z-50 h-14 md:h-20",
          "border-b transition-colors duration-200",
          scrolled
            ? [
                "bg-white/90 border-black/10 shadow-sm",
                "md:bg-white/30 md:supports-[backdrop-filter]:bg-white/10 md:supports-[backdrop-filter]:backdrop-blur-sm md:backdrop-saturate-150 md:shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
              ].join(" ")
            : "bg-transparent border-transparent",
        ].join(" ")}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="container mx-auto h-full px-4 md:px-6">
          <div className="flex h-full items-center justify-between">
            {/* Brand */}
            <a href="#home" className="flex items-center gap-2 md:gap-3">
              <img
                src={logoMark}
                alt="Aangan logo mark"
                className="h-8 w-auto md:h-11"
                width={44}
                height={44}
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
              <img
                src={textLogo}
                alt="Aangan text logo"
                className="h-5 w-auto md:h-8"
                width={120}
                height={24}
                decoding="async"
                loading="lazy"
              />
            </a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center md:space-x-10 lg:space-x-16 xl:space-x-20">
              {navItems.map(({ label, href }) => {
                const id = toId(label);
                const isActive = active === id;
                return (
                  <li key={label} className="flex items-center">
                    <a
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => {
                        if (href.startsWith("#")) {
                          e.preventDefault();
                          setActive(id);
                          if (id === 'home') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            scrollToSection(href.slice(1));
                          }
                        } else {
                          setActive(id);
                        }
                      }}
                      className={[
                        "text-base leading-none font-thin py-2 transition-transform duration-200 ease-in-out md:hover:scale-105 md:hover:text-pink-500",
                        "motion-reduce:transform-none motion-reduce:transition-none",
                        isActive ? "text-pink-600" : "text-gray-700",
                      ].join(" ")}
                      style={{ fontFamily: '"Helvetica Neue", "Arial", sans-serif', fontWeight: 200 }}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA (slightly bigger) */}
            <a
              href="#waitlist"
              className={`hidden md:inline-flex ${waitlistCtaClasses}`}
              aria-label="Join the Waitlist"
              onClick={e => {
                e.preventDefault();
                scrollToSection('waitlist');
              }}
            >
              <WaitlistGlassLayers />
              <WaitlistLabel />
            </a>

            {/* Hamburger */}
            <button
              ref={burgerRef}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              data-open={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={["block w-7 h-0.5 mb-1 rounded transition-all", menuOpen ? "bg-pink-500" : "bg-neutral-900", "motion-reduce:transition-none"].join(" ")} />
              <span className={["block w-7 h-0.5 mb-1 rounded transition-all", menuOpen ? "bg-pink-500" : "bg-neutral-900", "motion-reduce:transition-none"].join(" ")} />
              <span className={["block w-7 h-0.5 rounded transition-all", menuOpen ? "bg-pink-500" : "bg-neutral-900", "motion-reduce:transition-none"].join(" ")} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            ref={menuRef}
            className="fixed inset-0 bg-white/95 z-40 flex flex-col items-center justify-center md:hidden transition-all overscroll-contain"
            style={{ touchAction: "none" }}
            // Remove onClick from container to prevent closing on background click
          >
            <ul className="space-y-8">
              {navItems.map(({ label, href }, idx) => {
                const id = toId(label);
                const isActive = active === id;
                return (
                  <li key={label} className="flex items-center justify-center">
                    <a
                      href={href}
                      ref={idx === 0 ? firstLinkRef : undefined}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => {
                        if (href.startsWith("#")) {
                          e.preventDefault();
                          setActive(id);
                          setMenuOpen(false);
                          setTimeout(() => {
                            requestAnimationFrame(() => {
                              if (id === 'home') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              } else {
                                scrollToSection(href.slice(1));
                              }
                            });
                          }, 100);
                        } else {
                          setActive(id);
                          setMenuOpen(false);
                        }
                      }}
                      className={[
                        "text-2xl leading-none font-thin min-h-[44px] py-2 transition-transform duration-200 md:hover:scale-105 md:hover:text-pink-500",
                        "motion-reduce:transform-none motion-reduce:transition-none",
                        isActive ? "text-pink-600" : "text-gray-700",
                      ].join(" ")}
                      style={{ fontFamily: '"Helvetica Neue", "Arial", sans-serif', fontWeight: 200 }}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Mobile CTA (slightly bigger than last) */}
            <a
              href="#waitlist"
              className={`${waitlistCtaClasses} md:hidden h-11 px-5 text-base mt-8`}
              aria-label="Join the Waitlist"
              onClick={e => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  requestAnimationFrame(() => scrollToSection('waitlist'));
                }, 100);
              }}
            >
              <WaitlistGlassLayers />
              <WaitlistLabel />
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
