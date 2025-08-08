// Section for users to join the waitlist and get notified about the launch
import backgroundPattern from "../assets/waitlist/background-pattern.png";
import emailIcon from "../assets/waitlist/email-icon.svg";
import { motion } from "framer-motion";
import type { JSX } from "react";
import "./WaitlistSection.mobile.css";

const WaitlistSection = (): JSX.Element => {
  return (
    <motion.section
  className="flex flex-col items-start w-full min-h-screen md:min-h-0 overflow-x-hidden waitlist-mobile-compact !mb-0"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
    >
      <div className="relative w-full overflow-x-hidden overflow-y-visible md:overflow-hidden">
        {/* Pink background with pattern image */}
        <div
          className="relative w-full bg-[#ff9bc5] pt-16 pb-0 md:py-28 min-h-screen md:min-h-0 waitlist-mobile-compact !mb-0"
        >
          <img
            className="absolute w-full h-full top-0 left-0 object-cover pointer-events-none select-none"
            alt="Background pattern"
            src={backgroundPattern}
            style={{ zIndex: 0 }}
          />
          {/* Main content: title, description, and email button */}
          <motion.div
            className="relative flex flex-col items-center justify-center gap-8 px-4 sm:px-6 z-10 max-w-7xl mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            {/* Section heading */}
            <motion.h2
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-center text-black waitlist-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            >
              Join the Waitlist!
            </motion.h2>
            {/* Description for the waitlist */}
            <motion.p
              className="text-sm text-center text-black max-w-xs sm:max-w-xl waitlist-desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
            >
              Join over 100,000 women already tracking their health with
              Aangan. Be a part of a growing community that supports,
              understands, and empowers you.
            </motion.p>
            {/* Email signup button */}
            <motion.button
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#ffffffcc] border border-[#414141] rounded-md hover:bg-[#ffffffee] transition-all w-full max-w-xs sm:max-w-md waitlist-btn"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
              onClick={() => {
                console.log("Email signup clicked");
              }}
            >
              <span className="text-sm text-[#414141] text-center w-full block">
                Enter your email to join the waitlist
              </span>
              <img
                className="w-5 h-5 flex-shrink-0"
                alt="Email icon"
                src={emailIcon}
              />
            </motion.button>
            <motion.p
              className="text-xs sm:text-sm text-center text-black mt-0 px-2 sm:px-4 waitlist-note"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
            >
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WaitlistSection;
