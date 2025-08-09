// Hero section with animated clouds, main headline, and illustrations
import React from 'react';
import { motion } from 'framer-motion';
import cloud from '../assets/hero/cloud.png';
import woman1 from '../assets/hero/woman1.png';
import woman2 from '../assets/hero/woman2.png';

const Hero: React.FC = () => {
  // Smooth + fast cascade for cloud groups
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.28,
        ease: [0.22, 0.61, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.06,
      },
    },
  };

  const cloudVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.96, filter: 'blur(2px)' },
    show: {
      opacity: 0.78,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <>
      {/* TOP-RIGHT cluster (your original placements) */}
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="show"
        className="absolute top-0 right-0 w-full h-screen pointer-events-none z-5"
      >
        {[
          { cls: 'bottom-[40rem] -right-20', rot: 120, sc: 1.45 },
          { cls: 'bottom-[28rem] -right-40', rot: 120, sc: 1.45 },
          { cls: 'bottom-[36rem] -right-40', rot: 120, sc: 1.45 },
          { cls: 'bottom-[40rem] -right-40', rot: 120, sc: 1.45 },
          { cls: 'bottom-[40rem] right-20',  rot: 120, sc: 1.45 },
          { cls: 'bottom-[40rem] right-40',  rot: 120, sc: 1.45 },
          { cls: 'bottom-[40rem] right-28',  rot: 120, sc: 1.45 },
        ].map((c, i) => (
          <motion.img
            key={`tr-${i}`}
            variants={cloudVariants}
            src={cloud}
            alt="cloud"
            className={`absolute ${c.cls} w-80 md:w-120 lg:w-144 opacity-60`}
            style={{ rotate: c.rot, scale: c.sc }}
          />
        ))}
      </motion.div>

      <section className="relative w-full flex items-center justify-center px-6 md:px-16 border-t border-gray-300 pb-12 overflow-visible md:overflow-visible mobile-clip-clouds hero-section-desktop">
        <style>{`
          @media (max-width: 767px) {
            .mobile-clip-clouds { overflow: hidden !important; }
            .hero-section-desktop { min-height: 608px !important; padding-top: 36px !important; padding-bottom: 48px !important; }
            .hero-text-container { max-width: 98vw !important; padding: 20px 0 !important; }
            .hero-main-cycle { font-size: 42px !important; letter-spacing: -1.2px !important; white-space: nowrap !important; }
          }
          @media (min-width: 1024px) {
            .hero-section-desktop { min-height: 700px !important; padding-top: 80px !important; padding-bottom: 120px !important; }
            .hero-text-container { max-width: 1200px !important; padding: 48px 0 !important; }
          }
        `}</style>

        {/* BOTTOM-LEFT cluster (original) */}
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="show"
          className="absolute inset-0 pointer-events-none z-0"
        >
          {[
            { cls: '-bottom-24 -left-44', rot: 100, sc: 1.45 },
            { cls: 'bottom-12 -left-44',  rot: 140, sc: 1.45 },
            { cls: 'bottom-4 -left-36',   rot: 160, sc: 1.45 },
            { cls: 'bottom-8 -left-36',   rot: 180, sc: 1.45 },
            { cls: '-bottom-48 -left-8',  rot: 200, sc: 1.45 },
            { cls: '-bottom-20 -left-8',  rot: 220, sc: 1.45 },
            { cls: 'bottom-0 -left-0',    rot: 240, sc: 1.45 },
            { cls: '-bottom-36 left-28',  rot: 260, sc: 1.45 },
            // --- SEAM EXTRAS: push below the section so they "leak" into WhyAangan ---
            { cls: '-bottom-[10rem] -left-24', rot: 225, sc: 1.55 },
            { cls: '-bottom-[14rem] left-4',   rot: 245, sc: 1.45 },
          ].map((c, i) => (
            <motion.img
              key={`bl-${i}`}
              variants={cloudVariants}
              src={cloud}
              alt="cloud"
              className={`absolute ${c.cls} w-80 md:w-120 lg:w-144 opacity-70`}
              style={{ rotate: c.rot, scale: c.sc }}
            />
          ))}
        </motion.div>

        {/* Copy & art (unchanged) */}
        <motion.div
          className="text-center max-w-4xl z-10 py-16 hero-text-container"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1, ease: 'easeOut' }}
        >
          <motion.h1
            className="font-inter font-semibold leading-[120%] text-gray-800 text-[32px] xs:text-[36px] sm:text-[40px] md:text-[48px] lg:text-[56px]"
            style={{ wordBreak: 'keep-all' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          >
            Empower <span className="font-bold" style={{ color: '#fc9ac3' }}>Her,</span>
          </motion.h1>

          <motion.h2
            className="font-inter font-semibold leading-[100%] text-gray-800 mt-2 hero-main-cycle"
            style={{
              fontFamily: 'Futura, Century Gothic, Avenir, sans-serif',
              fontWeight: 400,
              WebkitTextStroke: 'none',
              textShadow: 'none',
              display: 'block',
              fontSize: '60px',
              letterSpacing: '0',
              whiteSpace: 'normal',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1, ease: 'easeOut' }}
          >
            <span className="font-normal" style={{ marginRight: '0.08em' }}>One</span>
            <span className="font-extrabold" style={{ color: '#fc9ac3', fontWeight: 900, margin: '0 0.08em' }}>Cycle</span>
            <span className="font-normal" style={{ marginLeft: '0.08em' }}>At a Time</span>
            <style>{`
              @media (max-width: 767px) {
                .hero-main-cycle { font-size: 36px !important; letter-spacing: -2.2px !important; white-space: nowrap !important; }
              }
            `}</style>
          </motion.h2>

          <motion.p
            className="mt-8 text-md md:text-lg font-semibold italic text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
          >
            Know your cycle. Own your rhythm.
          </motion.p>

          <motion.p
            className="mt-3 text-sm md:text-base text-gray-600 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          >
            Track periods, moods, and symptoms effortlessly with Aangan.
            Get smart insights, gentle guidance, and feel supported every step of the way.
          </motion.p>

          <motion.div
            className="mt-10 flex justify-center items-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
          >
            <motion.img
              src={woman1}
              alt="woman using phone"
              className="h-40 xs:h-44 sm:h-48 md:h-64 lg:h-72 object-contain hero-woman1"
              style={{ maxWidth: '140px', width: '100%' }}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
            />
            <motion.img
              src={woman2}
              alt="woman waving"
              className="h-40 xs:h-44 sm:h-48 md:h-64 lg:h-72 object-contain -ml-10 md:-ml-24 hero-woman2"
              style={{ maxWidth: '140px', width: '100%' }}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8, ease: 'easeOut' }}
            />
            <style>{`
              @media (min-width: 1024px) {
                .hero-woman1, .hero-woman2 { max-width: 260px !important; width: 260px !important; }
              }
            `}</style>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
