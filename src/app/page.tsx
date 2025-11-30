'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Resume Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            <Image
              src="/home.jpg"
              alt="Resume Preview"
              width={600}
              height={800}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Right Side - Marketing Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center space-y-6 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-[#1F2937]">Create Your</span>{' '}
            <span className="text-[#22C55E]">AI-Powered Resume</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Let our AI technology help you build a professional resume tailored to your skills, experience, and career goals.
          </p>

          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Follow these simple steps to create a standout resume that will get you noticed by top employers.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4"
          >
            <Link href="/builder">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#22C55E] text-white rounded-lg font-semibold text-lg hover:bg-[#16A34A] transition-colors shadow-lg hover:shadow-xl"
              >
                Start Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
