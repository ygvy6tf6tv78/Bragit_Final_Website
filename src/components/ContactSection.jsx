import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
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
    <section className="contact-section" id="contact">
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="contact-header-layout">
          <motion.div className="contact-title-area" variants={itemVariants}>
            <div className="premium-label" style={{ marginBottom: '24px' }}>
              <div className="premium-label-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-black)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 10 14 12 24 12C14 12 12 14 12 24C12 14 10 12 0 12C10 12 12 10 12 0Z" />
                </svg>
              </div>
              GET IN TOUCH
            </div>
            <h2 className="contact-title">
              <span className="text-grey">WE'RE JUST A</span><br />
              <span className="text-black">MESSAGE</span> <span className="text-grey">AWAY.</span>
            </h2>
          </motion.div>
          
          <motion.div className="contact-action-area" variants={itemVariants}>
            <p className="contact-desc">
              Have a brand to shape, a campaign to launch or an experience to create? Tell us where you want to go and we will help define the next move.
            </p>
            <a href="https://wa.me/919186095098" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div className="contact-grid" variants={containerVariants}>
          
          {/* Left Side 2x2 Grid */}
          <motion.div className="contact-cards-container" variants={itemVariants}>
            <div className="contact-info-card">
              <div className="contact-icon-box">
                <MapPin size={20} color="#000" />
              </div>
              <p>Opp. Mahajan Roller Flour Mills, Phase 3,<br />Industrial Area, Gangyal, Jammu 180010</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon-box">
                <Phone size={20} color="#000" />
              </div>
              <p>+91 91860 95098</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon-box">
                <Mail size={20} color="#000" />
              </div>
              <p>hello@bragit.in</p>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon-box">
                <Calendar size={20} color="#000" />
              </div>
              <p>Mon - Fri: 10:30 AM - 8:30 PM<br />Sat - Sun: Closed</p>
            </div>
          </motion.div>

          {/* Right Side Consultation Card */}
          <motion.div className="consultation-card" variants={itemVariants}>
            <div className="consultation-image">
              <img src="/Asset 2.png" alt="Founder" />
            </div>
            <div className="consultation-content">
              <h3>Need a Quick<br />Consultation?</h3>
              <p>WE'LL GUIDE YOU IN THE RIGHT DIRECTION.</p>
              <a href="#book" className="btn-book-call">
                Book a Call
                <span className="btn-book-icon">
                  <ArrowRight size={16} color="#000" />
                </span>
              </a>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
