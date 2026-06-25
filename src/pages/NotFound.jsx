import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import './NotFound.css';

const NotFound = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  return (
    <PageTransition>
      <div className="nf-page">
        <Navbar />
        <main className="nf-main">
          <motion.div
            className="nf-container"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Giant 404 */}
            <motion.div className="nf-hero" variants={fadeUp}>
              <div className="nf-big-number">
                <span>4</span>
                <span className="nf-zero">
                  <img src="/Asset 4.png" alt="" className="nf-zero-logo" />
                </span>
                <span>4</span>
              </div>
            </motion.div>

            <motion.div className="nf-content" variants={stagger}>
              <motion.h1 className="nf-title" variants={fadeUp}>
                You got lost,<br/>
                <span className="nf-accent">but we got you.</span>
              </motion.h1>
              <motion.p className="nf-sub" variants={fadeUp}>
                This page doesn't exist — or maybe it moved.<br/>
                Either way, let's get you back on track.
              </motion.p>
              <motion.div className="nf-actions" variants={fadeUp}>
                <Link to="/" className="nf-btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  Back to Home
                </Link>
                <Link to="/contact" className="nf-btn-secondary">
                  Contact Us →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFound;
