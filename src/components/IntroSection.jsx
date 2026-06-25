import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll, animate, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import siteContent from '../data/siteContent.json';
import './IntroSection.css';

const Counter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, to, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

const ScrollWord = ({ children, progress, index, total }) => {
  const start = index / total;
  const end = Math.min(start + 0.16, 1);
  const color = useTransform(progress, [start, end], ['rgba(11, 11, 11, 0.18)', '#0b0b0b']);

  return <motion.span style={{ color }}>{children}{' '}</motion.span>;
};

const IntroSection = () => {
  const copyRef = useRef(null);
  const leadCopy = siteContent.home.aboutLead;
  const leadWords = leadCopy.split(' ');
  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: ['start 82%', 'end 38%'],
  });

  // Repeating the text enough times so the marquee seamlessly loops on ultra-wide screens
  const yellowStripText = "Branding    ✦    Social Media    ✦    Strategy    ✦    Events    ✦    Creative Direction    ✦    Campaign Planning    ✦    ".repeat(6);
  const blackStripText = "Creative Growth Studio    ✦    Smooth Execution    ✦    Based in Jammu    ✦    Brand Visibility    ✦    Memorable Experiences    ✦    ".repeat(6);

  return (
    <section className="intro-section" id="about">
      {/* Crossing Marquees */}
      <motion.div
        className="marquee-container"
        initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="marquee-strip marquee-black"
          initial={{ x: 90, rotate: -3 }}
          whileInView={{ x: 0, rotate: -3 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="marquee-content marquee-content-right">
            <span>{blackStripText}</span>
            <span>{blackStripText}</span>
          </div>
        </motion.div>
        <motion.div
          className="marquee-strip marquee-yellow"
          initial={{ x: -90, rotate: 2.5 }}
          whileInView={{ x: 0, rotate: 2.5 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="marquee-content marquee-content-left">
            <span>{yellowStripText}</span>
            <span>{yellowStripText}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Intro Content */}
      <div className="container about-new-container">
        <div className="about-new-grid">
          {/* Left Label */}
          <div className="about-side-label" style={{ marginBottom: '24px' }}>
            <div className="premium-label">
              <div className="premium-label-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-black)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 10 14 12 24 12C14 12 12 14 12 24C12 14 10 12 0 12C10 12 12 10 12 0Z" />
                </svg>
              </div>
              About Bragit
            </div>
          </div>

          {/* Right Content */}
          <div className="about-main-content">
            <motion.div
              ref={copyRef}
              className="about-lead-text"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="about-lead-scroll-copy" aria-label={leadCopy}>
                {leadWords.map((word, index) => (
                  <ScrollWord key={`${word}-${index}`} progress={scrollYProgress} index={index} total={leadWords.length}>
                    {word}
                  </ScrollWord>
                ))}
              </span>
              <span className="about-lead-mobile-copy">{leadCopy}</span>
            </motion.div>

            <motion.div
              className="about-read-more-wrap"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/about" className="about-read-more">
                Read about Bragit
                <span><ArrowUpRight size={17} /></span>
              </Link>
            </motion.div>

            <motion.div 
              className="about-stats-grid"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 60, damping: 20, mass: 1, delay: 0.15 }}
            >
              {siteContent.home.aboutStats.map((stat) => (
                <div className="stat-item" key={stat.label}>
                  <div className="stat-label"><span className="yellow-dot"></span> {stat.label}</div>
                  <div className="stat-value"><Counter to={stat.value} suffix={stat.suffix} /></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
