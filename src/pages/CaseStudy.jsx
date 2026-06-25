import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { caseStudies, getCaseStudy } from '../data/caseStudies';
import './CaseStudy.css';

const CaseStudy = () => {
  const { id } = useParams();
  const study = getCaseStudy(id);
  const studyIndex = caseStudies.findIndex((item) => item.id === study.id);
  const nextStudy = caseStudies[(studyIndex + 1) % caseStudies.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <PageTransition>
      <div className="case-study-page">
        <Navbar />

        <main className="cs-main">

          {/* ══════════════════════════════════════
              HERO — big title LEFT · brief + details RIGHT
          ══════════════════════════════════════ */}
          <section className="cs-container cs-hero">

            {/* LEFT: project badge + giant title + tagline */}
            <motion.div
              className="cs-hero-left"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div className="cs-hero-meta" variants={fadeUp} custom={0}>
                <Link to="/work" className="cs-back">
                  <ArrowLeft size={14} /> All case studies
                </Link>
                <span className="cs-project-badge">Project {study.number}</span>
              </motion.div>

              <motion.h1 className="cs-hero-title" variants={fadeUp} custom={1}>
                {study.title}
              </motion.h1>

              <motion.p className="cs-hero-tagline" variants={fadeUp} custom={2}>
                {study.subtitle}
              </motion.p>
            </motion.div>

            {/* RIGHT: Project Brief + details grid + tags */}
            <motion.div
              className="cs-hero-right"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            >
              {/* Brief */}
              <motion.div variants={fadeUp} custom={1}>
                <span className="cs-brief-label">Project Brief</span>
                <p className="cs-brief-text">{study.summary}</p>
              </motion.div>

              {/* Details: Duration · Category · Period, then Services full-width */}
              <motion.div className="cs-details-row" variants={fadeUp} custom={2}>
                <div className="cs-detail-item">
                  <span className="cs-detail-key">Client</span>
                  <span className="cs-detail-val">{study.client}</span>
                </div>
                <div className="cs-detail-item">
                  <span className="cs-detail-key">Category</span>
                  <span className="cs-detail-val">{study.category}</span>
                </div>
                <div className="cs-detail-item">
                  <span className="cs-detail-key">Work period</span>
                  <span className="cs-detail-val">{study.period}</span>
                </div>
                {/* Services spans full width */}
                <div className="cs-detail-item">
                  <span className="cs-detail-key">Services</span>
                  <span className="cs-detail-val">{study.services}</span>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div className="cs-tags" variants={fadeUp} custom={3}>
                {study.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </motion.div>
            </motion.div>
          </section>

          {/* ══════════════════════════════════════
              COVER IMAGE
          ══════════════════════════════════════ */}
          <motion.section
            className="cs-container cs-cover"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={study.image}
              alt={`${study.title} — Bragit case study`}
              style={{ objectPosition: study.imagePosition }}
            />
            <img className="cs-image-stamp" src="/Asset 4.png" alt="" aria-hidden="true" />
          </motion.section>

          {/* ══════════════════════════════════════
              FOUNDER BRIEF PULL-QUOTE
          ══════════════════════════════════════ */}
          {study.brief && (
            <motion.section
              className="cs-container cs-brief-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
            >
              <div className="cs-brief-card">
                <blockquote>{study.brief}</blockquote>
                <cite>— {study.client} Founder</cite>
              </div>
            </motion.section>
          )}

          {/* ══════════════════════════════════════
              OUR APPROACH — NUMBERED STEPS
          ══════════════════════════════════════ */}
          {study.steps && study.steps.length > 0 && (
            <section className="cs-container cs-approach">
              <motion.div
                className="cs-approach-head"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
              >
                <span className="cs-approach-kicker">Our approach</span>
                <h2 className="cs-approach-title">How we built it</h2>
              </motion.div>

              <div className="cs-steps-list">
                {study.steps.map((step, i) => (
                  <motion.article
                    className="cs-step-row"
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeUp}
                    custom={i * 0.04}
                  >
                    <div className="cs-step-left">
                      <span className="cs-step-num">Step {String(i + 1).padStart(2, '0')}</span>
                      <span className="cs-step-title-sm">{step.title}</span>
                    </div>
                    <div className="cs-step-body">
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════
              GALLERY
          ══════════════════════════════════════ */}
          <section className="cs-container cs-gallery">
            {[study.gallery[0], study.gallery[1], study.gallery[2]].map((img, i) => (
              <motion.figure
                className={`cs-gallery-card ${i === 0 ? 'cs-gallery-card-wide' : ''}`}
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
              >
                <img
                  src={img.src}
                  alt={`${study.title} work sample ${i + 1}`}
                  style={{ objectPosition: img.position }}
                />
                <img className="cs-image-stamp" src="/Asset 4.png" alt="" aria-hidden="true" />
              </motion.figure>
            ))}
          </section>

          {/* ══════════════════════════════════════
              THE RESULT
          ══════════════════════════════════════ */}
          {study.result && (
            <motion.section
              className="cs-container cs-result-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
            >
              <div className="cs-result-card">
                <span className="cs-result-label">The Result</span>
                <p className="cs-result-text">{study.result}</p>
              </div>
            </motion.section>
          )}

          {/* ══════════════════════════════════════
              NEXT CASE STUDY
          ══════════════════════════════════════ */}
          <section className="cs-container cs-next">
            <div className="cs-next-image">
              <img
                src={nextStudy.image}
                alt={`${nextStudy.title} preview`}
                style={{ objectPosition: nextStudy.imagePosition }}
              />
              <img className="cs-image-stamp" src="/Asset 4.png" alt="" aria-hidden="true" />
            </div>
            <div className="cs-next-copy">
              <span>Next case study</span>
              <h2>{nextStudy.title}<br />{nextStudy.subtitle}</h2>
            </div>
            <Link to={`/work/${nextStudy.id}`} className="cs-next-link">
              Open next project
              <span><ArrowUpRight size={18} /></span>
            </Link>
          </section>

        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CaseStudy;
