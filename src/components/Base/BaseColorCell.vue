<script setup lang="ts">
  interface IBaseColorCell {
    hslColor: string;
  }

  const props = withDefaults(defineProps<IBaseColorCell>(), {
    hslColor: 'hsl(0, 0%, 0%)',
  });
</script>

<template>
  <div class="base-color-cell">{{ props.hslColor }}</div>
</template>

<style>
  .base-color-cell {
    flex: 1 1 200px;
    background-color: hsl(v-bind('props.hslColor'));
  }
</style>
