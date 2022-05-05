<script setup lang="ts">
  import GithubIcon from '@svg/logo-github.svg?component';
</script>

<template>
  <header class="main-nav">
    <div class="main-nav__logo headline headline--4">TiShade</div>

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
