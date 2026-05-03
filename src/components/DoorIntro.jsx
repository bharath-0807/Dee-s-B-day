import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DoorIntro = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for the door animation and zoom to finish before proceeding
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <div className="door-container">
      <motion.div 
        className="house-wall"
        animate={isOpen ? { scale: 5, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div className="wall-lamp left">
          <div className="lamp-light"></div>
        </div>

        <div className="door-frame">
          <motion.div 
            className="door"
            onClick={!isOpen ? handleOpen : undefined}
            animate={isOpen ? { rotateY: -105 } : { rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="door-panel"></div>
            <div className="door-panel"></div>
            <div className="door-handle"></div>
            {!isOpen && (
              <p className="door-text">Tap to Open</p>
            )}
          </motion.div>
        </div>

        <div className="wall-lamp right">
          <div className="lamp-light"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default DoorIntro;
