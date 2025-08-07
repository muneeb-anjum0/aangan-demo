// Section for users to join the waitlist and get notified about the launch
import backgroundPattern from "../assets/waitlist/background-pattern.png";
import emailIcon from "../assets/waitlist/email-icon.svg";
import { motion } from "framer-motion";
import type { JSX } from "react";

const WaitlistSection = (): JSX.Element => {
  return (
    <motion.section
      className="flex flex-col items-start w-full"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
    >
      <div className="relative w-full overflow-hidden">
        {/* Pink background with pattern image */}
        <motion.div
          className="relative w-full bg-[#ff9bc5] py-20 md:py-28"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
        >
          <img
            className="absolute w-full h-full top-0 left-0 object-cover"
            alt="Background pattern"
            src={backgroundPattern}
          />
          {/* Main content: title, description, and email button */}
          <motion.div
            className="relative flex flex-col items-center justify-center gap-8 px-6 z-10 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            {/* Section heading */}
            <motion.h2
              className="text-2xl lg:text-3xl font-medium text-center text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            >
              Join the Waitlist!
            </motion.h2>
            {/* Description for the waitlist */}
            <motion.p
              className="text-sm text-center text-black max-w-xl"
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
              className="flex items-center gap-2 px-4 py-2 bg-[#ffffff80] border border-[#414141] rounded-md hover:bg-[#ffffff95] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
              onClick={() => {
                console.log("Email signup clicked");
              }}
            >
              <span className="text-sm text-[#414141]">
                Enter your email to join the waitlist
              </span>
              <img
                className="w-5 h-5"
                alt="Email icon"
                src={emailIcon}
              />
            </motion.button>
            <motion.p
              className="text-sm text-center text-black mt-5 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
            >
              We&apos;re working hard to bring Aangan to your fingertips. Stay
              tuned for the launch!
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WaitlistSection;
