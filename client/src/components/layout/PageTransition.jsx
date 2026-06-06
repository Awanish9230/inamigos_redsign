import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(6px)',
    transition: {
      duration: 0.35,
      ease: [0.55, 0, 1, 0.45],
    },
  },
};

export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}
