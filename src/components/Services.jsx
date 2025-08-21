'use client'

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ServicesComponent({
  title = "Our mission?",
  subtitle = "Improving your life. Improving your work.",
  cards = [
    {
      title: "AI and Machine Learning",
      text: "Supercharge your workflows with cutting-edge AI models and next-gen machine learning techniques that make your work 100x faster and smarter.",
    },
    {
      title: "Full-stack Development",
      text: "From sleek front-end interfaces to robust back-end systems, we craft end-to-end solutions that bring your ideas to life seamlessly.",
    },
    {
      title: "Professional Counseling",
      text: "Expert guidance and support to help you navigate challenges, optimize performance, and achieve your personal or professional goals.",
    },
    {
      title: "VIRTUS Software",
      text: "Tailored software solutions including CRMs, check-in systems, AI assistants, and on-demand applications designed to elevate your business.",
    },
  ],
}) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

    const titleY = useTransform(scrollYProgress, [0, 0.3, 0.6], ["0%", "-12%", "-24%"]);
    const titleScale = useTransform(scrollYProgress, [0, 0.2], [1.05, 1]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.6], [0, 1, 1]);

    const subtitleOpacity = useTransform(scrollYProgress, [0.26, 0.38, 0.6], [0, 1, 1]);
    const subtitleY = useTransform(scrollYProgress, [0.26, 0.5, 0.8], ["28%", "0%", "-8%"]);

    const cardsOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1]);
    const cardsY = useTransform(scrollYProgress, [0.62, 0.8], ["10%", "0%"]);

    const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.005, 0.1], [0.8, 0.05, 0]);
    const scrollHintY = useTransform(scrollYProgress, [0, 0.05], ["0%", "-10%"]);


  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-virtus-dark h-[300vh] overflow-clip"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl px-6 md:px-10">
        <motion.div 
            style={{ opacity: scrollHintOpacity, y: scrollHintY }}
            transition={{ duration: 1, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
            className="absolute -inset-0 grid place-items-center text-virtus-light text-sm md:text-base tracking-wide pointer-events-none"
            >
            Scroll to continue
        </motion.div>
          
          <motion.h2
            style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
            className="text-center text-virtus-light text-4xl md:text-6xl font-bold tracking-tight select-none"
          >
            {title}
          </motion.h2>
          <motion.p
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="mt-0 text-center text-white/80 text-xl md:text-3xl font-medium select-none"
          >
            {subtitle}
          </motion.p>
          <motion.div style={{ opacity: cardsOpacity, y: cardsY }} className="mt-20 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {cards.map((c, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <h3 className="text-virtus-light text-lg md:text-xl font-semibold">{c.title}</h3>
                  <p className="text-white/70 mt-2 text-sm md:text-base leading-relaxed">
                    {c.text}
                  </p>
                </article>
              ))}
            </div>
            <button
              className="mt-10 px-8 py-3 bg-virtus-light text-virtus-dark font-semibold rounded-xl shadow-lg hover:bg-white/90 transition-colors duration-300"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
