import React, { useState } from "react";
import { AdvertisementCopy } from "../types";
import { Copy, Check, Instagram, Video, UtensilsCrossed, Send, Sparkles } from "lucide-react";

interface MarketingPanelProps {
  copy: AdvertisementCopy | null;
  onRefine: (instruction: string) => void;
  refining: boolean;
}

export default function MarketingPanel({ copy, onRefine, refining }: MarketingPanelProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"menu" | "commercial" | "social">("menu");
  const [refineText, setRefineText] = useState("");

  if (!copy) {
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
        <div className="p-4 bg-amber-500/5 rounded-full border border-amber-500/10">
          <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
        </div>
        <div className="max-w-md">
          <h3 className="text-sm font-semibold text-neutral-200 tracking-wide uppercase">AI Marketing Generator</h3>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Configure your artisan burger layers, adjust your studio lighting and depth of field, then click "Generate Luxury Campaign" to create a bespoke advertising copywriting suite.
          </p>
        </div>
      </div>
    );
  }

  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineText.trim() || refining) return;
    onRefine(refineText);
    setRefineText("");
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-6">
      
      {/* Tab Selectors */}
      <div className="flex bg-neutral-950 p-1.5 rounded-xl border border-neutral-800">
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all ${
            activeTab === "menu"
              ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Menu Card</span>
        </button>

        <button
          onClick={() => setActiveTab("commercial")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all ${
            activeTab === "commercial"
              ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Cinematic Script</span>
        </button>

        <button
          onClick={() => setActiveTab("social")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all ${
            activeTab === "social"
              ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Instagram className="w-4 h-4" />
          <span>Social Media</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1">
        {activeTab === "menu" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                Michelin-Star Slogan & Description
              </span>
              <button
                onClick={() => triggerCopy(`"${copy.slogan}"\n\n${copy.description}`, "menu")}
                className="text-neutral-400 hover:text-amber-500 transition-colors p-1"
                title="Copy Full Menu Copy"
              >
                {copiedKey === "menu" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Slogan */}
            <div className="bg-neutral-950 border border-neutral-800/80 p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-2 left-2 text-6xl font-serif text-neutral-800 select-none pointer-events-none">“</div>
              <p className="text-base font-serif italic text-neutral-100 leading-relaxed text-center font-light px-4 relative z-10">
                {copy.slogan}
              </p>
            </div>

            {/* Culinary Description */}
            <div className="bg-neutral-950/40 border border-neutral-800 p-5 rounded-2xl">
              <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light text-justify">
                {copy.description}
              </p>
            </div>
          </div>
        )}

        {activeTab === "commercial" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                15-Second Cinematic Storyboard
              </span>
              <button
                onClick={() =>
                  triggerCopy(
                    `Music: ${copy.commercialScript.music}\n\n` +
                      copy.commercialScript.scenes
                        .map((s, idx) => `Scene ${idx + 1}:\nVisual: ${s}\nVoiceover: ${copy.commercialScript.voiceover[idx]}`)
                        .join("\n\n"),
                    "commercial"
                  )
                }
                className="text-neutral-400 hover:text-amber-500 transition-colors p-1"
                title="Copy Script"
              >
                {copiedKey === "commercial" ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Music/Audio cue */}
            <div className="bg-neutral-950 border-l-2 border-amber-500 p-3 rounded-r-xl">
              <span className="text-[9px] font-mono uppercase tracking-wider text-amber-500 block">
                Atmosphere & Soundscape
              </span>
              <p className="text-[11px] text-neutral-300 mt-1 italic font-light">
                {copy.commercialScript.music}
              </p>
            </div>

            {/* Storyboard timeline */}
            <div className="space-y-3.5">
              {copy.commercialScript.scenes.map((scene, idx) => (
                <div key={idx} className="bg-neutral-950/60 border border-neutral-800/80 p-4 rounded-xl flex space-x-3">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] font-mono font-bold text-amber-500 shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-2 text-left">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-neutral-500 tracking-wider">Visual Frame</span>
                      <p className="text-[11px] text-neutral-300 mt-0.5 leading-relaxed font-light">
                        {scene}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-amber-500/80 tracking-wider">Voiceover Narration</span>
                      <p className="text-[11px] text-neutral-200 mt-0.5 italic font-medium leading-relaxed">
                        "{copy.commercialScript.voiceover[idx]}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                Instagram Campaign Post
              </span>
              <button
                onClick={() => triggerCopy(copy.socialPost, "social")}
                className="text-neutral-400 hover:text-amber-500 transition-colors p-1"
                title="Copy Instagram Caption"
              >
                {copiedKey === "social" ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Social Post Caption Box */}
            <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl">
              <pre className="text-xs text-neutral-300 font-sans font-light whitespace-pre-wrap leading-relaxed text-left max-h-[220px] overflow-y-auto custom-scrollbar">
                {copy.socialPost}
              </pre>
            </div>
          </div>
        )}
      </div>

      <hr className="border-neutral-800" />

      {/* Dynamic AI Rewrite / Refinement console */}
      <div className="bg-neutral-950 border border-neutral-800/80 p-4 rounded-2xl flex flex-col space-y-3">
        <div className="flex items-center space-x-1.5 text-amber-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">
            AI Culinary Refinement
          </span>
        </div>

        <p className="text-[10px] text-neutral-500 leading-relaxed text-left">
          Request bespoke edits. Ask the model to "focus on the seared crust of the patty," "write in poetic French terms," or "make the voiceover narration dramatic."
        </p>

        <form onSubmit={handleRefineSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={refineText}
            onChange={(e) => setRefineText(e.target.value)}
            disabled={refining}
            placeholder={refining ? "Consulting with executive chef..." : "e.g., Focus more on the smokiness of the bacon"}
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={refining || !refineText.trim()}
            className="bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-950 p-2 rounded-xl transition-all flex items-center justify-center"
          >
            {refining ? (
              <div className="w-4 h-4 border-2 border-neutral-600 border-t-neutral-900 rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
