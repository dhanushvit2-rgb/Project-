import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to generate luxury advertisement content
  app.post("/api/advertisement/generate", async (req, res) => {
    try {
      const { 
        burgerName, 
        bun, 
        patty, 
        cheese, 
        sauce, 
        toppings, 
        tone, 
        lighting, 
        aperture,
        refinementInstruction,
        previousCopy
      } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured. Please configure it in Settings > Secrets.",
        });
      }

      const toppingsList = Array.isArray(toppings) && toppings.length > 0 
        ? toppings.join(", ") 
        : "no additional toppings";

      let prompt = "";
      if (refinementInstruction && previousCopy) {
        prompt = `
          You are an elite Michelin-star culinary copywriter and creative director.
          The user has previously generated this luxury advertising suite for their custom gourmet burger "${burgerName || "The Majestic Royal Angus"}":
          
          Previous Slogan: "${previousCopy.slogan}"
          Previous Description: "${previousCopy.description}"
          Previous Social Caption: "${previousCopy.socialPost}"
          Previous Commercial Music: "${previousCopy.commercialScript?.music}"
          Previous Commercial Scenes: ${JSON.stringify(previousCopy.commercialScript?.scenes)}
          Previous Commercial Voiceover: ${JSON.stringify(previousCopy.commercialScript?.voiceover)}

          Please modify and refine this copywriting suite based on the following direct instruction:
          "${refinementInstruction}"

          Requirements:
          1. Retain the same elevated, luxury, highly evocative sensory Michelin-star vocabulary.
          2. Edit the relevant sections carefully. If they asked to change a specific element (e.g. "focus on the bacon" or "make it sound French" or "translate to Italian"), apply that change gracefully throughout the tagline, menu description, social post, and cinematic script.
          3. Maintain the exact same JSON format structure with "slogan", "description", "socialPost", and "commercialScript".
        `;
      } else {
        prompt = `
          You are an elite Michelin-star culinary copywriter and the executive director of cinematic luxury food advertisements.
          Your task is to craft copy and visual storyboard scenes for a masterpiece food commercial for this custom-designed gourmet burger:
          
          Burger Name: "${burgerName || "The Majestic Royal Angus"}"
          Bun: ${bun}
          Patty: ${patty}
          Cheese: ${cheese}
          Sauce: ${sauce}
          Toppings: ${toppingsList}
          Tone of Slogan: ${tone || "Ultra-Luxury"}
          Visual Styling & lighting environment: ${lighting}
          Camera Settings (bokeh level): ${aperture}

          Generate a JSON response that contains:
          1. "slogan": A single, breathtakingly elegant advertising headline or tagline (under 12 words) reflecting the specified tone. Avoid common cliches or hype; focus on premium, evocative sensory vocabulary.
          2. "description": A Michelin-star menu description (3-4 sentences). Capture the textures, flavors, premium ingredients, and artisanal cooking methods with rich, poetic culinary prose.
          3. "socialPost": A highly styled social media caption for Instagram, formatted with clean line breaks, elegant spacing, a poetic tone, and highly curated food aesthetics hashtags (e.g., #GastronomyCraft, #MichelinStar).
          4. "commercialScript": A mini-storyboard sequence for a 15-second high-end commercial:
             - "music": Cinematic sound design/music cue (e.g., "A low, velvet cello chord accompanied by a crackling flame sound.")
             - "scenes": An array of exactly 3 distinct cinematic macro visual scenes describing the extreme close-up details of the food.
             - "voiceover": An array of exactly 3 narration lines spoken by a warm, authoritative narrator matching the scenes.

          Provide strictly valid JSON conforming to the requested schema.
        `;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              slogan: { type: Type.STRING },
              description: { type: Type.STRING },
              socialPost: { type: Type.STRING },
              commercialScript: {
                type: Type.OBJECT,
                properties: {
                  music: { type: Type.STRING },
                  scenes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  voiceover: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ["music", "scenes", "voiceover"],
              },
            },
            required: ["slogan", "description", "socialPost", "commercialScript"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response text returned from Gemini API.");
      }

      const adData = JSON.parse(responseText.trim());
      res.json(adData);
    } catch (error: any) {
      console.error("Gemini Ad Generation Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate marketing materials." });
    }
  });

  // Vite middleware for development vs static asset serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
