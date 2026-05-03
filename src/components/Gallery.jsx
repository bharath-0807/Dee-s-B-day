import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  // We use placeholder names for the images. 
  // You will need to place her images in the 'public' folder and name them pic1.jpg, pic2.jpg, pic3.jpg
  const images = [
    { src: '/pic1.jpg', alt: 'Dee looking beautiful', delay: 0.2 },
    { src: '/pic2.jpg', alt: 'Dee smiling', delay: 0.4 },
    { src: '/pic3.jpg', alt: 'Dee aesthetic', delay: 0.6 }
  ];

  return (
    <section className="gallery-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        A Glimpse of You
      </motion.h2>

      <div className="gallery-grid">
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            className="gallery-item glass-panel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: img.delay }}
          >
            <img src={img.src} alt={img.alt} className="gallery-img" />
            <div className="gallery-overlay">
              <h3 style={{fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '0.5rem'}}>Memory {idx + 1}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
