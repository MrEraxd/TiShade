import { defineStore } from 'pinia';
import { IColor } from '@interfaces/Color';

export const useColorsStore = defineStore('colorsStore', {
  state: () => {
    return {
      currentColor: '',
      currentSwatches: <IColor[]>[],
      lightenByMixing: true,
      swatchStep: 0.1,
    };
  },
  actions: {
    setSwatches(newSwatches: IColor[]) {
      this.currentSwatches = newSwatches;
    },
    setCurrentColor(newColor: string) {
      this.currentColor = newColor;
    },
    toggleLightenByMixing() {
      this.lightenByMixing = !this.lightenByMixing;
    },
    getLightenByMixing() {
      return this.lightenByMixing;
    },
    getSwatchStep() {
      return this.swatchStep;
    },
  },
});
