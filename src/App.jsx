import React, { useCallback, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { LayoutGroup } from 'framer-motion'
import Lenis from 'lenis'
import AnimatedRoutes from './components/AnimatedRoutes'
import Loader from './components/Loader'
import CursorSpark from './components/CursorSpark'
import SeoMeta from './components/SeoMeta'

const INTRO_SESSION_KEY = 'bragit-intro-seen';

function App() {
  const isAdminRoute = import.meta.env.DEV && window.location.pathname === '/admin';
  const hasSeenIntro = sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
  const [isLoading, setIsLoading] = React.useState(!isAdminRoute && !hasSeenIntro);
  const handleLoadingComplete = useCallback(() => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAdminRoute) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [isAdminRoute]);

  return (
    <Router>
      <SeoMeta />
      <LayoutGroup>
        <AnimatedRoutes isLoading={isLoading} />
        {!isAdminRoute && isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
        {!isAdminRoute && !isLoading && <CursorSpark />}
      </LayoutGroup>
    </Router>
  )
}

export default App
