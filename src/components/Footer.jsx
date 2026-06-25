import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

// Inline SVG social icons (no lucide dependency issues)
const SocialIcons = {
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
};

const Footer = () => {
  const footerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.11 },
    },
  };

  const footerItem = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.footer
      className="footer-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={footerContainer}
    >

      {/* TICKER */}
      <motion.div className="footer-ticker-container" variants={footerItem}>
        <motion.div
          className="footer-ticker-row"
          initial={{ opacity: 0, x: -70, rotate: -0.8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ticker-track-left">
            {['Branding & Design','Marketing','Photography','Videography','2D / 3D Animation','UGC Content',
              'Branding & Design','Marketing','Photography','Videography','2D / 3D Animation','UGC Content'].map((t, i) => (
              <span key={i} className={`ticker-item ${i % 2 === 0 ? 'solid' : 'outline'}`}>{t}</span>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="footer-ticker-row"
          style={{ marginTop: '20px' }}
          initial={{ opacity: 0, x: 70, rotate: 0.8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ticker-track-right">
            {['PR & Events','Social Content','Packaging Design','Creative Direction','Brand Identity','Campaign Strategy',
              'PR & Events','Social Content','Packaging Design','Creative Direction','Brand Identity','Campaign Strategy'].map((t, i) => (
              <span key={i} className={`ticker-item ${i % 2 === 0 ? 'outline' : 'solid'}`}>{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="footer-container" variants={footerContainer}>
        <motion.div className="footer-top" variants={footerContainer}>

          {/* Column 1 */}
          <motion.div className="footer-col col-brand" variants={footerItem}>
            <p className="footer-text">©Bragit 2026</p>
            <p className="footer-company">BRAGIT CONSULTANCY PVT LTD</p>
            <Link to="/contact" className="btn-footer-start">Get Started Today</Link>
          </motion.div>

          {/* Column 2 */}
          <motion.div className="footer-col col-contact" variants={footerItem}>
            <p className="footer-text">+91-91860-95098</p>
            <p className="footer-text">hello@bragit.in</p>
            <p className="footer-text">Phase 3, Industrial Area,<br/>Gangyal, Jammu 180010, J&K</p>
          </motion.div>

          {/* Main pages */}
          <motion.div className="footer-col" variants={footerItem}>
            <div className="footer-nav">
              <strong className="footer-nav-title">Explore</strong>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/work">Case Studies</Link>
              <a href="/#services">Services</a>
              <Link to="/contact">Contact</Link>
            </div>
          </motion.div>

          {/* Column 5 */}
          <motion.div className="footer-col col-legal" variants={footerItem}>
            <div className="footer-nav">
              <strong className="footer-nav-title">Legal</strong>
              <Link to="/legal">Legal Overview</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
              <Link to="/refund-policy">Refund Policy</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
            </div>
          </motion.div>

        </motion.div>

        <motion.div className="footer-divider" variants={footerItem}></motion.div>

        <motion.div className="footer-bottom" variants={footerContainer}>
          <motion.div className="footer-bottom-left" variants={footerItem}>
            <img src="/Asset 4.png" alt="Bragit Logo" className="footer-massive-logo" />
            <a
              href="https://repixelx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-powered"
            >
              <span>DESIGNED & DEVELOPED IN CREATIVE PARTNERSHIP WITH</span>
              <img src="/repixelx-studio-logo.webp" alt="RepixelX Studio" className="footer-repixelx-logo" />
              <span className="footer-powered-arrow">↗</span>
            </a>
          </motion.div>

          <motion.div className="footer-bottom-right" variants={footerItem}>
            <div className="footer-hours">
              <span className="hours-label">Mo—Fr</span>
              <span className="hours-time">9am—6pm</span>
            </div>

            <div className="footer-socials">
              {[
                { key: 'instagram', href: 'https://www.instagram.com/letsbragit/' },
              ].map(({ key, href }) => (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={key}>
                  {SocialIcons[key]}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
