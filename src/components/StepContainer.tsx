'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actionButton?: ReactNode;
}

export default function StepContainer({ children, title, subtitle, actionButton }: StepContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-2">{title}</h1>
          {subtitle && <p className="text-[#6B7280] text-sm sm:text-base">{subtitle}</p>}
        </div>
        {actionButton && <div className="ml-4">{actionButton}</div>}
      </div>
      {children}
    </motion.div>
  );
}

