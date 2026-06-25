import './RecentWorks.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const RecentWorks = () => {
  return (
    <section className="recent-works-section" id="recent-works">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-90px' }}
        variants={sectionVariants}
      >
        <div className="recent-works-header">
          <motion.div className="recent-works-left" variants={revealUp}>
            <div className="premium-label" style={{ marginBottom: '24px' }}>
              <div className="premium-label-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-black)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 10 14 12 24 12C14 12 12 14 12 24C12 14 10 12 0 12C10 12 12 10 12 0Z" />
                </svg>
              </div>
              Recent Works
            </div>
            <h2 className="recent-works-title">Ideas brought<br />to life.</h2>
          </motion.div>
          <motion.div className="recent-works-right" variants={revealUp}>
            <p>
              A closer look at the visual systems, social stories and campaign assets that turn a clear direction into work people can see and remember.
            </p>
            <Link to="/work" className="btn-pill-services">
              View all case studies
              <span className="btn-pill-icon-services"><ArrowUpRight size={16} /></span>
            </Link>
          </motion.div>
        </div>

        <div className="rw-stacking-wrapper">
          {caseStudies.map((study, index) => (
            <motion.div
              className="rw-stack-motion"
              key={study.id}
              initial={{ opacity: 0, y: 54, scale: 0.97, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.82, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rw-stack-item">
                <div className="rw-stack-image-container">
                  <img
                    src={study.image}
                    alt={`${study.title} project showcase`}
                    style={{ objectPosition: study.imagePosition }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RecentWorks;
