import { IRenderer } from "pixi.js";

export { };

declare global {
  interface Window {
    isPortrait: boolean;
    globalScaleFactorX: number;
    globalScaleFactorY: number;
    renderer: IRenderer<HTMLCanvasElement>;
  }
}