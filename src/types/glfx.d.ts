declare module 'glfx' {
  export interface GlfxTexture {
    loadContentsOf(source: HTMLCanvasElement | HTMLImageElement): void;
  }

  export interface GlfxDraw {
    bulgePinch(
      x: number,
      y: number,
      radius: number,
      strength: number
    ): GlfxDraw;
    vignette(size: number, amount: number): GlfxDraw;
    zoomBlur(x: number, y: number, strength: number): GlfxDraw;
    update(): void;
  }

  /** WebGL canvas returned by `fx.canvas()` — behaves like a canvas for layout/DOM. */
  export interface GlfxCanvas extends HTMLCanvasElement {
    texture(source: HTMLCanvasElement | HTMLImageElement): GlfxTexture;
    draw(texture: GlfxTexture): GlfxDraw;
  }

  export interface Glfx {
    canvas(): GlfxCanvas;
  }

  const fx: Glfx;
  export default fx;
}
