<script setup lang="ts">
  import BaseColorCell from '@base/BaseColorCell.vue';
  import { calculateTintsAndShades } from '@plugins/calculateTintAndShades';

  const options = calculateTintsAndShades('#ff0000');
</script>

<template>
  <div class="cells-wrapper">
    <BaseColorCell
      v-for="(colors, index) in options"
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
