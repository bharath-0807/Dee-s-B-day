import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import DoorIntro from './components/DoorIntro';
import Cake from './components/Cake';
import PrankQuestions from './components/PrankQuestions';
import FinalMessage from './components/FinalMessage';

function App() {
  const [step, setStep] = useState(0); 
  // 0: Door, 1: Room+Cake, 2: Celebration(Song), 3: Prank, 4: Final
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDoorOpen = () => {
    // Autoplay Trick: Let the audio play silently in the background
    // This bypasses browser restrictions since it started on a user click (Door tap).
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.play().catch(e => console.log("Silent play failed: ", e));
    }
    setStep(1);
  };

  const handleBlowOut = () => {
    if (audioRef.current) {
      // Just rewind and unmute! Since it's already playing silently, it will 100% work.
      audioRef.current.currentTime = 0;
      audioRef.current.muted = false;
    }
    setStep(2);
  };

  const handleSongEnded = () => {
    setStep(3);
  };

  const handlePrankComplete = () => {
    setStep(4);
  };

  return (
    <div className={`app-container step-${step}`}>
      <audio 
        ref={audioRef} 
        src="/song.mp3" 
        onEnded={handleSongEnded} 
        // Note: Removed 'loop' because we need onEnded to trigger the next phase
      />

      {step === 0 && (
        <DoorIntro onOpen={handleDoorOpen} />
      )}

      {step === 1 && (
        <div className="dark-room">
          <Cake onBlowOut={handleBlowOut} />
        </div>
      )}

      {step === 2 && (
        <div className="celebration-room">
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            recycle={true}
            numberOfPieces={300}
            gravity={0.1}
          />
          <div style={{ textAlign: 'center', zIndex: 10 }}>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: '#333', marginBottom: '20px' }}>
              Happy Birthday Dee! 🎉
            </h1>
            <p style={{ color: '#555', fontFamily: 'Outfit', fontSize: '1.2rem' }}>
              Enjoy the song...
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="celebration-room">
          <PrankQuestions onComplete={handlePrankComplete} />
        </div>
      )}

      {step === 4 && (
        <div className="celebration-room final-room">
          <FinalMessage />
        </div>
      )}
    </div>
  );
}

export default App;
