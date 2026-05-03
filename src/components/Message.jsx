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
      }, 50); // typing speed
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

const Message = () => {
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Start typing after Polaroid finishes its entrance animation
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="message-section" style={{ minHeight: 'auto', padding: '2rem' }}>
      <div className="message-card glass-panel" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)' }}>
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
                <p className="signature" style={{ marginTop: '0.5rem', fontSize: '1.2rem', color: 'var(--color-text)' }}>
                  Someone who appreciates you 💫
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Message;
