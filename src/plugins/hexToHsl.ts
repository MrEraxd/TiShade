export const hexToHsl = (hexValue: string) => {
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
  // Then to HSL
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

  return `${h}, ${s}%, ${l}%`;
};
