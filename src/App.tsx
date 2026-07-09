import React, { useState } from "react";
import { Ingredient, PhotographySettings, AdvertisementCopy } from "./types";
import {
  BUN_OPTIONS,
  PATTY_OPTIONS,
  CHEESE_OPTIONS,
  SAUCE_OPTIONS,
  TOPPING_OPTIONS,
} from "./data";
import BurgerVisualizer from "./components/BurgerVisualizer";
import ControlPanel from "./components/ControlPanel";
import AdPoster from "./components/AdPoster";
import MarketingPanel from "./components/MarketingPanel";
import { ChefHat, Sparkles, Sliders, Image, Award, AlertCircle } from "lucide-react";

export default function App() {
  // Burger & Customizer State
  const [burgerName, setBurgerName] = useState("The Royal Truffle Angus");
  const [selectedBun, setSelectedBun] = useState<Ingredient>(BUN_OPTIONS[0]);
  const [selectedPatty, setSelectedPatty] = useState<Ingredient>(PATTY_OPTIONS[0]);
  const [selectedCheese, setSelectedCheese] = useState<Ingredient>(CHEESE_OPTIONS[0]);
  const [selectedSauce, setSelectedSauce] = useState<Ingredient>(SAUCE_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState<Ingredient[]>([
    TOPPING_OPTIONS[0],
    TOPPING_OPTIONS[1],
  ]);

  // Photography & Styling State
  const [settings, setSettings] = useState<PhotographySettings>({
    lighting: "golden-hour",
    aperture: 1.8,
    iso: 100,
    steam: true,
    shutterSpeed: "1/200 sec",
    accompaniments: {
      fries: true,
      drawer: true,
      sauces: true,
      herbs: true,
    } as any,
  });

  const [selectedTone, setSelectedTone] = useState("Ultra-Luxury");
  const [exploded, setExploded] = useState(false);

  // Active view tab (Builder vs Poster)
  const [activeLeftTab, setActiveLeftTab] = useState<"builder" | "poster">("builder");

  // API Content Generation States
  const [copy, setCopy] = useState<AdvertisementCopy | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [refining, setRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Invokes Express backend /api/advertisement/generate endpoint
  const handleGenerateCampaign = async () => {
    setLoading(true);
    setErrorMessage(null);
    
    // Simulate high-end studio loading sequences for extreme immersion
    const steps = [
      "Simulating golden studio rim lighting...",
      "Configuring Canon EOS macro lens coordinates...",
      "Molding molecular steam and condensation physics...",
      "Analyzing culinary composition & sourcing paths...",
      "Drafting Michelin-star description with Gemini...",
      "Polishing cinematic narration script...",
    ];

    let currentStepIdx = 0;
    setLoadingStep(steps[currentStepIdx]);
    
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        setLoadingStep(steps[currentStepIdx]);
      }
    }, 1200);

    try {
      const response = await fetch("/api/advertisement/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          burgerName,
          bun: selectedBun.name,
          patty: selectedPatty.name,
          cheese: selectedCheese.name,
          sauce: selectedSauce.name,
          toppings: selectedToppings.map((t) => t.name),
          tone: selectedTone,
          lighting: settings.lighting.split("-").join(" ") + " setup",
          aperture: `f/${settings.aperture}`,
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Server failed to compile campaign.");
      }

      const campaignData = await response.json();
      setCopy(campaignData);
      
      // Auto switch view tab to campaign poster once created successfully
      setActiveLeftTab("poster");
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setErrorMessage(err.message || "An unexpected culinary error occurred. Check your connection or API configuration.");
    } finally {
      setLoading(false);
    }
  };

  // Handles text-based copy refinements (re-asking the model)
  const handleRefineCampaign = async (instruction: string) => {
    if (!copy) return;
    setRefining(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/advertisement/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          burgerName,
          refinementInstruction: instruction,
          previousCopy: copy,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to refine campaign.");
      }

      const refinedData = await response.json();
      setCopy(refinedData);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Refinement failed. Try a different request.");
    } finally {
      setRefining(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950 flex flex-col">
      
      {/* Premium Studio Nav Header */}
      <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/10">
            <ChefHat className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wider uppercase text-neutral-100 flex items-center space-x-2">
              <span>Gourmet Burger Studio</span>
              <span className="text-[9px] font-mono font-normal tracking-widest px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500">
                PRO STUDIO
              </span>
            </h1>
            <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">
              Michelin-Star Food Stylist & AI Advertising Director
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] font-mono text-neutral-400">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>EXECUTIVE CHEF SUITE</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Error Announcement bar */}
        {errorMessage && (
          <div className="col-span-12 bg-red-950/40 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start space-x-3 text-xs mb-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Studio Alert // Generation Failure</span>
              <p className="leading-relaxed text-neutral-300">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* LEFT VIEWPORT - Displays the Burger customization OR Campaign Poster */}
        <div className="col-span-12 lg:col-span-7 flex flex-col space-y-4">
          
          {/* View Tab Selectors */}
          <div className="flex bg-neutral-900/60 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveLeftTab("builder")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all ${
                activeLeftTab === "builder"
                  ? "bg-neutral-800 border border-neutral-700/80 text-amber-400 font-bold"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>3D CUSTOMIZER STAGE</span>
            </button>

            <button
              onClick={() => setActiveLeftTab("poster")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all ${
                activeLeftTab === "poster"
                  ? "bg-neutral-800 border border-neutral-700/80 text-amber-400 font-bold"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>LUXURY CAMPAIGN POSTER</span>
            </button>
          </div>

          {/* Active viewport frame */}
          <div className="transition-all duration-300">
            {activeLeftTab === "builder" ? (
              <BurgerVisualizer
                bun={selectedBun}
                patty={selectedPatty}
                cheese={selectedCheese}
                sauce={selectedSauce}
                toppings={selectedToppings}
                settings={settings}
                exploded={exploded}
                onExplodedToggle={setExploded}
              />
            ) : (
              <AdPoster
                burgerName={burgerName}
                slogan={copy?.slogan || "An exquisite symphony of flame-seared legacy beef."}
                bunName={selectedBun.name}
                pattyName={selectedPatty.name}
                cheeseName={selectedCheese.name}
                sauceName={selectedSauce.name}
                toppingsList={selectedToppings.map((t) => t.name).join(", ")}
                lightingSetup={settings.lighting}
              />
            )}
          </div>

          {/* Marketing Panel underneath */}
          <MarketingPanel copy={copy} onRefine={handleRefineCampaign} refining={refining} />
        </div>

        {/* RIGHT VIEWPORT - Configuration sliders & Ingredient cards */}
        <div className="col-span-12 lg:col-span-5">
          <ControlPanel
            burgerName={burgerName}
            onNameChange={setBurgerName}
            selectedBun={selectedBun}
            onBunSelect={setSelectedBun}
            selectedPatty={selectedPatty}
            onPattySelect={setSelectedPatty}
            selectedCheese={selectedCheese}
            onCheeseSelect={setSelectedCheese}
            selectedSauce={selectedSauce}
            onSauceSelect={setSelectedSauce}
            selectedToppings={selectedToppings}
            onToppingsChange={setSelectedToppings}
            settings={settings}
            onSettingsChange={setSettings}
            selectedTone={selectedTone}
            onToneChange={setSelectedTone}
            onGenerate={handleGenerateCampaign}
            loading={loading}
            loadingStep={loadingStep}
          />
        </div>
      </main>

      {/* Subtle footer */}
      <footer className="mt-auto border-t border-neutral-900 bg-neutral-950/80 py-4 text-center">
        <p className="text-[10px] text-neutral-600 font-mono tracking-wider uppercase">
          Artisanal Food Assembly Studio // Inspired by Michelin Excellence
        </p>
      </footer>
    </div>
  );
}
