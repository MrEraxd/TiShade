export const lightenColor = (hslColor: string, lightenAmount: number) => {
  const hslColorArray = hslColor
    .replaceAll(' ', '')
    .replaceAll('%', '')
    .split(',');

  hslColorArray[2] =
    +hslColorArray[2] + lightenAmount > 100
      ? hslColorArray[2]
      : (+hslColorArray[2] + lightenAmount).toFixed(0).toString();

  return `${hslColorArray[0]}, ${hslColorArray[1]}%, ${hslColorArray[2]}%`;
};
