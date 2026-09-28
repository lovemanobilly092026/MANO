import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface NavbarProps {
  onWishClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onWishClick }) => {
  const scrollTo = (id: string) => {
    audioManager.playPopSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-pink-100/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand mark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          className="font-script text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent tracking-wide whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Muskan 💗
        </a>

        {/* Zone 2: 4 clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 font-body">
          <button
            onClick={() => scrollTo('hero')}
            className="hover:text-pink-600 transition-colors cursor-pointer"
          >
            Birthday Cake
          </button>
          <button
            onClick={() => scrollTo('message')}
            className="hover:text-pink-600 transition-colors cursor-pointer"
          >
            Special Message
          </button>
          <button
            onClick={() => scrollTo('gift')}
            className="hover:text-pink-600 transition-colors cursor-pointer"
          >
            Gift Box
          </button>
          <button
            onClick={() => scrollTo('memories')}
            className="hover:text-pink-600 transition-colors cursor-pointer"
          >
            Memories
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onWishClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full hover:from-pink-600 hover:to-rose-600 shadow-sm hover:shadow-pink-300 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Make a Wish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
