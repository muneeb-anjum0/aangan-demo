// FAQ section with animated questions and answers
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ: React.FC = () => {
  // Track which FAQ is open
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // List of frequently asked questions and answers
  const faqs = [
    {
      question: "Is Aangan free to use?",
      answer: "Yes! Aangan offers free access to core features like period tracking, symptom logging, and basic health insights. You can also upgrade to Premium for doctor access and personalized care tools."
    },
    {
      question: "How accurate are the cycle predictions?",
      answer: "Aangan uses your past period data, symptoms, and lifestyle logs to improve prediction accuracy over time. The more you track, the smarter it gets!"
    },
    {
      question: "Can I talk to a real doctor through the app?",
      answer: "Absolutely. With a Premium plan, you can view verified doctor profiles, check their availability, and book appointments — either online or in-person."
    },
    {
      question: "What are desi remedies, and are they doctor-approved?",
      answer: "Desi remedies are natural, culturally rooted wellness tips — like herbal teas or food-based solutions. We curate them with input from doctors and herbalists to ensure safety and effectiveness."
    },
    {
      question: "I'm a teenager. Is this app right for me?",
      answer: "Yes! Aangan is designed for all age groups — including teens just starting their period journey. It's easy to use, private, and supportive."
    },
    {
      question: "Is my health data private?",
      answer: "100%. Your data is stored securely and is never shared without your permission. You're always in control of your information."
    }
  ];

  // Toggle open/close for a question
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <motion.section
        className="w-full py-16 px-6 md:px-16"
        style={{ backgroundColor: '#fdf8f7' }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section heading and subtitle */}
          <motion.h2
            className="text-center text-4xl md:text-5xl font-sans mb-4"
            style={{
              color: '#333',
              fontFamily: 'Futura, Century Gothic, Avenir, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.01em',
              lineHeight: 1.1,
              textShadow: '0 1px 2px #fff, 0 0.5px 1.5px #fc9ac3',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
          >
            <span style={{ fontWeight: 300, color: '#333' }}>Frequently </span>
            <span style={{ fontWeight: 400, color: '#333', WebkitTextStroke: '0.5px #333', textShadow: '0 0 2px #fc9ac3' }}>Asked </span>
            <span style={{ fontWeight: 200, color: '#fc9ac3', letterSpacing: '0.01em' }}>Questions</span>
          </motion.h2>
          {/* Subtitle */}
          <motion.p
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            These are some of the most common questions from our community.
          </motion.p>

          {/* FAQ Items */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.7, ease: 'easeOut' }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-25 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4 text-lg">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeIndex === index && (
                  <motion.div
                    className="px-6 pb-5 pt-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <p className="text-gray-600 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Ask a Question Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          >
            <button
              className="px-8 py-2.5 rounded-xl text-white font-medium text-xl transition-all hover:opacity-90 transform hover:scale-105 flex items-center justify-center gap-2.5 mx-auto"
              style={{ backgroundColor: '#fc9ac3' }}
            >
              Ask a Question
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C10.3 2 8.8 2.6 7.7 3.7C6.6 4.8 6 6.3 6 8h2c0-1.1 0.4-2.1 1.2-2.8C9.9 4.4 10.9 4 12 4s2.1 0.4 2.8 1.2C15.6 5.9 16 6.9 16 8c0 1.5-1 2.5-2 3.5c-1 1-2 2-2 3.5v1h2v-1c0-0.5 1-1.5 2-2.5c1-1 2-2 2-4.5c0-1.7-0.6-3.2-1.7-4.3C15.2 2.6 13.7 2 12 2z"/>
                <circle cx="13" cy="20" r="1.5"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default FAQ;
