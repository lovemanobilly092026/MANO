import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, RotateCcw } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface CakeSectionProps {
  onWishMade?: () => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({ onWishMade }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishState, setWishState] = useState<'unblown' | 'wishing' | 'blessed'>('unblown');
  const [blowCount, setBlowCount] = useState(0);

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    // Extinguish candles
    setCandlesLit(false);
    setWishState('wishing');
    setBlowCount((c) => c + 1);

    // Audio effects: whisper/blow sound followed by harp sparkle
    audioManager.playBlowSound();
    setTimeout(() => {
      audioManager.playSparkleSound();
    }, 400);

    // Launch celebratory confetti shower
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#f472b6', '#fb7185', '#fed7aa', '#ddd6fe', '#fef08a'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#ec4899', '#fda4af'],
      });
    }, 300);

    // After 2.4 seconds, transition from "Make a wish, Muskan... 💫" to "May all your beautiful wishes come true. 💗"
    setTimeout(() => {
      setWishState('blessed');
      if (onWishMade) onWishMade();
    }, 2400);
  };

  const handleRelight = () => {
    audioManager.playSparkleSound();
    setCandlesLit(true);
    setWishState('unblown');
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Interactive Birthday Cake Container */}
      <div
        onClick={handleBlowCandles}
        className={`relative cursor-pointer transition-transform duration-500 select-none ${
          candlesLit ? 'hover:scale-105 active:scale-95' : 'hover:scale-102'
        }`}
        title={candlesLit ? 'Click cake or candles to make a wish!' : 'Candles blown out with love ✨'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleBlowCandles();
          }
        }}
        aria-label="Interactive birthday cake"
      >
        {/* Soft background aura behind cake */}
        <div
          className={`absolute -inset-4 rounded-full blur-2xl transition-opacity duration-700 pointer-events-none ${
            candlesLit ? 'bg-amber-200/40 opacity-100' : 'bg-pink-200/20 opacity-40'
          }`}
        />

        {/* SVG Detailed Birthday Cake */}
        <svg
          viewBox="0 0 340 300"
          className="w-72 sm:w-84 md:w-92 h-auto drop-shadow-[0_15px_30px_rgba(244,114,182,0.3)] animate-float-slow"
        >
          <defs>
            {/* Gradients for cake frosting & sponge */}
            <linearGradient id="cakePlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>

            <linearGradient id="bottomTier" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>

            <linearGradient id="topTier" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="50%" stopColor="#fce7f3" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>

            <linearGradient id="frostingCream" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fff1f2" />
            </linearGradient>

            <linearGradient id="candleBodyPink" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            <linearGradient id="candleBodyLavender" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#f3e8ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Flame Radial Gradient */}
            <radialGradient id="flameGrad" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>

            {/* Glowing aura filter */}
            <filter id="flameGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Elegant Plate / Stand */}
          <ellipse cx="170" cy="275" rx="145" ry="18" fill="url(#cakePlate)" stroke="#fecdd3" strokeWidth="2.5" />
          <ellipse cx="170" cy="272" rx="130" ry="12" fill="#fff5f7" />

          {/* Bottom Cake Tier */}
          <rect x="55" y="175" width="230" height="85" rx="16" fill="url(#bottomTier)" />
          {/* Bottom Tier Frosting Swirls & Drips */}
          <path
            d="M 55,190 
               Q 75,215 95,190 
               Q 115,225 135,190 
               Q 160,225 185,190 
               Q 210,225 235,190 
               Q 260,215 285,190 
               L 285,175 L 55,175 Z"
            fill="url(#frostingCream)"
            stroke="#fbcfe8"
            strokeWidth="1.5"
          />

          {/* Decorative Strawberries on Bottom Tier */}
          <circle cx="85" cy="180" r="7" fill="#f43f5e" />
          <circle cx="170" cy="178" r="8" fill="#f43f5e" />
          <circle cx="255" cy="180" r="7" fill="#f43f5e" />
          {/* Strawberry leaves */}
          <path d="M 85,173 Q 83,168 79,170 Q 84,171 85,173 Q 86,168 91,170 Q 86,171 85,173" fill="#4ade80" />
          <path d="M 170,170 Q 168,165 163,167 Q 169,168 170,170 Q 172,165 177,167 Q 171,168 170,170" fill="#4ade80" />
          <path d="M 255,173 Q 253,168 249,170 Q 254,171 255,173 Q 256,168 261,170 Q 256,171 255,173" fill="#4ade80" />

          {/* Top Cake Tier */}
          <rect x="95" y="115" width="150" height="65" rx="14" fill="url(#topTier)" />
          {/* Top Tier Frosting Drips */}
          <path
            d="M 95,126 
               Q 110,145 125,126 
               Q 145,152 165,126 
               Q 185,152 205,126 
               Q 225,145 245,126 
               L 245,115 L 95,115 Z"
            fill="url(#frostingCream)"
            stroke="#fbcfe8"
            strokeWidth="1.5"
          />

          {/* Sprinkles on top tier */}
          <line x1="120" y1="135" x2="128" y2="137" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
          <line x1="145" y1="140" x2="152" y2="135" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
          <line x1="180" y1="136" x2="188" y2="140" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="215" y1="135" x2="222" y2="139" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
          <circle cx="132" cy="155" r="2.5" fill="#f472b6" />
          <circle cx="168" cy="158" r="2.5" fill="#fbbf24" />
          <circle cx="202" cy="156" r="2.5" fill="#c084fc" />

          {/* 3 Candles */}
          {/* Left Candle */}
          <g>
            <rect x="125" y="65" width="10" height="52" rx="3" fill="url(#candleBodyPink)" />
            {/* Candle wick */}
            <line x1="130" y1="65" x2="130" y2="56" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
            {candlesLit ? (
              <g className="animate-flame" style={{ transformOrigin: '130px 56px' }}>
                <circle cx="130" cy="50" r="12" fill="#fde047" opacity="0.3" filter="url(#flameGlow)" />
                <path d="M 130,34 Q 137,46 130,56 Q 123,46 130,34 Z" fill="url(#flameGrad)" />
                <circle cx="130" cy="52" r="2.5" fill="#ffffff" />
              </g>
            ) : (
              /* Smoke wisps when extinguished */
              <g className="transition-all duration-700">
                <path
                  d="M 130,54 Q 126,45 132,38 Q 128,30 134,22"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="animate-pulse"
                />
              </g>
            )}
          </g>

          {/* Center Main Candle */}
          <g>
            <rect x="165" y="55" width="10" height="62" rx="3" fill="url(#candleBodyLavender)" />
            {/* Spiral ribbon pattern on center candle */}
            <path d="M 165,65 L 175,70 M 165,80 L 175,85 M 165,95 L 175,100" stroke="#ffffff" strokeWidth="1.8" />
            {/* Candle wick */}
            <line x1="170" y1="55" x2="170" y2="44" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
            {candlesLit ? (
              <g className="animate-flame" style={{ transformOrigin: '170px 44px' }}>
                <circle cx="170" cy="38" r="16" fill="#fde047" opacity="0.4" filter="url(#flameGlow)" />
                <path d="M 170,20 Q 179,34 170,44 Q 161,34 170,20 Z" fill="url(#flameGrad)" />
                <circle cx="170" cy="40" r="3" fill="#ffffff" />
              </g>
            ) : (
              <g className="transition-all duration-700">
                <path
                  d="M 170,42 Q 174,32 168,24 Q 172,16 166,8"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="animate-pulse"
                />
              </g>
            )}
          </g>

          {/* Right Candle */}
          <g>
            <rect x="205" y="65" width="10" height="52" rx="3" fill="url(#candleBodyPink)" />
            {/* Candle wick */}
            <line x1="210" y1="65" x2="210" y2="56" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
            {candlesLit ? (
              <g className="animate-flame" style={{ transformOrigin: '210px 56px' }}>
                <circle cx="210" cy="50" r="12" fill="#fde047" opacity="0.3" filter="url(#flameGlow)" />
                <path d="M 210,34 Q 217,46 210,56 Q 203,46 210,34 Z" fill="url(#flameGrad)" />
                <circle cx="210" cy="52" r="2.5" fill="#ffffff" />
              </g>
            ) : (
              <g className="transition-all duration-700">
                <path
                  d="M 210,54 Q 214,45 208,38 Q 212,30 206,22"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="animate-pulse"
                />
              </g>
            )}
          </g>
        </svg>

        {/* Floating click hint banner above cake when lit */}
        {candlesLit && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm border border-pink-200/80 px-3.5 py-1 rounded-full text-xs font-medium text-pink-600 shadow-sm pointer-events-none whitespace-nowrap animate-bounce">
            Tap cake to blow out candles ✨
          </div>
        )}
      </div>

      {/* Button & Message Container */}
      <div className="mt-6 text-center w-full max-w-md px-4">
        {candlesLit ? (
          <button
            onClick={handleBlowCandles}
            className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-glow"
          >
            <Flame className="w-5 h-5 text-amber-200 animate-bounce" />
            <span className="text-base tracking-wide">Make a Wish 🎂✨</span>
          </button>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            {wishState === 'wishing' && (
              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-pink-200 shadow-lg animate-pulse">
                <p className="text-2xl font-script text-pink-600 tracking-wide">
                  Make a wish, Muskan... 💫
                </p>
                <p className="text-xs text-slate-500 mt-1 font-body">
                  Close your eyes and whisper what your heart desires...
                </p>
              </div>
            )}

            {wishState === 'blessed' && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-white/90 via-pink-50/90 to-rose-50/90 backdrop-blur-md border border-pink-200/90 shadow-xl transition-all">
                <div className="flex items-center justify-center gap-2 mb-2 text-pink-500">
                  <Sparkles className="w-5 h-5 text-yellow-500 animate-spin [animation-duration:6s]" />
                  <Heart className="w-5 h-5 fill-pink-500" />
                  <Sparkles className="w-5 h-5 text-yellow-500 animate-spin [animation-duration:6s]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-script text-pink-700 font-semibold mb-2">
                  May all your beautiful wishes come true. 💗
                </h3>
                <p className="text-sm text-slate-600 font-body leading-relaxed">
                  Every star in the sky is cheering for your joy, happiness, and sweetest dreams this year!
                </p>

                <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-center gap-3">
                  <button
                    onClick={handleRelight}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-pink-700 bg-pink-100 hover:bg-pink-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Relight Candles 🕯️
                  </button>
                  <span className="text-xs text-slate-400 font-body">
                    Wishes made: {blowCount}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
