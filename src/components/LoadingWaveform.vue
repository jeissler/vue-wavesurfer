<script setup lang="ts">
import { computed } from 'vue'

const { height = 200 } = defineProps<{
  height?: number
}>()

const containerHeight = computed(() => `${height}px`)
</script>

<template>
  <div class="loading">
    <div class="waveform">
      <div v-for="i in 20" :key="i" class="bar" :style="{ '--delay': `${(i - 1) * 0.1}s` }"></div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: v-bind(containerHeight);
}

.waveform {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 60px;
}

.bar {
  width: 4px;
  background: var(--ws-wave);
  border-radius: 2px;
  animation: wave 1.2s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes wave {
  0%,
  100% {
    height: 20%;
    opacity: 0.6;
  }
  50% {
    height: 100%;
    opacity: 1;
  }
}

.bar:nth-child(odd) {
  background: var(--ws-progress);
}

.bar:nth-child(3n) {
  background: var(--ws-cursor);
}
</style>
