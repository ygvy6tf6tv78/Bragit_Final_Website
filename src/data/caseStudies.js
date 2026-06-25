import siteContent from './siteContent.json';

export const caseStudies = siteContent.caseStudies;

export const getCaseStudy = (id) => caseStudies.find((study) => study.id === id) || caseStudies[0];
