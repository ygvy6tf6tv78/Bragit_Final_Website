import { motion } from 'framer-motion';
import siteContent from '../data/siteContent.json';
import './FoundersSection.css';

const goutam = siteContent.founders.find((founder) => founder.name.includes('Goutam'));

const headerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const FoundersSection = () => {
  return (
    <section className="founders-section" id="team">
      <div className="container founders-container">
        <motion.div
          className="founders-header-simple"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerStagger}
        >
          <motion.div className="founders-heading" variants={headerStagger}>
            <motion.div className="premium-label" variants={revealUp}>
              <div className="premium-label-icon" />
              Behind Bragit
            </motion.div>
            <motion.h2 variants={revealUp}>One mind.<br />One clear direction.</motion.h2>
          </motion.div>
          <motion.p variants={revealUp}>
            Meet Goutam, the marketing instinct and execution energy behind the work that
            keeps Bragit moving forward.
          </motion.p>
        </motion.div>

        <motion.article
          className="founder-card-simple"
          initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="founder-image-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={goutam.image} alt="Goutam Sabharwal" className="founder-image" />
            <div className="founder-image-stamp" aria-hidden="true">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M24 2c1.6 13.7 6.3 18.4 20 20-13.7 1.6-18.4 6.3-20 20-1.6-13.7-6.3-18.4-20-20C17.7 20.4 22.4 15.7 24 2Z" />
              </svg>
            </div>
            <div className="founder-image-panel" aria-hidden="true">
              <img src="/Asset 4.png" alt="" />
              <span>Ideas into<br />motion.</span>
            </div>
          </motion.div>

          <div className="founder-card-divider" aria-hidden="true" />

          <motion.div 
            className="founder-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="founder-role">
              <span>Co-Founder</span>
              <i aria-hidden="true" />
              <span>Marketing Head</span>
            </span>
            <h3>Goutam Sabharwal</h3>
            <blockquote>
              “The mitochondria of Bragit: bringing energy, execution and marketing
              instinct to every idea.”
            </blockquote>
            <p>The go-to person for sharp execution, event chaos and a pinch of fun.</p>
            <div className="founder-expertise" aria-label="Goutam's areas of expertise">
              <span>Marketing</span>
              <span>Execution</span>
              <span>Events</span>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default FoundersSection;
