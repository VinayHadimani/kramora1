/**
 * Type declarations for the Vanta.js dist bundles.
 * (The vanta npm package ships untyped UMD files.)
 */

declare module "vanta/dist/vanta.net.min" {
  export interface VantaEffectHandle {
    destroy: () => void;
  }

  export interface VantaNetOptions {
    el: HTMLElement;
    THREE: typeof import("three");
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    [key: string]: unknown;
  }

  export default function NET(options: VantaNetOptions): VantaEffectHandle;
}

declare module "vanta/dist/vanta.waves.min" {
  export interface VantaEffectHandle {
    destroy: () => void;
  }

  export interface VantaWavesOptions {
    el: HTMLElement;
    THREE: typeof import("three");
    color?: number;
    backgroundColor?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    [key: string]: unknown;
  }

  export default function WAVES(options: VantaWavesOptions): VantaEffectHandle;
}
