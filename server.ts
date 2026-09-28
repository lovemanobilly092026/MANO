import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini client server-side if key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for personalized celestial birthday wish for Muskan
app.post('/api/gemini/wish', async (req, res) => {
  try {
    const { vibe = 'poetic', name = 'Muskan' } = req.body;

    if (!aiClient) {
      // Fallback wishes if no key configured
      const fallbacks: Record<string, string> = {
        poetic: `Like the softest morning light kissing rose petals, may your year be painted in gentleness, laughter, and timeless beauty. Happy Birthday, ${name} 🌸`,
        sweet: `${name}, your laughter is pure melody and your kindness is a sweet gift to everyone who knows you. Wishing you cakes, giggles, and boundless happiness! 🎂💗`,
        heartfelt: `${name}, you carry a rare purity and warmth that touches lives in silent, profound ways. May this birthday reward your kindness with endless blessings and genuine love. 💖`,
        inspiring: `May this year unfold new horizons, grand adventures, and moments where you realize just how truly limitless your potential is. Shine on, ${name}! 🌟`,
      };
      return res.json({ wish: fallbacks[vibe] || fallbacks.poetic });
    }

    const prompt = `Write a short, incredibly beautiful, sweet, and heartfelt single-sentence birthday wish and compliment for a girl named "${name}". 
Tone/Vibe: ${vibe} (e.g. poetic, sweet, heartfelt, or inspiring).
Include 1-2 cute relevant emojis. Keep it under 35 words. Return only the wish text.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const wishText = response.text?.trim() || `Happy Birthday ${name}! May your day be as sparkling and beautiful as you are. 💗✨`;
    return res.json({ wish: wishText });
  } catch (error) {
    console.error('Error in /api/gemini/wish:', error);
    // Graceful fallback on any error
    return res.json({
      wish: `May every star in the sky shine brightly on your special day. Happy Birthday, Muskan! 🌸💗`,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
