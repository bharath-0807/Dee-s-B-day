import React from 'react';
import { motion } from 'framer-motion';

const Polaroid = () => {
  return (
    <motion.div 
      className="polaroid-container"
      initial={{ y: -500, rotate: -20, opacity: 0 }}
      animate={{ y: 0, rotate: [-10, 5, -2], opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 50, 
        damping: 10,
        delay: 0.5 
      }}
    >
      <div className="polaroid">
        <div className="polaroid-image-container">
          <img src="/pic1.jpg" alt="Dee" className="polaroid-image" />
        </div>
        <div className="polaroid-caption">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#333' }}>
            Dee 🦋
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Polaroid;
