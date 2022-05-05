export const darkenColor = (hslColor: string, darkenAmout: number) => {
  const hslColorArray = hslColor
    .replaceAll(' ', '')
    .replaceAll('%', '')
    .split(',');

  hslColorArray[2] =
    +hslColorArray[2] - darkenAmout < 0
      ? hslColorArray[2]
      : (+hslColorArray[2] - darkenAmout).toFixed(0).toString();

  return `${hslColorArray[0]}, ${hslColorArray[1]}%, ${hslColorArray[2]}%`;
};
