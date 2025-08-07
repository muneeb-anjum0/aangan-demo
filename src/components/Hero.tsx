// Hero section with animated clouds, main headline, and illustrations
import React from 'react';
import { motion } from 'framer-motion';
import cloud from '../assets/hero/cloud.png';
import woman1 from '../assets/hero/woman1.png';
import woman2 from '../assets/hero/woman2.png';

const Hero: React.FC = () => {
  return (
    <>
      {/* Animated clouds in the background for visual appeal */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-0 right-0 w-full h-screen pointer-events-none z-5"
      >
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-[40rem] -right-20 w-80 md:w-120 lg:w-144 opacity-60 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 150 }}
          animate={{ opacity: 1, scale: 1, rotate: 160 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-[28rem] -right-40 w-80 md:w-120 lg:w-144 opacity-60 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 155 }}
          animate={{ opacity: 1, scale: 1, rotate: 155 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-[36rem] -right-40 w-80 md:w-120 lg:w-144 opacity-60 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 130 }}
          animate={{ opacity: 1, scale: 1, rotate: 130 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-[40rem] -right-40 w-80 md:w-120 lg:w-144 opacity-60 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 130 }}
          animate={{ opacity: 1, scale: 1, rotate: 130 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-[40rem] right-20 w-80 md:w-120 lg:w-144 opacity-60 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 200 }}
          animate={{ opacity: 1, scale: 1, rotate: 200 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-[40rem] right-40 w-80 md:w-120 lg:w-144 opacity-60 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 200 }}
          animate={{ opacity: 1, scale: 1, rotate: 200 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-[40rem] right-28 w-80 md:w-120 lg:w-144 opacity-60 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, scale: 0.8, rotate: 200 }}
          animate={{ opacity: 1, scale: 1, rotate: 200 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
        />

      </motion.div>

      <section className="relative w-full flex items-center justify-center px-6 md:px-16 border-t border-gray-300 pb-12">
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute -bottom-24 -left-44 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: -20 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-12 -left-44 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: 45 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 45 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-4 -left-36 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: 45 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 45 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-8 -left-36 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: 45 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 45 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute -bottom-48 -left-8 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute -bottom-20 -left-8 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute bottom-0 -left-0 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />
        <motion.img
          src={cloud}
          alt="cloud"
          className="absolute -bottom-36 left-28 w-80 md:w-120 lg:w-144 opacity-70 z-0 rotate-180"
          style={{ transform: 'rotate(120deg) scale(1.45)' }}
          initial={{ opacity: 0, x: -80, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        />

        

        <motion.div
          className="text-center max-w-4xl z-10 py-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1, ease: 'easeOut' }}
        >
          <motion.h1
            className="font-inter text-[48px] font-semibold leading-[160%] text-gray-800"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          >
            Empower <span className="font-bold" style={{ color: '#fc9ac3' }}>Her,</span><br />
            <span className="leading-[100%]" style={{ fontFamily: '"Futura", "Century Gothic", "Avenir", sans-serif', fontWeight: '400', fontSize: '56px', WebkitTextStroke: '0.9px #333', textShadow: '0 0 1.6px #333' }}><span style={{ WebkitTextStroke: '0.7px #333', textShadow: '0 0 1.5px #333' }}>One</span> <span style={{ color: '#fc9ac3', fontWeight: '900', WebkitTextStroke: '1px #fc9ac3', textShadow: '0 0 2px #fc9ac3' }}>Cycle</span> <span style={{ WebkitTextStroke: '0.7px #333', textShadow: '0 0 1.5px #333' }}>At a Time</span></span>
          </motion.h1>

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

          {/* Illustrations */}
          <motion.div
            className="mt-10 flex justify-center items-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
          >
            <motion.img
              src={woman1}
              alt="woman using phone"
              className="h-52 md:h-64 lg:h-72 object-contain"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
            />
            <motion.img
              src={woman2}
              alt="woman waving"
              className="h-52 md:h-64 lg:h-72 object-contain -ml-24"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
