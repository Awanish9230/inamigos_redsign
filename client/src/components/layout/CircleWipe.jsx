import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function CircleWipe() {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname + "-wipe"}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{
            clipPath: [
              'circle(0% at 50% 50%)',
              'circle(150% at 50% 50%)',
              'circle(0% at 50% 50%)',
            ],
            transition: {
              duration: 0.9,
              times: [0, 0.45, 1],
              ease: ['easeIn', 'easeOut'],
            },
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle, #1B2A6B 0%, #0D1B2A 60%, #000814 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Spinning logo mark in center during wipe */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, ease: 'linear' }}
            style={{
              width: 48,
              height: 48,
              border: '3px solid #FF6B00',
              borderTopColor: 'transparent',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
