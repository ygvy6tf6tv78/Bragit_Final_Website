import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { caseStudies } from '../data/caseStudies';
import './CaseStudy.css';
import '../components/WorkSection.css';

const WorkIndex = () => {
  const revealUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <PageTransition>
      <div className="case-study-page">
        <Navbar />
        <main className="work-index-main">

          {/* ── Hero header ── */}
          <section className="cs-container work-index-hero">
            <div>
              <div className="wi-kicker">
                <span />Selected case studies
              </div>
              <h1>Brag-worthy work.<br />Made to be remembered.</h1>
            </div>
            <p>
              A collection of identities, content, campaigns and experiences shaped at the
              intersection of strategy, creativity and culture.
            </p>
          </section>

          {/* ── Case study cards — same style as homepage ── */}
          <section className="cs-container wi-cards-stack">
            {caseStudies.map((study, index) => {
              const isEven = index % 2 !== 0;
              return (
                <motion.article
                  className={`featured-work-card wi-card ${isEven ? 'is-yellow' : ''}`}
                  key={study.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={revealUp}
                  custom={index * 0.04}
                  style={{ position: 'relative', top: 'auto' }}
                >
                  {/* Copy side */}
                  <div className="featured-work-copy">
                    <div className="featured-work-tags">
                      {study.tags.slice(0, 2).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="wi-card-text">
                      <h2>{study.title}<br />
                        <span className="wi-card-subtitle">{study.subtitle}</span>
                      </h2>
                      <p>{study.summary}</p>
                    </div>

                    <Link to={`/work/${study.id}`} className="featured-work-cta">
                      Read full case study <ArrowUpRight size={18} />
                    </Link>
                  </div>

                  {/* Image side */}
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
          </section>

          {/* ── CTA ── */}
          <section className="cs-container work-index-cta">
            <img className="work-index-cta-mark" src="/Asset 4.png" alt="" aria-hidden="true" />
            <span>Have a brand ready to stand out?</span>
            <h2>Let's build the next success story.</h2>
            <Link to="/contact" className="cs-next-link">
              Start a project <span><ArrowUpRight size={18} /></span>
            </Link>
          </section>

        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default WorkIndex;
