import { colorFunctions as cf } from './colorFunctions';
import { IColor } from 'interfaces/Color';

export const calculateTintsAndShades = (
  hexColor: string,
  lightenByMixing = false
): IColor[] | undefined => {
  const colors = new cf();

  // If not hex color
  if (hexColor.search(/[0-9A-Fa-f]{6}/g) === -1) {
    console.error('Wrong color format');
    return;
  }

  const baseColor: IColor = {
    rgb: colors.hexToRgb(hexColor),
    hsl: colors.hexToHsl(hexColor),
    hex: {
      r: hexColor[1] + hexColor[2],
      g: hexColor[3] + hexColor[4],
      b: hexColor[5] + hexColor[6],
    },
  };

  const colorArray = [baseColor];
  const step = 20;

  if (lightenByMixing) {
    for (let i = 0; i < 100; i++) {
      const lightestColor = baseColor;
      const lighterRgbColor = colors.lightenColorByMixing(
        lightestColor.rgb,
        0.1
      );

      if (
        JSON.stringify(lighterRgbColor) === JSON.stringify(lightestColor.rgb)
      ) {
        break;
      }

      colorArray.push({
        rgb: lighterRgbColor,
        hex: colors.rgbToHex(lighterRgbColor),
        hsl: colors.rgbToHsl(lighterRgbColor),
      });
    }

    for (let i = 0; i < 100; i++) {
      const darkestColor = baseColor;
      const darkerRgbColor = colors.darkenColorByMixing(
        darkestColor.rgb,
        0.1 * i
      );

      if (JSON.stringify(darkerRgbColor) === JSON.stringify(darkestColor.rgb)) {
        break;
      }

      colorArray.unshift({
        rgb: darkerRgbColor,
        hex: colors.rgbToHex(darkerRgbColor),
        hsl: colors.rgbToHsl(darkerRgbColor),
      });
    }
  } else {
    const startingLightnes = colorArray[0].hsl.l;
    // Lighter colors
    for (let i = 0; i < 100 - startingLightnes; i += step) {
      const lightestColor = colorArray[colorArray.length - 1];
      const lighterHslColor = colors.lightenColorByLightness(
        lightestColor.hsl,
        step
      );

      if (lighterHslColor.l === lightestColor.hsl.l) {
        break;
      }

      colorArray.push({
        rgb: colors.hslToRgb(lighterHslColor),
        hex: colors.hslToHex(lighterHslColor),
        hsl: lighterHslColor,
      });
    }

    // Darker colors
    for (let i = 0; i < startingLightnes; i += step) {
      const darkestColor = colorArray[0];
      const darkerHslColor = colors.darkenColorByLightness(
        darkestColor.hsl,
        step
      );

      if (darkerHslColor.l === darkestColor.hsl.l) {
        break;
      }

      colorArray.unshift({
        rgb: colors.hslToRgb(darkerHslColor),
        hex: colors.hslToHex(darkerHslColor),
        hsl: darkerHslColor,
      });
    }
  }

  colorArray.reverse();

  return colorArray;
};
