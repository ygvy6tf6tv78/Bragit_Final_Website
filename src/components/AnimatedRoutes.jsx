import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import CaseStudy from '../pages/CaseStudy';
import WorkIndex from '../pages/WorkIndex';
import About from '../pages/About';
import Legal from '../pages/Legal';
import NotFound from '../pages/NotFound';
import Sitemap from '../pages/Sitemap';
import Admin from '../pages/Admin';

const AnimatedRoutes = ({ isLoading }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 750);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    return undefined;
  }, [location.pathname, location.hash]);
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<WorkIndex />} />
        <Route path="/work/:id" element={<CaseStudy />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy-policy" element={<Legal />} />
        <Route path="/terms-and-conditions" element={<Legal />} />
        <Route path="/terms-of-service" element={<Legal />} />
        <Route path="/refund-policy" element={<Legal />} />
        <Route path="/cookie-policy" element={<Legal />} />
        <Route path="/sitemap" element={<Sitemap />} />
        {import.meta.env.DEV && <Route path="/admin" element={<Admin />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
