<script setup lang="ts">
import WaveSurfer from './components/WaveSurfer.vue'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js'
import { useSpectrogramPlugin } from './composables/useSpectrogramPlugin'
import { useZoomPlugin } from './composables/useZoomPlugin'

const defaultUrl = '/media/01 - The chant of the Port Keats men.flac'
const { spectrogramPlugin } = useSpectrogramPlugin()
const { zoomPlugin } = useZoomPlugin()
const minimapPlugin = Minimap.create({ height: 30 })
// TODO: add click to play toggle
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>Vue WaveSurfer.js</h1>
    </div>
  </header>

  <main class="container">
    <WaveSurfer
      :url="defaultUrl"
      :initial-zoom="150"
      :media-controls="false"
      :plugins="[zoomPlugin, minimapPlugin, spectrogramPlugin]"
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

hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid var(--seafoam-dark);
}
</style>
