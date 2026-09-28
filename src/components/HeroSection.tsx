import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { CakeSection } from './CakeSection';

interface HeroSectionProps {
  onWishMade?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWishMade }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
      {/* Decorative Floating Sparkles & Hearts around heading */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 pointer-events-none overflow-hidden">
        <Heart className="absolute top-4 left-6 sm:left-12 w-6 h-6 text-pink-400 fill-pink-300 animate-float-slow" />
        <Heart className="absolute top-10 right-8 sm:right-16 w-7 h-7 text-rose-400 fill-rose-300 animate-float-slow [animation-delay:1.2s]" />
        <Sparkles className="absolute bottom-6 left-16 sm:left-24 w-5 h-5 text-amber-300 animate-bounce [animation-delay:0.7s]" />
        <Sparkles className="absolute bottom-4 right-16 sm:right-24 w-6 h-6 text-yellow-300 animate-bounce [animation-delay:1.5s]" />
      </div>

      {/* Hero Header */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/80 shadow-sm text-xs font-semibold text-pink-700 tracking-wide font-body animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>A Special Digital Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </div>

        {/* Big Romantic Display Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium text-slate-800 tracking-tight leading-tight">
          Happy Birthday,{' '}
          <span className="font-script text-5xl sm:text-7xl md:text-8xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 bg-clip-text text-transparent inline-block drop-shadow-sm px-2 animate-pulse">
            MUSKAN!
          </span>{' '}
          <span className="inline-block animate-bounce [animation-duration:2s]">🎂💗</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-slate-600 font-body font-light max-w-xl mx-auto tracking-wide leading-relaxed">
          A little surprise, made especially for you <span className="text-amber-400">✨</span>
        </p>
      </div>

      {/* Interactive Birthday Cake */}
      <div className="relative z-10 w-full">
        <CakeSection onWishMade={onWishMade} />
      </div>
    </section>
  );
};
