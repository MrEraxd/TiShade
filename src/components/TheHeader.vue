<script setup lang="ts">
  import GithubIcon from '@svg/logo-github.svg?component';
  import { colorFunctions as cf } from '@plugins/colorFunctions';
  import { useColorsStore } from '@store/colorsStore';
  import { calculateTintsAndShades } from '@plugins/calculateTintAndShades';

  const colors = new cf();
  const colorsStore = useColorsStore();

  const recalculateSwatches = () => {
    const newSwatches = calculateTintsAndShades(
      colorsStore.currentColor,
      colorsStore.getLightenByMixing(),
      colorsStore.getSwatchStep()
    );
    if (newSwatches) colorsStore.setSwatches(newSwatches);
  };

  const randomColor = colors.getRandomHexColor();
  colorsStore.currentColor = randomColor;

  recalculateSwatches();
</script>

<template>
  <header class="main-nav">
    <div class="main-nav__logo headline headline--4">TiShade</div>
    <input
      class="main-nav__color-input"
      type="color"
      :value="randomColor"
      @input="colorsStore.setCurrentColor((($event?.target) as HTMLInputElement).value), recalculateSwatches()"
    />

    <button @click="colorsStore.toggleLightenByMixing(), recalculateSwatches()">
      Toggle lighten by mixing
    </button>

    <a
      href="https://github.com/MrEraxd/TiShade"
      target="_blank"
      class="main-nav__github"
    >
      <GithubIcon />
    </a>
  </header>
</template>

<style lang="postcss">
  .main-nav {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid hsl(var(--color-cc-grey-30));

    &__color-input {
      border: none;
      padding: 1px 2px;
      background-color: transparent;
      height: 32px;
      width: 32px;

      &:hover {
        cursor: pointer;
      }
    }

    &__github {
      margin-left: auto;

      svg path {
        transition: fill 0.3s;
      }

      &:hover {
        svg path {
          fill: hsl(var(--color-cc-blue-30));
        }
      }
    }
  }
</style>
