import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { caseStudies } from '../data/caseStudies';
import './Sitemap.css';

const pageGroups = [
  {
    label: 'Main pages',
    links: [
      ['Home', '/'],
      ['About', '/about'],
      ['Case Studies', '/work'],
      ['Services', '/#services'],
      ['Contact', '/contact'],
    ],
  },
  {
    label: 'Legal',
    links: [
      ['Legal Overview', '/legal'],
      ['Privacy Policy', '/privacy-policy'],
      ['Terms & Conditions', '/terms-and-conditions'],
      ['Refund Policy', '/refund-policy'],
      ['Cookie Policy', '/cookie-policy'],
    ],
  },
  {
    label: 'Case studies',
    links: caseStudies.map((study) => [`${study.number} · ${study.title}`, `/work/${study.id}`]),
  },
];

const Sitemap = () => (
  <PageTransition>
    <div className="sitemap-page">
      <Navbar />
      <main className="container sitemap-main">
        <motion.header
          className="sitemap-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="premium-label">
            <div className="premium-label-icon" />
            Internal directory
          </div>
          <h1>Every page.<br />One clear map.</h1>
          <p>A compact route directory for reviewing the complete Bragit website.</p>
        </motion.header>

        <section className="sitemap-groups" aria-label="Website pages">
          {pageGroups.map((group, groupIndex) => (
            <motion.article
              className="sitemap-group"
              key={group.label}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: groupIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="sitemap-group-number">0{groupIndex + 1}</span>
              <h2>{group.label}</h2>
              <div className="sitemap-links">
                {group.links.map(([label, to]) => (
                  <Link to={to} key={to}>
                    <span>{label}</span>
                    <ArrowUpRight size={18} />
                  </Link>
                ))}
              </div>
            </motion.article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  </PageTransition>
);

export default Sitemap;
