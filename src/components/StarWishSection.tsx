import React, { useState } from 'react';
import { Sparkles, Star, RefreshCw, Wand2, Heart } from 'lucide-react';
import { audioManager } from '../utils/audio';

const fallbackWishes: Record<string, string[]> = {
  poetic: [
    'Like the softest morning light kissing rose petals, may your year be painted in gentleness, laughter, and timeless beauty. Happy Birthday, Muskan 🌸',
    'May the stars whisper lullabies of joy into your heart, and may the universe conspire to bring you peace in every step you take. Keep blooming, Muskan ✨',
  ],
  sweet: [
    'Muskan, your laughter is like pure melody and your kindness is a sweet gift to everyone who knows you. Wishing you cakes, giggles, and boundless happiness! 🎂💗',
    'May your birthday be as sweet as strawberry frosting, surrounded by warm smiles and everything that makes your heart flutter with joy! 🍰🎀',
  ],
  heartfelt: [
    'Muskan, you carry a rare purity and warmth that touches lives in silent, profound ways. May this birthday reward your kindness with endless blessings and genuine love. 💖',
    'Never doubt how special you are. In a world full of noise, your gentle soul is a quiet grace. Wishing you the most beautiful birthday, dear Muskan. 🌷',
  ],
  inspiring: [
    'May this year unfold new horizons, grand adventures, and moments where you realize just how truly limitless your potential is. Shine on, Muskan! 🌟',
    'Walk boldly into this new year of your life knowing you are cherished, capable, and destined for wonderful things. Happy Birthday, Muskan! ✨',
  ],
};

export const StarWishSection: React.FC = () => {
  const [selectedVibe, setSelectedVibe] = useState<'poetic' | 'sweet' | 'heartfelt' | 'inspiring'>('poetic');
  const [currentWish, setCurrentWish] = useState<string>(fallbackWishes.poetic[0]);
  const [loading, setLoading] = useState(false);

  const fetchWish = async (vibe: 'poetic' | 'sweet' | 'heartfelt' | 'inspiring') => {
    setSelectedVibe(vibe);
    setLoading(true);
    audioManager.playSparkleSound();

    try {
      const res = await fetch('/api/gemini/wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vibe, name: 'Muskan' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.wish) {
          setCurrentWish(data.wish);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Graceful fallback
    }

    // Fallback selection from curated list
    const options = fallbackWishes[vibe];
    const next = options[Math.floor(Math.random() * options.length)];
    setCurrentWish(next);
    setLoading(false);
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-16">
      <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white/80 via-pink-50/70 to-purple-50/70 backdrop-blur-xl border border-white/90 shadow-[0_15px_45px_rgba(244,114,182,0.18)] text-center">
        {/* Subhead */}
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-purple-700 text-xs font-semibold font-body mb-3">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Star Whisperer</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-800 tracking-tight">
          A Celestial Wish for Muskan <span className="text-amber-400">✨</span>
        </h2>
        <p className="text-sm text-slate-600 font-body mt-2 max-w-md mx-auto">
          Choose a vibe below to reveal a personalized wish from the stars.
        </p>

        {/* Vibe Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => fetchWish('poetic')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer font-body ${
              selectedVibe === 'poetic'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-300'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-pink-600 border border-pink-100'
            }`}
          >
            🌙 Poetic & Dreamy
          </button>
          <button
            onClick={() => fetchWish('sweet')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer font-body ${
              selectedVibe === 'sweet'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-300'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-pink-600 border border-pink-100'
            }`}
          >
            🍰 Sweet & Joyful
          </button>
          <button
            onClick={() => fetchWish('heartfelt')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer font-body ${
              selectedVibe === 'heartfelt'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-300'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-pink-600 border border-pink-100'
            }`}
          >
            💖 Deep & Heartfelt
          </button>
          <button
            onClick={() => fetchWish('inspiring')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer font-body ${
              selectedVibe === 'inspiring'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-300'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-pink-600 border border-pink-100'
            }`}
          >
            🌟 Inspiring & Bright
          </button>
        </div>

        {/* Display Card */}
        <div className="relative mt-8 p-6 sm:p-8 rounded-2xl bg-white/90 border border-pink-100/90 shadow-sm min-h-[140px] flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <RefreshCw className="w-6 h-6 text-pink-500 animate-spin" />
              <p className="text-xs text-pink-400 font-body">Asking the stars to craft a wish for Muskan...</p>
            </div>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-300" />
                <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                <Star className="w-4 h-4 fill-amber-300" />
              </div>
              <p className="text-base sm:text-lg font-serif italic text-slate-700 leading-relaxed max-w-xl mx-auto px-4">
                &ldquo;{currentWish}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Refresh button */}
        <div className="mt-4">
          <button
            onClick={() => fetchWish(selectedVibe)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-600 hover:text-pink-800 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate another wish ✨</span>
          </button>
        </div>
      </div>
    </section>
  );
};
