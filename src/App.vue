<script setup lang="ts">
import WaveSurfer from './components/WaveSurfer.vue'
import { useSpectrogramPlugin } from './composables/useSpectrogramPlugin'
import { useZoomPlugin } from './composables/useZoomPlugin'
import { ref, computed } from 'vue'

const defaultUrl = '/media/01 - The chant of the Port Keats men.flac'
const isPlaying = ref(false)
const { spectrogramPlugin } = useSpectrogramPlugin()
const { zoomPlugin } = useZoomPlugin()
const plugins = computed(() => [
  ...(spectrogramPlugin.value ? [spectrogramPlugin.value] : []),
  ...(zoomPlugin.value ? [zoomPlugin.value] : []),
])
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>Vue WaveSurfer.js</h1>
    </div>
  </header>

  <main class="container">
    <WaveSurfer
      :is-playing="isPlaying"
      :url="defaultUrl"
      :media-controls="false"
      :plugins="plugins"
    />
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  background: var(--seafoam-primary);
  color: var(--seafoam-text);
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(95, 184, 160, 0.2);
}

.header h1 {
  font-weight: 600;
  font-size: 1.75rem;
}

main {
  padding: 1rem 0;
}
</style>
