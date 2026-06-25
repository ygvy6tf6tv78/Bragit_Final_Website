import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import siteContent from '../data/siteContent.json';
import './ServicesSection.css';

const services = siteContent.services;

const headerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11 },
  },
};

const revealUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const ServicesSection = () => {
  const [openServices, setOpenServices] = useState(() => new Set(['01']));

  const toggleService = (serviceId) => {
    setOpenServices((current) => {
      const next = new Set(current);

      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }

      return next;
    });
  };

  return (
    <section className="services-section" id="services">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <div className="services-header-grid">
          <motion.div
            className="services-header-left"
            variants={headerStagger}
          >
            <motion.div className="premium-label" style={{ marginBottom: '24px' }} variants={revealUp}>
              <div className="premium-label-icon" />
              Our Services
            </motion.div>
            <motion.h2 className="services-title" variants={revealUp}>Everything your brand<br />needs to be remembered.</motion.h2>
          </motion.div>

          <motion.div
            className="services-header-right"
            variants={headerStagger}
          >
            <motion.p className="services-desc" variants={revealUp}>
              From identity and campaigns to content, production and events, every service is built to make the brand feel cohesive, purposeful and ready for the real world.
            </motion.p>
            <motion.div variants={revealUp}>
            <Link to="/contact" className="btn-pill-services">
              Contact us
              <span className="btn-pill-icon-services"><ArrowUpRight size={16} /></span>
            </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="services-accordion">
          {services.map((service, index) => {
            const isOpen = openServices.has(service.id);
            return (
              <motion.article
                key={service.id}
                className={`service-accordion-item ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, x: 42, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-45px' }}
                transition={{
                  opacity: { duration: 0.55, delay: index * 0.07 },
                  x: { duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <button
                  className="service-accordion-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => toggleService(service.id)}
                >
                  <span className="service-accordion-index">{service.id}</span>
                  <span className="service-accordion-spark" aria-hidden="true" />
                  <span className="service-accordion-title">{service.title}</span>
                  <span className="service-accordion-toggle" aria-hidden="true">
                    <span className="service-toggle-line service-toggle-line-horizontal" />
                    <span className="service-toggle-line service-toggle-line-vertical" />
                  </span>
                </button>

                <div className={`service-panel-shell ${isOpen ? 'is-visible' : ''}`} aria-hidden={!isOpen}>
                  <div className="service-panel-clip">
                    <div id={`service-panel-${service.id}`} className="service-accordion-panel">
                      <div className="service-accordion-copy">
                        <p>{service.desc}</p>
                        <div className="service-tags">
                          {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                      </div>
                      <motion.div
                        className="service-accordion-visual"
                        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.97 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {service.images.map((image, imageIndex) => (
                          <img
                            className={`service-collage-image service-collage-image-${imageIndex + 1}`}
                            src={image}
                            alt=""
                            key={image}
                          />
                        ))}
                        <img className="service-visual-stamp" src="/Asset 4.png" alt="" aria-hidden="true" />
                      </motion.div>
                      <h3 className="service-panel-mobile-title">{service.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
