export { };

declare global {
  interface Window {
    isPortrait: boolean;
    globalScaleFactorX: number;
    globalScaleFactorY: number;
    renderer: any;
  }
}