import React from 'react';
import { Heart, Instagram, Sparkles } from 'lucide-react';

export const FooterCredit: React.FC = () => {
  return (
    <footer className="relative w-full py-12 px-4 border-t border-pink-200/60 bg-white/50 backdrop-blur-md text-center">
      <div className="max-w-md mx-auto space-y-3">
        {/* Creator Name */}
        <p className="text-base sm:text-lg font-serif-display font-medium text-slate-800 flex items-center justify-center gap-2">
          This little surprise was made by <span className="font-handwriting text-2xl text-pink-600 font-bold">Mano</span>
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
        </p>

        {/* Clickable Instagram Link */}
        <div className="inline-flex items-center gap-2">
          <span className="text-sm text-slate-600 font-body">Instagram:</span>
          <a
            href="https://www.instagram.com/manobilly092026/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-pink-700 bg-pink-100/80 border border-pink-200 hover:bg-pink-200 hover:border-pink-300 transition-all duration-300 shadow-sm"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600 group-hover:scale-110 transition-transform" />
            <span>@manobilly092026</span>
          </a>
        </div>

        {/* Delicate closing note */}
        <p className="text-[11px] text-pink-400/80 font-body flex items-center justify-center gap-1 mt-2">
          <Sparkles className="w-3 h-3 text-pink-400" />
          <span>Made especially for Muskan with happiness & smiles</span>
          <Sparkles className="w-3 h-3 text-pink-400" />
        </p>
      </div>
    </footer>
  );
};
