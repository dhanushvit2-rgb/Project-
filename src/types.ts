export interface Ingredient {
  id: string;
  name: string;
  category: "bun" | "patty" | "cheese" | "sauce" | "topping";
  description: string;
  sourcing: string;
  colorClass: string; // Tailwind bg class for a stylized 2D stack representation
  layerHeight: string; // height/styling config
  icon?: string;
}

export interface PhotographySettings {
  lighting: "golden-hour" | "moody-studio" | "high-contrast-rim" | "midnight-bistro";
  aperture: number; // f/1.2 to f/8
  iso: number;      // 100 to 1600
  steam: boolean;
  shutterSpeed: string;
  accompaniments: {
    fries: boolean;
    sauces: boolean;
    herbs: boolean;
  };
}

export interface AdvertisementCopy {
  slogan: string;
  description: string;
  socialPost: string;
  commercialScript: {
    music: string;
    scenes: string[];
    voiceover: string[];
  };
}

export type PosterTemplate = "editorial" | "minimalist" | "noir-bistro" | "bento";
export type PosterHeaderFont = "serif" | "sans" | "mono" | "script";
