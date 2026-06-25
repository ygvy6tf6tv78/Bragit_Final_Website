import { motion } from 'framer-motion';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="about-section" id="about-us" style={{ padding: '120px 0', backgroundColor: '#F6F6F2' }}>
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          
          <motion.div variants={itemVariants}>
            <div className="premium-label" style={{ marginBottom: '24px' }}>
              <div className="premium-label-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-black)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 10 14 12 24 12C14 12 12 14 12 24C12 14 10 12 0 12C10 12 12 10 12 0Z" />
                </svg>
              </div>
              About Bragit®
            </div>
            <h2 style={{ fontFamily: 'Cal Sans, Inter, sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#0B0B0B', marginBottom: '24px', lineHeight: '1.1' }}>
              Everything you need to know about Bragit.
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6B6B6B', lineHeight: '1.6', marginBottom: '24px' }}>
              Bragit is built for brands that want more than random posts, basic designs, and delayed execution. We help businesses shape their identity, improve their online presence, plan smarter campaigns, and create memorable brand experiences.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#6B6B6B', lineHeight: '1.6' }}>
              From branding and social media to strategy and events, our work is simple: make your brand look sharper, communicate better, and move with more confidence.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1px solid #E5E5E0' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0B0B0B', marginBottom: '12px', fontWeight: '600' }}><span className="yellow-dot" style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--color-yellow)', borderRadius: '50%', marginRight: '12px' }}></span>Brand Identities</h4>
              <p style={{ color: '#6B6B6B', margin: 0, lineHeight: '1.5' }}>Visual systems that make businesses look sharper, cleaner, and more professional.</p>
            </div>
            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1px solid #E5E5E0' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0B0B0B', marginBottom: '12px', fontWeight: '600' }}><span className="yellow-dot" style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--color-yellow)', borderRadius: '50%', marginRight: '12px' }}></span>Social Presence</h4>
              <p style={{ color: '#6B6B6B', margin: 0, lineHeight: '1.5' }}>Content direction and social media systems that help brands stay visible and consistent.</p>
            </div>
            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1px solid #E5E5E0' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#0B0B0B', marginBottom: '12px', fontWeight: '600' }}><span className="yellow-dot" style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--color-yellow)', borderRadius: '50%', marginRight: '12px' }}></span>Creative Execution</h4>
              <p style={{ color: '#6B6B6B', margin: 0, lineHeight: '1.5' }}>Campaigns, events, and brand experiences planned with clarity and delivered smoothly.</p>
            </div>
          </motion.div>

        </div>
      </motion.div>
      <style>{`
        @media (max-width: 900px) {
          .about-section > .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-section > .container > div > div:last-child {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
