import React, { useEffect, useRef, useState } from 'react';
import { audioManager } from '../utils/audio';

interface FloatingHeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  wobbleSpeed: number;
  wobbleAmount: number;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [interactiveHearts, setInteractiveHearts] = useState<FloatingHeartItem[]>([]);
  const nextId = useRef(1);

  // Canvas Petal and Star Sparkles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Rose petals
    const petalColors = [
      'rgba(255, 182, 193, 0.45)', // light pink
      'rgba(255, 192, 203, 0.4)',  // pink
      'rgba(255, 105, 180, 0.25)', // hot pink translucent
      'rgba(253, 226, 228, 0.5)',  // soft blush
      'rgba(230, 204, 255, 0.35)', // lavender
    ];

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      color: string;
      curve: number;
    }

    interface Sparkle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      alphaChange: number;
      maxAlpha: number;
    }

    const petals: Petal[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 6,
      speedY: Math.random() * 0.9 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      curve: Math.random() * 2 + 1,
    }));

    const sparkles: Sparkle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random(),
      alphaChange: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
      maxAlpha: Math.random() * 0.6 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Sparkles
      sparkles.forEach((s) => {
        s.alpha += s.alphaChange;
        if (s.alpha > s.maxAlpha) {
          s.alpha = s.maxAlpha;
          s.alphaChange = -Math.abs(s.alphaChange);
        } else if (s.alpha < 0.05) {
          s.alpha = 0.05;
          s.alphaChange = Math.abs(s.alphaChange);
          s.x = Math.random() * width;
          s.y = Math.random() * height;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 240, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
        ctx.fill();
        ctx.restore();
      });

      // Draw Falling Flower Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.beginPath();
        // Delicate curved petal path
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.4, p.size * 0.8, p.size * 0.6, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.6, -p.size * 0.8, -p.size * 0.4, 0, -p.size);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Spawn gentle interactive floating hearts every few seconds
  useEffect(() => {
    const heartColors = ['#f472b6', '#fb7185', '#ec4899', '#f43f5e', '#e879f9'];

    const interval = setInterval(() => {
      setInteractiveHearts((prev) => {
        if (prev.length >= 8) return prev; // keep lightweight
        const newHeart: FloatingHeartItem = {
          id: nextId.current++,
          x: Math.random() * (window.innerWidth - 80) + 40,
          y: window.innerHeight + 40,
          size: Math.floor(Math.random() * 16) + 24, // 24px - 40px
          speed: Math.random() * 0.8 + 0.6,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleAmount: Math.random() * 20 + 10,
        };
        return [...prev, newHeart];
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Animate interactive hearts upward
  useEffect(() => {
    let animId: number;

    const moveHearts = () => {
      setInteractiveHearts((prev) =>
        prev
          .map((h) => ({
            ...h,
            y: h.y - h.speed,
            x: h.x + Math.sin(h.y * h.wobbleSpeed) * 0.7,
          }))
          .filter((h) => h.y > -60)
      );
      animId = requestAnimationFrame(moveHearts);
    };

    animId = requestAnimationFrame(moveHearts);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Handle clicking a floating heart: pop with sound and micro confetti
  const popHeart = (id: number, x: number, y: number) => {
    audioManager.playPopSound();

    // Trigger local micro burst
    import('canvas-confetti').then((confettiModule) => {
      const confetti = confettiModule.default;
      confetti({
        particleCount: 15,
        startVelocity: 14,
        spread: 360,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fdf2f8'],
        shapes: ['circle'],
        scalar: 0.7,
        disableForReducedMotion: true,
      });
    });

    setInteractiveHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Background canvas for petals and sparkles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Interactive Floating Hearts (pointer-events enabled on elements) */}
      {interactiveHearts.map((heart) => (
        <button
          key={heart.id}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            popHeart(heart.id, heart.x, heart.y);
          }}
          className="pointer-events-auto absolute cursor-pointer transition-transform hover:scale-125 active:scale-95 select-none focus:outline-none"
          style={{
            transform: `translate3d(${heart.x}px, ${heart.y}px, 0)`,
            filter: 'drop-shadow(0 2px 8px rgba(244, 114, 182, 0.45))',
          }}
          aria-label="Pop floating heart surprise"
          title="Click me for a pop! 💖"
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            stroke="white"
            strokeWidth="1.5"
            className="transition-transform duration-300 hover:rotate-12"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      ))}
    </div>
  );
};
