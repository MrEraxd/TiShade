export interface IColor {
  rgb: IRgbColor;
  hsl: IHslColor;
  hex: IHexColor;
}

export interface IHexColor {
  r: string;
  g: string;
  b: string;
  a?: number;
}

export interface IHslColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface IRgbColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}
