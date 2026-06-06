import React from 'react';
import { motion } from 'framer-motion';

export const Skeleton = ({ className }) => (
  <motion.div
    className={`bg-light/10 rounded-xl ${className}`}
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
);
