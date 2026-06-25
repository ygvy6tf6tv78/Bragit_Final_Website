import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import siteContent from '../data/siteContent.json';
import './About.css';

const values = [
  ['01', 'Growth obsessed', 'We build momentum through focused positioning, useful creative and consistent execution.'],
  ['02', 'Creative clarity', 'Every idea should make the brand easier to understand, trust and remember.'],
  ['03', 'Execution matters', 'Strategy becomes valuable only when it moves into campaigns, content and real experiences.'],
];

const process = [
  ['01', 'Discover', 'We understand the brand, audience, ambition and real business challenge.'],
  ['02', 'Define', 'We shape positioning, messaging and the direction that guides every decision.'],
  ['03', 'Create', 'We turn the direction into identity, content, campaigns and experiences.'],
  ['04', 'Grow', 'We launch, learn and improve the work around outcomes that matter.'],
];

const sectionStagger = {
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
    transition: { duration: 0.74, ease: [0.16, 1, 0.3, 1] },
  },
};

const ScrollFillWord = ({ children, progress, index, total }) => {
  const start = index / total;
  const end = Math.min(start + 0.14, 1);
  const opacity = useTransform(progress, [start, end], [0.16, 1]);

  return <motion.span style={{ opacity }}>{children}{' '}</motion.span>;
};

const ScrollFillText = ({ as = 'p', className, children }) => {
  const ref = useRef(null);
  const words = children.split(' ');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 38%'],
  });
  const MotionTag = as === 'h2' ? motion.h2 : motion.p;

  return (
    <MotionTag ref={ref} className={`${className} about-scroll-fill`} aria-label={children}>
      {words.map((word, index) => (
        <ScrollFillWord key={`${word}-${index}`} progress={scrollYProgress} index={index} total={words.length}>
          {word}
        </ScrollFillWord>
      ))}
    </MotionTag>
  );
};

const CountUp = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => Math.round(latest));
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(value, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, to, value]);

  return <strong ref={ref}><motion.span>{rounded}</motion.span>{suffix}</strong>;
};

const About = () => (
  <PageTransition>
    <div className="about-page">
      <Navbar />
      <main className="about-page-main">
        <section className="container about-editorial-hero">
          <motion.div
            className="about-editorial-copy"
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="premium-label">
              <div className="premium-label-icon" />
              About Bragit
            </div>
            <h1>
              A beard grows on its own. <span>A brand doesn’t.</span>
            </h1>
            <p>
              You can ignore a beard for a few weeks, and somehow it still exists. Ignore your brand for a few weeks,
              and someone else may already be taking your place.
            </p>
            <div className="about-editorial-trust">
              <span>A venture by BRAGIT CONSULTANCY PVT LTD</span>
              <img src="/Asset 4.png" alt="Bragit" />
            </div>
          </motion.div>

          <motion.div
            className="about-editorial-visual"
            initial={{ opacity: 0, x: 55, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              className="about-editorial-photo"
              src={siteContent.about.heroImage}
              alt="Creative team working in a modern studio"
            />
            <div className="about-logo-panel">
              <img src="/Asset 4.png" alt="Bragit" />
              <span>Creative direction<br />meets execution.</span>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="about-image-ribbon about-image-ribbon--hidden"
          aria-label="Bragit work culture"
          aria-hidden="true"
          initial={{ opacity: 0, y: 44, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="about-ribbon-track"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1, 2, 3, 0, 1, 2, 3].map((item, index) => (
              <div className={`about-ribbon-image about-ribbon-image-${item + 1}`} key={`${item}-${index}`}>
                <img src={siteContent.about.ribbonImages[item]} alt="" />
              </div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="container about-narrative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          variants={sectionStagger}
        >
          <motion.aside variants={revealUp}>
            <div className="premium-label">
              <div className="premium-label-icon" />
              The Brand Truth
            </div>
            <strong>Visibility is not the same as being remembered.</strong>
          </motion.aside>
          <motion.div className="about-narrative-copy" variants={sectionStagger}>
            <ScrollFillText className="about-narrative-lead">
              That’s the strange thing about business. The best product doesn’t always win. The loudest one doesn’t either.
            </ScrollFillText>
            <motion.h3 className="about-narrative-turn" variants={revealUp}>That’s where Bragit comes in.</motion.h3>
            <motion.p variants={revealUp}>
              We’re a team of strategists, creators, storytellers, marketers, designers, event enthusiasts, and
              problem-solvers who help brands stand out in a world full of noise.
            </motion.p>
            <motion.p variants={revealUp}>
              From branding and content to campaigns, experiences, social media, websites, and events, we bring ideas
              to life and make sure they leave a lasting impression.
            </motion.p>
          </motion.div>
        </motion.section>

        <section className="container about-vision">
          <img className="about-vision-logo" src="/Asset 4.png" alt="" aria-hidden="true" />
          <ScrollFillText className="about-vision-copy">
            Because great businesses deserve more than visibility. They deserve a personality.
          </ScrollFillText>
        </section>

        <motion.section
          className="container about-values"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionStagger}
        >
          <motion.div className="about-section-heading" variants={sectionStagger}>
            <motion.div className="premium-label" variants={revealUp}>
              <div className="premium-label-icon" />
              Core values
            </motion.div>
            <ScrollFillText as="h2" className="about-heading-fill">
              How a brand stops blending in.
            </ScrollFillText>
          </motion.div>
          <div className="about-values-list">
            {values.map(([number, title, text], index) => (
              <motion.article
                className="about-value-card"
                key={number}
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex: index + 1 }}
              >
                <div className="about-value-top">
                  <span>{number}</span>
                  <h3>{title}</h3>
                </div>
                <div className="about-value-body">
                  <img
                    src={siteContent.about.valueImages[index]}
                    alt=""
                  />
                  <div>
                    <span>{title}</span>
                    <h4>{[
                      'We do not just run campaigns. We build momentum.',
                      'We turn sharp thinking into memorable creative.',
                      'We stay close to the work until it performs.',
                    ][index]}</h4>
                    <p>{text}</p>
                  </div>
                </div>
                <img className="about-value-stamp" src="/Asset 4.png" alt="" aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="container about-results"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          variants={sectionStagger}
        >
          <motion.div variants={sectionStagger}>
            <motion.div className="premium-label" variants={revealUp}>
              <div className="premium-label-icon" />
              Built around results
            </motion.div>
            <motion.h2 variants={revealUp}>Ideas should do more than look good. They should leave a mark.</motion.h2>
          </motion.div>
          <motion.div className="about-result-stats" variants={sectionStagger}>
            <motion.div variants={revealUp}><span>Happy clients</span><CountUp to={16} suffix="+" /></motion.div>
            <motion.div variants={revealUp}><span>Projects delivered</span><CountUp to={25} suffix="+" /></motion.div>
            <motion.div variants={revealUp}><span>Client satisfaction</span><CountUp to={94} suffix="%" /></motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="container about-process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionStagger}
        >
          <motion.div className="about-section-heading" variants={sectionStagger}>
            <motion.div className="premium-label" variants={revealUp}>
              <div className="premium-label-icon" />
              Our process
            </motion.div>
            <motion.h2 variants={revealUp}>From first thought<br />to real momentum.</motion.h2>
          </motion.div>
          <div className="about-process-list">
            {process.map(([number, title, text], index) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: index * 24 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="about-process-number">{number}</span>
                <img src="/Asset 4.png" alt="" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="container about-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionStagger}
        >
          <img className="about-cta-mark" src="/Asset 4.png" alt="" aria-hidden="true" />
          <motion.div variants={revealUp}>
            <span>Great businesses deserve a personality</span>
            <h2>Let’s brag together.</h2>
          </motion.div>
          <motion.div variants={revealUp}>
          <Link to="/contact" className="cs-next-link">
            Start bragging <span><ArrowUpRight size={18} /></span>
          </Link>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </div>
  </PageTransition>
);

export default About;
