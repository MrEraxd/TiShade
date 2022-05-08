import {
  hexToHsl,
  lightenColor,
  darkenColor,
  hexToRgb,
  hslToRgb,
  hslToHex,
} from './colorFuntions';
import { IColor } from 'interfaces/Color';

export const calculateTintsAndShades = (
  hexColor: string,
  lightenByMixing = false
): IColor[] | undefined => {
  // If not hex color
  if (hexColor.search(/[0-9A-Fa-f]{6}/g) === -1) {
    console.error('Wrong color format');
    return;
  }

  const baseColor: IColor = {
    rgb: hexToRgb(hexColor),
    hsl: hexToHsl(hexColor),
    hex: {
      r: hexColor[1] + hexColor[2],
      g: hexColor[3] + hexColor[4],
      b: hexColor[5] + hexColor[6],
    },
  };

  const colorArray = [baseColor];
  const step = 20;

  if (lightenByMixing) {
    console.log('lightenByMixing');
  } else {
    const startingLightnes = colorArray[0].hsl.l;
    // Lighter colors
    for (let i = 0; i < 100 - startingLightnes; i += step) {
      const lightestColor = colorArray[colorArray.length - 1];
      const lighterHslColor = lightenColor(lightestColor.hsl, step);

      if (lighterHslColor.l === lightestColor.hsl.l) {
        break;
      }

      colorArray.push({
        rgb: hslToRgb(lighterHslColor),
        hex: hslToHex(lighterHslColor),
        hsl: lighterHslColor,
      });
    }

    // Darker colors
    for (let i = 0; i < startingLightnes; i += step) {
      const darkestColor = colorArray[0];
      const darkerHslColor = darkenColor(darkestColor.hsl, step);

      if (darkerHslColor.l === darkestColor.hsl.l) {
        break;
      }

      colorArray.unshift({
        rgb: hslToRgb(darkerHslColor),
        hex: hslToHex(darkerHslColor),
        hsl: darkerHslColor,
      });
    }
  }

  colorArray.reverse();

  return colorArray;
};
