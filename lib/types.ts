export type VanillaCode = {
  html: string;
  css?: string;
  js?: string;
};

export type TweakControl =
  | {
      type: "string";
      label: string;
      value: string;
      options?: string[];
    }
  | {
      type: "boolean";
      label: string;
      value: boolean;
    }
  | {
      type: "number";
      label: string;
      value: number;
      min?: number;
      max?: number;
      step?: number;
    }
  | {
      type: "color";
      label: string;
      value: string;
    };

export type ComponentItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  previewImage: string;
  reactCode?: string;
  vanillaCode?: VanillaCode;
  githubUrl?: string;
  codepenUrl?: string;
  tweakpaneConfig?: TweakControl[];
  usageCode?: string;
  dependencies?: string[];
};

