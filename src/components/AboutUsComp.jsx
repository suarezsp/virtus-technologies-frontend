'use client'

import React, { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import virtusLogo from "../assets/virtusLogoLight.png"


export default function AboutUsComponent({
  title = 'Who are we.',
  blurb = 'We are a multidisciplinary team crafting software, AI solutions and strategy to amplify human potential.',
  items = [
    { key: 'vision',    title: 'Our Vision',    desc: 'We imagine tools that merge intuition and performance.', img: '/images/about1.jpg' },
    { key: 'craft',     title: 'Our Craft',     desc: 'We build reliable systems with elegant interfaces.',   img: '/images/about2.jpg' },
    { key: 'culture',   title: 'Our Culture',   desc: 'We move fast, learn faster, and stay humble.',        img: '/images/about3.jpg' },
    { key: 'partners',  title: 'Our Partners',  desc: 'We co-create with bold teams to scale impact.',        img: '/images/about4.jpg' },
  ],
}) {

  const [activeKey, setActiveKey] = useState(items?.[0]?.key || null)
  const active = useMemo(() => items.find(i => i.key === activeKey) || items[0] || {}, [items, activeKey])

  const topRef = useRef(null)
  const inView = useInView(topRef, { margin: '-10% 0px -10% 0px', amount: 0.4, once: true })

  return (
    <section className="bg-virtus-dark min-h-screen w-[72.5vw] mx-auto flex flex-col items-center">


      <motion.div
        ref={topRef}
        initial={{ y: 64, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="pt-12 md:pt-16 flex flex-col items-center text-center"
      >
        <motion.img
          src={virtusLogo}
          alt="VIRTUS LOGO"
          className="w-40 md:w-48 lg:w-56 rotate-180 select-none"
          initial={{ y: 32, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          draggable={false}
        />

        <motion.h1
          className="mt-6 text-4xl md:text-6xl font-extrabold text-virtus-light"
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-base md:text-lg text-white/80"
          initial={{ y: 18, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
        >
          {blurb}
        </motion.p>

      </motion.div>
      <div className="relative w-full flex-1 mt-10 md:mt-12 pb-10 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 h-full">
          <div className="grid grid-cols-2 gap-4 content-stretch">
            {items.map((it) => (
              <button
                key={it.key}
                onMouseEnter={() => setActiveKey(it.key)}
                onFocus={() => setActiveKey(it.key)}
                className={[
                  'group relative rounded-1xl p-5 md:p-6 text-left transition-all duration-300',
                  'border border-virtus-light_2 bg-virtus-dark hover:bg-virtus-dark_2 focus:bg-white/10',
                  activeKey === it.key ? 'ring-2 ring-white/30' : 'ring-0'
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-white font-semibold text-base md:text-lg">{it.title}</h3>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white/70 text-sm">†</span>
                </div>
                <p className="mt-2 text-white/70 text-sm md:text-base leading-relaxed">{it.desc}</p>
              </button>
            ))}
          </div>


          <div className="relative hidden lg:block w-px border-pulse-vertical" aria-hidden />

          <div className="relative rounded-6xl overflow-hidden border border-white/10 bg-white/5">
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active?.key || 'fallback'}
                  src={active?.img || virtusLogo}
                  alt={active?.title || 'About image'}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <h4 className="text-white text-lg md:text-2xl font-semibold">{active?.title}</h4>
              <p className="text-white/80 text-sm md:text-base mt-1">{active?.desc}</p>
            </div>

            {!active?.img && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 text-sm">(No image provided)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes borderPulse {
          0% { background-size: 200% 150%; opacity: 0.6; }
          50% { background-size: 150% 150%; opacity: 1; }
          100% { background-size: 200% 150%; opacity: 0.6; }
        }
        /* Divisor vertical con el mismo pulso, adaptado a 180deg */
        .border-pulse-vertical::before {
          content: "";
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 2px; height: 100%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            #030307 30%,
            #f7f7fe 50%,
            #030307 70%,
            transparent 100%
          );
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 90%;
          animation: borderPulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
