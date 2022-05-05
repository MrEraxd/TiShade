import { darkenColor } from './darkenColor';
import { hexToHsl } from './hexToHsl';
import { lightenColor } from './lightenColor';

export const calculateTintsAndShades = (baseColor: string) => {
  // If hex color
  if (baseColor.search(/[0-9A-Fa-f]{6}/g) === -1) {
    console.error('Wrong color format');
    return;
  }

  const colorsArray: string[] = [];

  const baseColorInHsl = hexToHsl(baseColor);

  const tints = [baseColorInHsl];
  const shades = [baseColorInHsl];

  const lightenAmount = 10;
  const darkenAmount = 10;

  for (let i = 0; i < lightenAmount; i++) {
    const lighterColor = lightenColor(tints[i], lightenAmount / 2);
    tints.push(lighterColor);
    colorsArray.unshift(lighterColor);
  }

  colorsArray.push(baseColorInHsl);

  for (let i = 0; i < darkenAmount; i++) {
    const darkerColor = darkenColor(shades[i], darkenAmount / 2);
    shades.push(darkerColor);
    colorsArray.push(darkerColor);
  }

  return colorsArray;
};
