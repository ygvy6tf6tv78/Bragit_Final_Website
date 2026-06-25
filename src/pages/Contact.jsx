import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import './Contact.css';

const PHONE = '+919186095098';
const PHONE_DISPLAY = '+91 91860 95098';
const EMAIL = 'hello@bragit.in';
const WA_MSG = encodeURIComponent('Hi Bragit! I would love to discuss a project.');
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Mahajan+Roller+Flour+Mills+Gangyal+Jammu+180010';

const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2a9.84 9.84 0 0 0-8.43 14.91L2 22l5.23-1.54A9.96 9.96 0 1 0 12.04 2Zm0 17.98a8.06 8.06 0 0 1-4.1-1.12l-.3-.18-3.1.91.92-3.02-.2-.31a7.92 7.92 0 1 1 6.78 3.72Zm4.43-5.94c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-1.42-.71-2.35-1.27-3.29-2.88-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
  </svg>
);

const contactChannels = [
  {
    eyebrow: 'Fastest response',
    title: 'WhatsApp',
    detail: 'Tell us what you are building and we will take it from there.',
    href: `https://wa.me/${PHONE}?text=${WA_MSG}`,
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    eyebrow: 'Talk directly',
    title: 'Call us',
    detail: PHONE_DISPLAY,
    href: `tel:${PHONE}`,
    Icon: Phone,
  },
  {
    eyebrow: 'Share a brief',
    title: 'Email us',
    detail: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: Mail,
  },
];

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <PageTransition>
      <div className="contact-page">
        <Navbar />

        <main className="contact-main">
          <motion.section
            className="contact-hero"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <img src="/Asset 4.png" alt="" className="contact-watermark" />
            <motion.div className="contact-kicker" variants={fadeUp}>
              <span />
              Start a conversation
            </motion.div>
            <motion.h1 variants={fadeUp}>
              <span className="contact-title-line">Have a brand to build?</span>
              <span className="contact-title-line contact-title-accent">Let’s make it memorable.</span>
            </motion.h1>
            <motion.p variants={fadeUp}>
              Bring us the brief, the challenge or the beginning of an idea. Pick the easiest way to reach us and speak directly with the Bragit team.
            </motion.p>
          </motion.section>

          <motion.section
            className="contact-channels"
            initial="hidden"
            animate="visible"
            variants={stagger}
            aria-label="Contact options"
          >
            {contactChannels.map(({ eyebrow, title, detail, href, Icon, external }) => (
              <motion.a
                key={title}
                href={href}
                className="contact-channel"
                variants={fadeUp}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <div className="contact-channel-top">
                  <span>{eyebrow}</span>
                  <div className="contact-channel-icon"><Icon size={21} /></div>
                </div>
                <div>
                  <h2>{title}</h2>
                  <p>{detail}</p>
                </div>
                <ArrowUpRight className="contact-channel-arrow" size={28} />
              </motion.a>
            ))}
          </motion.section>

          <motion.section
            className="contact-details"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div className="contact-location" variants={fadeUp}>
              <div className="contact-location-copy">
                <div className="contact-detail-icon"><MapPin size={22} /></div>
                <div>
                  <span className="contact-detail-label">Our studio</span>
                  <h2>Jammu, J&K</h2>
                  <p>
                    BRAGIT CONSULTANCY PVT LTD<br />
                    Opp. Mahajan Roller Flour Mills<br />
                    Phase 3, Industrial Area, Gangyal<br />
                    Jammu 180010
                  </p>
                  <a className="contact-map-link" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                    View on Google Maps <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <iframe
                className="contact-map"
                title="Bragit location in Jammu"
                src="https://www.google.com/maps?q=Mahajan%20Roller%20Flour%20Mills%20Gangyal%20Jammu%20180010&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <motion.div className="contact-hours" variants={fadeUp}>
              <span className="contact-detail-label">Studio hours</span>
              <div><span>Monday — Friday</span><strong>9am — 6pm</strong></div>
              <div><span>Saturday</span><strong>10am — 2pm</strong></div>
              <div><span>Sunday</span><strong>Closed</strong></div>
            </motion.div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
