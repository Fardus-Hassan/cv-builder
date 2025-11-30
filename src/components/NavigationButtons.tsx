'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

export default function NavigationButtons({
  onBack,
  onNext,
  canGoBack = true,
  canGoNext = true,
  nextLabel = 'Next',
  backLabel = 'Back',
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8 pt-8 border-t border-[#E5E7EB]">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
        disabled={!canGoBack}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          canGoBack
            ? 'bg-[#F3F4F6] text-[#1F2937] hover:bg-[#E5E7EB]'
            : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        {backLabel}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={!canGoNext}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all ${
          canGoNext
            ? 'bg-[#22C55E] hover:bg-[#16A34A]'
            : 'bg-[#9CA3AF] cursor-not-allowed'
        }`}
      >
        {nextLabel}
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

