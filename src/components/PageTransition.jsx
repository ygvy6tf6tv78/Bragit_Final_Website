import { motion } from 'framer-motion';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
    animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
    exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    style={{ willChange: 'clip-path, opacity' }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
