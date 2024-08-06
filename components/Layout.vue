<!-- .vitepress/theme/Layout.vue -->

<script setup lang="ts">
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { nextTick, provide } from 'vue';

const { isDark } = useData();

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  await (document as any).startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    {
      transform: `scale(0)`,
      transformOrigin: `${x}px ${y}px`
    },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${'old'}(root)`
    }
  );
});
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>