import React, { useState } from 'react';
import { Heart, Sparkles, X, ZoomIn } from 'lucide-react';
import { audioManager } from '../utils/audio';

// Import generated image assets
import smileImg from '../assets/images/muskan_memory_smile_1790608591698.jpg';
import gardenImg from '../assets/images/muskan_memory_garden_1790608606524.jpg';
import sparklerImg from '../assets/images/muskan_memory_sparkler_1790608623401.jpg';
import celebrationImg from '../assets/images/muskan_memory_celebration_1790608635462.jpg';

interface MemoryCardData {
  id: string;
  image: string;
  caption: string;
  subtitle: string;
  aspect: string;
  initialLikes: number;
}

const memoryCards: MemoryCardData[] = [
  {
    id: 'smile',
    image: smileImg,
    caption: 'Beautiful Smile ✨',
    subtitle: 'A smile so radiant it brings sunshine to every room.',
    aspect: 'aspect-4/3',
    initialLikes: 142,
  },
  {
    id: 'memories',
    image: gardenImg,
    caption: 'Beautiful Memories 🌸',
    subtitle: 'Moments filled with sweet conversations and gentle peace.',
    aspect: 'aspect-4/3',
    initialLikes: 128,
  },
  {
    id: 'special',
    image: sparklerImg,
    caption: 'A Special Person 💗',
    subtitle: 'Shining brilliantly like a warm sparkler under twilight skies.',
    aspect: 'aspect-4/3',
    initialLikes: 165,
  },
  {
    id: 'celebrate',
    image: celebrationImg,
    caption: 'Celebration of Joy 🎂',
    subtitle: 'Wishing you sweetness, cake, and endless laughter today and always.',
    aspect: 'aspect-4/3',
    initialLikes: 198,
  },
];

export const MemoryGallery: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>({
    smile: 142,
    memories: 128,
    special: 165,
    celebrate: 198,
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryCardData | null>(null);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    audioManager.playPopSound();

    setUserLiked((prev) => {
      const isAlready = !!prev[id];
      const nextState = !isAlready;

      setLikes((likePrev) => ({
        ...likePrev,
        [id]: likePrev[id] + (nextState ? 1 : -1),
      }));

      return {
        ...prev,
        [id]: nextState,
      };
    });
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-pink-500 font-semibold font-body">
          Moments & Magic
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-slate-800 mt-1">
          Cherished Moments <span className="font-script text-pink-500 text-4xl">🌸</span>
        </h2>
        <p className="text-sm text-slate-600 font-body mt-2 max-w-md mx-auto">
          Every snapshot tells a story of grace, joy, and the special light you bring into this world.
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memoryCards.map((card) => {
          const isLiked = !!userLiked[card.id];
          const count = likes[card.id] || card.initialLikes;

          return (
            <div
              key={card.id}
              onClick={() => {
                audioManager.playSparkleSound();
                setSelectedPhoto(card);
              }}
              className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_10px_30px_rgba(244,114,182,0.12)] hover:shadow-[0_20px_40px_rgba(244,114,182,0.25)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-pink-100">
                <img
                  src={card.image}
                  alt={card.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  onError={(e) => {
                    // Styled graceful fallback container
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback pattern if image is hidden */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/50 to-rose-100/50 -z-10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-pink-300" />
                </div>

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover zoom affordance */}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-lg font-semibold text-slate-800 tracking-tight">
                    {card.caption}
                  </h3>
                  <p className="text-xs text-slate-500 font-body mt-1 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-pink-100/80 flex items-center justify-between">
                  <span className="text-[11px] text-pink-600/80 font-medium font-body">
                    For Muskan
                  </span>

                  {/* Interactive Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(e, card.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                      isLiked
                        ? 'bg-rose-100 text-rose-600'
                        : 'bg-pink-50 text-slate-500 hover:text-pink-600 hover:bg-pink-100'
                    }`}
                    aria-label={`Like ${card.caption}`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform ${
                        isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400'
                      }`}
                    />
                    <span className="tabular-nums font-mono text-[11px]">{count}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/60 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="relative aspect-4/3 w-full bg-slate-900">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 bg-[#FFF9F6]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif-display text-2xl font-bold text-slate-800">
                  {selectedPhoto.caption}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-pink-600 font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> Dedicated to Muskan
                </span>
              </div>
              <p className="text-slate-600 font-body text-sm leading-relaxed">
                {selectedPhoto.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
