<script setup lang="ts">
  import GithubIcon from '@svg/logo-github.svg?component';
  import { useColorsStore } from '@store/colorsStore';
  import { calculateTintsAndShades } from '@plugins/calculateTintAndShades';

  const colorsStore = useColorsStore();

  const recalculateSwatches = (baseColor: string) => {
    colorsStore.setCurrentColor(baseColor);

    const newSwatches = calculateTintsAndShades(
      baseColor,
      colorsStore.getLightenByMixing(),
      colorsStore.getSwatchStep()
    );
    if (newSwatches) colorsStore.setSwatches(newSwatches);
  };
</script>

<template>
  <header class="main-nav">
    <div class="main-nav__logo headline headline--4">TiShade</div>
    <input
      class="main-nav__color-input"
      type="color"
      @input="recalculateSwatches((($event?.target) as HTMLInputElement).value)"
    />

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
