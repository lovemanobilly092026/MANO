import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface IntroScreenProps {
  onOpenSurprise: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onOpenSurprise }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleOpen = () => {
    // Play audio sparkle sound
    audioManager.playSparkleSound();
    // Start background music
    audioManager.startMusic();

    // Trigger grand celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff8da1', '#f472b6', '#fbcfe8', '#fecdd3', '#c084fc', '#fef08a'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#ff8da1', '#f472b6', '#fbcfe8'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#ff8da1', '#f472b6', '#fbcfe8'],
      });
    }, 200);

    setIsExiting(true);
    setTimeout(() => {
      onOpenSurprise();
    }, 850);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-1000 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #FFF0F5 0%, #FCE7F3 45%, #F5D0FE 80%, #EDE9FE 100%)',
      }}
    >
      {/* Decorative dreamy glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-300/30 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-300/30 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Floating miniature hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-16 left-12 w-6 h-6 text-pink-300/40 animate-float-slow" />
        <Heart className="absolute bottom-24 left-20 w-8 h-8 text-rose-300/30 animate-float-slow [animation-delay:1s]" />
        <Heart className="absolute top-20 right-16 w-7 h-7 text-pink-400/30 animate-float-slow [animation-delay:2s]" />
        <Sparkles className="absolute bottom-20 right-24 w-6 h-6 text-amber-300/50 animate-bounce [animation-delay:1.5s]" />
      </div>

      <div className="relative max-w-lg w-full text-center p-8 sm:p-12 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(244,114,182,0.3)]">
        {/* Soft icon emblem */}
        <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 text-white shadow-lg shadow-pink-300/50 animate-bounce">
          <Heart className="w-8 h-8 fill-white" />
        </div>

        {/* Intro Greetings */}
        <h1 className="text-4xl sm:text-5xl font-script text-pink-700 mb-3 tracking-wide drop-shadow-sm">
          Hey Muskan <span className="inline-block animate-pulse">💗</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-700 font-body font-light leading-relaxed mb-8 max-w-sm mx-auto">
          Someone has prepared a little surprise for you...
        </p>

        {/* Action Button */}
        <button
          onClick={handleOpen}
          className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-body font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/35 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden animate-pulse-glow"
        >
          <span className="relative z-10 flex items-center gap-2 text-base">
            Open Your Surprise
            <Sparkles className="w-5 h-5 text-yellow-200 animate-spin [animation-duration:4s]" />
          </span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <p className="text-xs text-pink-400/80 mt-6 tracking-wide font-body">
          Tip: Turn up your sound for the best experience 🌸
        </p>
      </div>
    </div>
  );
};
