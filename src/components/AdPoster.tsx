import React, { useState } from "react";
import { PosterTemplate, PosterHeaderFont } from "../types";
import { Grid, Heart, Share2, Download, Eye, Award } from "lucide-react";
const burgerHero = "/src/assets/images/luxury_gourmet_cheeseburger_1783585606476.jpg";

interface AdPosterProps {
  burgerName: string;
  slogan: string;
  bunName: string;
  pattyName: string;
  cheeseName: string;
  sauceName: string;
  toppingsList: string;
  lightingSetup: string;
}

export default function AdPoster({
  burgerName,
  slogan,
  bunName,
  pattyName,
  cheeseName,
  sauceName,
  toppingsList,
  lightingSetup,
}: AdPosterProps) {
  const [template, setTemplate] = useState<PosterTemplate>("editorial");
  const [font, setFont] = useState<PosterHeaderFont>("serif");
  const [showGrid, setShowGrid] = useState(false);
  const [showGoldenRatio, setShowGoldenRatio] = useState(false);
  const [likes, setLikes] = useState(248);
  const [isLiked, setIsLiked] = useState(false);

  const getFontClass = () => {
    switch (font) {
      case "serif":
        return "font-serif tracking-tight font-light";
      case "sans":
        return "font-sans uppercase tracking-[0.2em] font-semibold";
      case "mono":
        return "font-mono uppercase tracking-wider font-medium";
      case "script":
        return "font-serif italic tracking-wide font-normal";
    }
  };

  const getTemplateLayout = () => {
    switch (template) {
      case "editorial":
        return {
          containerClass: "bg-neutral-950 border-neutral-800 p-8",
          imageContainer: "rounded-lg border border-neutral-800 overflow-hidden relative shadow-2xl aspect-[4/3] w-full",
          textOverlay: "absolute bottom-6 left-6 right-6 text-left bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 rounded-lg",
          brandingClass: "text-amber-500 font-serif text-[10px] tracking-[0.4em] uppercase mb-1.5 flex items-center space-x-1.5",
          titleClass: "text-2xl text-white font-serif tracking-normal leading-tight",
          subtitleClass: "text-xs text-neutral-300 font-mono mt-2 italic font-light",
          editorialHeader: (
            <div className="w-full flex justify-between items-baseline border-b border-neutral-800 pb-4 mb-4">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">Vol. VII // Chef's Selection</span>
              <span className="text-sm font-serif italic text-amber-500/95 font-medium">L'Étoile Gastronomique</span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">Est. 2026</span>
            </div>
          ),
          editorialFooter: (
            <div className="w-full mt-4 pt-3 border-t border-neutral-800/80 flex justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              <span>Sourcing: Normandy & Japan</span>
              <span>100% Organic Pasture Crafted</span>
            </div>
          )
        };
      case "minimalist":
        return {
          containerClass: "bg-stone-100 border-stone-200 p-10 text-neutral-900",
          imageContainer: "rounded-none border border-stone-200 overflow-hidden relative shadow-lg aspect-square w-full max-w-[360px] mx-auto",
          textOverlay: "mt-6 text-center px-4",
          brandingClass: "text-neutral-500 text-[9px] tracking-[0.3em] uppercase mb-2 block",
          titleClass: "text-xl text-neutral-900 font-sans tracking-[0.25em] font-light uppercase",
          subtitleClass: "text-[10px] text-neutral-500 font-serif mt-2 tracking-wide font-normal max-w-xs mx-auto leading-relaxed",
          editorialHeader: null,
          editorialFooter: (
            <div className="w-full mt-6 pt-4 border-t border-stone-200 flex justify-center space-x-8 text-[9px] font-sans uppercase tracking-[0.25em] text-stone-400">
              <span>LESS is MORE</span>
              <span>•</span>
              <span>PURE FLAVOR</span>
            </div>
          )
        };
      case "noir-bistro":
        return {
          containerClass: "bg-neutral-950 border-amber-950/20 p-8",
          imageContainer: "rounded-md border-2 border-amber-500/20 overflow-hidden relative shadow-2xl shadow-amber-950/10 aspect-[4/3] w-full",
          textOverlay: "absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-6",
          brandingClass: "text-amber-500 font-serif text-[11px] tracking-wider italic flex items-center space-x-1 mb-1",
          titleClass: "text-3xl text-neutral-100 font-serif tracking-tight font-extrabold",
          subtitleClass: "text-xs text-amber-500/80 font-mono mt-1 tracking-widest uppercase",
          editorialHeader: (
            <div className="w-full text-center border-b border-amber-900/20 pb-4 mb-4">
              <span className="text-xl font-serif text-amber-500 tracking-[0.2em] font-bold block">NOIR & COUTURY</span>
              <span className="text-[8px] font-mono tracking-widest uppercase text-neutral-500 block mt-1">Midnight Bistro Exclusive Series</span>
            </div>
          ),
          editorialFooter: (
            <div className="w-full mt-4 text-center text-[9px] font-serif tracking-widest text-neutral-500 italic">
              "To eat well is to live poetically."
            </div>
          )
        };
      case "bento":
        return {
          containerClass: "bg-neutral-900 border-neutral-800 p-6",
          imageContainer: "rounded-xl border border-neutral-800 overflow-hidden relative aspect-[16/9] w-full",
          textOverlay: "absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-neutral-800 p-4 rounded-xl flex justify-between items-center",
          brandingClass: "text-amber-500 font-mono text-[9px] tracking-widest uppercase mb-0.5 block",
          titleClass: "text-sm text-white font-sans uppercase tracking-wider font-bold",
          subtitleClass: "text-[10px] text-neutral-400 font-mono mt-1",
          editorialHeader: null,
          editorialFooter: (
            <div className="grid grid-cols-2 gap-4 mt-4 text-left">
              <div className="bg-neutral-950 border border-neutral-800 p-3.5 rounded-xl">
                <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Anatomy of Flavor</span>
                <span className="text-[10px] text-neutral-300 font-sans tracking-wide block truncate">
                  {bunName} • {pattyName}
                </span>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 p-3.5 rounded-xl">
                <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Tasting Notes</span>
                <span className="text-[10px] text-neutral-300 font-sans tracking-wide block truncate">
                  {cheeseName} • {sauceName}
                </span>
              </div>
            </div>
          )
        };
    }
  };

  const layout = getTemplateLayout();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((l) => (isLiked ? l - 1 : l + 1));
  };

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Settings / Customization Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-md">
        
        {/* Template Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Poster Style:</span>
          <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            {(["editorial", "minimalist", "noir-bistro", "bento"] as PosterTemplate[]).map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded font-medium transition-all ${
                  template === t
                    ? "bg-amber-500 text-neutral-950"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {t.split("-").join(" ")}
              </button>
            ))}
          </div>
        </div>

        {/* Font Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Typography:</span>
          <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            {(["serif", "sans", "mono", "script"] as PosterHeaderFont[]).map((f) => (
              <button
                key={f}
                onClick={() => setFont(f)}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded font-medium transition-all ${
                  font === f
                    ? "bg-neutral-800 text-amber-500"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Framing Grid Lines toggles */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Overlays:</span>
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Rule of Thirds Grid"
            className={`p-2 rounded-lg border transition-all ${
              showGrid
                ? "bg-amber-500/10 border-amber-500 text-amber-500"
                : "bg-neutral-950 border-neutral-800 text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowGoldenRatio(!showGoldenRatio)}
            title="Golden Ratio Spiral"
            className={`p-2 rounded-lg border text-xs font-serif font-bold transition-all ${
              showGoldenRatio
                ? "bg-amber-500/10 border-amber-500 text-amber-500"
                : "bg-neutral-950 border-neutral-800 text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Φ
          </button>
        </div>
      </div>

      {/* The Styled Poster Stage */}
      <div className="relative w-full flex justify-center">
        
        {/* Dynamic Poster Container */}
        <div
          id="luxury-ad-poster"
          className={`w-full max-w-[480px] border rounded-2xl flex flex-col items-center justify-between shadow-2xl transition-all duration-500 ${layout.containerClass}`}
        >
          {/* Top Editorial branding line */}
          {layout.editorialHeader}

          {/* Hero Image Block */}
          <div className={layout.imageContainer}>
            
            {/* The Actual Generated Luxury Burger Asset */}
            <img
              src={burgerHero}
              alt="Luxury Gourmet Cheeseburger"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />

            {/* Rule of Thirds Frame Lines Overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-20">
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-r border-b border-white/20" />
                <div className="border-b border-white/20" />
                <div className="border-r border-white/20" />
                <div className="border-r border-white/20" />
                <div className="bg-transparent" />
              </div>
            )}

            {/* Golden Ratio Spiral Svg Overlay */}
            {showGoldenRatio && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-30 mix-blend-screen">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-500 fill-none stroke-[0.25]">
                  <rect x="0" y="0" width="100" height="100" />
                  <path d="M 0,0 A 100,100 0 0,0 100,100 A 61.8,61.8 0 0,0 38.2,38.2 A 38.2,38.2 0 0,0 76.4,76.4 A 23.6,23.6 0 0,0 52.8,52.8 A 14.6,14.6 0 0,0 67.4,67.4 A 9,9 0 0,0 58.4,58.4 A 5.5,5.5 0 0,0 63.9,63.9" />
                </svg>
              </div>
            )}

            {/* In-Image Typography overlays for standard layouts */}
            {template !== "minimalist" && (
              <div className={layout.textOverlay}>
                <span className={layout.brandingClass}>
                  <Award className="w-3.5 h-3.5 inline mr-1" />
                  L'Art de la Table
                </span>
                <h1 className={`${layout.titleClass} ${getFontClass()}`}>
                  {burgerName || "The Royal Angus"}
                </h1>
                <p className={layout.subtitleClass}>
                  {slogan || "An exquisite symphony of flame-seared legacy beef and white truffle aioli."}
                </p>
              </div>
            )}
          </div>

          {/* Exterior Typography for Minimalist Template */}
          {template === "minimalist" && (
            <div className={layout.textOverlay}>
              <span className={layout.brandingClass}>Est. Sourcing 2026</span>
              <h1 className={`${layout.titleClass} ${getFontClass()}`}>
                {burgerName || "The Royal Angus"}
              </h1>
              <p className={layout.subtitleClass}>
                {slogan || "An exquisite symphony of flame-seared legacy beef and white truffle aioli."}
              </p>
            </div>
          )}

          {/* Bottom Editorial details */}
          {layout.editorialFooter}
        </div>
      </div>

      {/* Social interactions and Export Action Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex justify-between items-center shadow-md">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
              isLiked
                ? "bg-red-500/10 text-red-500 border border-red-500/20"
                : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            <span>{likes} Appreciations</span>
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              // Print dynamic success alert gracefully in standard DOM
              const originalTitle = document.title;
              document.title = `${burgerName} - Luxury Poster`;
              window.print();
              document.title = originalTitle;
            }}
            className="bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF/Print</span>
          </button>
        </div>
      </div>
    </div>
  );
}
