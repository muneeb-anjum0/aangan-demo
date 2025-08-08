// Section displaying user testimonials and reviews
import React, { useRef, useLayoutEffect } from 'react';
import './Testimonials.mobile.css';
import { motion } from 'framer-motion';
import person1 from '../assets/testimonials/person1.jpg';
import person2 from '../assets/testimonials/person2.jpg';
import person3 from '../assets/testimonials/person3.jpg';
import person4 from '../assets/testimonials/person4.jpg';
import person5 from '../assets/testimonials/person5.jpg';
import person6 from '../assets/testimonials/person6.jpg';

const Testimonials: React.FC = () => {
  // Ref for the scrollable testimonials container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seamless infinite horizontal scroll with smooth looping
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const el = scrollRef.current;
    if (!el) return;
    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    // Faster scroll for mobile
    let scrollAmount = isMobile ? 1.2 : 0.5;
    let reqId: number;
    let firstSetWidth = 0;

    function measureWidth() {
      if (!el) return;
      firstSetWidth = el.scrollWidth / 2;
    }
    measureWidth();
    window.addEventListener('resize', measureWidth);

    function autoScroll() {
      if (!el) return;
      el.scrollLeft += scrollAmount;
      if (el.scrollLeft >= firstSetWidth) {
        el.scrollLeft = el.scrollLeft - firstSetWidth;
      }
      reqId = requestAnimationFrame(autoScroll);
    }
    reqId = requestAnimationFrame(autoScroll);
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', measureWidth);
    };
  }, []);
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "I never thought I'd find an app that actually understands the struggles women face every month. The insights and goal reminders feel like they were made just for me. Thank you, Aangan!",
      name: "Zainab G.",
      location: "Lahore",
      image: person1
    },
    {
      id: 2,
      rating: 5,
      text: "The doctor chat feature was a lifesaver. I got real answers without the stress of having to leave home. This is the kind of support we need more of.",
      name: "Fatima A.",
      location: "Karachi",
      image: person2
    },
    {
      id: 3,
      rating: 4,
      text: "I've struggled with PCOS for years, but Aangan made it easier to understand my irregular spot patterns. The dashboard is clean, and the AI agent actually helped me feel heard.",
      name: "Meher S.",
      location: "Karachi",
      image: person3
    },
    {
      id: 4,
      rating: 4,
      text: "I've struggled with PCOS for years, but Aangan made it easier to understand my irregular spot patterns. The dashboard is clean, and the AI agent actually helped me feel heard.",
      name: "Areeba K.",
      location: "Multan",
      image: person4
    },
    {
      id: 5,
      rating: 5,
      text: "As a working mother, I barely have time for myself. Aangan's period tracking and health reminders have become my personal assistant. It's like having a health coach in my pocket!",
      name: "Sana M.",
      location: "Islamabad",
      image: person5
    },
    {
      id: 6,
      rating: 4,
      text: "The symptom tracker helped me identify patterns I never noticed before. Now I can prepare for my period days and manage my energy better. Truly life-changing!",
      name: "Ayesha R.",
      location: "Faisalabad",
      image: person6
    },
    {
      id: 7,
      rating: 5,
      text: "I love how the app respects our cultural values while providing modern health solutions. The privacy features give me peace of mind, and the insights are incredibly accurate.",
      name: "Mariam T.",
      location: "Peshawar",
      image: person1
    }
  ];

  // Helper to render star icons for ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section
      className="w-full py-8 px-4 sm:px-6 md:px-16"
      style={{ backgroundColor: '#FEDDE8' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading with animation */}
        <motion.h2
          className="font-inter font-semibold text-center mb-12"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: '#333',
            letterSpacing: '0.01em',
            lineHeight: 1.1,
            textShadow: '0 1px 2px #fff, 0 0.5px 1.5px #fc9ac3',
            fontFamily: 'Futura, Century Gothic, Avenir, sans-serif',
            fontWeight: 700,
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
        >
          <span className="less-thick-mobile" style={{ fontWeight: 400, color: '#333' }}>Trusted by </span>
          <span 
            className="no-glow-mobile"
            style={{ fontWeight: 600, color: '#fc9ac3', WebkitTextStroke: '0.7px #fc9ac3', textShadow: '0 0 2px #fc9ac3' }}
          >Women </span>
          <span style={{ fontWeight: 200, color: '#333', letterSpacing: '0.01em' }}>Across </span>
          <span style={{ fontWeight: 200, color: '#333', letterSpacing: '0.01em' }}>Pakistan</span>
        </motion.h2>
      </div>

      {/* Testimonials grid: always horizontal scroll */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex flex-row gap-6 mb-12 pb-4 hide-scrollbar px-2 sm:px-6 md:px-16 overflow-y-hidden max-h-[340px] pointer-events-none select-none"
          style={{
            WebkitOverflowScrolling: 'touch',
            overflowX: 'hidden',
            touchAction: 'none',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {/* Duplicate testimonials for seamless loop */}
          {[...Array(2)].map((_, dupIdx) => (
            testimonials.map((testimonial, idx) => {
              // Remove animation on mobile
              const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
              const motionProps = isMobile
                ? {}
                : {
                    initial: { opacity: 0, y: 40, scale: 0.95 },
                    whileInView: { opacity: 1, y: 0, scale: 1 },
                    viewport: { once: true, amount: 0.2 },
                    transition: { delay: 0.3 + idx * 0.1, duration: 0.7 },
                  };
              return (
                <motion.div
                  key={testimonial.id + '-dup' + dupIdx}
                  className="rounded-3xl px-6 py-6 shadow-sm border border-opacity-50 flex flex-col h-auto sm:h-[300px] flex-shrink-0 w-full sm:w-[360px]"
                  style={{ backgroundColor: '#fde6ee', borderColor: '#ff9cc5' }}
                  {...motionProps}
                >
                  {/* Star rating for each testimonial */}
                  <div className="flex justify-center mb-2">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-sm text-gray-700 text-center flex-grow mb-2 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author info with avatar */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {testimonial.name} – {testimonial.location}
                    </p>
                  </div>
                </motion.div>
              );
            })
          ))}
          {/* Removed right-side blur/gradient scroll indicator for mobile */}
        </div>
      </div>

      {/* Button to encourage users to share their own story */}
      <motion.div
        className="text-center max-w-7xl mx-auto px-6 md:px-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      >
        <button
          className="px-8 py-3.5 rounded-xl text-white font-medium text-xl transition-all hover:opacity-90 transform hover:scale-105 flex items-center justify-center gap-2.5 mx-auto"
          style={{ backgroundColor: '#ff9cc5' }}
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Share Your Story
        </button>
      </motion.div>
    </section>
  );
};

export default Testimonials;
