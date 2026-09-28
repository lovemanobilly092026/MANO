import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface AudioControllerProps {
  autoStartOnOpen?: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(audioManager.getIsPlaying());
  }, []);

  const handleToggle = () => {
    const active = audioManager.toggleMusic();
    setIsPlaying(active);
    if (active) {
      audioManager.playSparkleSound();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioManager.setVolume(val);
  };

  return (
    <div
      className="fixed top-4 right-4 z-40 flex items-center gap-2"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {/* Optional volume slider when hovering or active */}
      {showVolumeSlider && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 shadow-md transition-all animate-fadeIn">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1.5 accent-pink-500 bg-pink-100 rounded-lg cursor-pointer"
            aria-label="Volume slider"
          />
        </div>
      )}

      {/* Primary Floating Music Toggle Button */}
      <button
        onClick={handleToggle}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 shadow-md backdrop-blur-md ${
          isPlaying
            ? 'bg-white/90 border-pink-300 text-pink-700 shadow-pink-200/60 ring-2 ring-pink-300/40'
            : 'bg-white/70 border-rose-200/70 text-slate-600 hover:text-pink-600 hover:bg-white'
        }`}
        title={isPlaying ? 'Pause peaceful background music' : 'Play peaceful background music'}
        aria-label="Toggle background music"
      >
        {/* Animated equalizer bars when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-3.5" aria-hidden="true">
            <span className="w-1 bg-pink-500 rounded-full animate-bounce [animation-delay:0.1s] h-3" />
            <span className="w-1 bg-rose-400 rounded-full animate-bounce [animation-delay:0.3s] h-4" />
            <span className="w-1 bg-pink-600 rounded-full animate-bounce [animation-delay:0.2s] h-2" />
          </div>
        ) : (
          <Music className="w-4 h-4 text-slate-400 group-hover:text-pink-500 transition-colors" />
        )}

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? 'Music: Playing' : 'Music: Off'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-pink-400" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>
    </div>
  );
};
