<template>
  <p class="container">
    <span class="icon">{{ icon }}</span>
    <a :href="link" target="_blank" rel="noreferrer" class="link">{{ title }}</a>
  </p>
</template>

<script setup lang="ts">
import { Icon } from '../enums/icon.enum';

withDefaults(defineProps<{ title: string, link: string; icon: Icon | string; }>(), {
  icon: Icon.RIGHT_ARROW,
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}

@keyframes icon {
  0% {
    transform: translateX(0rem);
  }

  100% {
    transform: translateX(0.5rem);
  }
}

.icon {
  margin-right: 0.5rem;
}

.icon:hover {
  cursor: pointer;
  animation: icon 0.6s infinite linear alternate;
}

.link {
  cursor: pointer;
}
</style>../enums/enum