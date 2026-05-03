import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterPoem = ({ poem, startDelay = 0, onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState(poem.map(() => ''));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Wait for initial start delay
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), startDelay * 1000);
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Typing logic
  useEffect(() => {
    if (!hasStarted || isFinished) return;
    
    // If we've reached the end of the poem
    if (currentLine >= poem.length) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // Special check for empty lines (stanzas)
    if (poem[currentLine] === "") {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 500); // 500ms pause for empty lines
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedLines(prev => {
        const newLines = [...prev];
        newLines[currentLine] += poem[currentLine][currentChar];
        return newLines;
      });

      if (currentChar + 1 < poem[currentLine].length) {
        setCurrentChar(prev => prev + 1);
      } else {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }
    }, 50); // 50ms per character

    return () => clearTimeout(timeout);
  }, [currentChar, currentLine, poem, hasStarted, isFinished, onComplete]);

  return (
    <div className="message-text typewriter" style={{ textAlign: 'center', marginBottom: '2rem' }}>
      {poem.map((line, index) => (
        <p key={index} style={{ minHeight: line === "" ? '1rem' : '1.8rem', margin: '0.3rem 0', fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '1.4rem' }}>
          {displayedLines[index]}
          {currentLine === index && hasStarted && !isFinished && <span className="cursor">|</span>}
        </p>
      ))}
    </div>
  );
};

const FinalMessage = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const poemLines = [
    "If I could write a song for you,",
    "Every chord would ring so true.",
    "Your laugh would be the sweetest rhyme,",
    "Echoing softly through space and time.",
    "",
    "Like a butterfly in the morning sun,",
    "You bring colors to everyone.",
    "I may not say what's in my heart,",
    "But you're my favorite piece of art. 🤍",
    "",
    "Happy 20th Birthday, Dee.",
    "Keep shining, keep flying high."
  ];

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
            A Note For You 🤍
          </motion.h2>
          
          {startTyping && (
            <TypewriterPoem 
              poem={poemLines} 
              startDelay={1} 
              onComplete={() => setShowSignature(true)}
            />
          )}

          {showSignature && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              style={{ marginTop: '3rem', textAlign: 'center' }}
            >
              <p className="signature" style={{ fontFamily: 'Caveat', fontSize: '1.5rem', color: '#555' }}>Yours truly,</p>
              <p className="signature" style={{ marginTop: '0.5rem', fontFamily: 'Caveat', fontSize: '2.5rem', color: 'var(--color-text-light)' }}>
                Bharath 🤍
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalMessage;
