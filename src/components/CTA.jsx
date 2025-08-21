'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CTAComponent({
  phrases = [
    "Doesn't compile?",
    "Deadline in a few days?",
    "Not enough workers?",
    "Legacy code?",
    "Broken CI pipeline?",
    "Manual QA bottlenecks?",
    "Unclear requirements?",
    "Scope creep?",
    "No documentation?",
    "Version conflicts?",
    "Slow reviews?",
    "What even is an API?",
    "Missed milestones?",
    "On-call burnout?",
    "Too many meetings?",
    "No ownership?",
  ],
}) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const N = 16 
  const step = 1 / (N + 2)

  const fadeOutStart = step * N
  const fadeOutEnd = step * (N + 1)

  const groupOpacity = useTransform(scrollYProgress, [fadeOutStart, fadeOutEnd], [1, 0])
  const groupBlur = useTransform(scrollYProgress, [fadeOutStart, fadeOutEnd], ['blur(0px)', 'blur(12px)'])

  const phraseAnimations = phrases.slice(0, N).map((_, i) => {
    const start = step * i
    const end = start + step * 0.8
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
    const y = useTransform(scrollYProgress, [start, end], [20, 0])
    return { opacity, y }
  })

  const h2Opacity = useTransform(scrollYProgress, [fadeOutStart, fadeOutEnd], [0, 1])
  const h2Scale = useTransform(scrollYProgress, [fadeOutStart, fadeOutEnd], [0.95, 1.05])

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center bg-virtus-dark overflow-hidden">
        {/* GRID */}
        <motion.div
          style={{ opacity: groupOpacity, filter: groupBlur }}
          className="w-[90vw] max-w-[1200px] h-[72vh] max-h-[800px] grid grid-cols-4 grid-rows-4 gap-4"
        >
          {phrases.slice(0, N).map((text, i) => (
            <motion.div
              key={i}
              style={{
                opacity: phraseAnimations[i].opacity,
                y: phraseAnimations[i].y,
              }}
              className="flex items-center justify-center p-3 text-center leading-tight select-none"
            >
              <span
                className="text-virtus-light font-extrabold"
                style={{
                  fontSize: 'clamp(12px, 1.8vw + 6px, 32px)',
                }}
              >
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <motion.h2
          style={{ opacity: h2Opacity, scale: h2Scale }}
          className="absolute text-4xl md:text-6xl font-extrabold text-virtus-light text-center"
        >
          Let us handle it.
        </motion.h2>
      </div>
    </section>
  )
}