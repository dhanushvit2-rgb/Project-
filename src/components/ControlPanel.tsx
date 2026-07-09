import React from "react";
import { Ingredient, PhotographySettings } from "../types";
import {
  BUN_OPTIONS,
  PATTY_OPTIONS,
  CHEESE_OPTIONS,
  SAUCE_OPTIONS,
  TOPPING_OPTIONS,
  PRESET_BURGERS,
} from "../data";
import { Camera, Layers, Flame, Sliders, ChevronRight } from "lucide-react";

interface ControlPanelProps {
  burgerName: string;
  onNameChange: (val: string) => void;
  selectedBun: Ingredient;
  onBunSelect: (bun: Ingredient) => void;
  selectedPatty: Ingredient;
  onPattySelect: (patty: Ingredient) => void;
  selectedCheese: Ingredient;
  onCheeseSelect: (cheese: Ingredient) => void;
  selectedSauce: Ingredient;
  onSauceSelect: (sauce: Ingredient) => void;
  selectedToppings: Ingredient[];
  onToppingsChange: (toppings: Ingredient[]) => void;
  settings: PhotographySettings;
  onSettingsChange: (settings: PhotographySettings) => void;
  selectedTone: string;
  onToneChange: (tone: string) => void;
  onGenerate: () => void;
  loading: boolean;
  loadingStep: string;
}

export default function ControlPanel({
  burgerName,
  onNameChange,
  selectedBun,
  onBunSelect,
  selectedPatty,
  onPattySelect,
  selectedCheese,
  onCheeseSelect,
  selectedSauce,
  onSauceSelect,
  selectedToppings,
  onToppingsChange,
  settings,
  onSettingsChange,
  selectedTone,
  onToneChange,
  onGenerate,
  loading,
  loadingStep,
}: ControlPanelProps) {
  
  const handleToppingToggle = (topping: Ingredient) => {
    const exists = selectedToppings.find((t) => t.id === topping.id);
    if (exists) {
      onToppingsChange(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      onToppingsChange([...selectedToppings, topping]);
    }
  };

  const loadPreset = (preset: typeof PRESET_BURGERS[number]) => {
    onNameChange(preset.name);
    onBunSelect(preset.bun);
    onPattySelect(preset.patty);
    onCheeseSelect(preset.cheese);
    onSauceSelect(preset.sauce);
    onToppingsChange(preset.toppings);
    onToneChange(preset.tone);

    onSettingsChange({
      ...settings,
      lighting: preset.lighting,
    });
  };

  const updateSetting = <K extends keyof PhotographySettings>(
    key: K,
    value: PhotographySettings[K]
  ) => {
    const updated = { ...settings, [key]: value };
    
    // Dynamically calculate a realistic Shutter Speed watermarked in camera metadata
    let ss = "1/200 sec";
    if (key === "iso") {
      const isoVal = value as number;
      if (isoVal <= 100) ss = "1/125 sec";
      else if (isoVal <= 400) ss = "1/200 sec";
      else if (isoVal <= 800) ss = "1/500 sec";
      else ss = "1/1000 sec";
    }
    updated.shutterSpeed = ss;
    
    onSettingsChange(updated);
  };

  const tones = ["Ultra-Luxury", "Sensory/Artisanal", "Bold & Modern", "Bistro Romance"];

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
      
      {/* Title / Preset Loader */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
            Signature Presets
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PRESET_BURGERS.map((preset) => {
            const isLoaded = burgerName === preset.name;
            return (
              <button
                key={preset.name}
                onClick={() => loadPreset(preset)}
                className={`text-[10px] py-2 px-1.5 rounded-lg border text-center font-medium transition-all ${
                  isLoaded
                    ? "bg-amber-500/10 border-amber-500 text-amber-500 font-semibold"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                {preset.name.split(" ").slice(1).join(" ") || preset.name}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Naming Section */}
      <div>
        <label className="block text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-2">
          Masterpiece Designation
        </label>
        <input
          type="text"
          value={burgerName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Name your gourmet burger (e.g. The Truffle King)"
          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      <hr className="border-neutral-800" />

      {/* Ingredients Configurator */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-amber-500">
          <Layers className="w-4 h-4" />
          <h3 className="text-xs font-bold tracking-wider uppercase">Culinary Layers</h3>
        </div>

        {/* Bun Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium text-neutral-300">1. Artisanal Bun</span>
          <div className="grid grid-cols-3 gap-2">
            {BUN_OPTIONS.map((bun) => (
              <button
                key={bun.id}
                onClick={() => onBunSelect(bun)}
                className={`py-2 px-2 rounded-xl text-[10px] border flex flex-col items-center justify-center space-y-1 text-center transition-all ${
                  selectedBun.id === bun.id
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                <span className="font-semibold">{bun.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Patty Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium text-neutral-300">2. Seared Patty</span>
          <div className="grid grid-cols-3 gap-2">
            {PATTY_OPTIONS.map((patty) => (
              <button
                key={patty.id}
                onClick={() => onPattySelect(patty)}
                className={`py-2 px-2 rounded-xl text-[10px] border flex flex-col items-center justify-center space-y-1 text-center transition-all ${
                  selectedPatty.id === patty.id
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                <span className="font-semibold">{patty.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cheese Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium text-neutral-300">3. Melted Cheese</span>
          <div className="grid grid-cols-3 gap-2">
            {CHEESE_OPTIONS.map((cheese) => (
              <button
                key={cheese.id}
                onClick={() => onCheeseSelect(cheese)}
                className={`py-2 px-2 rounded-xl text-[10px] border flex flex-col items-center justify-center space-y-1 text-center transition-all ${
                  selectedCheese.id === cheese.id
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                <span className="font-semibold">{cheese.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sauce Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium text-neutral-300">4. Emulsion Sauce</span>
          <div className="grid grid-cols-3 gap-2">
            {SAUCE_OPTIONS.map((sauce) => (
              <button
                key={sauce.id}
                onClick={() => onSauceSelect(sauce)}
                className={`py-2 px-2 rounded-xl text-[10px] border flex flex-col items-center justify-center space-y-1 text-center transition-all ${
                  selectedSauce.id === sauce.id
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                <span className="font-semibold">{sauce.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toppings Multi-select */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium text-neutral-300">5. Premium Toppings (Select Multiple)</span>
          <div className="grid grid-cols-2 gap-2">
            {TOPPING_OPTIONS.map((topping) => {
              const active = selectedToppings.some((t) => t.id === topping.id);
              return (
                <button
                  key={topping.id}
                  onClick={() => handleToppingToggle(topping)}
                  className={`py-2 px-3 rounded-xl text-[10px] border text-left flex items-center justify-between transition-all ${
                    active
                      ? "bg-amber-500/10 border-amber-500 text-amber-400"
                      : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <span className="font-medium">{topping.name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-amber-500" : "bg-neutral-800"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Photography & Styling Studio Controls */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-amber-500">
          <Camera className="w-4 h-4" />
          <h3 className="text-xs font-bold tracking-wider uppercase">Studio Setup</h3>
        </div>

        {/* Lighting preset */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium text-neutral-300">Atmospheric Lighting</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "golden-hour", label: "Golden Hour Side" },
              { id: "moody-studio", label: "Moody Studio" },
              { id: "high-contrast-rim", label: "High-Contrast Rim" },
              { id: "midnight-bistro", label: "Midnight Bistro" },
            ].map((lighting) => (
              <button
                key={lighting.id}
                onClick={() => updateSetting("lighting", lighting.id as any)}
                className={`py-1.5 px-2 rounded-lg text-[10px] border text-center transition-all ${
                  settings.lighting === lighting.id
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                {lighting.label}
              </button>
            ))}
          </div>
        </div>

        {/* Aperture */}
        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] font-medium text-neutral-300">Aperture (Depth of Field)</span>
            <span className="text-[10px] font-mono text-amber-500 font-semibold">f/{settings.aperture}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[9px] font-mono text-neutral-500">f/1.2 (Soft Bokeh)</span>
            <input
              type="range"
              min="1.2"
              max="8.0"
              step="0.6"
              value={settings.aperture}
              onChange={(e) => updateSetting("aperture", parseFloat(e.target.value))}
              className="flex-1 accent-amber-500 bg-neutral-950 h-1 rounded"
            />
            <span className="text-[9px] font-mono text-neutral-500">f/8.0 (Sharp)</span>
          </div>
        </div>

        {/* ISO */}
        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] font-medium text-neutral-300">ISO Sensitivity</span>
            <span className="text-[10px] font-mono text-amber-500 font-semibold">ISO {settings.iso}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[9px] font-mono text-neutral-500">100 (Clean)</span>
            <input
              type="range"
              min="100"
              max="1600"
              step="300"
              value={settings.iso}
              onChange={(e) => updateSetting("iso", parseInt(e.target.value))}
              className="flex-1 accent-amber-500 bg-neutral-950 h-1 rounded"
            />
            <span className="text-[9px] font-mono text-neutral-500">1600 (Gritty)</span>
          </div>
        </div>

        {/* Steam Toggle */}
        <div className="flex items-center justify-between py-1 bg-neutral-950 border border-neutral-800/60 rounded-xl px-3">
          <div className="flex items-center space-x-2">
            <Flame className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[11px] font-medium text-neutral-300">Realistic Heat Steam</span>
          </div>
          <button
            onClick={() => updateSetting("steam", !settings.steam)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
              settings.steam ? "bg-amber-500" : "bg-neutral-800"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                settings.steam ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Accompaniments checklist */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium text-neutral-300">Styling Accompaniments</span>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: "fries", label: "French Fries" },
              { id: "sauces", label: "Sauce Bowls" },
              { id: "herbs", label: "Herbs & Salt" },
            ].map((acc) => {
              const active = settings.accompaniments[acc.id as keyof typeof settings.accompaniments];
              return (
                <button
                  key={acc.id}
                  onClick={() =>
                    updateSetting("accompaniments", {
                      ...settings.accompaniments,
                      [acc.id]: !active,
                    })
                  }
                  className={`py-1 rounded-lg text-[9px] border text-center transition-all ${
                    active
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                      : "bg-neutral-950 border-neutral-800 text-neutral-500 hover:border-neutral-700"
                  }`}
                >
                  {acc.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Copywriting Tone & Generate */}
      <div className="space-y-4 pt-1">
        <div className="space-y-2">
          <label className="block text-xs font-semibold tracking-wider text-neutral-400 uppercase">
            Advertising Slogan Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => onToneChange(tone)}
                className={`py-1.5 px-2 rounded-lg text-[10px] border text-center transition-all ${
                  selectedTone === tone
                    ? "bg-amber-500/10 border-amber-500 text-amber-400 font-semibold"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* CTA GENERATE BUTTON */}
        <button
          onClick={onGenerate}
          disabled={loading || !burgerName.trim()}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2.5 transition-all shadow-lg ${
            loading
              ? "bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed"
              : !burgerName.trim()
              ? "bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 hover:from-amber-400 hover:to-amber-500 active:scale-98 shadow-amber-500/20 shadow-lg"
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-neutral-600 border-t-amber-500 rounded-full animate-spin" />
              <span className="text-[10px] tracking-wider animate-pulse font-mono text-neutral-300">
                {loadingStep}
              </span>
            </div>
          ) : (
            <>
              <span>Generate Luxury Campaign</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
