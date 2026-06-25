import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FaqSection.css';

const faqs = [
  {
    question: "What exactly does Bragit do?",
    answer: "Bragit is a creative agency working across branding and design, marketing, social content, photography, videography, animation, UGC, PR and events. We connect strategy, creativity and culture so the work feels relevant and lasting."
  },
  {
    question: "Can you build a brand from the ground up?",
    answer: "Yes. We can shape positioning, identity, logo systems, packaging, visual language, social design systems and practical brand guidelines as one cohesive foundation."
  },
  {
    question: "Do you create social media and UGC content?",
    answer: "Yes. We plan platform-ready content, campaign ideas, social creatives, reels and creator-led UGC that help the brand feel human, consistent and worth following."
  },
  {
    question: "Can you handle photography, video and animation?",
    answer: "Yes. Our production work includes brand and product photography, campaign films, videography, motion graphics and 2D or 3D animation shaped around a clear creative direction."
  },
  {
    question: "What kind of events do you work on?",
    answer: "We work on launches, event branding, college cultural events and fests, private celebrations, weddings, workshops and PR-led brand moments, with scope tailored to each project."
  },
  {
    question: "How do I start a project?",
    answer: "Send us your brief, goal or even an unfinished thought. We will understand the challenge, recommend the right mix of services and share a clear scope, timeline and next step."
  }
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question-row" type="button" onClick={onClick} aria-expanded={isOpen}>
        <h4 className="faq-question">{question}</h4>
        <div className="faq-icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`faq-chevron ${isOpen ? 'open' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="faq-answer-wrapper"
          >
            <p className="faq-answer">{answer}</p>
            <div className="faq-author-row">
              <div className="faq-author-avatar">
                <img src="/Asset 4.png" alt="" />
              </div>
              <div className="faq-author-text">
                <span className="faq-author-label">Answered by</span>
                <span className="faq-author-name">Bragit Team</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="faq-section" id="faq">
      <motion.div 
        className="container faq-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="faq-left">
          <motion.div className="faq-header" variants={itemVariants}>
            <div className="premium-label" style={{ marginBottom: '24px' }}>
              <div className="premium-label-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-black)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 10 14 12 24 12C14 12 12 14 12 24C12 14 10 12 0 12C10 12 12 10 12 0Z" />
                </svg>
              </div>
              FAQ
            </div>
            <h2 className="faq-title">We've got the<br />answers.</h2>
          </motion.div>
          
          <motion.div className="faq-support-box" variants={itemVariants}>
            <div className="faq-support-content">
              <div className="faq-avatar-placeholder">
                <img src="/Asset 4.png" alt="Bragit" />
              </div>
              <h3>Didn't get the answer you were looking for?</h3>
              <Link to="/contact" className="faq-human-btn">Talk to Bragit</Link>
              <p>Share the brand, the challenge or the idea. We will help shape the right creative direction.</p>
            </div>
          </motion.div>
        </div>
        
        <div className="faq-right">
          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? 72 : -72, y: 18 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.7, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                <FaqItem 
                  question={faq.question} 
                  answer={faq.answer} 
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FaqSection;
