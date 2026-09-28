import React, { useState } from 'react';
import { Heart, Sparkles, Mail, MailOpen } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const SpecialMessageSection: React.FC = () => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const toggleLetter = () => {
    audioManager.playSparkleSound();
    setIsLetterOpen(!isLetterOpen);
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-12">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute -top-6 -left-6 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(244,114,182,0.18)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(244,114,182,0.25)]">
        {/* Floating Glowing Hearts around card */}
        <div className="absolute -top-3.5 left-10 p-2 rounded-full bg-pink-100/90 border border-pink-300/70 shadow-sm text-pink-500 animate-float-slow">
          <Heart className="w-5 h-5 fill-pink-500" />
        </div>
        <div className="absolute -bottom-3.5 right-12 p-2 rounded-full bg-rose-100/90 border border-rose-300/70 shadow-sm text-rose-500 animate-float-slow [animation-delay:1.5s]">
          <Heart className="w-5 h-5 fill-rose-500" />
        </div>
        <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 p-2 rounded-full bg-purple-100/90 border border-purple-300/70 shadow-sm text-purple-500 hidden sm:block animate-float-slow [animation-delay:2s]">
          <Sparkles className="w-4 h-4 text-purple-600" />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-pink-300" />
            <span className="text-xs uppercase tracking-widest text-pink-500 font-semibold font-body">
              A Personal Note
            </span>
            <span className="h-px w-8 bg-pink-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-800 tracking-tight">
            For You, Muskan <span className="font-script text-pink-600 text-4xl sm:text-5xl">🌸</span>
          </h2>
        </div>

        {/* Wholesome Message Body */}
        <div className="relative text-center max-w-2xl mx-auto my-6">
          <span className="text-5xl font-serif text-pink-300/60 leading-none select-none block mb-1">“</span>
          <p className="text-lg sm:text-xl font-body text-slate-700 font-normal leading-relaxed -mt-4 px-4 sm:px-6">
            Some people make ordinary moments feel special just by being around. This little website is just a small way of saying that you deserve happiness, beautiful memories, endless smiles and all the good things life has to offer.
          </p>
          <span className="text-5xl font-serif text-pink-300/60 leading-none select-none block mt-2">”</span>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-200" />
          <Heart className="w-4 h-4 text-pink-400 fill-pink-300/50" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-200" />
        </div>

        {/* Interactive Envelope Toggle */}
        <div className="text-center">
          <button
            onClick={toggleLetter}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-pink-700 bg-pink-50 border border-pink-200 hover:bg-pink-100 hover:border-pink-300 transition-all duration-300 shadow-sm cursor-pointer"
          >
            {isLetterOpen ? (
              <>
                <MailOpen className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                <span>Fold Letter ✉️</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                <span>Read Mano&apos;s Special Letter to Muskan 💌</span>
              </>
            )}
          </button>
        </div>

        {/* Expandable Unfolded Letter */}
        {isLetterOpen && (
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#FFF9F6] border border-amber-200/60 shadow-inner relative transition-all animate-fadeIn">
            {/* Letter corner seal */}
            <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-rose-200 text-rose-700 text-xs font-serif font-bold shadow-sm">
              M
            </div>

            <p className="text-xs uppercase tracking-wider text-amber-700/70 font-semibold mb-3">
              Dearest Muskan,
            </p>
            <div className="space-y-3 font-body text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                From the way you bring warmth into the room to the gentle laughter that brightens everyone around you, you truly have a magic that is rare and precious.
              </p>
              <p>
                On this birthday, I wanted to create something uniquely yours — a digital haven of smiles, wishes, and reminders of how truly appreciated you are. May this new chapter bring you peace, grand adventures, laughter that makes your stomach ache, and all the love in the universe.
              </p>
              <div className="pt-4 text-right">
                <p className="font-handwriting text-2xl text-pink-700 font-bold">
                  With warmest wishes always,
                </p>
                <p className="font-handwriting text-xl text-slate-700 mt-1">
                  Mano 💗
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
