import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PrankQuestions = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: Q1, 1: Q2, 2: Final Transition
  const [yesScale, setYesScale] = useState(1);

  const handleNoClick = () => {
    setYesScale(prev => prev + 0.5);
  };

  const handleYesClick = () => {
    setYesScale(1); // Reset for next question
    if (stage === 0) {
      setStage(1);
    } else if (stage === 1) {
      setStage(2);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  return (
    <div className="prank-container">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div 
            key="q1"
            className="question-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Bharath is about to say something, do you wanna hear it out?</h2>
            <div className="buttons">
              <motion.button 
                className="yes-btn" 
                onClick={handleYesClick}
                animate={{ scale: yesScale }}
                transition={{ type: 'spring' }}
              >
                Yes
              </motion.button>
              <motion.button 
                className="no-btn"
                onClick={handleNoClick}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div 
            key="q2"
            className="question-box"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <h2>Do you like him? 👀</h2>
            <div className="buttons">
              <motion.button 
                className="yes-btn" 
                onClick={handleYesClick}
                animate={{ scale: yesScale }}
                transition={{ type: 'spring' }}
              >
                Yes
              </motion.button>
              <motion.button 
                className="no-btn"
                onClick={handleNoClick}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div 
            key="transition"
            className="question-box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2>Bharath wants to give you this... 🎁</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrankQuestions;
