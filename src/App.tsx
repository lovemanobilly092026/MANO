/**
 * Muskan - A Magical Birthday Surprise
 * Created with love by Mano for Muskan
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FloatingParticles } from './components/FloatingParticles';
import { AudioController } from './components/AudioController';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpecialMessageSection } from './components/SpecialMessageSection';
import { SurpriseGiftSection } from './components/SurpriseGiftSection';
import { MemoryGallery } from './components/MemoryGallery';
import { StarWishSection } from './components/StarWishSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import { FooterCredit } from './components/FooterCredit';
import { audioManager } from './utils/audio';

export default function App() {
  const [surpriseOpened, setSurpriseOpened] = useState(false);

  const handleOpenSurprise = () => {
    setSurpriseOpened(true);
  };

  const handleScrollToCake = () => {
    audioManager.playSparkleSound();
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWishMade = () => {
    // Scroll gently down to the special message after candle blowing
    setTimeout(() => {
      const msgEl = document.getElementById('message');
      if (msgEl) {
        msgEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F5] to-[#FDF2F8] text-slate-800 font-body selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Opening Surprise Fullscreen Overlay */}
      {!surpriseOpened && <IntroScreen onOpenSurprise={handleOpenSurprise} />}

      {/* Persistent Floating Ambient Particles (Petals, Sparkles, Interactive Hearts) */}
      <FloatingParticles />

      {/* Floating Audio Controller */}
      <AudioController />

      {/* Main Content (visible once opened) */}
      <div
        className={`transition-opacity duration-1000 ${
          surpriseOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Navigation Bar */}
        <Navbar onWishClick={handleScrollToCake} />

        {/* 1. Main Hero Section with Birthday Cake */}
        <div id="hero">
          <HeroSection onWishMade={handleWishMade} />
        </div>

        {/* 2. Special Message Glassmorphism Section */}
        <div id="message">
          <SpecialMessageSection />
        </div>

        {/* 3. Interactive Surprise Gift Box Section */}
        <div id="gift">
          <SurpriseGiftSection />
        </div>

        {/* 4. Photo / Memory Gallery Area */}
        <div id="memories">
          <MemoryGallery />
        </div>

        {/* 5. Celestial Star Wishes (Powered by Gemini) */}
        <div id="stars">
          <StarWishSection />
        </div>

        {/* 6. Final Surprise Section */}
        <div id="final">
          <FinalSurpriseSection />
        </div>

        {/* 7. Creator Credit & Instagram Link */}
        <FooterCredit />
      </div>
    </div>
  );
}
