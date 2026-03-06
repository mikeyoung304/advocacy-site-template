import type { Variants } from 'framer-motion';

export const SPRING_TRANSITION = { type: 'spring', stiffness: 300, damping: 25 } as const;

export const VIEWPORT_CONFIG = { once: true, margin: '-80px' } as const;

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_TRANSITION,
  },
};
