import React, { useEffect, useState, useRef } from "react";

import cloudImg from "../assets/hero/cloud.png";
import womanImg from "../assets/whyAangan/storypt1/woman.png";
import woman2Img from "../assets/whyAangan/storypt3/woman2.png";
import lastBubbleImg from "../assets/whyAangan/storypt3/lastBubble.png";
import bubble1Img from "../assets/whyAangan/storypt1/bubble1.png";
import bubble2Img from "../assets/whyAangan/storypt1/bubble2.png";
import bubble3Img from "../assets/whyAangan/storypt1/bubble3.png";
import bubble4Img from "../assets/whyAangan/storypt1/bubble4.png";
import secondBubble1Img from "../assets/whyAangan/storypt2/secondBubble1.png";
import secondBubble2Img from "../assets/whyAangan/storypt2/secondBubble2.png";
import secondBubble3Img from "../assets/whyAangan/storypt2/secondBubble3.png";
import secondBubble4Img from "../assets/whyAangan/storypt2/secondBubble4.png";
import handPhoneImg from "../assets/whyAangan/storypt2/handPhone.png";

interface ScrollProgressProps {
  onScrollCountChange?: (count: number) => void;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ onScrollCountChange }) => {
  const [scroll, setScroll] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [locked, setLocked] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    let swipeActive = false;
    let swipeTimeout: ReturnType<typeof setTimeout> | null = null;
    const SWIPE_TIMEOUT = 150;

    const docHeight = () => document.documentElement.scrollHeight - window.innerHeight;
    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    const onWheel = (e: WheelEvent) => {
      // If unlocked, stop counting scrolls
      if (!locked) return;

      const dHeight = docHeight();
      const scrollTop = window.scrollY;
      const maxScroll = Math.round(dHeight * 0.28);

      if (locked && scrollTop >= maxScroll - 1) {
        // Prevent all scroll attempts when locked
        e.preventDefault();
        window.scrollTo({ top: maxScroll });
        lockScroll();
        // Only count attempted scrolls on first wheel event after inactivity
        if (e.deltaY > 0 && !swipeActive) {
          setScrollCount(prev => Math.min(prev + 1, 11));
          swipeActive = true;
        }
        // Decrement scrollCount if scrolling up and not already at 0
        if (e.deltaY < 0 && !swipeActive) {
          setScrollCount(prev => Math.max(prev - 1, 0));
          swipeActive = true;
        }
        if (swipeTimeout) clearTimeout(swipeTimeout);
        swipeTimeout = setTimeout(() => { swipeActive = false; }, SWIPE_TIMEOUT);
        return;
      } else {
        unlockScroll();
        // When unlocked, or not at lock point, only count scrolls if at the lock point (legacy logic)
        if (e.deltaY > 0 && scrollTop >= maxScroll - 2 && !swipeActive) {
          setScrollCount(prev => Math.min(prev + 1, 11));
          swipeActive = true;
        }
        if (e.deltaY < 0 && scrollTop >= maxScroll - 2 && !swipeActive) {
          setScrollCount(prev => Math.max(prev - 1, 0));
          swipeActive = true;
        }
        if (swipeTimeout) clearTimeout(swipeTimeout);
        swipeTimeout = setTimeout(() => { swipeActive = false; }, SWIPE_TIMEOUT);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      swipeTimeout && clearTimeout(swipeTimeout);
      unlockScroll();
    };
  }, [locked]);

  useEffect(() => {
    onScrollCountChange?.(scrollCount);
    if (scrollCount >= 11) setLocked(false);
  }, [scrollCount, onScrollCountChange]);

  useEffect(() => {
    const dHeight = () => document.documentElement.scrollHeight - window.innerHeight;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = dHeight();
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScroll(pct);

      if (locked && pct >= 28) {
        // Lock scroll and reset position to exactly 28% only if not already there
        const targetScroll = Math.round(docHeight * 0.28);
        if (Math.abs(scrollTop - targetScroll) > 1) {
          window.scrollTo({ top: targetScroll });
        }
      }

      lastScrollY.current = scrollTop;
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [locked]);

  return (
    <div style={{
      position: "fixed",
      top: 10,
      right: 10,
      background: "rgba(0,0,0,0.7)",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "14px",
      zIndex: 9999
    }}>
      {`Scrolled: ${scroll.toFixed(0)}% | Scrolls: ${scrollCount}/11`}
    </div>
  );
};

const WhyAangan: React.FC = () => {
  const [scrollCount, setScrollCount] = useState(0);

  return (
    <>
      <ScrollProgress onScrollCountChange={setScrollCount} />

      <section style={{
        background: 'transparent',
        minHeight: '105vh',
        padding: '48px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        // overflow: 'hidden',
      }}>
        {/* Cloud background */}
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '-180px',
                top: '-50px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(180deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />

        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '-60px',
                bottom: '-140px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(-19deg) scaleX(1) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '130px',
                bottom: '-200px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(-19deg) scaleX(1) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '-280px',
                top: '-100px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(180deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '-180px',
                top: '-50px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(180deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '-180px',
                top: '100px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(180deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '-180px',
                top: '80px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(180deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '50px',
                top: '-120px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(180deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                right: '-180px',
                top: '250px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(220deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '-100px',
                bottom: '-170px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(-20deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '-100px',
                bottom: '-170px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(-20deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '90px',
                bottom: '-160px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(-20deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '-180px',
                bottom: '0px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(80deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '-200px',
                bottom: '100px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(80deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '-200px',
                bottom: '100px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(80deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '0px',
                bottom: '30px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(20deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />
        <img
            src={cloudImg}
            alt="Cloud background"
            className="cloud-bg"
            style={{
                position: 'absolute',
                left: '0px',
                bottom: '30px',
                width: 600,
                maxWidth: '60vw',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                transform: 'rotate(20deg) scale(1)',
                transition: 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        />

        {/* Always show the heading - styled single line, black and pink */}
        <h2 className="why-aangan-heading" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '2.8rem',
          fontWeight: 400,
          marginBottom: '32px',
          letterSpacing: '-1px',
          zIndex: 2,
          lineHeight: 1.1,
          fontFamily: 'Poppins, Inter, Arial, sans-serif',
          background: 'none',
          border: 'none',
          padding: 0,
        }}>
          <span className="why-aangan-why">Why</span>
          <span className="why-aangan-pink">
            Aangan
            <span className="why-aangan-q">?</span>
          </span>
        </h2>

        {/* Main content blocks after heading */}
        {scrollCount < 6 && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 32,
            gap: 24,
            zIndex: 1,
          }}>
            {/* Left bubbles */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 24, minWidth: 220 }}>
              <img
                src={bubble1Img}
                alt="Bubble 1"
                className={`bubble-fade${scrollCount === 2 ? ' bubble-fade-in' : ''}`}
                style={{ maxWidth: 180 * 1.8, width: '180%', opacity: scrollCount >= 2 ? 1 : 0, transition: 'opacity 0.7s', position: 'relative', right: 0, top: -80 }}
              />
              <img
                src={bubble4Img}
                alt="Bubble 4"
                className={`bubble-fade${scrollCount === 3 ? ' bubble-fade-in' : ''}`}
                style={{ maxWidth: 180 * 1.8, width: '180%', opacity: scrollCount >= 3 ? 1 : 0, transition: 'opacity 0.7s', position: 'relative', right: -60, top: 40 }}
              />
            </div>
            {/* Woman in the center */}
            <img
              src={womanImg}
              alt="Woman"
              className={`woman-fade${scrollCount === 1 ? ' woman-fade-in' : ''}`}
              style={{ maxWidth: 320 * 1.2, width: '120%', margin: '0 24px', opacity: scrollCount >= 1 ? 1 : 0, transition: 'opacity 0.7s', position: 'relative', left: 0, top: 80 }}
            />
            {/* Right bubbles */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, minWidth: 220 }}>
              <img
                src={bubble2Img}
                alt="Bubble 2"
                className={`bubble-fade${scrollCount === 4 ? ' bubble-fade-in' : ''}`}
                style={{ maxWidth: 180 * 1.8, width: '180%', opacity: scrollCount >= 4 ? 1 : 0, transition: 'opacity 0.7s', position: 'relative', left: 0, top: -80 }}
              />
              <img
                src={bubble3Img}
                alt="Bubble 3"
                className={`bubble-fade${scrollCount === 5 ? ' bubble-fade-in' : ''}`}
                style={{ maxWidth: 180 * 1.8, width: '180%', opacity: scrollCount >= 5 ? 1 : 0, transition: 'opacity 0.7s', position: 'relative', left: -16, top: -24 }}
              />
            </div>
          </div>
        )}

        {/* Storypt2 bubbles, absolutely positioned, appear and stay on scrolls 6, 7, 8, and 9. Remove on scroll 10+ */}
        {scrollCount >= 6 && scrollCount < 10 && (
          <>
            {/* Bubble 1: appears at scroll 6 and stays */}
            <img
              src={secondBubble1Img}
              alt="Second Bubble 1"
              style={{
                position: 'absolute',
                left: '14%',
                top: '16%',
                maxWidth: 210 * 2.15,
                width: '210%',
                opacity: scrollCount >= 6 ? 1 : 0,
                transition: 'opacity 0.5s',
                zIndex: 3,
              }}
            />
            {/* Bubble 2: appears at scroll 7 and stays */}
            <img
              src={secondBubble2Img}
              alt="Second Bubble 2"
              style={{
                position: 'absolute',
                left: '15%',
                top: '45%',
                maxWidth: 210 * 2.15,
                width: '210%',
                opacity: scrollCount >= 7 ? 1 : 0,
                transition: 'opacity 0.5s',
                zIndex: 3,
              }}
            />
            {/* Bubble 3: appears at scroll 8 and stays */}
            <img
              src={secondBubble3Img}
              alt="Second Bubble 3"
              style={{
                position: 'absolute',
                left: '58%',
                top: '44%',
                maxWidth: 210 * 2.15,
                width: '210%',
                opacity: scrollCount >= 8 ? 1 : 0,
                transition: 'opacity 0.5s',
                zIndex: 3,
              }}
            />
            {/* Bubble 4: appears at scroll 9 and stays, with animation */}
            <img
              src={secondBubble4Img}
              alt="Second Bubble 4"
              className={scrollCount === 9 ? 'bubble4-anim bubble4-in-fade' : 'bubble4-anim'}
              style={{
                position: 'absolute',
                left: '54%',
                top: '12%',
                maxWidth: 240 * 2.3,
                width: '210%',
                opacity: scrollCount >= 9 ? 1 : 0,
                zIndex: 3,
                // Remove transition here, handled by animation
              }}
            />
            <img
              src={handPhoneImg}
              alt="Hand holding phone"
              className={scrollCount === 9 ? 'handphone-anim handphone-in' : 'handphone-anim'}
              style={{
                position: 'absolute',
                left: '29%',
                top: '12%',
                maxWidth: 250 * 2.6,
                width: '250%',
                opacity: scrollCount >= 9 ? 1 : 0,
                zIndex: 3,
                // Remove transition here, handled by animation
              }}
            />
          </>
        )}

        {/* Show woman2 in the center on scroll 10 and 11, and bring in lastBubble.png on 11 */}
        {/* Always render woman2Img and lastBubbleImg for fade-in to work */}
        <>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 32,
            gap: 24,
            zIndex: 1,
            pointerEvents: 'none',
            height: 0,
          }}>
            <div style={{ flex: 1 }} />
            <img
              src={woman2Img}
              alt="Woman 2"
              className={`woman-fade${scrollCount >= 10 ? ' woman-fade-in' : ''}`}
              style={{
                position: 'absolute',
                left: '33%',
                top: '12%',
                maxWidth: 230 * 2.5,
                width: '230%',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />
            <div style={{ flex: 1 }} />
          </div>
          <img
            src={lastBubbleImg}
            alt="Last Bubble"
            className={`bubble-fade${scrollCount === 11 ? ' bubble-fade-in' : ''}`}
            style={{
              position: 'absolute',
              right: '-5%',
              top: '25%',
              transform: 'translate(-50%, 0)',
              maxWidth: 320 * 1.5,
              width: '150%',
              zIndex: 4,
              pointerEvents: 'none',
              opacity: scrollCount === 11 ? undefined : 0,
              transition: 'opacity 0.7s',
            }}
          />
        </>

        


        <style>{`
          /* woman2Img and lastBubble fade-in use the same as woman-fade/bubble-fade */
          /* Handphone fade-in animation styles */
          .handphone-anim {
            opacity: 0;
            transition: opacity 2s;
          }
          .handphone-in {
            opacity: 1 !important;
          }
          .bubble4-anim {
            opacity: 0;
            transition: opacity 3.5s;
          }
          .bubble4-in-fade {
            opacity: 1 !important;
          }
          .why-aangan-heading {
            font-family: 'Poppins', 'Inter', Arial, sans-serif;
            font-weight: 400;
            letter-spacing: -1px;
            margin-bottom: 32px;
            background: none;
            border: none;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 12px;
            line-height: 1.1;
            font-size: 2.8rem;
            z-index: 2;
          }
          .why-aangan-why {
            color: #111;
            font-weight: 400;
          }
          .why-aangan-pink {
            color: #fc9ac3;
            font-weight: 600;
            margin-left: 8px;
            letter-spacing: 0;
          }
          .why-aangan-q {
            color: #fc9ac3;
            font-weight: 200;
            margin-left: 2px;
          }
          .cloud-bg {
            opacity: 0;
            transform: translateY(-40px) scale(1.1) rotate(40deg);
            transition: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .cloud-bg-animate {
            opacity: 1 !important;
            transform: translateY(0) scale(1) rotate(40deg);
            animation: cloudIn 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.1s both;
          }
          @keyframes cloudIn {
            0% { opacity: 0; transform: translateY(-40px) scale(1.1) rotate(40deg); }
            100% { opacity: 1; transform: translateY(0) scale(1) rotate(40deg); }
          }
          .woman-fade {
            opacity: 0;
            transition: opacity 0.7s;
          }
          .woman-fade-in {
            opacity: 1 !important;
          }
          .bubble-fade {
            opacity: 0;
            transition: opacity 0.7s;
          }
          .bubble-fade-in {
            opacity: 1 !important;
          }
        `}</style>
      </section>
    </>
  );
}

export default WhyAangan;
