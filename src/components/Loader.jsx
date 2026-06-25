import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [target, setTarget] = useState({ x: 0, y: 0, scale: 1 });
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const flyTimer = window.setTimeout(() => {
      const loaderLogo = document.querySelector('.loader-lockup');
      const navbarLogo = document.querySelector('.nav-brand-logo');
      const loaderRect = loaderLogo?.getBoundingClientRect();
      const navbarRect = navbarLogo?.getBoundingClientRect();

      if (!loaderRect || !navbarRect) {
        setIsFlying(true);
        return;
      }

      setTarget({
        x: navbarRect.left + navbarRect.width / 2 - (loaderRect.left + loaderRect.width / 2),
        y: navbarRect.top + navbarRect.height / 2 - (loaderRect.top + loaderRect.height / 2),
        scale: navbarRect.width / loaderRect.width,
      });

      setIsFlying(true);
    }, 1850);

    const finishTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2900);

    const completeTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      onLoadingComplete();
    }, 2900);

    return () => {
      window.clearTimeout(flyTimer);
      window.clearTimeout(finishTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className={`loader-lockup ${isFlying ? 'is-flying' : ''}`}
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={isFlying ? {
              x: target.x,
              y: target.y,
              opacity: [1, 1, 1],
              scale: [1, 0.82, target.scale],
            } : {
              opacity: [0, 1, 1],
              scale: [0.82, 1.04, 1],
              y: [18, 0, 0],
            }}
            transition={isFlying ? {
              duration: 1.05,
              times: [0, 0.72, 1],
              ease: [0.76, 0, 0.24, 1],
            } : {
              duration: 1.25,
              times: [0, 0.72, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-label="Bragit"
          >
            <span className="loader-logo-reveal">
              <img src="/Asset 4.png" alt="" />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
