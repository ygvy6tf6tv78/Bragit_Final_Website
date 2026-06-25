import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import './Legal.css';

const company = {
  name: 'BRAGIT CONSULTANCY PVT LTD',
  website: 'www.bragit.in',
  email: 'hello@bragit.in',
  phone: '+91 91860 95098',
  address: 'Opp. Mahajan Roller Flour Mills, Phase 3, Industrial Area, Gangyal, Jammu - 180010, J&K, India',
  effectiveDate: '19 June 2026',
};

const legalPages = [
  {
    path: '/privacy-policy',
    eyebrow: 'Data & Privacy',
    title: 'Privacy Policy',
    summary: 'How Bragit collects, uses, stores, and protects personal information shared through the website, contact channels, and services.',
    sections: [
      {
        title: 'Information We Collect',
        items: [
          'Name',
          'Business or brand name',
          'Email address',
          'Phone number',
          'Project details',
          'Service requirements',
          'Messages submitted through forms',
          'Basic website usage data such as browser type, device type, and pages visited',
        ],
      },
      {
        title: 'How We Use Your Information',
        items: [
          'Respond to your enquiries',
          'Understand your project requirements',
          'Share proposals, pricing, or service details',
          'Communicate regarding ongoing projects',
          'Improve our website and services',
          'Send relevant updates only when required',
        ],
      },
      {
        title: 'Sharing of Information',
        body: 'We do not sell, rent, or trade your personal information. We may share limited information with trusted third-party service providers only when required for business operations such as website hosting, analytics, communication, payment processing, or project execution.',
      },
      {
        title: 'Data Security',
        body: 'We take reasonable steps to protect your information from unauthorized access, misuse, loss, or disclosure. However, no online system is completely secure, and we cannot guarantee absolute security of information transmitted through the internet.',
      },
      {
        title: 'Cookies and Tracking',
        body: 'Our website may use cookies or similar technologies to improve user experience, understand website performance, and analyze visitor behavior. You can control or disable cookies through your browser settings.',
      },
      {
        title: 'Data Retention',
        body: 'We keep your information only for as long as necessary to fulfill the purpose for which it was collected, complete business communication, comply with legal requirements, or maintain records.',
      },
      {
        title: 'Your Rights',
        body: 'You may contact us to request access, correction, or deletion of your personal information, subject to applicable law and business requirements.',
      },
      {
        title: 'Third-Party Links',
        body: 'Our website may contain links to third-party websites or platforms. We are not responsible for the privacy practices or content of those websites.',
      },
      {
        title: 'Updates to This Policy',
        body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
      },
    ],
  },
  {
    path: '/terms-and-conditions',
    aliases: ['/terms-of-service'],
    eyebrow: 'Website & Services',
    title: 'Terms & Conditions',
    summary: 'The general terms for using the Bragit website and working with Bragit on branding, design, marketing, content, production, PR, and events.',
    sections: [
      {
        title: 'About Bragit',
        body: 'BRAGIT CONSULTANCY PVT LTD is a creative agency based in Jammu, India. We provide branding and design, marketing, social media and content creation, photography, videography, 2D and 3D animation, UGC content, PR, and event services.',
      },
      {
        title: 'Use of Website',
        body: 'You agree to use this website only for lawful purposes. You must not misuse the website, attempt unauthorized access, copy content without permission, or use the website in a way that may harm Bragit or other users.',
      },
      {
        title: 'Services',
        items: [
          'Branding and identity design',
          'Packaging and digital design',
          'Marketing and campaign strategy',
          'Social media and content creation',
          'Photography and videography',
          '2D and 3D animation',
          'UGC and creator-led content',
          'PR, event branding, and event execution',
        ],
        note: 'Exact deliverables, timelines, pricing, and scope will be shared separately through proposal, quotation, agreement, invoice, or written communication.',
      },
      {
        title: 'Project Scope',
        body: 'Any work outside the approved scope may require additional charges and revised timelines. Changes, revisions, or extra requests will be handled based on the agreed project terms.',
      },
      {
        title: 'Payments',
        body: 'Payment terms will be shared before project confirmation. Work may begin only after the required advance payment or confirmation amount is received. Pending payments must be cleared as per the agreed timeline.',
      },
      {
        title: 'Client Responsibilities',
        body: 'The client is responsible for providing correct information, required brand assets, approvals, content, references, and feedback on time. Delays in providing required inputs may affect project timelines.',
      },
      {
        title: 'Revisions',
        body: 'Revisions will be provided as per the agreed scope. Unlimited revisions are not included unless clearly mentioned in writing. Major changes after approval may be treated as additional work.',
      },
      {
        title: 'Intellectual Property',
        body: 'Final approved work will be transferred to the client after full payment, unless stated otherwise. Bragit may showcase completed work in its portfolio, website, social media, or presentations unless the client requests confidentiality in writing. Concepts, drafts, rejected designs, strategy documents, and internal working files remain the property of Bragit unless agreed otherwise.',
      },
      {
        title: 'Third-Party Costs',
        body: 'Any third-party costs such as domain, hosting, ads budget, printing, production, paid tools, stock assets, influencer fees, vendor fees, venue charges, or platform charges are not included unless specifically mentioned.',
      },
      {
        title: 'No Guaranteed Results',
        body: 'We work to create strong branding, content, strategy, and execution. However, business results such as sales, reach, leads, followers, or revenue depend on many external factors and cannot be guaranteed unless specifically agreed in writing.',
      },
      {
        title: 'Cancellation',
        body: 'If a project is cancelled after work has started, the advance or amount paid may not be refundable depending on the work completed and resources allocated.',
      },
      {
        title: 'Limitation of Liability',
        body: 'Bragit will not be responsible for indirect losses, business loss, loss of revenue, platform issues, third-party delays, or situations beyond our control.',
      },
      {
        title: 'Changes to Terms',
        body: 'We may update these Terms & Conditions from time to time. Updated terms will be posted on this page.',
      },
    ],
  },
  {
    path: '/refund-policy',
    eyebrow: 'Payments & Cancellation',
    title: 'Refund & Cancellation Policy',
    summary: 'How refunds and cancellations are handled for Bragit service work, advance payments, project changes, and event-related costs.',
    sections: [
      {
        title: 'Service-Based Work',
        body: 'Bragit provides creative and professional services such as branding and design, marketing, social content, photography, videography, animation, UGC, PR, and events. Since these services involve time, planning, production, creative work, and resource allocation, refunds are handled based on project stage.',
      },
      {
        title: 'Advance Payment',
        body: 'Advance payments are generally non-refundable once the project has been confirmed and work has started. This is because time, planning, resources, and creative direction are allocated immediately after confirmation.',
      },
      {
        title: 'Cancellation Before Work Starts',
        body: 'If a project is cancelled before any work has started, Bragit may review the request and decide whether a partial refund is possible after deducting any administrative or planning costs.',
      },
      {
        title: 'Cancellation After Work Starts',
        body: 'If the project is cancelled after work has started, no full refund will be provided. Any refund, if applicable, will depend on work already completed, time already spent, resources allocated, third-party costs incurred, and project stage at the time of cancellation.',
      },
      {
        title: 'No Refund Situations',
        items: [
          'Change of mind after project start',
          'Delay caused by lack of client input or approval',
          'Dissatisfaction after approved direction',
          'Work already delivered',
          'Third-party costs already paid',
          'Event/vendor/production costs already committed',
          'Ad budgets already spent',
          'Domain, hosting, printing, paid tools, or platform payments',
        ],
      },
      {
        title: 'Revision Instead of Refund',
        body: 'If there is a genuine issue with delivered work, Bragit will first try to resolve it through revisions as per the agreed scope.',
      },
      {
        title: 'Event-Related Cancellations',
        body: 'For event-related work, cancellation terms may depend on vendors, venues, production partners, bookings, and materials already arranged. Any third-party cancellation charges will be the responsibility of the client.',
      },
      {
        title: 'Refund Timeline',
        body: 'If a refund is approved, it may take 7 to 14 working days to process after confirmation.',
      },
    ],
  },
  {
    path: '/cookie-policy',
    eyebrow: 'Cookies & Tracking',
    title: 'Cookie Policy',
    summary: 'How Bragit may use cookies and similar technologies to improve website performance, analytics, preferences, and experience.',
    sections: [
      {
        title: 'What Are Cookies?',
        body: 'Cookies are small files stored on your device when you visit a website. They help websites remember information, improve user experience, and understand how visitors interact with the site.',
      },
      {
        title: 'How We Use Cookies',
        items: [
          'Improve website performance',
          'Understand visitor behavior',
          'Analyze website traffic',
          'Remember basic preferences',
          'Improve user experience',
          'Support marketing or analytics tools',
        ],
      },
      {
        title: 'Types of Cookies We May Use',
        items: [
          'Essential Cookies: required for the basic functioning of the website.',
          'Analytics Cookies: help us understand how visitors use our website.',
          'Performance Cookies: help improve speed, layout, and overall website experience.',
          'Marketing Cookies: may be used to understand campaign performance or show relevant content.',
        ],
      },
      {
        title: 'Third-Party Cookies',
        body: 'We may use third-party tools such as analytics, advertising, or embedded platform tools. These third parties may set their own cookies according to their policies.',
      },
      {
        title: 'Managing Cookies',
        body: 'You can control, block, or delete cookies through your browser settings. Please note that disabling cookies may affect some parts of the website experience.',
      },
      {
        title: 'Updates to This Policy',
        body: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page.',
      },
    ],
  },
];

const resolvePage = (pathname) => legalPages.find((page) => (
  page.path === pathname || page.aliases?.includes(pathname)
));

const Legal = () => {
  const { pathname } = useLocation();
  const page = resolvePage(pathname);
  const isOverview = pathname === '/legal' || !page;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <PageTransition>
      <div className="legal-page">
        <Navbar />
        <main className="legal-main">
          <section className="legal-hero">
            <div className="legal-hero-top">
              <Link to="/" className="legal-back"><ArrowLeft size={17} /> Back to Bragit</Link>
            </div>
            <div className="legal-hero-grid">
              <div className="legal-title-block">
                <div className="legal-eyebrow">
                  <span />
                  {isOverview ? 'Legal overview' : page.eyebrow}
                </div>
                <h1>{isOverview ? 'Legal pages made readable.' : page.title}</h1>
                <p>
                  {isOverview
                    ? 'A clean overview of Bragit policies, terms, refunds and cookie usage. Pick a page below for the full details.'
                    : page.summary}
                </p>
              </div>
              <aside className="legal-meta-card">
                <span>Effective date</span>
                <strong>{company.effectiveDate}</strong>
                <span>Company</span>
                <strong>{company.name}</strong>
                <span>Website</span>
                <strong>{company.website}</strong>
              </aside>
            </div>
          </section>

          {isOverview ? (
            <section className="legal-overview-grid">
              {legalPages.map((item, index) => (
                <motion.article
                  className="legal-overview-card"
                  key={item.path}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34, y: 18 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.58, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={item.path} className="legal-overview-hit" aria-label={`Open ${item.title}`} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p>{item.eyebrow}</p>
                    <h2>{item.title}</h2>
                    <small>{item.summary}</small>
                  </div>
                  <div className="legal-overview-arrow" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </div>
                </motion.article>
              ))}
            </section>
          ) : (
            <section className="legal-content">
              {page.sections.map((section, index) => (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: Math.min(index * 0.035, 0.2), ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2>{section.title}</h2>
                    {section.body && <p>{section.body}</p>}
                    {section.items && (
                      <ul>
                        {section.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                    {section.note && <p>{section.note}</p>}
                  </div>
                </motion.article>
              ))}
              <aside className="legal-contact-card">
                <div>
                  <strong>Contact Bragit</strong>
                  <p>For questions about this page, contact us using the details below.</p>
                </div>
                <ul>
                  <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
                  <li>{company.phone}</li>
                  <li>{company.address}</li>
                </ul>
              </aside>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Legal;
