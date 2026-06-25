import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ isLoading = false }) => {
  const [activeCard, setActiveCard] = useState(2);
  const [rotatingIndex, setRotatingIndex] = useState(0);

  const rotatingWords = ["stand confidently", "tell better stories", "feel unmistakable", "get remembered"];

  useEffect(() => {
    if (isLoading) return undefined;

    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isLoading, rotatingWords.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        mass: 0.9
      }
    }
  };

  const outcomes = [
    {
      id: 1,
      title: "A Brand People Remember",
      desc: "A clear, cohesive presence that gives people a reason to recognise and choose you.",
      theme: "soft-gold"
    },
    {
      id: 2,
      title: "A Story Worth Sharing",
      desc: "Brand communication shaped around real people, relevant culture and ideas that feel genuine.",
      theme: "grey"
    },
    {
      id: 3,
      title: "Attention That Means Something",
      desc: "Creative built to do more than appear in a feed: it earns interest, trust and action.",
      theme: "gold"
    },
    {
      id: 4,
      title: "Experiences People Talk About",
      desc: "Moments, launches and experiences designed to stay with people after they are over.",
      theme: "dark"
    }
  ];

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Column */}
        <motion.div
          className="hero-left"
          variants={containerVariants}
          initial="hidden"
          animate={isLoading ? 'hidden' : 'visible'}
        >
          <motion.div variants={itemVariants} className="hero-dots">
            <span className="dot dot-black"></span>
            <span className="dot dot-gold"></span>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="hero-title">
              <span className="title-line">The Creative Growth Studio</span><br />
              <span className="title-line">for brands that</span><br />
              <span className="rotating-wrapper rotating-line">
                <span className="rotating-placeholder">get remembered</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingIndex}
                    className="rotating-word"
                    initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(5px)' }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {rotatingWords[rotatingIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-subtitle">
            We shape identities, tell better stories and create brand experiences that feel genuine, relevant and lasting.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="/contact" className="btn btn-gold">
              Book a call
              <span className="btn-icon">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>
            </Link>
            <a href="#work" className="btn btn-outline">
              View our work
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-trust">
            <p className="trust-label">Trusted by growing brands and local businesses</p>
            <div className="trust-logos-wrapper">
              <div className="trust-logos" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'rgba(11, 11, 11, 0.4)' }}>Burger Bazaar</span>
                <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'rgba(11, 11, 11, 0.4)' }}>Jammu Doors</span>
                <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'rgba(11, 11, 11, 0.4)' }}>JR Atta</span>
                <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'rgba(11, 11, 11, 0.4)' }}>Brew & Bean</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Service Cards */}
        <div className="hero-right">
          {outcomes.map((service, index) => {
            const isActive = activeCard === service.id;
            return (
              <motion.div
                key={service.id}
                className={`service-card ${service.theme} ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCard(service.id)}
                initial={{ opacity: 0, x: 40 }}
                animate={isLoading ? { opacity: 0, x: 40 } : { opacity: 1, x: 0 }}
                transition={{ delay: isLoading ? 0 : index * 0.1 + 0.12, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                <img className="card-watermark-logo" src="/Asset 4.png" alt="" aria-hidden="true" />
                <div className="card-top">
                  <h3 className="card-title">{service.title}</h3>
                  <span className="card-toggle">
                    {isActive ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="card-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <p className="card-desc">{service.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
