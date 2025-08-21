'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactWindow() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.3, once: false })

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-virtus-dark text-virtus-light flex items-center justify-center"
    >
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 h-full">
        
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-5xl lg:text-6xl font-extrabold">
            We are here to help.
          </h2>
          <p className="mt-4 text-gray-300 text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
            Reach out to us and we’ll assist you with your projects, questions, or solutions.
          </p>
        </motion.div>
        <div className="relative hidden lg:block w-px border-pulse-vertical h-64 mx-8" aria-hidden />
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="flex-1 max-w-md w-full bg-virtus-light rounded-2xl shadow-2xl p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>

          <div className="space-y-4 text-virtus-dark">
            <div>
              <label className="block text-sm font-semibold mb-1">NAME</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-virtus-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">EMAIL</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-virtus-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">COMPANY</label>
              <input
                type="text"
                value="VIRTUS"
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full px-4 py-3 bg-virtus-dark text-virtus-light font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}