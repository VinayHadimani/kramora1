/**
 * Ambient type declarations for `liquid-gl` (v3.0.0).
 *
 * The package ships as a single ESM file without TypeScript types, so we
 * declare the public surface we use. Options mirror the README parameter
 * table. Note: the module itself returns `undefined` when imported on the
 * server (it early-returns when `window` is missing) — we only ever call it
 * from client-side effects, so the typed signature below is accurate for
 * every call site we control.
 */
declare module "liquid-gl" {
  export interface LiquidGLInitOptions {
    /** Renderer chain: "auto" (WebGPU → WebGL2 → WebGL1 → CSS). */
    engine?: "auto" | "webgpu" | "webgl2" | "webgl";
    /** CSS selector for the element to snapshot for refraction (body). */
    snapshot?: string;
    /** CSS selector for the element(s) to turn into glass lenses. */
    target: string;
    /** Snapshot resolution, clamped 0.1–3.0. */
    resolution?: number;
    /** Explicit lens stacking order; defaults to the element's effective z-index. */
    zIndex?: number;
    /** Selector for the lens's live content child; `false` disables the content layer. */
    content?: string | false;
    /** Base refraction strength (0–1). */
    refraction?: number;
    /** Chromatic aberration strength (0–1); 0 disables extra samples. */
    aberration?: number;
    /** Edge-bevel refraction intensity (0–1). */
    bevelDepth?: number;
    /** Bevel zone width as a fraction of the shortest side (0–1). */
    bevelWidth?: number;
    /** Frosted blur radius in px. 0 = crystal clear. */
    frost?: number;
    /** Soft drop-shadow under the pane. */
    shadow?: boolean;
    /** Animated specular highlights. */
    specular?: boolean;
    /** Reveal animation once the first frame renders. */
    reveal?: "none" | "fade";
    /** 3D tilt interaction on cursor movement. */
    tilt?: boolean;
    /** Tilt depth in degrees (0–25 recommended). */
    tiltFactor?: number;
    /** Tilt settle duration in ms, applied on hover-in and hover-out. */
    tiltEase?: number;
    /** Let the pane be picked up and dragged with mouse or touch. */
    draggable?: boolean;
    /** Pointer interaction mode: "none" or viscous "fluid". */
    interaction?: "none" | "fluid";
    /** Fluid displacement strength (0–1). */
    interactionStrength?: number;
    /** Fluid interaction radius, proportion of the pane's shortest side (0–1). */
    interactionRadius?: number;
    /** How thickly/slowly the fluid surface settles (0–1). */
    interactionViscosity?: number;
    /** Lens magnification (clamped 0.001–3.0). */
    magnify?: number;
    /** Glass dye — any CSS colour; the colour's alpha is the dye strength. */
    tint?: string | null;
    /** Debug helper GUI (requires the liquidGL-helper module). */
    helper?: boolean;
    /** Lifecycle callbacks. */
    on?: {
      init?: (instance: unknown) => void;
      dragstart?: (instance: unknown, info: { x: number; y: number }) => void;
      drag?: (instance: unknown, info: { x: number; y: number }) => void;
      dragend?: (instance: unknown, info: { x: number; y: number }) => void;
    };
  }

  export interface LiquidGLLens {
    /** Tear down this lens: restore styles, remove listeners, free GPU resources. */
    destroy: () => void;
    /** Update the glass dye at runtime. */
    setTint?: (tint: string | null) => void;
    /** Toggle draggability at runtime. */
    setDraggable?: (draggable: boolean) => void;
  }

  const liquidGL: ((options: LiquidGLInitOptions) => LiquidGLLens) & {
    /** Register dynamic elements (CSS selector or element list) to re-texture on change. */
    registerDynamic?: (target: string | Element[]) => void;
    /** Sync the render loop with smooth-scroll libraries (Lenis / Locomotive / GSAP). */
    syncWith?: (libraries: Record<string, unknown>) => void;
  };

  export default liquidGL;
}
