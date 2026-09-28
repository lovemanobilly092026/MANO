/**
 * Web Audio API synthesizer for Muskan's Surprise Website
 * Provides a gentle, romantic music-box melody ("Happy Birthday" variation)
 * and sweet chime/sparkle sound effects with zero external audio file dependencies.
 */

class SurpriseAudioManager {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicInterval: number | null = null;
  private isMuted = false;
  private volume = 0.4;
  private noteIndex = 0;

  // Romantic music box notes for Happy Birthday melody (frequency in Hz and duration in beats)
  private readonly melody = [
    { note: 261.63, dur: 0.75 }, // C4
    { note: 261.63, dur: 0.25 }, // C4
    { note: 293.66, dur: 1.0 },  // D4
    { note: 261.63, dur: 1.0 },  // C4
    { note: 349.23, dur: 1.0 },  // F4
    { note: 329.63, dur: 2.0 },  // E4

    { note: 261.63, dur: 0.75 }, // C4
    { note: 261.63, dur: 0.25 }, // C4
    { note: 293.66, dur: 1.0 },  // D4
    { note: 261.63, dur: 1.0 },  // C4
    { note: 392.00, dur: 1.0 },  // G4
    { note: 349.23, dur: 2.0 },  // F4

    { note: 261.63, dur: 0.75 }, // C4
    { note: 261.63, dur: 0.25 }, // C4
    { note: 523.25, dur: 1.0 },  // C5
    { note: 440.00, dur: 1.0 },  // A4
    { note: 349.23, dur: 1.0 },  // F4
    { note: 329.63, dur: 1.0 },  // E4
    { note: 293.66, dur: 2.0 },  // D4

    { note: 466.16, dur: 0.75 }, // Bb4
    { note: 466.16, dur: 0.25 }, // Bb4
    { note: 440.00, dur: 1.0 },  // A4
    { note: 349.23, dur: 1.0 },  // F4
    { note: 392.00, dur: 1.0 },  // G4
    { note: 349.23, dur: 2.5 },  // F4
  ];

  // Romantic arpeggio chords to interleave for a music box / dreamy lullaby texture
  private readonly chords = [
    [523.25, 659.25, 783.99], // C Major
    [587.33, 698.46, 880.00], // D Minor
    [659.25, 783.99, 987.77], // E Minor
    [698.46, 880.00, 1046.50] // F Major
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a single bell/music box chime tone
  private playBellTone(freq: number, duration: number, gainMultiplier = 1.0) {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with soft triangle harmonic creates a pure music box sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const now = ctx.currentTime;
      const targetGain = this.volume * gainMultiplier * 0.15;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(targetGain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio autoplay restrictions gracefully handled
    }
  }

  public startMusic() {
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;
    this.noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic) return;

      const current = this.melody[this.noteIndex];
      // Play primary melody note
      this.playBellTone(current.note, current.dur * 0.9, 1.2);

      // Add delicate upper octave sparkle occasionally
      if (this.noteIndex % 3 === 0) {
        setTimeout(() => {
          if (this.isPlayingMusic) {
            this.playBellTone(current.note * 2, 0.4, 0.3);
          }
        }, 150);
      }

      this.noteIndex = (this.noteIndex + 1) % this.melody.length;
      const nextDelay = current.dur * 500; // Tempo in ms

      this.musicInterval = window.setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval !== null) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  // Sound Effect: Sparkle / Magical chime
  public playSparkleSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const notes = [587.33, 739.99, 880, 1108.73, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBellTone(freq, 0.5, 0.6);
      }, idx * 60);
    });
  }

  // Sound Effect: Blowing out candles (gentle soft wind / whisper)
  public playBlowSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    try {
      const bufferSize = ctx.sampleRate * 0.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Pink noise
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.6);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Ignored
    }
  }

  // Sound Effect: Heart pop / bubble pop
  public playPopSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignored
    }
  }

  // Sound Effect: Gift Box Unbox Chime
  public playGiftBoxSound() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const chords = [392, 523.25, 659.25, 783.99, 1046.5];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playBellTone(freq, 0.9, 0.8);
      }, idx * 75);
    });
  }
}

export const audioManager = new SurpriseAudioManager();
