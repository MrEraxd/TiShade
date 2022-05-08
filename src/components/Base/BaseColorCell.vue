<script setup lang="ts">
  import { IColor } from '@interfaces/Color';

  // Workaround for https://github.com/vuejs/core/issues/4294
  type Props = {
    colors: IColor;
  };

  const props = defineProps<Props>();
</script>

<template>
  <div
    class="base-color-cell"
    :style="{
      backgroundColor: `rgb(${props.colors.rgb.r}, ${props.colors.rgb.g}, ${props.colors.rgb.b})`,
      color:
        props.colors.hsl.l < 58
          ? 'hsl(var(--color-cc-white))'
          : 'hsl(var(--color-cc-black))',
    }"
  >
    <div>
      {{ `#${props.colors.hex.r}${props.colors.hex.g}${props.colors.hex.b}` }}
    </div>
    <div>
      {{
        `${props.colors.rgb.r}, ${props.colors.rgb.g}, ${props.colors.rgb.b}`
      }}
    </div>
    <div>
      {{
        `${props.colors.hsl.h}, ${props.colors.hsl.s}%, ${props.colors.hsl.l}%`
      }}
    </div>
  </div>
</template>

<style>
  .base-color-cell {
    padding: 12px;
    flex: 1 1 200px;
  }
</style>
