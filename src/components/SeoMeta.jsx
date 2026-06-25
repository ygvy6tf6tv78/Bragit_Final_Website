import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCaseStudy } from '../data/caseStudies';

const SITE_URL = 'https://www.bragit.in';
const OG_IMAGE = 'https://www.bragit.in/og-image.jpg';
const DEFAULT_TITLE = 'Bragit Consultancy | Creative Agency in Jammu';
const DEFAULT_DESCRIPTION = 'Bragit is a creative agency in Jammu for branding and design, marketing, social content, photography, videography, animation, UGC, PR, and events.';

const pageMeta = {
  '/': {
    title: DEFAULT_TITLE,
    description: 'We shape identities, tell better stories and create brand experiences that feel genuine, relevant and lasting. Branding · Marketing · Social · Content · Production.',
  },
  '/about': {
    title: 'About Bragit | Creative Agency in Jammu',
    description: 'Meet Bragit, a Jammu-based creative agency helping businesses build memorable identities, meaningful stories, and brand experiences that last.',
  },
  '/work': {
    title: 'Our Work | Bragit Consultancy — Branding, Content & Campaigns',
    description: 'Explore selected Bragit work across brand identity, social content, campaigns, photography, UGC, and event branding for real brands.',
  },
  '/contact': {
    title: 'Contact Bragit | Start Your Creative Project',
    description: 'Contact Bragit Consultancy in Jammu for branding, marketing, content production, photography, videography, UGC, PR, and events. Let\'s build something memorable.',
  },
  '/legal': {
    title: 'Legal Information | Bragit Consultancy',
    description: 'Review Bragit Consultancy legal information, privacy practices, service terms, refund policy, and cookie policy.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Bragit Consultancy',
    description: 'Read the Bragit Consultancy privacy policy — how we collect, use, and protect your personal information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Bragit Consultancy',
    description: 'Read the terms for using the Bragit website and working with Bragit Consultancy.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Bragit Consultancy',
    description: 'Read the terms for using the Bragit website and working with Bragit Consultancy.',
  },
  '/refund-policy': {
    title: 'Refund Policy | Bragit Consultancy',
    description: 'Read the Bragit Consultancy refund and cancellation policy.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | Bragit Consultancy',
    description: 'Read how Bragit Consultancy uses cookies and similar technologies.',
  },
  '/sitemap': {
    title: 'Sitemap | Bragit Consultancy',
    description: 'Browse the complete Bragit Consultancy website directory.',
  },
};

const setMeta = (selector, attribute, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attribute, value);
};

const SeoMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let meta;
    let ogImage = OG_IMAGE;

    // Dynamic case study meta — use actual study title + description
    if (pathname.startsWith('/work/') && pathname !== '/work') {
      const studyId = pathname.replace('/work/', '');
      try {
        const study = getCaseStudy(studyId);
        if (study) {
          meta = {
            title: `${study.title} — ${study.subtitle} | Bragit Case Study`,
            description: `${study.summary.substring(0, 155)}...`,
          };
        }
      } catch {
        // fallback
      }

      if (!meta) {
        meta = {
          title: 'Creative Case Study | Bragit Consultancy',
          description: 'Explore a Bragit creative case study — branding, campaigns, content, and brand experience for real businesses.',
        };
      }
    } else {
      meta = pageMeta[pathname] || { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
    }

    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

    // Update all meta tags
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:image:secure_url"]', 'content', ogImage);

    // Twitter / X
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
  }, [pathname]);

  return null;
};

export default SeoMeta;
