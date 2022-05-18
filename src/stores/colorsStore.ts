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
    getSwatches() {
      return this.currentSwatches;
    },
    setSwatches(newSwatches: IColor[]) {
      this.currentSwatches = newSwatches;
    },
    setCurrentColor(newColor: string) {
      this.currentColor = newColor;
    },
    getLightenByMixing() {
      return this.lightenByMixing;
    },
    getSwatchStep() {
      return this.swatchStep;
    },
  },
});
