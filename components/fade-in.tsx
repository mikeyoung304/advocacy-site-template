'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const SPRING_TRANSITION = { type: 'spring', stiffness: 300, damping: 25 } as const;

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_TRANSITION, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
