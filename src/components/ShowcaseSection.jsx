import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import siteContent from '../data/siteContent.json';
import './ShowcaseSection.css';

const ShowcaseSection = () => {
  const containerRef = useRef(null);

  // Scroll mapping for the 3D flattening effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start animating when the top of the container enters the bottom of the viewport
    // Finish animating when the center of the container hits the center of the viewport
    offset: ["start end", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);

  return (
    <section className="showcase-section" ref={containerRef}>
      <div className="showcase-container">
        
        {/* Massive 3D Image Showcase */}
        <div className="showcase-image-wrapper">
          <motion.div 
            className="showcase-image-container"
            style={{ 
              rotateX, 
              scale, 
              y, 
              transformStyle: "preserve-3d"
            }}
          >
            <img
              className="showcase-image"
              src={siteContent.home.showcaseImage}
              alt="Bragit creative work showcase"
              decoding="async"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ShowcaseSection;
