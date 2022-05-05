<script setup lang="ts">
  import BaseColorCell from '@base/BaseColorCell.vue';

  import { calculateTintsAndShades } from '@plugins/calculateTintAndShades';

  const options = calculateTintsAndShades('#8a0ca1');
</script>

<template>
  <div class="cells-wrapper">
    <BaseColorCell
      v-for="cell in options"
      :key="cell"
      :hsl-color="cell"
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
