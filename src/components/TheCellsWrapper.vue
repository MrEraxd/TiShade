<script setup lang="ts">
  import BaseColorCell from '@base/BaseColorCell.vue';
</script>

<template>
  <div class="cells-wrapper">
    <BaseColorCell
      v-for="cell in Array.from('zxcvbssssss')"
      :key="cell"
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
