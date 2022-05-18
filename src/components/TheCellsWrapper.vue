<script setup lang="ts">
  import BaseColorCell from '@base/BaseColorCell.vue';
  import { useColorsStore } from '@store/colorsStore';

  const colorsStore = useColorsStore();
</script>

<template>
  <div class="cells-wrapper">
    <BaseColorCell
      v-for="(colors, index) in colorsStore.currentSwatches"
      :key="`cell-${index}`"
      :colors="colors"
    ></BaseColorCell>
  </div>
</template>

<style>
  .cells-wrapper {
    display: flex;
    height: 100%;
    flex-wrap: wrap;
  }
</style>
