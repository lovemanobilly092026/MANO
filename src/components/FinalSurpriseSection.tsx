import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const FinalSurpriseSection: React.FC = () => {
  const [typedHeading, setTypedHeading] = useState('');
  const fullHeading = 'Happy Birthday, Muskan! 🎂✨';
  const [typingComplete, setTypingComplete] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullHeading.length) {
        setTypedHeading(fullHeading.slice(0, index));
        index++;
      } else {
        setTypingComplete(true);
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, []);

  const handleVirtualHug = () => {
    audioManager.playSparkleSound();
    setHugCount((c) => c + 1);

    // Multi-colored celebratory confetti explosion
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#fed7aa', '#ddd6fe', '#fef08a'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#fda4af', '#f472b6', '#e879f9'],
      });
    }, 250);
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Magical gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(253, 230, 240, 0.8) 0%, rgba(250, 215, 235, 0.6) 40%, rgba(243, 232, 255, 0.7) 75%, rgba(255, 245, 247, 0.9) 100%)',
        }}
      />

      {/* Floating Sparkles and Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles className="absolute top-12 left-16 w-8 h-8 text-pink-300/60 animate-bounce [animation-delay:0.5s]" />
        <Heart className="absolute top-20 right-20 w-7 h-7 text-rose-300/50 animate-float-slow" />
        <Sparkles className="absolute bottom-24 left-24 w-6 h-6 text-amber-300/60 animate-bounce [animation-delay:1.2s]" />
        <Heart className="absolute bottom-16 right-28 w-9 h-9 text-pink-400/40 animate-float-slow [animation-delay:2s]" />
      </div>

      <div className="relative max-w-2xl w-full text-center px-6 py-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_-10px_rgba(244,114,182,0.3)]">
        {/* Intro Tagline */}
        <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 mb-4 tracking-wide animate-pulse">
          And finally... 💗
        </p>

        {/* Typed Main Heading */}
        <div className="min-h-[70px] sm:min-h-[85px] flex items-center justify-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-script text-pink-700 tracking-wide drop-shadow-sm font-bold">
            {typedHeading}
            {!typingComplete && (
              <span className="inline-block w-1.5 h-8 bg-pink-500 ml-1 animate-pulse align-middle" />
            )}
          </h2>
        </div>

        {/* Subtitle Message */}
        <p
          className={`text-base sm:text-xl font-body text-slate-700 font-normal leading-relaxed mt-4 max-w-lg mx-auto transition-opacity duration-1000 ${
            typingComplete ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Keep smiling, keep shining, and always stay the beautiful person you are. 🌸
        </p>

        {/* Celebratory Interactive Virtual Hug Button */}
        <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col items-center">
          <button
            onClick={handleVirtualHug}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-body font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/35 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-glow"
          >
            <Send className="w-4 h-4 text-yellow-200 group-hover:rotate-45 transition-transform" />
            <span>Send Virtual Hugs & Smiles 🫂💗</span>
          </button>

          {hugCount > 0 && (
            <p className="text-xs text-pink-600 font-medium font-body mt-3 animate-fadeIn">
              Sent with love {hugCount} time{hugCount > 1 ? 's' : ''}! ✨
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
