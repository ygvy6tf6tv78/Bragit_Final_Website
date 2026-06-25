import { motion } from 'framer-motion';
import './TrustedBrands.css';

const containerVariants = {
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

const TrustedBrands = () => {
  const logos = [
    'IJM TOYOTA', 'RASA', 'CORNITOS', 'HIMALAYAN PLYWOOD', 'TVS',
    'BURGER BAZAAR', 'PHAGUMAL JEWELLERS', 'SWASTIK DIAGNOSTIC', 'JK PUBLIC SCHOOL', 'ATELIER'
  ];

  // Repeat logos for infinite scroll effect
  const repeatedLogos = [...logos, ...logos, ...logos];

  const yellowStripContent = "Branding & Design ✦ Marketing ✦ Social Content ✦ Photography ✦ Videography ✦ Animation ✦ UGC ✦ PR & Events ✦ ";
  const blackStripContent = "Your Brand Catalyst ✦ Strategy ✦ Creativity ✦ Culture ✦ Genuine Connections ✦ Lasting Experiences ✦ ";

  // Repeat strip text for infinite effect
  const repeatedYellowStrip = yellowStripContent.repeat(4);
  const repeatedBlackStrip = blackStripContent.repeat(4);

  return (
    <section className="trusted-brands-section">
      <motion.div
        className="container trusted-brands-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        
        {/* Header Text */}
        <motion.div
          className="trusted-header"
          variants={containerVariants}
        >
          <motion.div className="trusted-eyebrow" variants={revealUp}>Brands We’ve Worked With</motion.div>
          <motion.h2 className="trusted-title" variants={revealUp}>Work shaped with brands across industries.</motion.h2>
          <motion.p className="trusted-subtext" variants={revealUp}>
            From food and fashion to education, jewellery, mobility and events, our work is built around the people each brand needs to reach.
          </motion.p>
        </motion.div>

      </motion.div>

      {/* Logo Slideshow */}
      <motion.div 
        className="trusted-logo-wrapper"
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="trusted-logo-track">
          {repeatedLogos.map((logo, index) => (
            <div key={index} className="trusted-logo-item">
              {logo}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Angled Marquee Strips */}
      <motion.div 
        className="trusted-strips-container"
        initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="strip strip-yellow"
          initial={{ x: -90, rotate: -3 }}
          whileInView={{ x: 0, rotate: -3 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="strip-track track-left">
            {repeatedYellowStrip}
          </div>
        </motion.div>
        
        <motion.div
          className="strip strip-black"
          initial={{ x: 90, rotate: 2 }}
          whileInView={{ x: 0, rotate: 2 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="strip-track track-right">
            {repeatedBlackStrip}
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default TrustedBrands;
