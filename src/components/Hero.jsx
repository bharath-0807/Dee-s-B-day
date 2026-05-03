import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { ChevronDown } from 'lucide-react';

const FloatingButterfly = ({ delay, left, top, size }) => (
  <motion.div
    className="floating-butterfly"
    initial={{ y: 100, opacity: 0, x: 0 }}
    animate={{ 
      y: [0, -20, 0, -30, -10], 
      x: [0, 15, -10, 20, 0],
      opacity: [0.4, 0.8, 0.4],
      rotate: [-5, 5, -5]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    style={{ left, top, fontSize: size }}
  >
    🦋
  </motion.div>
);

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.3} color="#d694ff" />
          <Sparkles count={50} scale={10} size={3} speed={0.2} opacity={0.5} color="#ff94c2" />
        </Canvas>
      </div>

      <FloatingButterfly delay={0} left="15%" top="30%" size="2.5rem" />
      <FloatingButterfly delay={2} left="80%" top="20%" size="3rem" />
      <FloatingButterfly delay={4} left="70%" top="60%" size="2rem" />
      <FloatingButterfly delay={1} left="25%" top="70%" size="3.5rem" />

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Happy 20th Birthday,<br/>Dee 🦋
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          To the girl who makes everything a little more magical.
        </motion.p>
      </motion.div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <span>Scroll</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
