import { Ingredient } from "./types";

export const BUN_OPTIONS: Ingredient[] = [
  {
    id: "brioche",
    name: "Buttered Brioche",
    category: "bun",
    description: "Double-proofed French brioche, glazed with organic pasture-raised butter, dusted with delicate unhulled white sesame seeds.",
    sourcing: "Artisanal Bakery, Normandy, France",
    colorClass: "bg-amber-600 border-amber-800",
    layerHeight: "h-14",
  },
  {
    id: "charcoal",
    name: "Obsidian Charcoal",
    category: "bun",
    description: "Activated bamboo charcoal brioche, lending a striking deep-obsidian finish with a subtle earthiness and light, pillowy crumb.",
    sourcing: "Kyoto Charcoal Hearth, Japan",
    colorClass: "bg-neutral-900 border-neutral-950",
    layerHeight: "h-14",
  },
  {
    id: "pretzel",
    name: "Bavarian Pretzel",
    category: "bun",
    description: "Robust pretzel roll, lye-dipped and baked to a rich mahogany crust, sprinkled with coarse hand-harvested sea salt.",
    sourcing: "Traditional Bavarian Craft Bakery",
    colorClass: "bg-amber-800 border-amber-950",
    layerHeight: "h-14",
  }
];

export const PATTY_OPTIONS: Ingredient[] = [
  {
    id: "angus",
    name: "Flame-Grilled Angus",
    category: "patty",
    description: "A master blend of Chuck, Brisket, and Short Rib. Flame-grilled on volcanic rock hearths to develop deep char marks and seal in juicy lipids.",
    sourcing: "Black Angus Reserve, Creekstone Farms",
    colorClass: "bg-stone-800 border-stone-900",
    layerHeight: "h-12",
  },
  {
    id: "wagyu",
    name: "Miyazaki A5 Wagyu",
    category: "patty",
    description: "Ultra-premium Miyazaki beef with a marbling score of 12. Seared briefly to melt its luxurious fats into a rich, buttery, melt-in-the-mouth experience.",
    sourcing: "Miyazaki Prefecture, Japan",
    colorClass: "bg-neutral-800 border-stone-950",
    layerHeight: "h-12",
  },
  {
    id: "portobello",
    name: "Confit Portobello",
    category: "patty",
    description: "Giant portobello cap, marinated in aged balsamic, fresh rosemary, and garlic, slow-confit in extra-virgin olive oil to a rich, meaty texture.",
    sourcing: "Organic Mushroom Fields, Kennett Square",
    colorClass: "bg-yellow-950 border-amber-950",
    layerHeight: "h-10",
  }
];

export const CHEESE_OPTIONS: Ingredient[] = [
  {
    id: "cheddar",
    name: "Aged Somerset Cheddar",
    category: "cheese",
    description: "Cave-aged Somerset Cheddar, matured for 18 months, melted slowly to a golden drape with delicate, crunchy tyrosine crystals.",
    sourcing: "Somerset Caves, England",
    colorClass: "bg-amber-400 border-amber-500",
    layerHeight: "h-3",
  },
  {
    id: "gruyere",
    name: "Cave-Matured Gruyère",
    category: "cheese",
    description: "Raw milk Swiss Gruyère, aged 14 months, melted to a smooth, velvety flow. Rich, nutty, sweet alpine finish.",
    sourcing: "Fribourg Alps, Switzerland",
    colorClass: "bg-yellow-200 border-yellow-300",
    layerHeight: "h-3",
  },
  {
    id: "gorgonzola",
    name: "Gorgonzola Dolce",
    category: "cheese",
    description: "Lombardian blue-veined cheese, exceptionally creamy, melted into a rich, buttery sauce with a sharp, aromatic tang.",
    sourcing: "Lombardy Pastures, Italy",
    colorClass: "bg-teal-50 border-teal-200",
    layerHeight: "h-3",
  }
];

export const SAUCE_OPTIONS: Ingredient[] = [
  {
    id: "truffle-aioli",
    name: "Signature Truffle Sauce",
    category: "sauce",
    description: "A slow-whisked emulsion of organic pasture egg yolks, cold-pressed oil, white Alba truffle essence, and finely minced baby cornichons.",
    sourcing: "Alba Truffle Woods, Piedmont, Italy",
    colorClass: "bg-amber-100 border-amber-200",
    layerHeight: "h-2",
  },
  {
    id: "whiskey-bbq",
    name: "Smokey Kentucky BBQ",
    category: "sauce",
    description: "House reduction of 10-year-old small-batch Kentucky bourbon, organic blackstrap molasses, and wood-smoked chipotle peppers.",
    sourcing: "Bluegrass Distilleries, Kentucky, USA",
    colorClass: "bg-amber-900 border-amber-950",
    layerHeight: "h-2",
  },
  {
    id: "garlic-aioli",
    name: "Confit Purple Garlic Aioli",
    category: "sauce",
    description: "Purple French garlic slow-roasted to a sweet jam, blended with farm-fresh yolk mayonnaise and hand-torn lemon thyme.",
    sourcing: "Lautrec Purple Garlic Fields, France",
    colorClass: "bg-yellow-50 border-yellow-100",
    layerHeight: "h-2",
  }
];

export const TOPPING_OPTIONS: Ingredient[] = [
  {
    id: "bacon",
    name: "Applewood-Smoked Bacon",
    category: "topping",
    description: "Thick-cut heritage pork belly, cured with brown sugar, slow-smoked over seasoned applewood logs for a crunchy, smokey crunch.",
    sourcing: "Heritage Berkshire Farms, Iowa",
    colorClass: "bg-red-950 border-red-900",
    layerHeight: "h-4",
  },
  {
    id: "onion",
    name: "Clarified Butter Onions",
    category: "topping",
    description: "Vidalia sweet onions, slow-braised in clarified butter for 6 hours until deeply caramelized, mahogany, and exceptionally jammy.",
    sourcing: "Vidalia Farms, Georgia, USA",
    colorClass: "bg-amber-950 border-amber-900",
    layerHeight: "h-4",
  },
  {
    id: "tomato",
    name: "Vine-Ripened Heirloom Tomato",
    category: "topping",
    description: "Thick, pristine slices of organic Brandywine heirloom tomato, dusted with delicate French fleur de sel to release their fragrant juices.",
    sourcing: "Heritage Greenhouse, Lancaster County",
    colorClass: "bg-red-600 border-red-700",
    layerHeight: "h-5",
  },
  {
    id: "lettuce",
    name: "Crisp Chilled Iceberg",
    category: "topping",
    description: "Hydroponic leaf lettuce, hand-torn at its peak and shocked in ice water to lock in cell turgor pressure and crisp water droplets.",
    sourcing: "Hydro-Nurture Farms, Vermont",
    colorClass: "bg-emerald-500 border-emerald-600",
    layerHeight: "h-6",
  },
  {
    id: "pickles",
    name: "Oak-Barrel Fermented Pickles",
    category: "topping",
    description: "Crisp Kirby cucumbers fermented in traditional oak casks with garlic heads, mustard seeds, and wild flowering dill sprigs.",
    sourcing: "Artisanal Ferments Co., Upstate NY",
    colorClass: "bg-lime-800 border-lime-900",
    layerHeight: "h-4",
  }
];

export const PRESET_BURGERS = [
  {
    name: "The Royal Truffle Angus",
    bun: BUN_OPTIONS[0],
    patty: PATTY_OPTIONS[0],
    cheese: CHEESE_OPTIONS[0],
    sauce: SAUCE_OPTIONS[0],
    toppings: [TOPPING_OPTIONS[0], TOPPING_OPTIONS[1], TOPPING_OPTIONS[2], TOPPING_OPTIONS[3]],
    tone: "Ultra-Luxury",
    lighting: "golden-hour" as const,
  },
  {
    name: "The Obsidian Wagyu",
    bun: BUN_OPTIONS[1],
    patty: PATTY_OPTIONS[1],
    cheese: CHEESE_OPTIONS[1],
    sauce: SAUCE_OPTIONS[2],
    toppings: [TOPPING_OPTIONS[0], TOPPING_OPTIONS[1], TOPPING_OPTIONS[4]],
    tone: "Bold & Modern",
    lighting: "moody-studio" as const,
  },
  {
    name: "The Bavarian Bistro",
    bun: BUN_OPTIONS[2],
    patty: PATTY_OPTIONS[0],
    cheese: CHEESE_OPTIONS[1],
    sauce: SAUCE_OPTIONS[1],
    toppings: [TOPPING_OPTIONS[1], TOPPING_OPTIONS[3], TOPPING_OPTIONS[4]],
    tone: "Bistro Romance",
    lighting: "midnight-bistro" as const,
  }
];
