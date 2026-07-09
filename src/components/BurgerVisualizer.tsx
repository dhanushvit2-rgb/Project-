import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ingredient, PhotographySettings } from "../types";
import { Sparkles, Info } from "lucide-react";

interface BurgerVisualizerProps {
  bun: Ingredient;
  patty: Ingredient;
  cheese: Ingredient;
  sauce: Ingredient;
  toppings: Ingredient[];
  settings: PhotographySettings;
  exploded: boolean;
  onExplodedToggle: (val: boolean) => void;
}

export default function BurgerVisualizer({
  bun,
  patty,
  cheese,
  sauce,
  toppings,
  settings,
  exploded,
  onExplodedToggle,
}: BurgerVisualizerProps) {
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Group all parts in structural order from top to bottom
  const layers: { id: string; name: string; type: string; info: Ingredient; isTopping?: boolean }[] = [
    { id: "top-bun", name: `Top Bun: ${bun.name}`, type: "bun", info: bun },
    { id: "sauce", name: `Sauce: ${sauce.name}`, type: "sauce", info: sauce },
    ...toppings.map((t) => ({ id: `topping-${t.id}`, name: t.name, type: "topping", info: t, isTopping: true })),
    { id: "cheese", name: `Cheese: ${cheese.name}`, type: "cheese", info: cheese },
    { id: "patty", name: `Patty: ${patty.name}`, type: "patty", info: patty },
    { id: "bottom-bun", name: `Bottom Bun: ${bun.name}`, type: "bun", info: bun },
  ];

  // Adjust blur intensity based on f-stop aperture (lower f-stop = shallower depth of field = more blur)
  // f/1.2: blur-md, f/1.8: blur-sm, f/4: blur-[2px], f/8: blur-none
  const getBokehClass = () => {
    if (settings.aperture <= 1.4) return "blur-xl scale-105 opacity-40";
    if (settings.aperture <= 2.0) return "blur-lg scale-102 opacity-60";
    if (settings.aperture <= 4.0) return "blur-md opacity-80";
    return "blur-sm opacity-90";
  };

  const getLightingFilter = () => {
    switch (settings.lighting) {
      case "golden-hour":
        return "from-amber-500/20 via-orange-500/10 to-transparent";
      case "moody-studio":
        return "from-neutral-500/10 via-neutral-600/5 to-transparent";
      case "high-contrast-rim":
        return "from-white/10 via-neutral-900/40 to-neutral-950/70";
      case "midnight-bistro":
        return "from-blue-600/20 via-indigo-900/10 to-amber-500/5";
    }
  };

  const selectedLayerInfo = layers.find((l) => l.id === selectedLayerId)?.info;

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col items-center justify-between p-6">
      
      {/* Background Bokeh Atmosphere */}
      <div className={`absolute inset-0 transition-all duration-700 ease-out -z-10 bg-neutral-900 ${getBokehClass()}`}>
        {/* Render glowing ambient orbs */}
        <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-amber-500/30 blur-2xl animate-pulse" />
        <div className="absolute top-24 right-1/4 w-40 h-40 rounded-full bg-orange-600/20 blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 rounded-full bg-yellow-500/20 blur-3xl" />
        
        {/* Dining Room Silhouette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
      </div>

      {/* Side Lighting Simulation Layer */}
      <div className={`absolute inset-0 bg-gradient-to-r pointer-events-none z-10 mix-blend-color-dodge transition-all duration-700 ${getLightingFilter()}`} />

      {/* Shutter Speed and ISO watermark overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-neutral-800 px-3 py-1.5 rounded-full text-[10px] font-mono text-neutral-400 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span>LIVE FEED //</span>
        <span>f/{settings.aperture}</span>
        <span>•</span>
        <span>ISO {settings.iso}</span>
        <span>•</span>
        <span>{settings.shutterSpeed}</span>
      </div>

      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button
          onClick={() => onExplodedToggle(!exploded)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center space-x-1.5 border transition-all ${
            exploded
              ? "bg-amber-500 border-amber-600 text-neutral-950 shadow-lg shadow-amber-500/25"
              : "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{exploded ? "Assembled View" : "Exploded View"}</span>
        </button>
      </div>

      {/* Realistic Steam Animation */}
      {settings.steam && (
        <div className="absolute top-12 bottom-32 left-1/2 -translate-x-1/2 w-48 pointer-events-none z-30 opacity-40 mix-blend-screen overflow-hidden">
          <div className="absolute bottom-0 left-10 right-10 top-0 flex justify-around">
            <div className="w-8 h-full bg-gradient-to-r from-transparent via-neutral-300/10 to-transparent blur-md rounded-full transform -translate-y-4 animate-steam1" />
            <div className="w-10 h-full bg-gradient-to-r from-transparent via-neutral-300/15 to-transparent blur-lg rounded-full transform -translate-y-8 animate-steam2 [animation-delay:1.5s]" />
            <div className="w-6 h-full bg-gradient-to-r from-transparent via-neutral-300/10 to-transparent blur-md rounded-full transform -translate-y-2 animate-steam3 [animation-delay:0.7s]" />
          </div>
        </div>
      )}

      {/* The Serving Board & Burger Stage */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[260px]">
        
        {/* Dynamic Burger Render Stack */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-[280px]">
          <AnimatePresence mode="popLayout">
            {layers.map((layer, index) => {
              const isSelected = selectedLayerId === layer.id;
              
              // Calculate exploded vertical spacing offsets
              let yOffset = 0;
              if (exploded) {
                // Stagger outwards from center
                const centerIndex = (layers.length - 1) / 2;
                yOffset = (index - centerIndex) * 22;
              }

              return (
                <motion.div
                  key={layer.id}
                  id={`burger-layer-${layer.id}`}
                  style={{ zIndex: index + 10 }}
                  animate={{
                    y: yOffset,
                    scale: isSelected ? 1.08 : 1,
                  }}
                  whileHover={{ scale: isSelected ? 1.08 : 1.03, zIndex: 50 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  onClick={() => setSelectedLayerId(isSelected ? null : layer.id)}
                  className={`relative cursor-pointer select-none group w-full ${layer.info.layerHeight} transition-all duration-300`}
                >
                  
                  {/* Indicator lines and detail badges for Exploded Mode */}
                  {exploded && (
                    <div className="absolute inset-y-0 -left-12 -right-12 pointer-events-none flex items-center justify-between">
                      <div className="text-left">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-amber-500 uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded border border-neutral-800">
                          {layer.info.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-neutral-400 bg-black/80 px-2 py-0.5 rounded border border-neutral-800">
                          {layer.info.name}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Render Visual Layer Representing Gourmet Ingredients */}
                  {renderIngredientLayer(layer.id, layer.type, layer.info, isSelected, settings.lighting)}
                  
                  {/* Selected Layer Glow Ring */}
                  {isSelected && (
                    <div className="absolute -inset-1.5 rounded-full border border-amber-500/60 ring-2 ring-amber-500/20 pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Rustic Walnut Serving Board base */}
        <div className="absolute bottom-6 w-full max-w-[340px] h-4 rounded-xl bg-gradient-to-b from-amber-900 to-amber-950 border-t border-amber-800 shadow-xl flex items-center justify-between px-6">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/60" />
          <div className="text-[8px] font-mono text-amber-950 uppercase tracking-widest opacity-80 select-none">Walnut Craft</div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/60" />
        </div>

        {/* Scattered items in foreground (Fries basket, sauces, pepper etc.) */}
        <div className="absolute bottom-2 inset-x-4 flex justify-between items-end pointer-events-none select-none px-4">
          
          {/* Metal Fries Basket */}
          {settings.accompaniments.fries ? (
            <div className="relative w-16 h-12 flex flex-col justify-end translate-y-1">
              {/* Wire Grid Pattern */}
              <div className="absolute inset-0 bg-neutral-800/10 border-2 border-neutral-700 rounded-md flex flex-wrap gap-0.5 p-1 overflow-hidden z-10">
                {/* Visual fries */}
                <div className="w-1.5 h-8 bg-yellow-400 rounded-sm rotate-12 -mt-1 shadow-sm" />
                <div className="w-1.5 h-10 bg-yellow-500 rounded-sm -rotate-6 shadow-sm" />
                <div className="w-1.5 h-7 bg-amber-400 rounded-sm rotate-45 -mt-2 shadow-sm" />
                <div className="w-1.5 h-9 bg-yellow-500 rounded-sm -rotate-12 shadow-sm" />
                <div className="w-1.5 h-9 bg-yellow-400 rounded-sm rotate-6 shadow-sm" />
                <div className="w-1.5 h-8 bg-amber-500 rounded-sm -rotate-45 -mt-1 shadow-sm" />
              </div>
              <div className="absolute -bottom-1 left-2 right-2 h-1 bg-black/60 rounded blur-sm" />
            </div>
          ) : <div />}

          {/* Scattered Sea Salt Crystals */}
          {settings.accompaniments.herbs && (
            <div className="absolute bottom-1 left-1/3 text-[9px] text-white/40 font-mono tracking-widest flex space-x-1.5">
              <span>+</span>
              <span>•</span>
              <span>+</span>
              <span className="text-emerald-500/40">🌿</span>
            </div>
          )}

          {/* Ceramic Sauce Ramekins */}
          {settings.accompaniments.sauces ? (
            <div className="flex space-x-2 translate-y-1">
              <div className="w-8 h-6 rounded-full bg-neutral-200 border border-neutral-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-red-700 shadow-inner" />
              </div>
              <div className="w-8 h-6 rounded-full bg-neutral-200 border border-neutral-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-amber-100 shadow-inner" />
              </div>
            </div>
          ) : <div />}
        </div>
      </div>

      {/* Layer Sourcing / Culinary storytelling Drawer */}
      <div className="w-full min-h-[50px] z-30">
        <AnimatePresence mode="wait">
          {selectedLayerInfo ? (
            <motion.div
              key={selectedLayerId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-xl p-3 flex items-start space-x-3 text-left shadow-lg"
            >
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-xs font-semibold text-neutral-100 tracking-wide uppercase">
                    {selectedLayerInfo.name}
                  </h4>
                  <span className="text-[9px] font-mono text-amber-500/90 tracking-wider">
                    {selectedLayerInfo.sourcing}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                  {selectedLayerInfo.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="h-[50px] flex items-center justify-center text-xs text-neutral-500 italic select-none">
              Click any layer above to discover its artisanal sourcing narrative.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Sub-helper function to render visual rich textures for the burger ingredients
function renderIngredientLayer(
  layerId: string,
  type: string,
  info: Ingredient,
  isSelected: boolean,
  lighting: string
) {
  // Setup lighting reflections based on mode
  const getGlow = () => {
    if (lighting === "golden-hour") return "shadow-[inset_20px_0_20px_rgba(251,191,36,0.2)]";
    if (lighting === "high-contrast-rim") return "shadow-[0_0_8px_rgba(255,255,255,0.4)]";
    return "";
  };

  if (layerId === "top-bun") {
    return (
      <div className="relative w-full h-full">
        {/* Rounded brioche bun top arch */}
        <div className={`w-full h-full rounded-t-[50%] bg-amber-600 border-b-4 border-amber-800 relative shadow-lg ${getGlow()}`}>
          {/* Sesame Seeds */}
          {info.id === "brioche" && (
            <div className="absolute inset-0 opacity-85 pointer-events-none">
              <div className="absolute top-2 left-1/4 w-1.5 h-0.5 bg-yellow-100 rounded-full rotate-45" />
              <div className="absolute top-4 left-1/3 w-1.5 h-0.5 bg-yellow-100 rounded-full -rotate-12" />
              <div className="absolute top-3 left-1/2 w-1.5 h-0.5 bg-yellow-100 rounded-full rotate-12" />
              <div className="absolute top-2 right-1/4 w-1.5 h-0.5 bg-yellow-100 rounded-full -rotate-45" />
              <div className="absolute top-6 right-1/3 w-1.5 h-0.5 bg-yellow-100 rounded-full rotate-45" />
              <div className="absolute top-5 left-1/2 w-1.5 h-0.5 bg-yellow-100 rounded-full -rotate-45" />
              <div className="absolute top-5 right-1/4 w-1.5 h-0.5 bg-yellow-100 rounded-full rotate-12" />
              <div className="absolute top-6 left-10 w-1.5 h-0.5 bg-yellow-100 rounded-full rotate-90" />
            </div>
          )}

          {/* Charcoal Bun customization */}
          {info.id === "charcoal" && (
            <div className="absolute inset-0 bg-neutral-900 rounded-t-[50%] border-b-4 border-neutral-950">
              <div className="absolute top-2 left-1/3 w-1 h-1 bg-neutral-700 rounded-full" />
              <div className="absolute top-3 right-1/4 w-1 h-1 bg-neutral-800 rounded-full" />
              <div className="absolute top-5 left-1/2 w-1 h-1 bg-neutral-700 rounded-full" />
            </div>
          )}

          {/* Pretzel Bun glaze */}
          {info.id === "pretzel" && (
            <div className="absolute inset-0 bg-amber-800 rounded-t-[50%] border-b-4 border-amber-950">
              {/* Bavarian Cuts */}
              <div className="absolute top-2 left-12 w-6 h-1 bg-amber-100/60 rotate-12 rounded-sm" />
              <div className="absolute top-2 right-12 w-6 h-1 bg-amber-100/60 -rotate-12 rounded-sm" />
              {/* Coarse Salt chunks */}
              <div className="absolute top-4 left-1/2 w-1.5 h-1.5 bg-white shadow rounded-sm" />
              <div className="absolute top-3 left-10 w-1.5 h-1.5 bg-white shadow rounded-sm" />
              <div className="absolute top-5 right-12 w-1.5 h-1.5 bg-white shadow rounded-sm" />
            </div>
          )}

          {/* Butter Gloss shine overlay */}
          <div className="absolute top-1 left-4 right-4 h-3 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
        </div>
      </div>
    );
  }

  if (layerId === "bottom-bun") {
    const bottomBg = info.id === "charcoal" ? "bg-neutral-900" : info.id === "pretzel" ? "bg-amber-850" : "bg-amber-600";
    const borderBg = info.id === "charcoal" ? "border-neutral-950" : info.id === "pretzel" ? "border-amber-950" : "border-amber-700";
    return (
      <div className={`w-full h-full rounded-b-[20%] rounded-t-[5%] ${bottomBg} border-t-2 border-b-4 ${borderBg} relative shadow-md`} />
    );
  }

  if (type === "sauce") {
    const color = info.id === "whiskey-bbq" ? "bg-amber-950" : "bg-amber-100/90";
    return (
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Dripping drops simulation */}
        <div className={`w-[96%] h-full rounded-full ${color} relative shadow-inner overflow-visible`}>
          <div className={`absolute top-1 left-4 w-2 h-4 ${color} rounded-full`} />
          <div className={`absolute top-1 right-12 w-3 h-5 ${color} rounded-full`} />
          <div className={`absolute top-1 left-1/3 w-2.5 h-6 ${color} rounded-full`} />
        </div>
      </div>
    );
  }

  if (type === "cheese") {
    const color = info.id === "cheddar" ? "bg-amber-400" : info.id === "gruyere" ? "bg-yellow-200" : "bg-teal-50";
    const border = info.id === "cheddar" ? "border-amber-500" : info.id === "gruyere" ? "border-yellow-300" : "border-teal-100";
    return (
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Soft draped corners of cheese melted naturally */}
        <div className={`w-[98%] h-full ${color} ${border} border-t relative rounded-sm shadow-md`}>
          <div className={`absolute top-0 left-2 w-4 h-6 ${color} rounded-b-[80%] rotate-6`} />
          <div className={`absolute top-0 right-4 w-5 h-7 ${color} rounded-b-[60%] -rotate-12`} />
          <div className={`absolute top-0 left-1/2 w-3 h-5 ${color} rounded-b-full`} />
        </div>
      </div>
    );
  }

  if (type === "patty") {
    const isWagyu = info.id === "wagyu";
    const color = isWagyu ? "bg-neutral-800" : info.id === "portobello" ? "bg-stone-900" : "bg-stone-800";
    return (
      <div className="relative w-full h-full">
        {/* Thick textured patty */}
        <div className={`w-full h-full rounded-2xl ${color} border-y-2 border-stone-950 relative overflow-hidden shadow-xl`}>
          {/* Grate Sear Marks */}
          <div className="absolute inset-0 opacity-40 pointer-events-none flex justify-around">
            <div className="w-1.5 h-full bg-stone-950 transform rotate-12" />
            <div className="w-1.5 h-full bg-stone-950 transform rotate-12" />
            <div className="w-1.5 h-full bg-stone-950 transform rotate-12" />
            <div className="w-1.5 h-full bg-stone-950 transform rotate-12" />
            <div className="w-1.5 h-full bg-stone-950 transform rotate-12" />
          </div>
          {/* Juicy shine / highlight */}
          <div className="absolute top-0.5 inset-x-3 h-1.5 bg-white/10 rounded-full blur-[1px] pointer-events-none" />
          {isWagyu && (
            <div className="absolute top-1 left-8 w-2 h-2 bg-yellow-400/20 rounded-full blur-[1px]" />
          )}
        </div>
      </div>
    );
  }

  // Toppings render
  if (info.id === "bacon") {
    return (
      <div className="relative w-full h-full flex justify-around items-center">
        {/* Wavy overlapping bacon strips */}
        <div className="w-[45%] h-full bg-red-950 border-y border-red-900 rounded-md relative shadow-md transform -rotate-2">
          <div className="absolute inset-y-0 left-1/4 w-3 bg-red-700/60" />
        </div>
        <div className="w-[45%] h-full bg-red-950 border-y border-red-900 rounded-md relative shadow-md transform rotate-3">
          <div className="absolute inset-y-0 left-1/3 w-3 bg-red-700/60" />
        </div>
      </div>
    );
  }

  if (info.id === "onion") {
    return (
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Strands of caramelized onion */}
        <div className="w-[90%] h-[70%] bg-amber-950/80 border border-amber-900 rounded-full relative flex items-center justify-around">
          <div className="w-6 h-1.5 bg-amber-700/40 rounded-full transform rotate-45" />
          <div className="w-8 h-1 bg-amber-800/50 rounded-full transform -rotate-12" />
          <div className="w-5 h-2 bg-amber-700/40 rounded-full" />
        </div>
      </div>
    );
  }

  if (info.id === "tomato") {
    return (
      <div className="relative w-full h-full flex justify-around items-center">
        {/* Two beautiful, thick red heirloom slices */}
        <div className="w-[46%] h-full bg-red-600 border border-red-700 rounded-xl relative shadow-md flex items-center justify-center overflow-hidden">
          {/* Core chambers of tomato */}
          <div className="absolute w-[80%] h-[80%] rounded-lg border border-red-700/60 flex flex-wrap p-0.5 justify-around">
            <div className="w-3.5 h-3.5 bg-red-800/40 rounded-full" />
            <div className="w-3.5 h-3.5 bg-red-800/40 rounded-full" />
          </div>
        </div>
        <div className="w-[46%] h-full bg-red-600 border border-red-700 rounded-xl relative shadow-md flex items-center justify-center overflow-hidden">
          <div className="absolute w-[80%] h-[80%] rounded-lg border border-red-700/60 flex flex-wrap p-0.5 justify-around">
            <div className="w-3.5 h-3.5 bg-red-800/40 rounded-full" />
            <div className="w-3.5 h-3.5 bg-red-800/40 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (info.id === "lettuce") {
    return (
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Beautiful wavy romaine/iceberg leaf layer */}
        <div className="w-[102%] h-full bg-emerald-500 border border-emerald-600 rounded-full relative shadow-md flex items-center justify-between overflow-visible">
          {/* Leaf waves */}
          <div className="absolute -top-1 left-2 w-8 h-4 bg-emerald-400 rounded-t-full border-t border-emerald-500/50" />
          <div className="absolute -top-1.5 right-6 w-12 h-5 bg-emerald-400 rounded-t-full border-t border-emerald-500/50" />
          <div className="absolute -bottom-1 left-1/3 w-10 h-3 bg-emerald-600 rounded-b-full" />
        </div>
      </div>
    );
  }

  if (info.id === "pickles") {
    return (
      <div className="relative w-full h-full flex justify-around items-center">
        {/* Crunchy barrel pickles with ridges */}
        <div className="w-8 h-8 rounded-full bg-lime-800 border-2 border-lime-900 flex items-center justify-center relative shadow-md">
          {/* Pickle ridges */}
          <div className="w-5 h-5 rounded-full border border-dashed border-lime-700/80" />
        </div>
        <div className="w-8 h-8 rounded-full bg-lime-800 border-2 border-lime-900 flex items-center justify-center relative shadow-md transform rotate-12">
          <div className="w-5 h-5 rounded-full border border-dashed border-lime-700/80" />
        </div>
      </div>
    );
  }

  // Fallback for default custom toppings
  return (
    <div className={`w-full h-full rounded-xl ${info.colorClass} border shadow-md relative`} />
  );
}
