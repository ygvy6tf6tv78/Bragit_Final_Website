import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('bragit-theme') === 'dark');
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 993px)').matches);
  const [playIntroAnimation] = useState(() => sessionStorage.getItem('bragit-intro-seen') !== 'true');
  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Case Studies', to: '/work' },
    { label: 'Services', to: '/#services' },
    { label: 'Contact', to: '/contact' },
  ];

  // Animation variants
  const navContainerVariants = {
    hidden: isDesktop && playIntroAnimation
      ? { opacity: 1, clipPath: 'inset(0 84% 0 0 round 100px)' }
      : { opacity: 1, y: 0 },
    visible: isDesktop && playIntroAnimation
      ? {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0 round 100px)',
      transition: {
        clipPath: { duration: 0.5, delay: 2.82, ease: [0.16, 1, 0.3, 1] },
      }
    }
      : {
      y: 0,
      opacity: 1,
      transition: { duration: 0 }
    }
  };

  const navContentVariants = {
    hidden: isDesktop && playIntroAnimation
      ? { opacity: 0, x: -16, filter: 'blur(6px)' }
      : { opacity: 1, x: 0, filter: 'blur(0px)' },
    visible: isDesktop && playIntroAnimation
      ? {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.34, delay: 3.02, ease: [0.16, 1, 0.3, 1] },
      }
      : { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0, 
      y: "-100%",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3, duration: 0.5, ease: "easeOut" }
    })
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('bragit-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 993px)');
    const handleChange = () => setIsDesktop(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav 
        className="navbar-container"
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="navbar-inner" style={{ padding: '0 24px' }}>
          {/* Logo - Using the attached PNG logo */}
          <Link
            to="/"
            className="nav-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.img 
              src="/Asset 4.png" 
              alt="Bragit Logo" 
              className="nav-brand-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span style={{ display: 'none', alignItems: 'center' }}>
              BRAG<span className="nav-brand-accent">IT</span>
            </span>
            <span className="nav-logo-spark-target" data-loader-spark-target aria-hidden="true" />
          </Link>

          {/* Desktop Links */}
          <motion.ul className="nav-links" variants={navContentVariants}>
            {navLinks.map((link) => {
              return (
                <li key={link.label}>
                  {link.to.startsWith('/#') ? (
                    <a href={link.to} className="nav-link">{link.label}</a>
                  ) : (
                    <Link to={link.to} className="nav-link">{link.label}</Link>
                  )}
                </li>
              );
            })}
          </motion.ul>

          {/* Actions */}
          <motion.div className="nav-actions" variants={navContentVariants}>
            <button
              className="theme-toggle"
              type="button"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={darkMode}
              onClick={() => setDarkMode((current) => !current)}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              className="nav-instagram"
              href="https://www.instagram.com/letsbragit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bragit on Instagram"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <Link to="/contact" className="nav-cta">
              Let’s Talk
              <span className="nav-cta-icon">
                <ArrowUpRight size={18} />
              </span>
            </Link>
            <button 
              className="mobile-menu-btn"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={2.2} />
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-menu-header">
              <Link to="/" className="mobile-menu-brand" onClick={() => setMobileMenuOpen(false)}>
                <img src="/Asset 4.png" alt="Bragit Logo" />
              </Link>
              <span className="mobile-menu-label">Menu</span>
              <button 
                className="mobile-menu-close" 
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} strokeWidth={2.2} />
              </button>
            </div>
            <ul className="mobile-nav-links">
              {navLinks.map((link, i) => {
                return (
                  <motion.li key={link.label} custom={i} variants={linkVariants} data-index={`0${i + 1}`}>
                    {link.to.startsWith('/#') ? (
                      <a
                        href={link.to}
                        className="mobile-nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="mobile-nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>
            <motion.div
              className="mobile-menu-actions"
              variants={linkVariants}
              custom={navLinks.length}
              initial="hidden"
              animate="visible"
            >
              <button
                className="theme-toggle mobile-theme-toggle"
                type="button"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={darkMode}
                onClick={() => setDarkMode((current) => !current)}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <Link to="/contact" className="mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>
                Let’s Talk
                <span className="nav-cta-icon">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
