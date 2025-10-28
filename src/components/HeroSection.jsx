import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-24 pt-16 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold leading-tight text-[#101828]"
            >
              Build faster with a connected commerce stack
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-[#344054]"
            >
              Modern, glass-morphic fintech visuals meet real-time performance. Interact with the 3D card and see how seamless checkout can feel.
            </motion.p>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-gradient-to-br from-white to-[#F7F9FC]">
              <Spline
                scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
