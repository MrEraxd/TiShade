import { IHexColor, IHslColor, IRgbColor } from '@interfaces/Color';

export const hexToHsl = (hexValue: string): IHslColor => {
  hexValue = hexValue.replace('#', '');

  let r = 0,
    g = 0,
    b = 0;
  if (hexValue.length == 3) {
    r = +('0x' + hexValue[0] + hexValue[0]);
    g = +('0x' + hexValue[1] + hexValue[1]);
    b = +('0x' + hexValue[2] + hexValue[2]);
  } else if (hexValue.length == 6) {
    r = +('0x' + hexValue[0] + hexValue[1]);
    g = +('0x' + hexValue[2] + hexValue[3]);
    b = +('0x' + hexValue[4] + hexValue[5]);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;

  let h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);

  return {
    h: h,
    s: s,
    l: l,
  };
};

export const hexToRgb = (hexValue: string): IRgbColor => {
  hexValue = hexValue.replace('#', '');

  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hexValue.length == 3) {
    r = +('0x' + hexValue[0] + hexValue[0]);
    g = +('0x' + hexValue[1] + hexValue[1]);
    b = +('0x' + hexValue[2] + hexValue[2]);

    // 6 digits
  } else if (hexValue.length == 6) {
    r = +('0x' + hexValue[0] + hexValue[1]);
    g = +('0x' + hexValue[2] + hexValue[3]);
    b = +('0x' + hexValue[4] + hexValue[5]);
  }

  return {
    r: r,
    g: g,
    b: b,
  };
};

export const hslToHex = (hsl: IHslColor): IHexColor => {
  const h = hsl.h,
    s = hsl.s / 100,
    l = hsl.l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;

  let r: string | number = 0,
    g: string | number = 0,
    b: string | number = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return {
    r: r,
    g: g,
    b: b,
  };
};

export const hslToRgb = (hsl: IHslColor): IRgbColor => {
  const h = hsl.h,
    s = hsl.s / 100,
    l = hsl.l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return {
    r: r,
    g: g,
    b: b,
  };
};

export const darkenColor = (hslColor: IHslColor, darkenAmout: number) => {
  return {
    h: hslColor.h,
    s: hslColor.s,
    l: hslColor.l - darkenAmout < 0 ? hslColor.l : hslColor.l - darkenAmout,
  };
};

export const lightenColor = (hslColor: IHslColor, lightenAmount: number) => {
  return {
    h: hslColor.h,
    s: hslColor.s,
    l:
      hslColor.l + lightenAmount > 100
        ? hslColor.l
        : hslColor.l + lightenAmount,
  };
};
