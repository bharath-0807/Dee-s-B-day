import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); 
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  return (
    <motion.p 
      className="message-text typewriter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {displayedText}
      {currentIndex < text.length && <span className="cursor">|</span>}
    </motion.p>
  );
};

const FinalMessage = () => {
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="final-container">
      <motion.div 
        className="polaroid-container"
        initial={{ y: -500, rotate: -20, opacity: 0 }}
        animate={{ y: 0, rotate: [-10, 5, -5], opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 10, delay: 0.5 }}
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

      <div className="message-card glass-panel">
        <div className="message-content">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}
          >
            Happy 20th Birthday, Dee 🦋
          </motion.h2>
          
          {startTyping && (
            <>
              <TypewriterText text="Welcome to your twenties! I wanted to do something special for you, because you deserve nothing less." />
              <TypewriterText text="You have this amazing energy that just makes everything better. I admire your smile, your aesthetic, and the way you see the world. It's rare to find someone who leaves such a lasting impression, but you do it effortlessly." delay={1} />
              <TypewriterText text="May this new chapter bring you endless joy, beautiful memories, and all the success you've been working so hard for. Keep being your amazing, magical self." delay={2} />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 8, duration: 2 }}
                style={{ marginTop: '3rem' }}
              >
                <p className="signature">Yours truly,</p>
                <p className="signature" style={{ marginTop: '0.5rem', fontSize: '1.5rem', color: 'var(--color-text-light)' }}>
                  Bharath 💫
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalMessage;
