export const hexToRgb = (hexValue: string): string => {
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

  console.log(r, g, b);

  return `${r},${g},${b}`;
};
