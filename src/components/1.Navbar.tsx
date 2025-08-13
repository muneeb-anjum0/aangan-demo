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

  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  // scroll shadow / bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile scroll lock + focus trap + Esc to close
  useEffect(() => {
    if (!menuOpen) return;

    // lock scroll (iOS-safe)
    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = { position: style.position, top: style.top, width: style.width };
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    // initial focus
    firstLinkRef.current?.focus();

    const keyHandler = (e: KeyboardEvent) => {
      if (!menuRef.current) return;

      // Esc closes and returns focus to burger
      if (e.key === "Escape") {
        setMenuOpen(false);
        setTimeout(() => burgerRef.current?.focus(), 0);
        return;
      }

      // Tab trap
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute("disabled"));
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (current === first || !menuRef.current.contains(current)) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (current === last || !menuRef.current.contains(current)) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
      // restore scroll
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      const y = prev.top ? -parseInt(prev.top, 10) : 0;
      window.scrollTo(0, y);
      // return focus to burger
      burgerRef.current?.focus();
    };
  }, [menuOpen]);

  // active section highlighting via IO
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.5] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // initialize active from hash + react to hash changes
  useEffect(() => {
    const setFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id) setActive(id);
    };
    setFromHash();
    const onHash = () => {
      setFromHash();
      setMenuOpen(false);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // maintain body padding equal to nav height (and expose CSS var --nav-h)
  useEffect(() => {
    const applyPad = () => {
      if (!navRef.current) return;
      const h = navRef.current.offsetHeight;
      document.body.style.paddingTop = `${h}px`;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    applyPad();

    const ro =
      typeof window !== "undefined" && "ResizeObserver" in window
        ? new (window as any).ResizeObserver(() => applyPad())
        : null;

    if (ro && navRef.current) ro.observe(navRef.current);
    window.addEventListener("resize", applyPad);

    return () => {
      document.body.style.paddingTop = "";
      document.documentElement.style.removeProperty("--nav-h");
      window.removeEventListener("resize", applyPad);
      if (ro && navRef.current) ro.unobserve(navRef.current);
    };
  }, []);

  // CTA styles (unchanged)
  const ctaBase =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl text-sm font-medium " +
    "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "motion-reduce:transform-none motion-reduce:transition-none";
  const ctaVisual =
    "liquid-cta px-5 h-11 text-neutral-900 ring-1 ring-pink-300/40 shadow-sm hover:shadow-lg hover:ring-pink-400/60 hover:-translate-y-0.5";
  const ctaIcon =
    "ml-2 w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 " +
    "motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <>
      <nav
        id="navbar"                // expose for consumers
        data-navbar                // expose for consumers
        ref={navRef}
        role="navigation"
        aria-label="Primary"
        className={[
          "fixed top-0 left-0 w-full z-50 h-14 md:h-20",
          "border-b transition-colors duration-300",
          scrolled
            ? "bg-white/30 supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-sm backdrop-saturate-150 border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
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
                      onClick={() => setActive(id)}
                      className={[
                        "text-base leading-none font-thin py-2 transition-all duration-300 ease-in-out hover:scale-105 hover:text-pink-500 transform",
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

            {/* Desktop CTA */}
            <a href="#waitlist" className={`hidden md:inline-flex ${ctaBase} ${ctaVisual}`} aria-label="Join the Waitlist">
              Join the Waitlist
              <svg className={ctaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
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
            onClick={() => setMenuOpen(false)}
          >
            <ul className="space-y-8" onClick={(e) => e.stopPropagation()}>
              {navItems.map(({ label, href }, idx) => {
                const id = toId(label);
                const isActive = active === id;
                return (
                  <li key={label} className="flex items-center justify-center">
                    <a
                      href={href}
                      ref={idx === 0 ? firstLinkRef : undefined}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => {
                        setActive(id);
                        setMenuOpen(false);
                      }}
                      className={[
                        "text-2xl leading-none font-thin min-h-[44px] py-2 transition-all duration-300 ease-in-out hover:scale-105 hover:text-pink-500 transform",
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

            {/* Mobile CTA */}
            <a
              href="#waitlist"
              className={`${ctaBase} ${ctaVisual} mt-10 h-12 px-6 text-lg`}
              aria-label="Join the Waitlist"
              onClick={() => setMenuOpen(false)}
            >
              Join the Waitlist
              <svg className={ctaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
