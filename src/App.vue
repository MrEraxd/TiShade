<script setup lang="ts">
  /// <reference types="vite-svg-loader" />

  import './assets/styles/main.pcss';
  import TheHeader from './components/TheHeader.vue';
  import TheCellsWrapper from './components/TheCellsWrapper.vue';
</script>

<template>
  <TheHeader></TheHeader>
  <TheCellsWrapper></TheCellsWrapper>
</template>

<style>
  #app {
  }
</style>
