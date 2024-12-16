'use client'

import { motion } from 'framer-motion'

export const EclipseBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-[-1]">
      <motion.div
        className="absolute w-[200vw] h-[200vh] bg-blue-900 rounded-full"
        initial={{ x: '-50%', y: '-50%', scale: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[190vw] h-[190vh] bg-gray-300 rounded-full"
        initial={{ x: '-45%', y: '-45%', scale: 0 }}
        animate={{
          scale: [0, 1.1, 1],
          rotate: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

