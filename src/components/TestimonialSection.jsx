import { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import siteContent from '../data/siteContent.json';
import './TestimonialSection.css';

const testimonials = siteContent.testimonials;

const TestimonialSection = () => {
  const carouselRef = useRef(null);
  const autoplayPausedRef = useRef(false);
  const resumeTimerRef = useRef(null);

  const getScrollStep = useCallback(() => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector('.testimonial-card');
    if (!carousel || !firstCard) return 0;
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }, []);

  const pauseAutoplay = (duration = 0) => {
    autoplayPausedRef.current = true;
    window.clearTimeout(resumeTimerRef.current);
    if (duration) {
      resumeTimerRef.current = window.setTimeout(() => {
        autoplayPausedRef.current = false;
      }, duration);
    }
  };

  const resumeAutoplay = () => {
    window.clearTimeout(resumeTimerRef.current);
    autoplayPausedRef.current = false;
  };

  const moveCarousel = useCallback((direction) => {
    const carousel = carouselRef.current;
    const step = getScrollStep();
    if (!carousel || !step) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const target = direction > 0
      ? (carousel.scrollLeft >= maxScroll - step * 0.45 ? 0 : carousel.scrollLeft + step)
      : (carousel.scrollLeft <= step * 0.45 ? maxScroll : carousel.scrollLeft - step);

    carousel.scrollTo({ left: target, behavior: 'smooth' });
  }, [getScrollStep]);

  const scrollLeft = () => {
    pauseAutoplay(7000);
    moveCarousel(-1);
  };

  const scrollRight = () => {
    pauseAutoplay(7000);
    moveCarousel(1);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const interval = window.setInterval(() => {
      if (!autoplayPausedRef.current && document.visibilityState === 'visible') {
        moveCarousel(1);
      }
    }, 3200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(resumeTimerRef.current);
    };
  }, [moveCarousel]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="testimonial-section" id="testimonials">
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="testimonial-header">
          <motion.div className="testimonial-left" variants={containerVariants}>
            <motion.div className="premium-label" style={{ marginBottom: '24px' }} variants={itemVariants}>
              <div className="premium-label-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-black)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 10 14 12 24 12C14 12 12 14 12 24C12 14 10 12 0 12C10 12 12 10 12 0Z" />
                </svg>
              </div>
              Testimonial
            </motion.div>
            <motion.h2 className="testimonial-title" variants={itemVariants}>Built together.<br />Remembered longer.</motion.h2>
          </motion.div>
          
          <motion.div className="testimonial-right" variants={containerVariants}>
            <motion.p className="testimonial-desc" variants={itemVariants}>
              The best creative relationships feel collaborative from the first conversation. Here is what that experience has meant to the people behind the brands.
            </motion.p>
            <motion.div className="testimonial-actions-row" variants={itemVariants}>
              <Link to="/work" className="btn-testimonial testimonial-case-studies-btn">
                Visit Case Studies
                <span className="btn-testimonial-icon">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
              <div className="testimonial-controls">
                <button className="testimonial-control-btn" onClick={scrollLeft} aria-label="Previous testimonial">
                  <ArrowLeft size={20} />
                </button>
                <button className="testimonial-control-btn" onClick={scrollRight} aria-label="Next testimonial">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="testimonial-carousel-container"
          variants={itemVariants}
          initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="testimonial-carousel"
            ref={carouselRef}
            onFocus={() => pauseAutoplay()}
            onBlur={resumeAutoplay}
            onTouchStart={() => pauseAutoplay(7000)}
            aria-label="Client testimonials"
          >
            {testimonials.map((item) => (
              <div className="testimonial-card" key={item.id}>
                <img className="testimonial-card-stamp" src="/Asset 4.png" alt="" aria-hidden="true" />
                <div className="testimonial-card-header">
                  <span className="yellow-dot-global"></span>
                  <span className="testimonial-number">{item.id}</span>
                </div>
                <p className="testimonial-quote">{item.quote}</p>
                <div className="testimonial-author">
                  <img src={item.image} alt="" className="testimonial-author-image" />
                  <span className="testimonial-author-copy">
                    <span className="testimonial-author-name">{item.name}</span>
                    <span className="testimonial-author-title">{item.title}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
