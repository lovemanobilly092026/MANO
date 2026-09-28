import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { audioManager } from '../utils/audio';

const compliments = [
  {
    title: 'Your Contagious Smile ✨',
    desc: 'Just like your name, your smile has a warmth that effortlessly lights up any room.',
  },
  {
    title: 'Your Kind & Pure Heart 🌸',
    desc: 'You care with such gentleness and authenticity, making people feel safe and valued.',
  },
  {
    title: 'Your Playful Sparkle 🎀',
    desc: 'The fun, bright energy and little expressions you have make every moment memorable.',
  },
  {
    title: 'Your Resilient Spirit 💫',
    desc: 'You handle challenges with graceful strength, dignity, and a heart full of hope.',
  },
  {
    title: 'You Make Days Better 🌷',
    desc: 'Even ordinary conversations feel comforting and cheerful simply because it is you.',
  },
  {
    title: 'Unapologetically Muskan 💖',
    desc: 'There is truly nobody else like you in this entire world. Never forget your uniqueness!',
  },
];

export const SurpriseGiftSection: React.FC = () => {
  const [boxState, setBoxState] = useState<'closed' | 'shaking' | 'opened'>('closed');
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleOpenGift = () => {
    if (boxState !== 'closed') return;

    // Start shaking animation
    setBoxState('shaking');
    audioManager.playSparkleSound();

    // After slight shake anticipation (600ms), pop lid open with confetti & chime
    setTimeout(() => {
      setBoxState('opened');
      audioManager.playGiftBoxSound();

      // Confetti burst
      confetti({
        particleCount: 85,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#fef08a', '#c084fc'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.65 },
          colors: ['#fda4af', '#f472b6', '#fff'],
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.65 },
          colors: ['#fda4af', '#f472b6', '#fff'],
        });
      }, 250);
    }, 650);
  };

  const handleResetGift = () => {
    setBoxState('closed');
    setActiveCardIndex(0);
    audioManager.playSparkleSound();
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-12 text-center">
      {/* Section Sub-banner */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-pink-500 font-semibold font-body">
          Interactive Surprise
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-800 mt-1">
          A Gift Box For You <span className="text-pink-500">🎁</span>
        </h2>
        <p className="text-sm text-slate-600 font-body mt-2">
          Click below to reveal what is tucked away inside...
        </p>
      </div>

      {boxState === 'closed' && (
        <div className="flex flex-col items-center">
          {/* Animated 3D-style Gift Box Graphic */}
          <div className="relative mb-6 cursor-pointer group" onClick={handleOpenGift}>
            <div className="w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {/* Soft glow */}
              <div className="absolute inset-0 bg-pink-400/20 rounded-3xl blur-xl group-hover:bg-pink-400/35 transition-all" />

              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xl">
                <defs>
                  <linearGradient id="boxBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#be123c" />
                  </linearGradient>
                  <linearGradient id="boxLid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                  <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>

                {/* Box Body */}
                <rect x="30" y="60" width="100" height="85" rx="8" fill="url(#boxBody)" />
                {/* Vertical Ribbon */}
                <rect x="70" y="60" width="20" height="85" fill="url(#goldRibbon)" />

                {/* Box Lid */}
                <rect x="22" y="44" width="116" height="22" rx="5" fill="url(#boxLid)" />
                <rect x="70" y="44" width="20" height="22" fill="url(#goldRibbon)" />

                {/* Ribbon Bow on top */}
                <path
                  d="M 80,44 C 60,20 40,30 70,44 C 40,30 60,20 80,44 Z"
                  fill="url(#goldRibbon)"
                />
                <path
                  d="M 80,44 C 100,20 120,30 90,44 C 120,30 100,20 80,44 Z"
                  fill="url(#goldRibbon)"
                />
                <circle cx="80" cy="44" r="6" fill="#f59e0b" />
              </svg>
            </div>
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleOpenGift}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-body font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/35 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-glow"
          >
            <Gift className="w-5 h-5 text-yellow-200" />
            <span className="text-base">One More Surprise 🎁</span>
          </button>
        </div>
      )}

      {boxState === 'shaking' && (
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center animate-wiggle">
            <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xl animate-bounce">
              <rect x="30" y="60" width="100" height="85" rx="8" fill="#e11d48" />
              <rect x="70" y="60" width="20" height="85" fill="#f59e0b" />
              <rect x="22" y="44" width="116" height="22" rx="5" fill="#fb7185" />
              <rect x="70" y="44" width="20" height="22" fill="#f59e0b" />
              <circle cx="80" cy="44" r="6" fill="#d97706" />
            </svg>
          </div>
          <p className="text-pink-600 font-handwriting text-2xl font-bold mt-4 animate-pulse">
            Unwrapping Muskan&apos;s surprise... ✨
          </p>
        </div>
      )}

      {boxState === 'opened' && (
        <div className="relative rounded-3xl p-8 sm:p-10 bg-white/80 backdrop-blur-xl border border-pink-200/90 shadow-2xl animate-fadeIn">
          {/* Top Banner Message */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-bounce" />
            <Sparkles className="w-6 h-6 text-amber-400" />
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-bounce [animation-delay:0.2s]" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-script text-pink-600 font-bold mb-3 tracking-wide">
            You are truly special, Muskan! 💕
          </h3>

          <p className="text-slate-600 font-body text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            The world is simply a happier, brighter, and sweeter place with you in it. Here are a few little reminders:
          </p>

          {/* Compliments Carousel Card */}
          <div className="relative max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-tr from-pink-50 to-rose-50/70 border border-pink-100 shadow-sm min-h-[140px] flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-500 flex items-center gap-1 font-body">
                <Star className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                Reason #{activeCardIndex + 1}
              </span>
              <span className="text-xs text-slate-400 font-body">
                {activeCardIndex + 1} of {compliments.length}
              </span>
            </div>

            <h4 className="text-lg font-serif-display font-semibold text-slate-800 mb-1">
              {compliments[activeCardIndex].title}
            </h4>
            <p className="text-sm font-body text-slate-600 leading-relaxed">
              {compliments[activeCardIndex].desc}
            </p>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-pink-200/50">
              <button
                onClick={() => {
                  audioManager.playPopSound();
                  setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : compliments.length - 1));
                }}
                className="p-1.5 rounded-full hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer"
                aria-label="Previous reason"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1">
                {compliments.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      audioManager.playPopSound();
                      setActiveCardIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === activeCardIndex ? 'w-5 bg-pink-500' : 'w-1.5 bg-pink-200'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.playPopSound();
                  setActiveCardIndex((prev) => (prev < compliments.length - 1 ? prev + 1 : 0));
                }}
                className="p-1.5 rounded-full hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer"
                aria-label="Next reason"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reset / Close box button */}
          <div className="mt-8">
            <button
              onClick={handleResetGift}
              className="text-xs font-medium text-pink-500 hover:text-pink-700 underline underline-offset-4 cursor-pointer transition-colors"
            >
              Close gift box & explore more ✨
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
