// Footer section with logo, links, and copyright bar
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import "./FooterSection.mobile.css";
import footerBackgroundPattern from "../assets/footer/footer-background-pattern.png";
import aanganLogoMark from "../assets/footer/aangan-logo-mark.svg";
import aanganTextLogo from "../assets/footer/aangan-text-logo.png";
import facebookIcon from "../assets/footer/facebook.png";
import instaIcon from "../assets/footer/insta.png";
import linkedinIcon from "../assets/footer/linkedin.png";

// Card component for consistent background and rounded corners
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow">{children}</div>
);

// CardContent for padding inside Card
const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 sm:p-6 md:p-8 lg:p-10">{children}</div>
);

const FooterSection = (): JSX.Element => {
  // Animation state for fade-in effect
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to trigger animation when footer enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Navigation links for the footer
  const productLinks = [
    { title: "Features", href: "#" },
    { title: "Community", href: "#" },
    { title: "Blog", href: "#" },
    { title: "Support", href: "#" },
    { title: "Pricing", href: "#" },
    { title: "About us", href: "#" },
    { title: "Contact", href: "#" },
  ];

  // Legal and policy links
  const legalLinks = [
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Blog", href: "#" },
  ];

  return (
  <footer className="flex flex-col items-start w-full footer-mobile-compact">
      <div ref={footerRef} className="relative w-full overflow-hidden">
  <div className="relative bg-transparent">
          <Card>
            <CardContent>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 lg:gap-16 max-w-7xl mx-auto py-10 md:py-16">
                {/* Logo and description */}
                <div
                  className={`flex flex-col max-w-full lg:max-w-[740px] gap-6 sm:gap-8 md:gap-10 lg:gap-12
                    transition-all duration-[1800ms] ease-out delay-500
                    ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}
                    w-full
                  `}
                  style={{ minWidth: 0 }}
                >
                  <div className="relative h-[32px] w-[154px] sm:h-[36px] sm:w-[174px] md:h-[40px] md:w-[193px] mx-auto lg:mx-0 min-w-0">
                    <a
                      href="/"
                      className="absolute w-[104px] h-[30px] sm:w-[118px] sm:h-[34px] md:w-[130px] md:h-[37px] top-[2px] left-[50px] sm:left-[56px] md:left-[62px]"
                      aria-label="Go to main page"
                    >
                      <img
                        className="w-full h-full"
                        alt="Aangan text logo"
                        src={aanganTextLogo}
                      />
                    </a>
                    <img
                      className="absolute w-[43px] h-[31px] sm:w-[49px] sm:h-[35px] md:w-[54px] md:h-[39px] top-0 left-0"
                      alt="Logo mark"
                      src={aanganLogoMark}
                    />
                  </div>

                  <p className="text-[#212121] text-xs sm:text-sm md:text-base text-center lg:text-left break-words">
                    Aangan empowers you to track your cycle with confidence —
                    offering intelligent insights, timely reminders, and
                    personalized health tips. From your first period to every
                    phase that follows, we&apos;re here for you, every step of
                    the way.
                  </p>

                  <div className={`flex items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4
                    transition-all duration-1000 ease-out delay-700
                    ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}
                    w-full
                  `}>
                    <img
                      className="w-6 h-6"
                      alt="Facebook"
                      src={facebookIcon}
                    />
                    <img
                      className="w-6 h-6"
                      alt="Instagram"
                      src={instaIcon}
                    />
                    <img
                      className="w-6 h-6"
                      alt="LinkedIn"
                      src={linkedinIcon}
                    />
                  </div>
                </div>

                {/* Navigation links - right aligned on desktop */}
                <div
                  className={`flex flex-col sm:flex-row lg:flex-row gap-6 lg:gap-12 justify-center lg:justify-end items-center lg:items-start transition-all duration-[1800ms] ease-out delay-700
                    ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}
                    w-full lg:w-auto
                  `}
                  style={{ minWidth: 0 }}
                >
                  <div className="flex flex-col gap-3 text-center lg:self-start">
                    <h3 className="text-lg font-medium text-[#212121]">
                      Product
                    </h3>
                    {/* Mobile: grid columns and centered, Desktop: vertical list right-aligned */}
                    <nav className="flex-col gap-1 hidden sm:flex">
                      {productLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.href}
                          className="text-sm text-[#212121] hover:text-[#ff9bc5] text-center"
                        >
                          {link.title}
                        </a>
                      ))}
                    </nav>
                    <nav className="grid grid-cols-2 justify-items-center sm:hidden">
                      {productLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.href}
                          className="text-sm text-[#212121] hover:text-[#ff9bc5] text-center"
                        >
                          {link.title}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div className="flex flex-col gap-3 text-center lg:self-start">
                    <h3 className="text-lg font-medium text-[#212121]">
                      Legal
                    </h3>
                    <nav className="flex flex-col gap-1">
                      {legalLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.href}
                          className="text-sm text-[#212121] hover:text-[#ff9bc5] text-center"
                        >
                          {link.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background image is NOT animated */}
          <img
            className="absolute w-full h-full top-0 left-0 z-0 pointer-events-none opacity-50 select-none footer-bg-mobile"
            alt="Background pattern"
            src={footerBackgroundPattern}
            style={{ objectFit: 'cover', minHeight: 0, minWidth: 0 }}
          />

          {/* Copyright bar animation */}
          <div
            className={`w-full h-[38px] md:h-[44px] bg-[#212121] flex items-center justify-center px-4 relative z-10
              transition-all duration-[1500ms] ease-out delay-1000
              ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}
              min-w-0
            `}
          >
            <p className="text-[#ff9bc5] text-xs md:text-sm text-center break-words">
              © 2025 Aangan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
