import { IHexColor, IHslColor, IRgbColor } from '@interfaces/Color';

interface IColorFunctions {
  hexToHsl(hexValue: string): IHslColor;
  hexToRgb(hexValue: string): IRgbColor;
  hslToHex(hsl: IHslColor): IHexColor;
  hslToRgb(hsl: IHslColor): IRgbColor;
  darkenColorByLightness(hslColor: IHslColor, darkenAmout: number): IHslColor;
  lightenColorByLightness(
    hslColor: IHslColor,
    lightenAmount: number
  ): IHslColor;
  darkenColorByMixing(rgbColor: IRgbColor, darkenAmout: number): IRgbColor;
  lightenColorByMixing(rgbColor: IRgbColor, lightenAmount: number): IRgbColor;
}

export class colorFunctions implements IColorFunctions {
  hexToHsl = (hexValue: string): IHslColor => {
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

  hexToRgb = (hexValue: string): IRgbColor => {
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

  hslToHex = (hsl: IHslColor): IHexColor => {
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

  hslToRgb = (hsl: IHslColor): IRgbColor => {
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

  rgbToHsl = (rgb: IRgbColor): IHslColor => {
    const r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255;

    const cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;

    let h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
      h: h,
      s: s,
      l: l,
    };
  };

  rgbToHex = (rgb: IRgbColor): IHexColor => {
    let r = rgb.r.toString(16),
      g = rgb.g.toString(16),
      b = rgb.b.toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return {
      r: r,
      g: g,
      b: b,
    };
  };

  darkenColorByLightness = (
    hslColor: IHslColor,
    darkenAmout: number
  ): IHslColor => {
    return {
      h: hslColor.h,
      s: hslColor.s,
      l: hslColor.l - darkenAmout < 0 ? hslColor.l : hslColor.l - darkenAmout,
    };
  };

  lightenColorByLightness = (
    hslColor: IHslColor,
    lightenAmount: number
  ): IHslColor => {
    return {
      h: hslColor.h,
      s: hslColor.s,
      l:
        hslColor.l + lightenAmount > 100
          ? hslColor.l
          : hslColor.l + lightenAmount,
    };
  };

  darkenColorByMixing = (
    rgbColor: IRgbColor,
    darkenAmout: number
  ): IRgbColor => {
    return {
      r: parseInt((rgbColor.r * darkenAmout).toFixed(0)),
      g: parseInt((rgbColor.g * darkenAmout).toFixed(0)),
      b: parseInt((rgbColor.b * darkenAmout).toFixed(0)),
    };
  };

  lightenColorByMixing = (
    rgbColor: IRgbColor,
    lightenAmout: number
  ): IRgbColor => {
    return {
      r: parseInt(((rgbColor.r + 255) / 2).toFixed(0)),
      g: parseInt(((rgbColor.g + 255) / 2).toFixed(0)),
      b: parseInt(((rgbColor.b + 255) / 2).toFixed(0)),
    };
  };
}
