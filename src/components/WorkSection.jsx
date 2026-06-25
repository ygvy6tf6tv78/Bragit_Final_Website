import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import './WorkSection.css';

const WorkSection = () => {
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

  return (
    <section className="work-section" id="work">
      <div className="work-grid-glow" aria-hidden="true" />
      <div className="container">
        <div className="work-header">
          <motion.div
            className="work-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerStagger}
          >
            <motion.div className="premium-label work-label" variants={revealUp}>
              <div className="premium-label-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 10 14 12 24 12C14 12 12 14 12 24C12 14 10 12 0 12C10 12 12 10 12 0Z" />
                </svg>
              </div>
              Works
            </motion.div>
            <motion.h2 className="work-title" variants={revealUp}>Brag-worthy work,<br />built for the real world.</motion.h2>
          </motion.div>

          <motion.div
            className="work-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerStagger}
          >
            <motion.p className="work-desc" variants={revealUp}>
              Selected identity, content and campaign work created to help brands communicate clearly,
              connect genuinely and leave a lasting impression.
            </motion.p>
            <motion.div variants={revealUp}>
            <Link to="/work" className="btn-testimonial">
              View all works
              <span className="btn-testimonial-icon">
                <ArrowUpRight size={16} />
              </span>
            </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="work-showcase-stack">
          {caseStudies.slice(0, 3).map((study, index) => {
            const entersFromLeft = index % 2 === 0;

            return (
              <motion.article
                className={`featured-work-card featured-work-${index + 1} ${index === 1 ? 'is-yellow' : ''}`}
                key={study.id}
                initial={{ opacity: 0, x: entersFromLeft ? -90 : 90, y: 45 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-110px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="featured-work-copy">
                  <div className="featured-work-tags">
                    {study.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <h3>{study.title}</h3>
                  <p>{study.subtitle}</p>
                  <Link to={`/work/${study.id}`} className="featured-work-cta">
                    Read full case study <ArrowUpRight size={18} />
                  </Link>
                </div>

                <Link to={`/work/${study.id}`} className="featured-work-image">
                  <img
                    src={study.image}
                    alt={`${study.title} case study`}
                    style={{ objectPosition: study.imagePosition }}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="featured-work-blur" />
                  <img className="featured-work-logo" src="/Asset 4.png" alt="" aria-hidden="true" />
                  <span className="featured-work-number">{study.number}</span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
