// src/components/FooterSection.tsx
import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import footerBackgroundPattern from "../assets/footer/footer-background-pattern.png";
import aanganLogoMark from "../assets/footer/aangan-logo-mark.svg";
import aanganTextLogo from "../assets/footer/aangan-text-logo.png";
import facebookIcon from "../assets/footer/facebook.png";
import instaIcon from "../assets/footer/insta.png";
import linkedinIcon from "../assets/footer/linkedin.png";

/* ----------------------- static data & utils (no re-create) ----------------------- */
const productLinks = [
  { title: "Features", href: "#" },
  { title: "Community", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Support", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "About us", href: "#" },
  { title: "Contact", href: "#" },
] as const;

const legalLinks = [
  { title: "Terms of Service", href: "#" },
  { title: "Privacy Policy", href: "#" },
  { title: "Blog", href: "#" },
] as const;

const socials = [
  { href: "#", label: "Facebook", icon: facebookIcon },
  { href: "#", label: "Instagram", icon: instaIcon },
  { href: "#", label: "LinkedIn", icon: linkedinIcon },
] as const;

const isExternal = (href: string) => /^https?:\/\//i.test(href);

/* ---------------------------------- UI atoms ---------------------------------- */
const Card = memo(({ children }: { children: ReactNode }) => (
  <div className="bg-white rounded-lg shadow">{children}</div>
));
Card.displayName = "Card";

const CardContent = memo(({ children }: { children: ReactNode }) => (
  <div className="p-4 sm:p-6 md:p-8 lg:p-10">{children}</div>
));
CardContent.displayName = "CardContent";

/* --------------------------------- component --------------------------------- */
const FooterSection = (): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // memoized CSS and bg style to avoid re-creation
  const animCSS = useMemo(
    () => `
      @keyframes fade-in-left {
        0% { opacity: 0; transform: translateX(-32px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes fade-in-right {
        0% { opacity: 0; transform: translateX(32px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(32px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-left { animation: fade-in-left .85s cubic-bezier(0.23,1,0.32,1) forwards; will-change: transform, opacity; }
      .animate-fade-in-right { animation: fade-in-right .85s cubic-bezier(0.23,1,0.32,1) forwards; will-change: transform, opacity; }
      .animate-fade-in-up { animation: fade-in-up .85s cubic-bezier(0.23,1,0.32,1) forwards; will-change: transform, opacity; }

      @media (prefers-reduced-motion: reduce) {
        .animate-fade-in-left,
        .animate-fade-in-right,
        .animate-fade-in-up { animation: none !important; }
      }

      .section-content-visibility { content-visibility: auto; contain-intrinsic-size: 1px 600px; }
    `,
    []
  );

  const bgStyle = useMemo(
    () => ({
      backgroundImage: `url(${footerBackgroundPattern})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    } as const),
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let stopped = false;
    const options: IntersectionObserverInit = {
      threshold: 0.25,
      rootMargin: "0px 0px -50px 0px",
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!stopped && entry.isIntersecting) {
        setVisible(true);
        stopped = true;
        io.unobserve(entry.target);
        io.disconnect();
      }
    }, options);

    io.observe(el);
    return () => {
      stopped = true;
      io.disconnect();
    };
  }, []);

  const brandBlockClass =
    "flex flex-col gap-5 sm:gap-7 lg:max-w-[680px] w-full " +
    (visible ? "animate-fade-in-up" : "opacity-0");

  const socialsClass =
    "flex items-center justify-center lg:justify-start gap-2 sm:gap-3 " +
    (visible ? "animate-fade-in-left" : "opacity-0");

  const navWrapClass =
    "flex flex-wrap gap-6 lg:gap-12 justify-center lg:justify-end items-start w-full lg:w-auto " +
    (visible ? "animate-fade-in-right" : "opacity-0");

  const copyrightBarClass =
    "w-full h-10 md:h-11 bg-[#212121] flex items-center justify-center px-4 pb-[env(safe-area-inset-bottom)] " +
    (visible ? "animate-fade-in-up" : "opacity-0");

  return (
    <footer role="contentinfo" className="relative w-full">
      <style>{animCSS}</style>

      {/* Decorative background layer (no <img/alt>; not focusable) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 -z-10 opacity-50 -translate-y-8 sm:translate-y-0"
        style={bgStyle}
      />

      <div ref={ref} className="relative z-10 section-content-visibility">
        <Card>
          <CardContent>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 py-7 sm:py-10 md:py-14">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 sm:gap-8 lg:gap-16">
                {/* Brand + Description */}
                <div className={brandBlockClass}>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <a
                      href="/"
                      aria-label="Aangan home"
                      className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bc5] rounded"
                    >
                      <img
                        className="h-8 sm:h-9 md:h-10 w-auto"
                        alt=""
                        src={aanganLogoMark}
                        fetchPriority="high"
                        decoding="async"
                        width={40}
                        height={40}
                      />
                      <img
                        className="h-7 sm:h-8 md:h-9 w-auto"
                        alt="Aangan"
                        src={aanganTextLogo}
                        fetchPriority="high"
                        decoding="async"
                        width={140}
                        height={36}
                      />
                    </a>
                  </div>

                  <p className="text-[#212121] text-xs sm:text-sm md:text-base text-center lg:text-left">
                    Aangan empowers you to track your cycle with confidence — offering intelligent
                    insights, timely reminders, and personalized health tips. From your first period
                    to every phase that follows, we&apos;re here for you, every step of the way.
                  </p>

                  {/* Socials */}
                  <div className={socialsClass}>
                    {socials.map(({ href, label, icon }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="inline-flex items-center justify-center w-11 h-11 rounded hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bc5]"
                        {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        <img
                          className="w-6 h-6"
                          alt=""
                          src={icon}
                          loading="lazy"
                          decoding="async"
                          width={24}
                          height={24}
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className={navWrapClass}>
                  {/* Product */}
                  <div className="flex flex-col items-center text-center lg:items-end lg:text-right flex-1 max-w-[260px]">
                    <h3 className="text-base sm:text-lg font-medium text-[#212121]">Product</h3>

                    {/* Mobile: EXACTLY like before => fixed 2 columns */}
                    <nav aria-label="Product" className="sm:hidden">
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {productLinks.map(({ title, href }) => (
                          <li key={title}>
                            <a
                              href={href}
                              className="block text-sm text-[#212121] hover:text-[#ff9bc5] text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bc5] rounded"
                              {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* ≥ sm: vertical list */}
                    <nav aria-label="Product" className="hidden sm:block">
                      <ul className="flex flex-col gap-1">
                        {productLinks.map(({ title, href }) => (
                          <li key={title}>
                            <a
                              href={href}
                              className="text-sm text-[#212121] hover:text-[#ff9bc5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bc5] rounded"
                              {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* Divider (mobile) */}
                  <div className="w-px bg-gray-200 mx-2 my-2 sm:hidden" />

                  {/* Legal */}
                  <div className="flex flex-col items-center text-center lg:items-end lg:text-right flex-1 max-w-[260px]">
                    <h3 className="text-base sm:text-lg font-medium text-[#212121]">Legal</h3>
                    <nav aria-label="Legal">
                      <ul className="flex flex-col gap-1">
                        {legalLinks.map(({ title, href }) => (
                          <li key={title}>
                            <a
                              href={href}
                              className="text-sm text-[#212121] hover:text-[#ff9bc5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bc5] rounded"
                              {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Copyright bar */}
        <div className={copyrightBarClass}>
          <p className="text-[#ff9bc5] text-xs md:text-sm text-center">© 2025 Aangan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default memo(FooterSection);
