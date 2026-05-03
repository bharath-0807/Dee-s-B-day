import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Cake = ({ onBlowOut }) => {
  const [isBlowing, setIsBlowing] = useState(false);
  const [micError, setMicError] = useState(false);
  const [flameBlown, setFlameBlown] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);
        
        detectBlow();
      } catch (err) {
        console.error("Mic access denied or error:", err);
        setMicError(true);
      }
    };

    startMic();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const detectBlow = () => {
    if (!analyserRef.current || flameBlown) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    if (average > 60) {
      setIsBlowing(true);
      setTimeout(() => {
        if (!flameBlown) {
          triggerBlowOut();
        }
      }, 500);
    } else {
      setIsBlowing(false);
    }

    if (!flameBlown) {
      animationFrameRef.current = requestAnimationFrame(detectBlow);
    }
  };

  const triggerBlowOut = () => {
    setFlameBlown(true);
    setTimeout(() => {
      onBlowOut();
    }, 1000); 
  };

  const renderCandle = (className) => (
    <div className={`candle ${className}`}>
      <div className="candle-body"></div>
      {!flameBlown && (
        <motion.div 
          className={`flame ${isBlowing ? 'flicker-intense' : 'flicker-normal'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
      {!flameBlown && <div className={`glow ${isBlowing ? 'glow-intense' : ''}`}></div>}
    </div>
  );

  return (
    <div className="cake-wrapper">
      <div className="vector-cake">
        
        {/* Tier 3 (Top) */}
        <div className="v-tier v-tier-3">
          <div className="v-icing"></div>
          <div className="v-drip v-drip-1"></div>
          <div className="v-drip v-drip-2"></div>
          <div className="v-drip v-drip-3"></div>
          <div className="v-drip v-drip-4"></div>
          <div className="v-drip v-drip-5"></div>
        </div>

        {/* Tier 2 (Middle) */}
        <div className="v-tier v-tier-2">
          <div className="v-icing"></div>
          <div className="v-drip v-drip-1"></div>
          <div className="v-drip v-drip-2"></div>
          <div className="v-drip v-drip-3"></div>
          <div className="v-drip v-drip-4"></div>
          <div className="v-drip v-drip-5"></div>
          <div className="v-drip v-drip-6"></div>
        </div>

        {/* Tier 1 (Bottom) */}
        <div className="v-tier v-tier-1">
          <div className="v-icing"></div>
          <div className="v-drip v-drip-1"></div>
          <div className="v-drip v-drip-2"></div>
          <div className="v-drip v-drip-3"></div>
          <div className="v-drip v-drip-4"></div>
          <div className="v-drip v-drip-5"></div>
          <div className="v-drip v-drip-6"></div>
          <div className="v-drip v-drip-7"></div>
        </div>
        
        {/* Candles */}
        {renderCandle("candle-left")}
        {renderCandle("candle-middle")}
        {renderCandle("candle-right")}
        
      </div>

      <div className="instructions">
        {micError ? (
          <button className="blow-btn" onClick={triggerBlowOut}>Tap to blow the candles 💨</button>
        ) : (
          <p>Blow into your microphone to make a wish 💨</p>
        )}
      </div>
    </div>
  );
};

export default Cake;
